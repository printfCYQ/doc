# Python Web 开发（FastAPI 主线）

这份文档讲怎么用 Python 做 Web 后端。先说清楚选哪个框架,再拿 FastAPI 从头到尾走一遍,最后给 Django / Flask 的入门对照。

## 先搞清楚你要做什么

Python 做 Web 一般分两类:

- **写 API(接口服务)**:前端、App、别的系统来调你的接口拿数据。这种最普遍,也是 AI 应用部署模型最常用的形态。
- **写网站(带页面)**:要渲染 HTML、有后台管理、用户登录那一套。

这两类对框架的要求不一样,所以选型先看用途。

## 框架怎么选

| 框架 | 定位 | 优点 | 缺点 | 适合 |
|---|---|---|---|---|
| **FastAPI** | 现代异步 API 框架 | 快、自带类型校验、自动生成 Swagger 文档、异步原生 | 不带模板/Admin,纯做站要自己拼 | API 服务、AI 模型接口、微服务 |
| **Django** | 全家桶全栈框架 | ORM、Admin、Auth、模板开箱即用,生态巨大 | 重、异步支持晚、想"轻"反而别扭 | 内容站、后台系统、传统网站 |
| **Flask** | 轻量微框架 | 简单灵活、概念少、好懂 | 啥都得自己装插件,大项目易乱 | 小工具、学习、原型 |
| **Litestar** | FastAPI 近亲 | 比 FastAPI 更规整的架构 | 生态小、资料少 | 想换 FastAPI 但嫌它随意 |

结论很直接:

- **做 API / 后端服务 / 把模型包成接口** → 直接 **FastAPI**。它基于 ASGI + Starlette + Pydantic,性能好,而且请求体校验和文档是白送的。
- **要做带后台管理的内容网站** → 选 **Django**(自带 Admin 能省一大半工)。
- **只是写个小脚本暴露个接口、或者刚学 Web** → **Flask** 上手最轻松。

下面主线用 FastAPI,因为它最贴合"Python 后端"的需求,而且和之前 [AI 大模型应用](../../ai/llm-app.md) 里部署大模型应用能直接接上。

---

## 1. 环境搭建

FastAPI 本身只是框架,真正跑服务的是 ASGI 服务器 **Uvicorn**。建议先建虚拟环境,步骤见 [Python 笔记](./python.md) 第 18 节。

```bash
python -m venv .venv
source .venv/bin/activate        # Windows 用 .venv\Scripts\activate

pip install fastapi "uvicorn[standard]"
pip freeze > requirements.txt    # 把依赖锁下来
```

装好之后,整份文档的例子都基于这两个包。

---

## 2. 第一个应用

新建 `main.py`:

```python
from fastapi import FastAPI

app = FastAPI(
    title="我的第一个 API",
    version="1.0.0",
    description="用 FastAPI 写的练习项目",
)

@app.get("/")
def read_root():
    return {"msg": "hello world"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str | None = None):
    # item_id 是路径参数,自动转成 int;q 是查询参数 ?q=xxx,可省略
    return {"item_id": item_id, "q": q}
```

跑起来:

```bash
uvicorn main:app --reload
# main      → main.py 文件名（不含 .py）
# app       → 文件里 FastAPI 实例的变量名
# --reload  → 改代码自动重启,开发时用
```

然后打开浏览器:

- `http://127.0.0.1:8000/` 看返回
- `http://127.0.0.1:8000/docs` 是**自动生成的 Swagger 交互文档**,可以直接在页面上试每个接口
- `http://127.0.0.1:8000/redoc` 是另一套文档样式

这是 FastAPI 最值钱的地方:不用手写文档,代码即文档。

---

## 3. 路由与请求

### 3.1 路径参数 vs 查询参数

```python
@app.get("/users/{user_id}")
def get_user(user_id: int, detail: bool = False):
    # user_id 在路径里 /users/123 → 必填,自动转 int
    # detail 在 ? 后面 /users/123?detail=true → 选填
    return {"user_id": user_id, "detail": detail}
```

规则:

- 写在路径 `{xxx}` 里的是**路径参数**
- 函数签名里没在路径出现、又有默认值的,是**查询参数**
- 类型注解(`int` / `bool` / `str`)既做转换又做校验,传错类型直接返回 422

### 3.2 请求体(Pydantic)

接口要收复杂数据(比如创建用户),用 Pydantic 模型定义:

```python
from pydantic import BaseModel, Field

class UserCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=50)
    age: int = Field(..., ge=0, le=150)
    email: str
    is_active: bool = True          # 有默认值,可不传

@app.post("/users")
def create_user(user: UserCreate):
    # user 自动按 UserCreate 校验,字段不对直接 422
    return {"created": user.name, "age": user.age}
```

`Field` 里 `...` 表示必填;`ge`/`le`/`min_length` 是校验规则。想加自定义校验用 `field_validator`:

```python
from pydantic import field_validator

class UserCreate(BaseModel):
    name: str
    email: str

    @field_validator("email")
    def email_must_have_at(cls, v):
        if "@" not in v:
            raise ValueError("email 格式不对")
        return v
```

### 3.3 嵌套模型

```python
class Address(BaseModel):
    city: str
    street: str

class UserCreate(BaseModel):
    name: str
    address: Address          # 嵌套,请求体里传 {"name":..,"address":{"city":..,"street":..}}

# 列表也没问题
class OrderCreate(BaseModel):
    items: list[str]
```

### 3.4 表单、文件、Header

```python
from fastapi import Form, File, UploadFile, Header

@app.post("/login")
def login(username: str = Form(...), password: str = Form(...)):
    # Form 走表单格式,不是 JSON
    return {"user": username}

@app.post("/upload")
def upload(f: UploadFile = File(...)):
    # UploadFile 是异步友好的文件对象
    content = f.read()
    return {"filename": f.filename, "size": len(content)}

@app.get("/secret")
def secret(x_token: str = Header(...)):
    # 从请求头取 x-token
    return {"token": x_token}
```

---

## 4. 响应控制

### 4.1 响应模型

指定返回结构,多余字段自动丢掉(比如不想把密码返回前端):

```python
class UserOut(BaseModel):
    id: int
    name: str
    email: str

@app.post("/users", response_model=UserOut)
def create_user(user: UserCreate):
    # 就算内部有 password 字段,返回时只给 UserOut 里的
    return {"id": 1, "name": user.name, "email": user.email, "password": "secret"}
```

### 4.2 状态码

```python
from fastapi import status

@app.post("/users", status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate):
    return {...}
```

---

## 5. 依赖注入(Depends)

这是 FastAPI 的核心机制:把"通用逻辑"抽出来,谁需要谁声明,框架自动调用并传进来。典型用途:取当前登录用户、拿数据库连接、校验权限。

```python
from fastapi import Depends, HTTPException

def get_db():
    # 简化版:真实项目里这里是开/关数据库会话（见第 8 节）
    db = {"users": {}}
    return db

def get_current_user(token: str = Header(...)):
    if token != "valid-token":
        raise HTTPException(status_code=401, detail="未登录")
    return {"name": "alice"}

@app.get("/me")
def read_me(db: dict = Depends(get_db), user: dict = Depends(get_current_user)):
    return {"db_keys": list(db.keys()), "user": user}
```

带 `yield` 的依赖能做"用完清理":

```python
def get_db():
    db = connect()
    try:
        yield db        # 把 db 交给视图用
    finally:
        db.close()      # 视图结束后自动关
```

---

## 6. 中间件与 CORS

**中间件**在请求进视图前、响应出视图后统一处理,比如记日志、跨域:

```python
from fastapi import Request
import time

@app.middleware("http")
async def add_process_time(request: Request, call_next):
    start = time.time()
    response = await call_next(request)     # 调下一个环节
    response.headers["X-Process-Time"] = str(time.time() - start)
    return response
```

**CORS**(允许前端从不同域名调你的接口)几乎每个项目都要配:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],   # 前端地址,生产写具体域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 7. 错误处理

```python
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from fastapi.exceptions import RequestValidationError

@app.get("/items/{item_id}")
def get_item(item_id: int):
    if item_id <= 0:
        raise HTTPException(status_code=400, detail="id 必须为正数")
    return {"item_id": item_id}

# 自定义校验错误返回格式
@app.exception_handler(RequestValidationError)
async def validation_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(status_code=422, content={"errors": exc.errors()})
```

---

## 8. 接数据库(SQLAlchemy 异步)

真实项目不会把数据放字典里。用 SQLAlchemy 2.0 的异步模式 + [第 5 节](#_5-依赖注入-depends)的依赖注入串起来。

```python
# db.py
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

engine = create_async_engine("sqlite+aiosqlite:///./app.db")
SessionLocal = async_sessionmaker(engine, expire_on_commit=False)

async def get_session() -> AsyncSession:
    async with SessionLocal() as session:
        yield session
```

```python
# models.py
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    email: Mapped[str]
```

```python
# main.py 里用
from fastapi import Depends
from sqlalchemy import select
from .db import get_session
from .models import User
from sqlalchemy.ext.asyncio import AsyncSession

@app.get("/users")
async def list_users(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(User))
    return result.scalars().all()
```

注意视图函数要写 `async def`,因为数据库操作是异步的——这点和 [Python 笔记](./python.md) 第 17 节讲的 asyncio 是连着的。

---

## 9. 认证授权(OAuth2 密码流 + JWT)

登录拿 token、之后带 token 访问受限接口,是 Web 后端绕不开的。FastAPI 自带 `fastapi.security` 帮写这套。

```python
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone
import jwt   # pip install pyjwt

SECRET = "换成一个随机长字符串"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_token(user_id: int) -> str:
    payload = {"sub": str(user_id), "exp": datetime.now(timezone.utc) + timedelta(hours=1)}
    return jwt.encode(payload, SECRET, algorithm="HS256")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        data = jwt.decode(token, SECRET, algorithms=["HS256"])
        return int(data["sub"])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="token 无效")

@app.post("/token")
def login(form: OAuth2PasswordRequestForm = Depends()):
    # 简化:真实要查库校验密码
    if form.username != "alice" or form.password != "123":
        raise HTTPException(status_code=400, detail="账号或密码错")
    return {"access_token": create_token(1), "token_type": "bearer"}

@app.get("/me")
def me(user_id: int = Depends(get_current_user)):
    return {"user_id": user_id}
```

密码千万别明文存,要加盐哈希(`passlib` 的 `bcrypt` 或 Python 3.9+ 自带的 `hashlib` / `secrets`)。

---

## 10. 配置管理(pydantic-settings)

别把数据库密码、密钥写死在代码里。用环境变量 + `pydantic-settings` 集中管理。

```python
# pip install pydantic-settings
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
    database_url: str = "sqlite+aiosqlite:///./app.db"
    jwt_secret: str
    debug: bool = False

settings = Settings()   # 自动从 .env 读,读不到用默认值
```

`.env` 文件(别提交到 git):

```
DATABASE_URL=postgresql+asyncpg://user:pass@localhost/db
JWT_SECRET=一个很长的随机串
DEBUG=true
```

---

## 11. 测试(pytest + httpx)

FastAPI 配 `httpx` 的 `AsyncClient` 能直接测接口,不用起服务器。

```python
# pip install pytest httpx
import pytest
from httpx import AsyncClient
from main import app

@pytest.mark.asyncio
async def test_root():
    async with AsyncClient(app=app, base_url="http://test") as client:
        r = await client.get("/")
        assert r.status_code == 200
        assert r.json()["msg"] == "hello world"
```

跑 `pytest`。每个接口都该补测试,尤其是涉及校验和权限的。

---

## 12. 项目结构(可上线的样子)

小例子全塞一个 `main.py` 没问题,项目一大就得分层:

```
myapi/
├── main.py            # 入口:创建 app、挂路由、配中间件
├── core/
│   ├── config.py      # 配置(pydantic-settings)
│   └── security.py    # JWT、密码哈希
├── db.py              # 数据库引擎 + get_session
├── models.py          # SQLAlchemy 表定义
├── schemas.py         # Pydantic 请求/响应模型
├── routers/
│   ├── users.py       # /users 相关路由
│   └── items.py
├── deps.py            # 通用依赖(取当前用户等)
├── tests/
│   └── test_main.py
├── requirements.txt
└── Dockerfile
```

`main.py` 用 `APIRouter` 把各模块路由拼起来:

```python
from fastapi import FastAPI
from .routers import users, items
from .core.config import settings

app = FastAPI(title=settings.debug and "DEV" or "PROD")
app.include_router(users.router)
app.include_router(items.router)
```

---

## 13. 部署

开发用 `uvicorn main:app --reload`,**上线不能这么跑**。两件事:

1. 去掉 `--reload`,加多 worker 利用多核:
   ```bash
   uvicorn main:app --workers 4 --host 0.0.0.0 --port 8000
   ```
   (生产常用 `gunicorn` + `uvicorn.workers.UvicornWorker` 管理多进程)

2. 用 Docker 打包,环境一致、好迁移:

```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```bash
docker build -t myapi .
docker run -p 8000:8000 --env-file .env myapi
```

前面加一层 Nginx 做反向代理和 HTTPS 是常规操作。

---

## 14. 常见坑

1. **忘了 `--reload` 之外的服务器**:`uvicorn main:app` 单进程,上线要加 worker 或用 gunicorn。
2. **在 `async def` 里调同步阻塞代码**(查库、requests):会卡死事件循环,数据库用异步驱动,HTTP 用 `httpx.AsyncClient`。
3. **CORS 没配**:前端调接口报跨域,记得 `CORSMiddleware`。
4. **Pydantic 模型字段顺序**:有默认值的字段必须放必填字段后面,否则报错。
5. **`Field(...)` 的 `...` 不是省略号梗**:它表示必填,别写成 `None` 了。
6. **密钥写进代码并提交**:JWT secret、数据库密码走环境变量。
7. **路径参数和 Pydantic 字段重名**:比如路径有 `{user_id}`、函数又收 `user_id: UserCreate`,会冲突,命名错开。
8. **返回 Pydantic 对象直接 `return` 就行**:FastAPI 自动序列化,别手转 dict。

---

## 15. Django 入门(对照)

如果要做带 Admin 后台的网站,Django 更省力。最小例子:

```bash
pip install django
django-admin startproject mysite
cd mysite
python manage.py runserver
```

建一个接口(在 `views.py`):

```python
from django.http import JsonResponse

def hello(request):
    return JsonResponse({"msg": "hello from django"})
```

`urls.py` 里配路由即可。自带 ORM、Admin(`/admin`)、用户系统,几乎是开箱即用。代价是重、异步支持不如 FastAPI 自然。

---

## 16. Flask 入门(对照)

想最轻量地暴露一个接口:

```bash
pip install flask
```

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/users/<int:user_id>")
def get_user(user_id):
    return jsonify({"user_id": user_id})

if __name__ == "__main__":
    app.run(debug=True)
```

概念少、好懂,适合学习和小工具。缺点是数据库、校验、文档都得自己装插件。

---

## 练一把

1. 把[第 2 节](#_2-第一个应用)的例子跑起来,打开 `/docs` 试调用一个接口。
2. 给 `/users` 加一个 `POST` 创建接口,用 Pydantic 校验 `name` 非空、`age` 在 0~150。
3. 加一个中间件,在响应头里打印处理耗时。
4. 用 pytest 给[第 2 节](#_2-第一个应用)的接口写一个测试。
5.(进阶)按[第 12 节](#_12-项目结构-可上线的样子)结构,把前面的代码拆成 routers / schemas / models 分层。

---

## 学习路线(速记)

环境(venv+uvicorn) → 路由/参数 → Pydantic 校验 → 响应模型 → Depends 依赖 → 中间件/CORS → 数据库(SQLAlchemy 异步) → 认证(JWT) → 配置/测试 → 分层结构 → Docker 部署。

想做 AI 应用接口的,把这份和 [AI 大模型应用](../../ai/llm-app.md) 一起看:FastAPI 负责把模型的 `chat()` 包成 `/chat` 接口,前端通过它调模型。
