# Python 学习笔记（完整版）

这份笔记写给第一次认真学 Python 的人。不止讲语法，把语言本身、标准库、常用生态、工程化都铺开，争取看完能独立写脚本、读懂大部分开源项目、顺畅接上后面的 Web / 数据 / AI 学习。

最有效的用法：每节代码都复制到本地敲一遍，别光看。

---

## 0. Python 是什么，为什么学它

Python 是一门**解释型、动态类型、强类型**的高级语言。"动态类型"是说变量不用先声明类型；"强类型"是说 `1 + "a"` 这种乱来会直接报错，不会偷偷帮你转。

它的优点是语法接近自然语言、库多到离谱（几乎任何领域都有现成轮子）、社区活跃。缺点是运行速度比 C/Go 慢，但绝大多数业务场景瓶颈在 IO 不在 CPU，慢这一点基本无所谓。

版本只管 3.x（Python 2 早死了）。本站后面 FastAPI、AI 全部基于 3.10+。

### 装环境与跑起来

```bash
# 确认版本（需要 3.10+）
python3 --version

# 写个文件 hello.py
# print("hello")

# 运行
python3 hello.py
```

交互式 `python3` 进 REPL 可以一行行试；正经项目用虚拟环境（见[第 17 节](#_17-并发-线程、进程、异步)）。

练习：装好 Python，跑通 `print("hello")`，再在 REPL 里算 `2 ** 10`（幂运算）。

---

## 1. 基础语法

Python 用**缩进**表示代码块（一般 4 个空格），不用大括号。这是它最反直觉也最舒服的一点——逼你写出整齐的代码。

```python
name = "小明"          # 变量直接赋值，不用声明类型
age = 18
price = 3.5
is_student = True

# 注释用 # ；多行字符串用三引号可当注释块
"""
这是一段说明
不会被执行
"""

print(name, age)       # 打印多个值，逗号自动加空格
print(f"{name} 今年 {age} 岁")   # f-string：最推荐的格式化方式
```

动态类型意味着同一个变量能换类型：`x = 1; x = "hi"` 合法，但别这么干，容易把自己绕晕。

---

## 2. 数据类型与运算符

### 2.1 数字、布尔、None

```python
a = 10          # int，整数，任意精度（不会溢出）
b = 3.14        # float
c = 2 + 3j      # complex，复数（一般碰不到）
flag = False    # bool：True / False（首字母大写）
nothing = None  # 表示"空/没有值"，类似其他语言的 null
```

常用数字操作：`//` 整除、`%` 取余、`**` 幂、`abs()`、`round()`、`divmod(a,b)`。

### 2.2 运算符一览

| 类别 | 符号 | 说明 |
|---|---|---|
| 算术 | `+ - * / // % **` | `/` 永远返回 float（`3/2=1.5`） |
| 比较 | `== != > < >= <=` | 返回 bool |
| 逻辑 | `and or not` | 短路求值 |
| 赋值 | `= += -= *= :=` | `:=` 海象运算符（3.8+） |
| 成员 | `in / not in` | 判断在不在容器里 |
| 身份 | `is / is not` | 判断是不是同一个对象（不是值相等！） |
| 位运算 | `& \| ^ ~ << >>` | 一般底层才用 |

`==` 比的是"值"，`is` 比的是"是不是同一个对象"。新手最容易栽：`a = [1,2]; b = [1,2]`，`a == b` 是 True，但 `a is b` 是 False。小整数（-5~256）有缓存，`1 is 1` 反而是 True——所以判断相等永远用 `==`，别用 `is`。

### 2.3 类型判断与转换

```python
type(10)              # <class 'int'>
isinstance(10, int)   # True，推荐用这个
int("123")            # 字符串转整数 → 123
float("3.14")         # → 3.14
str(10)               # → "10"
bool(0)               # → False；bool("")、bool([])、bool(None) 都是 False
```

---

## 3. 字符串

字符串是不可变的（改了会生成新串，原串不变）。这是高频考点。

```python
s = "hello"
s[0]                 # 'h'，下标从 0 开始
s[-1]                # 'o'，负下标从末尾数
s[1:4]               # 'ell'，切片 [起:止) 不含结尾
s[::-1]              # 'olleh'，反转字符串的惯用法

s.upper()            # 'HELLO'，原串不变
s.capitalize()       # 'Hello'
"  hi  ".strip()     # 'hi'，去掉两端空白
"a-b-c".split("-")   # ['a','b','c']
"-".join(["a","b"])  # 'a-b'
"abac".replace("a","x")  # 'xbxc'
"hello".find("ll")   # 2，找不到返回 -1
"{}岁".format(18)    # '18岁'

# 原始字符串：反斜杠不当转义，写正则/路径常用
path = r"C:\Users\name"
```

f-string 还能做表达式和格式化：`f"{x:.2f}"` 保留两位小数，`f"{x:>5}"` 右对齐补空格。

---

## 4. 列表 list

最常用容器，有序、可改、元素类型可混。

```python
lst = [1, 2, 3]
lst.append(4)        # [1,2,3,4]
lst.insert(0, 0)     # [0,1,2,3,4]
lst.extend([5,6])    # 拼多个
lst[0] = 99          # 改
lst.pop()            # 删末尾并返回
lst.remove(2)        # 删第一个值为 2 的
3 in lst             # True
len(lst)             # 长度
sorted(lst)          # 返回新排好序的列表，不改原串
lst.sort()           # 原地排序
lst.reverse()        # 原地反转
```

切片复制要小心：`b = a` 是同一个对象，`b = a[:]` 或 `b = a.copy()` 才是真复制。嵌套列表用 `copy.deepcopy`。

---

## 5. 元组 tuple

用小括号，不可变。常用于"一组不该被改的值"，以及函数返回多个值。

```python
t = (1, 2, 3)
t[0]                 # 1
# t[0] = 9           # 报错，不能改

# 解包，非常常用
x, y = (10, 20)
a, *rest = [1, 2, 3, 4]   # a=1, rest=[2,3,4]

# 函数返回多值其实是返回元组
def minmax(nums):
    return min(nums), max(nums)
lo, hi = minmax([3, 1, 4])   # lo=1, hi=4
```

---

## 6. 字典 dict

键值对，查找 O(1)。Python 3.7+ 保证插入顺序。

```python
d = {"name": "小明", "age": 18}
d["age"] = 19        # 改
d["city"] = "北京"   # 增
d.get("phone")       # None，比 d["phone"] 安全（后者不存在会抛 KeyError）
d.get("phone", "无") # 给默认值
"name" in d          # True
d.keys()             # 视图对象
d.values()
d.items()            # (键, 值) 元组，遍历常用

for k, v in d.items():
    print(k, v)

# 不存在就自动建：collections.defaultdict
from collections import defaultdict
dd = defaultdict(int)   # 访问不存在的键返回 0
dd["x"] += 1
```

---

## 7. 集合 set

无序、不重复，用于去重和集合运算。

```python
s = {1, 2, 3}
s.add(4)
s.discard(2)        # 删，不存在也不报错
2 in s

a = {1, 2, 3}
b = {3, 4, 5}
a | b              # 并集 {1,2,3,4,5}
a & b              # 交集 {3}
a - b              # 差集 {1,2}
a ^ b              # 对称差 {1,2,4,5}

list(set([1,1,2,3,3]))   # 去重经典写法 → [1,2,3]
```

---

## 8. 推导式

一行生成容器，比手写的 for 循环又快又清楚。

```python
# 列表推导式
squares = [x*x for x in range(10)]            # 0..81
evens = [x for x in range(10) if x % 2 == 0]  # 加条件

# 字典推导式
d = {x: x*x for x in range(5)}

# 集合推导式
s = {len(w) for w in ["a","bb","ccc"]}        # {1,2,3}

# 生成器表达式：用小括号，惰性计算，省内存
gen = (x*x for x in range(1000000))           # 不立刻算，用的时候才出
```

---

## 9. 流程控制

```python
# if
if age < 18:
    print("未成年")
elif age < 60:
    print("成年")
else:
    print("退休")

# for：遍历任何可迭代对象
for i in range(5):          # 0,1,2,3,4
    print(i)
for i, v in enumerate(lst): # 同时拿下标和值
    print(i, v)
for a, b in zip([1,2], [3,4]):  # 打包遍历
    print(a, b)

# while
n = 0
while n < 3:
    n += 1

# break / continue / else：循环正常结束（没被 break）才走 else
for x in lst:
    if x == 99:
        break
else:
    print("没找到 99")

# match-case（3.10+，类似其他语言的 switch）
def http_label(code):
    match code:
        case 200:
            return "OK"
        case 404:
            return "Not Found"
        case _:
            return "Unknown"
```

---

## 10. 函数

```python
def greet(name, age=18, *args, **kwargs):
    # age 是默认参数；*args 收多余位置参数成元组；**kwargs 收多余关键字成字典
    print(name, age, args, kwargs)

greet("小明")                       # 位置参数
greet(name="小红", city="北京")      # 关键字参数
greet("a", 1, 2, 3, x=9)            # args=(2,3), kwargs={'x':9}

#  lambda：匿名小函数
add = lambda x, y: x + y
sorted([(1,2),(3,1)], key=lambda t: t[1])   # 按第二个元素排序

# 作用域 LEGB：Local -> Enclosing -> Global -> Builtin
x = "global"
def outer():
    x = "enclosing"
    def inner():
        print(x)        # 取到 enclosing
    inner()
```

**闭包**：内层函数记住外层变量；**装饰器**是闭包的典型应用，用来在不改原函数的情况下加功能：

```python
import time
def timer(func):
    def wrapper(*args, **kwargs):
        t = time.time()
        res = func(*args, **kwargs)
        print(f"{func.__name__} 耗时 {time.time()-t:.3f}s")
        return res
    return wrapper

@timer
def slow():
    time.sleep(0.5)

slow()     # 自动打印耗时
```

递归、类型注解也常用：`def add(a: int, b: int) -> int:`，注解不影响运行，只给人和 IDE 看（想强制检查要装 mypy）。

练习：写一个装饰器，统计函数被调用了几次。

---

## 11. 面向对象

```python
class Person:
    species = "人类"          # 类属性，所有实例共享

    def __init__(self, name, age):   # 构造方法，self 是实例自身
        self.name = name
        self.age = age

    def greet(self):
        return f"我是 {self.name}"

    def __str__(self):         # print 时调用
        return f"Person({self.name}, {self.age})"

p = Person("小明", 18)
print(p.greet())
```

继承与多态：

```python
class Student(Person):
    def __init__(self, name, age, school):
        super().__init__(name, age)   # 调父类构造
        self.school = school

    def greet(self):                  # 方法重写
        return f"我是学生 {self.name}"

people = [Person("a", 20), Student("b", 19, "清华")]
for p in people:
    print(p.greet())        # 同一个调用，不同表现 = 多态
```

其他常用点：

- **`@property`**：把方法当属性用，可做校验
- **私有**：约定上单下划线 `_x` 表示"别动我"，双下划线 `__x` 会改名（name mangling），不是真私有
- **`dataclass`**（3.7+）：自动生成 `__init__`/`__repr__` 等，写数据类超省事
- **`Enum`**：枚举，替代满地乱飞的魔法字符串/数字

```python
from dataclasses import dataclass
from enum import Enum

class Color(Enum):
    RED = 1
    GREEN = 2

@dataclass
class Point:
    x: int
    y: int

p = Point(1, 2)
print(p)            # Point(x=1, y=2)
```

特殊方法（`__len__`、`__getitem__`、`__eq__` 等，俗称 dunder）让自定义类支持 `len()`、`[]`、`==` 等内置操作，想写出"像内置类型一样好用"的类就靠它们。

---

## 12. 异常处理与上下文管理器

```python
try:
    n = int("abc")         # 会抛 ValueError
except ValueError as e:
    print("转换失败:", e)
except (TypeError, KeyError):
    pass
else:
    print("没出错才走这里")
finally:
    print("无论怎样都走")   # 常用于释放资源

# 主动抛
if x < 0:
    raise ValueError("x 不能为负")

# 自定义异常
class MyError(Exception):
    pass
```

`with` 是上下文管理器，进出自带清理（文件、锁、连接都靠它），不用手动 close：

```python
with open("a.txt", "r", encoding="utf-8") as f:
    data = f.read()        # 退出时自动关文件
```

自己写 `with` 支持的类，实现 `__enter__` / `__exit__` 即可（或用 `contextlib.contextmanager` 装饰器更简洁）。

---

## 13. 迭代器与生成器

迭代器是"一次给一个"的对象（for 循环底层就是它）。生成器用 `yield` 写出来，最省内存：

```python
def count_up(n):
    i = 0
    while i < n:
        yield i        # 每次到这里暂停返回，下次从这继续
        i += 1

for x in count_up(3):
    print(x)           # 0 1 2

# 斐波那契用生成器写，内存恒定
def fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

g = fib()
print([next(g) for _ in range(10)])   # 前 10 项
```

生成器表达式（[第 8 节](#_8-推导式)）和 `yield` 是处理大文件、大数据流的关键——不用一次性全load进内存。

---

## 14. 模块、包与标准库

`import` 的几种写法：

```python
import math
from math import sqrt
from os import path as ospath     # 起别名
from collections import Counter
import sys, os                     # 不推荐一行 import 多个，这里只为演示
```

`if __name__ == "__main__":` 是套路：当文件被直接运行时代码才执行，被 import 时不执行——写可复用模块必备。

标准库里这些几乎天天用，建议都过一遍：

| 模块 | 干嘛 |
|---|---|
| `os` / `pathlib` | 文件和路径操作（pathlib 更现代，推荐） |
| `sys` | 命令行参数、解释器信息 |
| `json` | JSON 读写 |
| `csv` | CSV 读写 |
| `datetime` | 日期时间 |
| `re` | 正则 |
| `collections` | Counter / defaultdict / deque 等好用到爆的容器 |
| `itertools` | 排列组合、无限迭代等 |
| `functools` | partial、lru_cache 等 |
| `random` | 随机 |
| `argparse` | 命令行参数解析 |

```python
from pathlib import Path
p = Path("data") / "a.txt"     # 路径拼接，跨平台
p.read_text(encoding="utf-8")  # 一行读
p.write_text("hi", encoding="utf-8")

from collections import Counter
Counter("abracadabra")         # 计数，最常出现的字母一眼看出
```

---

## 15. 文件与 IO

```python
# 文本
with open("a.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()

# 二进制（图片等）
with open("pic.png", "rb") as f:
    data = f.read()

# JSON
import json
with open("c.json", "r", encoding="utf-8") as f:
    obj = json.load(f)         # 文件对象
obj = json.loads('{"a":1}')    # 字符串
json.dumps(obj, ensure_ascii=False, indent=2)

# CSV
import csv
with open("t.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        print(row)
```

`encoding="utf-8"` 一定写上，否则 Windows 上读中文容易乱码。爬虫、配置、接口数据基本都走 JSON。

---

## 16. 函数式编程工具

```python
nums = [1, 2, 3, 4]
list(map(lambda x: x*x, nums))        # [1,4,9,16]
list(filter(lambda x: x % 2 == 0, nums))  # [2,4]

from functools import reduce, lru_cache, partial
reduce(lambda a, b: a + b, nums)      # 10，累积

@lru_cache(maxsize=None)              # 记忆化，斐波那契神器
def fib(n):
    return n if n < 2 else fib(n-1) + fib(n-2)

double = partial(map, lambda x: x*2)  # 固定部分参数
```

`map/filter` 现在很多场景被列表推导式替代，更直观；但配合 `itertools`、`functools` 做数据流还是很顺。

---

## 17. 并发：线程、进程、异步

先说 **GIL（全局解释器锁）**：同一时刻只有一个线程在跑 Python 字节码。所以多线程适合 IO 密集型（等网络/磁盘时让出），不适合 CPU 密集型（真并行要靠多进程）。

```python
# 多线程：适合爬虫、请求等 IO 密集
import threading
def task(n):
    print(n)
ts = [threading.Thread(target=task, args=(i,)) for i in range(3)]
[t.start() for t in ts]
[t.join() for t in ts]

# 多进程：适合计算密集，绕开 GIL
import multiprocessing
with multiprocessing.Pool(4) as pool:
    print(pool.map(lambda x: x*x, range(10)))
```

**asyncio（异步）** 是单线程内的"协作式并发"，靠 `async/await`：遇到 `await` 就挂起去干别的，特别适合高并发网络服务——FastAPI 底层就是它。

```python
import asyncio

async def fetch(n):
    await asyncio.sleep(1)        # 模拟 IO 等待，期间让出控制权
    return n * n

async def main():
    results = await asyncio.gather(fetch(1), fetch(2), fetch(3))
    print(results)                # 三个"睡眠"几乎同时结束，总耗时约 1 秒

asyncio.run(main())
```

记住：`async def` 里才能用 `await`；普通函数里调协程得用 `asyncio.run` 或 `await`。这块是后面学 FastAPI、写高并发服务的基础。

---

## 18. 虚拟环境与工程化

不同项目依赖不同版本，必须隔离。

```bash
# 标准库自带 venv
python3 -m venv .venv
source .venv/bin/activate        # Windows 是 .venv\Scripts\activate

pip install requests
pip freeze > requirements.txt    # 导出依赖
pip install -r requirements.txt  # 别人按这个装
```

现代项目推荐 `pyproject.toml` 管理（取代 setup.py / requirements.txt 混战），工具用 **Poetry** 或 **uv**（uv 极快，现在很火）。不用深究，知道有这回事、会 `pip install -r requirements.txt` 就能起步。

---

## 19. Web 框架：FastAPI

FastAPI 是现代 Python Web 框架，特点是快（基于 Starlette + asyncio）、自带类型校验（Pydantic）、自动生成交互式 API 文档。本站侧栏把它归在 Python 生态里单独讲，这里给完整示例。

```python
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    description: Optional[str] = None

items_db = {}

@app.post("/items/{item_id}")
async def create_item(item_id: int, item: Item):
    """路径参数 item_id + 请求体 Item（自动按 Pydantic 校验）"""
    if item_id in items_db:
        raise HTTPException(status_code=400, detail="Item already exists")
    items_db[item_id] = item
    return {"item_id": item_id, **item.model_dump()}

@app.get("/items/{item_id}")
async def get_item(item_id: int):
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"item_id": item_id, **items_db[item_id].model_dump()}

# 依赖注入：把"取当前用户"这类通用逻辑抽出来复用
def get_token(x_token: str = Depends(lambda: "fake-token")):
    return x_token
```

要点：

- **路径参数** `/items/{item_id}` 自动按类型转换；**查询参数** 写在函数签名里（`?page=1`）
- **Pydantic 模型** 负责请求体校验和文档生成，`model_dump()` 转字典
- **Depends** 做依赖注入，登录校验、DB 连接等通用逻辑都靠它
- **`async def`** 声明异步视图，配合[第 17 节](#_17-并发-线程、进程、异步)的 asyncio 实现高并发
- 跑起来：`uvicorn main:app --reload`，访问 `/docs` 看自动生成的 Swagger 文档

同类还有 Flask（轻量经典）、Django（全家桶）。初学 API 直接 FastAPI 最省心。想系统学 Python Web（路由/校验/依赖注入/数据库/认证/部署全链路），见单独的 [Python Web 笔记](./python-web.md)。

---

## 20. 第三方生态速览

| 领域 | 代表库 | 用途 |
|---|---|---|
| Web | FastAPI / Flask / Django | 后端接口、网站 |
| 数据 | NumPy / Pandas / Matplotlib | 数值计算、表格处理、画图 |
| 机器学习 | scikit-learn / PyTorch / TensorFlow | 模型训练（见 AI 分类） |
| 爬虫 | requests / BeautifulSoup / Scrapy | 抓数据 |
| 自动化 | openpyxl / selenium / playwright | 办公、浏览器自动化 |
| 测试 | pytest | 单元测试 |

装库统一 `pip install 库名`。数据/AI 两块本站另有专门分类展开。

---

## 21. 编码规范 PEP 8（挑重点）

- 缩进 4 空格；一行不超 79 字符
- 变量/函数用小蛇形 `my_var`；类用大驼峰 `MyClass`；常量全大写 `MAX_SIZE`
- 操作符两边加空格；逗号后加空格
- 用有意义的名字，少写注释、多写清楚的代码；注释解释"为什么"而不是"是什么"

`import this` 能看到《Python 之禅》，一句话总结就是"优雅、明确、简单"。

---

## 22. 新手最常踩的坑

1. **可变默认参数**：`def f(x=[])` 的 `[]` 在函数定义时只建一次，多次调用会共享——改用 `x=None` 内部判断。
2. **`==` 和 `is` 混用**：判断值相等永远用 `==`。
3. **改列表时遍历它**：`for x in lst: lst.remove(x)` 会跳过元素，改成遍历副本或列表推导式。
4. **浅拷贝陷阱**：`b = a[:]` 只拷一层，嵌套结构要用 `copy.deepcopy`。
5. **忘了 `encoding="utf-8"`**：中文读写乱码。
6. **在 `async def` 里调同步阻塞函数**：会卡住整个事件循环，重 IO 要用异步库。
7. **全局变量随便改**：函数内改全局要先 `global x`，否则建了个同名局部变量。
8. **缩进不一致**：混用空格和 Tab 直接报错。

---

## 23. 常见问题

**Q1：Python 慢，要不要用别的？**
业务/脚本/AI 场景基本不用纠结。真要极致性能，把热点用 C 扩展或换语言，别因噎废食。

**Q2：先学 Python 2 还是 3？**
只学 3。

**Q3：PyCharm 还是 VS Code？**
新手 VS Code + Python 插件足够，轻量；要全套智能提示 PyCharm 更强。

**Q4：学完这份能干什么？**
写自动化脚本、爬数据、做后端接口（FastAPI）、入门 AI——后面几个分类都是它的延伸。

---

## 学习路线与速查

```
语法基础 → 容器(列表/字典/集合) → 函数/装饰器 → 面向对象 → 文件/标准库
                                                              ↓
                              并发(线程/进程/asyncio) → 虚拟环境/工程化 → Web(FastAPI)/数据/AI
```

**速查口诀**：
- 不可变三件套：字符串、元组、数字；可变：列表、字典、集合
- 遍历字典用 `items()`，去重用 `set()`，计数用 `Counter`
- 内存敏感用生成器 `yield`，批量转换用推导式
- 读文件必写 `encoding="utf-8"`，用完资源用 `with`
- 判断相等用 `==`，别用 `is`；默认参数别用可变对象
