# Node.js 原生（不靠框架，先把地基打牢）

很多人一上来就学 Express / NestJS，结果遇到 `require` 和 `import` 分不清、回调里拿不到值、事件循环顺序搞反——根子都在"Node 本身"。这篇先把 Node 这辆车怎么发动、怎么跑讲透，后面用任何框架都是在这之上套壳。

打个比方：**浏览器里的 JS 是"坐在客厅看电视"**（有 DOM、有窗口），而 Node 是"把 V8 引擎拆出来装到厨房"，给你水龙头（文件）、灶台（网络）、计时器（定时器），让你用 JS 写服务端程序。它还是那个 JS，只是舞台换了。

---

## 1. Node 到底是个啥

- **Node 不是一门语言，也不是框架**，它是一个"JavaScript 运行时"——负责把 JS 代码跑起来。它底层是 Google 的 **V8 引擎**（和 Chrome 用的是同一个），再包了一层 C++ 写的系统能力（文件、网络等）。
- **事件驱动 + 非阻塞 I/O**：这是 Node 的招牌。传统服务器（比如 Java 一个请求开一个线程）像"每来一桌客人就雇一个服务员"；Node 像"一个服务员同时盯很多桌，谁菜好了就先上谁的"——不空等。
- **单线程**：负责"调度"的主线程只有一个。但它把耗时的 I/O（读文件、查数据库、发网络请求）丢给底层线程池去干，自己继续接下一个请求。

**适合做什么**：API 服务、实时聊天、爬虫、CLI 工具、BFF（前后端之间的中间层）。
**不适合做什么**：超大量 CPU 计算（比如视频转码、复杂加密）——会卡住那唯一的事件循环。这种活儿该丢给别的语言或用 Worker 线程。

---

## 2. 装环境 & 跑起来

去 nodejs.org 下 **LTS（长期支持版）**。多版本切换推荐用 **nvm**（mac/Linux）或 **nvm-windows**：

```bash
nvm install 20        # 装 Node 20
nvm use 20            # 切到 20
node -v               # 看版本，确认装好
```

跑代码两种方式：

```bash
node app.js           # 直接跑一个 .js 文件
node                  # 进 REPL（交互式），一行行敲着玩，Ctrl+D 退出
```

写第一个程序 `app.js`：

```javascript
// app.js
console.log('你好，Node');
const name = '小明';
console.log(`今天是 ${name} 在学 Node`);
```

```bash
node app.js           # 输出两行文字
```

---

## 3. 模块系统：Node 怎么组织代码

一个项目不可能全写在一个文件里。Node 用"模块"把代码拆开，再拼回来。这里有**两套机制**，别混：

### 3.1 CommonJS（老派，Node 自带，默认）

```javascript
// math.js —— 用 module.exports 把东西暴露出去
function add(a, b) { return a + b; }
module.exports = { add };

// 或者更常见的写法：
exports.add = (a, b) => a + b;

// app.js —— 用 require 引入
const { add } = require('./math');   // 注意 ./ 不能省
console.log(add(1, 2));              // 3
```

### 3.2 ES Modules（新派，和前端一致）

在 `package.json` 里加 `"type": "module"`，就能用浏览器同款语法：

```javascript
// math.mjs 或 package.json 设了 type:module
export function add(a, b) { return a + b; }

// app.js
import { add } from './math.js';     // ESM 里扩展名 .js 一般要写全
console.log(add(1, 2));
```

### 3.3 怎么选

- **新项目直接上 ESM**（`import/export`），和前端、TypeScript 统一，少绕弯。
- 老教程、很多 npm 包还是 CommonJS，用 `import` 引它们大多也能跑（Node 会兼容），但写自己代码时二选一、别在一个文件里混用两套（会报 `Cannot use import statement outside a module` 这类错）。

---

## 4. 包管理：npm 与 pnpm

Node 的"应用商店"是 npm。每个项目有个 `package.json` 记录依赖和脚本：

```bash
npm init -y           # 生成 package.json
npm install express   # 装 express，写进 dependencies
npm install -D typescript   # 装开发依赖（devDependencies）
npm run dev           # 跑 package.json 里 scripts.dev 定义的命令
npx ts-node app.ts    # npx 临时下载并运行某个包，不污染全局
```

`node_modules/` 是装下来的依赖文件夹，**别手改，也别提交到 git**（写进 `.gitignore`）。pnpm 是更快、更省磁盘的替代品，命令基本一样（`pnpm add express`）。

---

## 5. 异步：Node 的灵魂

Node 几乎所有 I/O 都是异步的——你"发起"一个读文件，不会干等，而是继续往下走，等读完了用"回调 / Promise"通知你。

### 5.1 三个阶段

```javascript
// 1) 回调（老写法，容易嵌套成"回调地狱"）
const fs = require('fs');
fs.readFile('a.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// 2) Promise（链式，清爽些）
const fs = require('fs').promises;
fs.readFile('a.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));

// 3) async/await（最推荐，读起来像同步代码）
async function main() {
  try {
    const data = await fs.readFile('a.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('读取出错', err);
  }
}
main();
```

**坑**：`await` 必须包在 `async` 函数里；漏了 `try/catch` 异步报错会直接崩进程。

---

## 6. 核心内置模块（挑最常用的）

不用 `npm install` 就能用的模块，叫"内置模块"。

### 6.1 fs —— 读写文件

```javascript
const fs = require('fs').promises;
await fs.writeFile('log.txt', 'hello');        // 写
const txt = await fs.readFile('log.txt', 'utf8'); // 读（指定编码才拿到字符串）
```

### 6.2 path —— 拼路径（跨平台）

```javascript
const path = require('path');
const full = path.join(__dirname, 'data', 'a.json'); // Windows 用 \，Mac/Linux 用 /，path 帮你对齐
```

**别手写 `'data/a.json'` 拼字符串**——换系统就崩。`__dirname` 是当前文件所在目录。

### 6.3 http —— 原生起服务器（重点）

不装任何框架也能当 Web 服务器：

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ msg: 'hello from native node' }));
});

server.listen(3000, () => console.log('跑在 http://localhost:3000'));
```

### 6.4 events —— 发布/订阅

```javascript
const EventEmitter = require('events');
const bus = new EventEmitter();
bus.on('下单', (order) => console.log('收到订单', order));
bus.emit('下单', { id: 1 });   // 触发事件
```

### 6.5 process —— 环境变量与退出

```javascript
const port = process.env.PORT || 3000;  // 从环境读配置，没设就用 3000
process.on('uncaughtException', err => { // 兜底未捕获异常，避免直接退出
  console.error('崩了但先记录', err);
});
```

### 6.6 Buffer 与流（stream）

文件/网络数据本质是一串字节（Buffer）。大文件别一次性 `readFile` 读进内存，用 **流** 边读边处理：

```javascript
const fs = require('fs');
fs.createReadStream('big.zip').pipe(fs.createWriteStream('copy.zip')); // 边读边写，内存友好
```

---

## 7. 事件循环：理解它，少踩 90% 的坑

"单线程怎么还能并发？"靠的就是**事件循环**：主线程不停转圈，每圈检查"有没有已完成的 I/O / 定时器"可以执行。

关键认知：**任务分两类**
- **微任务（microtask）**：`Promise.then`、`async/await` 后面的代码、 `queueMicrotask`。
- **宏任务（macrotask）**：`setTimeout`、I/O 回调、`setInterval`。

每一轮循环：**先清空所有微任务，再取一个宏任务**。所以 Promise 永远比 setTimeout 先跑：

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// 输出顺序：1 4 3 2
// 解释：1、4 是同步直接跑；之后微任务 3 先清空；最后才轮到宏任务 2
```

**别阻塞事件循环**：在主线跑 `for (let i=0;i<1e10;i++)` 这种重计算，整个服务器会卡死，所有请求都等着。CPU 重活丢 Worker 线程或别的进程。

---

## 8. 实战：用原生 http 搭一个迷你 API 服务

一个能处理路由、能读 JSON body 的小服务，不依赖任何框架：

```javascript
// server.js
const http = require('http');
const { URL } = require('url');

let todos = [{ id: 1, text: '学 Node 原生' }];

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  // 读请求体（POST 才有）
  let body = '';
  if (req.method === 'POST' || req.method === 'PUT') {
    for await (const chunk of req); // 简化：实际要累加 chunk
  }

  // 路由
  if (req.method === 'GET' && url.pathname === '/todos') {
    res.end(JSON.stringify(todos));
  } else if (req.method === 'POST' && url.pathname === '/todos') {
    const data = JSON.parse(body || '{}');
    const item = { id: Date.now(), text: data.text };
    todos.push(item);
    res.statusCode = 201;
    res.end(JSON.stringify(item));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'not found' }));
  }
});

server.listen(3000, () => console.log('http://localhost:3000'));
```

> 上面读 body 是简化写法。真实代码要 `req.on('data', c => body += c)` 累加再 `req.on('end', ...)`。想省心就用 Express（下一篇）。

跑起来：`node server.js`，浏览器开 `http://localhost:3000/todos` 就能看到返回的 JSON。

---

## 9. 新手最常踩的坑

1. **`require('./math')` 忘了写 `./`**：写成 `require('math')` 会被当成 npm 包去找，找不到就报错。
2. **CommonJS / ESM 混用**：一个文件里又 `require` 又 `import`，直接语法报错。先定好用哪套。
3. **阻塞事件循环**：主线程跑重计算，全站卡死。CPU 活儿用 Worker。
4. **路径手写字符串拼接**：`'data/a.json'` 在 Windows 崩。用 `path.join(__dirname, ...)`。
5. **`require` 有缓存**：同一模块第一次加载后会被缓存，改了文件不重启不会重新执行（开发用 `--watch` 或 `nodemon`）。
6. **异步忘了处理错误**：`await` 不包 `try/catch`，一报错进程崩。
7. **`res.end` 调两次**：HTTP 响应只能结束一次，重复调会抛错。

---

## 10. 练习

1. 用 `fs` 写一个脚本，读取一个 `.txt` 文件并打印行数。
2. 用原生 `http` 写一个接口：`GET /time` 返回当前服务器时间（JSON）。
3. 把第 2 题改成：支持 `POST /echo`，把请求体原样返回。
4. 用 `EventEmitter` 模拟"用户注册"事件：注册成功后触发"发欢迎邮件"和"送优惠券"两个监听。
5. 故意在代码里放一个 `setTimeout(...,0)` 和一个 `Promise.then`，验证输出顺序是否和本文第 7 节一致。

---

## 速查

- 跑文件：`node app.js`；交互：`node`；热重启：`node --watch app.js`
- 模块：CommonJS 用 `require/module.exports`；ESM 用 `import/export` + `package.json` 的 `"type":"module"`
- 异步优先级：同步 → 微任务(Promise) → 宏任务(setTimeout/I/O)
- 内置模块：`fs`（文件）、`path`（路径）、`http`（服务器）、`events`（事件）、`process`（环境）、`stream`（流）
- 路径拼接永远用 `path.join(__dirname, ...)`，别手写字符串

**下一步**：学会了原生，你就会发现手写路由/body 解析很啰嗦——这正是 [Express](./express.md) 要解决的。想做企业级、结构严谨的项目，再看 [NestJS](./nestjs.md)。
