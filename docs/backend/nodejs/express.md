# Express 框架（Node 最经典的 Web 框架）

上篇 [Node 原生](./nodejs.md) 里，我们手写 `http` 服务器：路由要自己 `if/else` 判断、读 JSON body 要手动累加 `data` 事件、静态文件要自己读盘返回——啰嗦且容易漏。Express 就是来收拾这些脏活的：它给你一套**中间件流水线**，请求进来像过安检，一层层处理，最后到路由。

打个比方：原生 `http` 是"空厨房自己搭灶台"；Express 是"连锁餐厅的标准后厨 SOP"——洗菜、切菜、炒菜各有工位（中间件），你只管写最终那道菜（路由处理函数）。

---

## 1. 为什么用框架

原生写法每加一个接口都要重复：解析 URL、读 body、设响应头、判断方法。Express 把这些变成一行声明：

```javascript
app.get('/todos', (req, res) => res.json(todos));   // 一个接口一行搞定
```

---

## 2. 快速起步

```bash
mkdir my-api && cd my-api
npm init -y
npm install express
```

`app.js`：

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ msg: 'Hello Express' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`跑在 http://localhost:${port}`));
```

```bash
node app.js     # 或 npm install -D nodemon 后 npx nodemon app.js 热重启
```

浏览器开 `http://localhost:3000` 就能看到 JSON。

---

## 3. 路由（Router）

路由 = **方法 + 路径 → 处理函数**。

```javascript
app.get('/todos', (req, res) => { /* 查列表 */ });
app.post('/todos', (req, res) => { /* 新建 */ });
app.put('/todos/:id', (req, res) => { /* 按 id 改 */ });   // :id 是路径参数
app.delete('/todos/:id', (req, res) => { /* 按 id 删 */ });

// 取参数
app.get('/todos/:id', (req, res) => {
  console.log(req.params.id);    // 路径参数 /todos/123 → "123"
  console.log(req.query.page);   // 查询参数 /todos?page=2 → "2"
});
```

**读请求体**要先挂上 JSON 解析中间件（见下节），之后 `req.body` 才有值：

```javascript
app.use(express.json());   // 必须在路由之前挂

app.post('/todos', (req, res) => {
  console.log(req.body.text);  // 前端 POST 的 JSON 字段
});
```

---

## 4. 中间件机制（重点）

中间件就是一个函数 `(req, res, next) => {}`，它能在请求到达最终路由**前后**做处理。**核心三点**：

1. `req` / `res` 是贯穿整条流水线的同一个对象，前面中间件往上面挂的数据，后面能读到。
2. 调 `next()` 才放行到下一个中间件；**不调就卡住**（请求一直挂着）。
3. **顺序就是注册顺序**，写在前面先执行。

```javascript
// 日志中间件：记录每个请求
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();   // 必须调，否则后续不执行
});

// 又一个：给所有响应加自定义头
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'Express');
  next();
});

app.get('/', (req, res) => res.json({ ok: true }));
```

**内置中间件**：
- `express.json()` —— 解析 JSON 请求体
- `express.urlencoded({ extended: true })` —— 解析表单
- `express.static('public')` —— 把 `public` 目录当静态资源服务（图片、前端打包产物）

---

## 5. 请求与响应对象

```javascript
app.get('/demo', (req, res) => {
  req.method;          // GET
  req.headers;         // 请求头
  req.ip;              // 客户端 IP

  res.status(201);     // 设状态码
  res.setHeader('X-A', '1');
  res.json({ a: 1 });  // 发 JSON 并自动设 Content-Type（结尾用，别调两次）
  // res.send('文本') / res.sendFile('/abs/path') 也可以
});
```

**坑**：`res.json()` / `res.send()` 只能调一次，重复调会报错。

---

## 6. 静态文件

```javascript
app.use(express.static('public'));   // 访问 /style.css 实际读 public/style.css
```

前端构建产物（如 Vite 打包的 `dist`）直接丢 `public` 或单独一个目录服务即可。

---

## 7. 错误处理中间件

普通中间件是 3 个参数，错误中间件是 **4 个参数** `(err, req, res, next)`，**必须**放在所有路由之后：

```javascript
// 异步错误要手动 next(err) 抛给下面
app.get('/boom', (req, res, next) => {
  try {
    throw new Error('出事了');
  } catch (e) {
    next(e);   // 交给错误中间件
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
```

---

## 8. 路由模块化（express.Router）

接口多了，全写在一个文件会爆炸。用 `Router` 按功能拆分：

```javascript
// routes/todos.js
const router = require('express').Router();

router.get('/', (req, res) => res.json([]));
router.post('/', (req, res) => res.status(201).json({ id: 1 }));

module.exports = router;

// app.js
const todos = require('./routes/todos');
app.use('/todos', todos);   // 前缀 /todos 挂上去
```

---

## 9. 连接数据库（以 MySQL 为例）

用连接池，别每次请求都新建连接：

```javascript
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10,
});

app.get('/users', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    next(err);   // 抛给错误中间件
  }
});
```

---

## 10. 项目结构建议

```
my-api/
├── app.js              # 入口：创建 app、挂中间件、监听
├── routes/             # 按资源拆路由（todos.js / users.js）
├── controllers/        # 路由里调用的业务逻辑（可选拆分）
├── services/           # 数据访问 / 复杂逻辑
├── middleware/         # 自定义中间件（鉴权、日志）
├── config/             # 数据库、环境变量
└── package.json
```

小项目 `routes + 直接在回调里写逻辑` 就够了；大了就把逻辑挪到 `controllers/services`。

---

## 11. RESTful API 设计速记

- 用**名词**表示资源：`/users`、`/users/123`，别用动词 `/getUserInfo`
- 用 **HTTP 方法** 表示动作：`GET` 查、`POST` 建、`PUT/PATCH` 改、`DELETE` 删
- 状态码：`200` 成功、`201` 创建、`400` 参数错、`401` 未登录、`403` 没权限、`404` 不存在、`500` 服务器错
- 统一返回结构，例如 `{ code: 0, data: ..., msg: '' }` 或干脆 REST 风格纯资源

---

## 12. 实战：一个待办事项 CRUD API

```javascript
// app.js
const express = require('express');
const app = express();

app.use(express.json());

let todos = [];
let seq = 1;

// 增
app.post('/todos', (req, res) => {
  const item = { id: seq++, text: req.body.text, done: false };
  todos.push(item);
  res.status(201).json(item);
});

// 查列表
app.get('/todos', (req, res) => res.json(todos));

// 改
app.put('/todos/:id', (req, res) => {
  const t = todos.find(x => x.id === +req.params.id);
  if (!t) return res.status(404).json({ error: 'not found' });
  t.text = req.body.text ?? t.text;
  t.done = req.body.done ?? t.done;
  res.json(t);
});

// 删
app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(x => x.id !== +req.params.id);
  res.status(204).end();
});

// 错误处理放最后
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'server error' });
});

app.listen(3000, () => console.log('http://localhost:3000'));
```

用 curl / Postman / 前端 fetch 就能对着 `/todos` 增删改查了。

---

## 13. 常见坑

1. **中间件顺序错**：`express.json()` 没写在路由前面，`req.body` 永远是 `undefined`。
2. **忘记 `next()`**：自定义中间件不调 `next()`，请求永远挂起（前端一直转圈）。
3. **错误中间件不是 4 个参数**：写成 3 个参数就不会被当错误处理，捕获不到。
4. **异步错误没 `next(err)`**：`async` 处理函数里抛错不会自动进错误中间件，必须 `try/catch` + `next(err)`。
5. **`res` 多次发送**：既 `res.json()` 又 `res.end()` 会抛 "headers already sent"。
6. **路由前缀重复**：`app.use('/todos', router)` 后，router 里写 `/todos/1` 会变成 `/todos/todos/1`。

---

## 14. 练习

1. 把第 12 节的待办 API 加上"按 `done` 状态筛选"的查询参数 `?done=true`。
2. 写一个鉴权中间件：请求头没有 `Authorization` 就返回 `401`。
3. 用 `express.Router` 把待办路由拆到独立文件，再挂回 `app`。
4. 加一个 `express.static('public')`，在 `public/index.html` 写个简单页面 fetch 这个 API。

---

## 速查

- 入口：`const app = express()`；启动：`app.listen(port)`
- 解析 body：`app.use(express.json())`（必须写在路由前）
- 中间件：`(req, res, next) => {}`，记得 `next()`，顺序即注册顺序
- 路由：`app.get/post/put/delete(path, handler)`，`req.params` / `req.query` / `req.body`
- 错误中间件：4 参数 `(err, req, res, next)`，放最后
- 拆分：`express.Router()` + `app.use('/prefix', router)`

**下一步**：Express 太自由，大项目容易结构乱、依赖到处 `new`。[NestJS](./nestjs.md) 用"约定 + 依赖注入"把这一切规范起来，适合团队和企业级项目。
