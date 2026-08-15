# JavaScript 笔记

JavaScript 是现在做网页、做前端绕不开的一门语言。它本来只是浏览器里让页面"动起来"的小脚本，现在不仅能写网页（浏览器跑），还能写服务器（Node.js 跑）、写桌面应用（Electron/Tauri）、写手机 App。一句话：学会了它，前后端、客户端你都能沾边。

你可以把它理解成"网页的行为层"——HTML 是骨架（有什么），CSS 是皮囊（长什么样），JS 是神经和肌肉（会动、会算、会响应点击）。

> 本篇是语言基础。后面要学的 [TypeScript](../typescript/typescript.md) 是给 JS 加了"类型保险"，[Vue 3](../vue/vue.md) 和 [React](../react/react.md) 是用 JS/TS 写界面的框架，[Vite](../engineering/vite.md) 是把这些代码打包跑起来的工具。

---

## 1. 先跑起来

### 在浏览器里试
按 F12 打开开发者工具，切到 Console（控制台），直接敲：

```js
console.log('hello world')
1 + 1
```

回车就能看到结果。这是最快的"游乐场"。

### 用 Node.js 跑一个文件
装好 [Node 原生](../../backend/nodejs/nodejs.md) 后，新建 `hello.js`：

```js
console.log('hello from node')
```

终端运行：

```bash
node hello.js
```

### 用 Vite 跑一个前端项目
正经写项目一般用 Vite 起一个开发服务器，热更新、模块化都帮你配好，见 [Vite 笔记](../engineering/vite.md)。

---

## 2. 变量：用 let / const，忘掉 var

声明变量有三件套，但现在只推荐前两个：

```js
let count = 0        // 可改的变量
const name = 'Tom'   // 常量，不能重新赋值
// var old = 1       // 老写法，别用
```

- `let`：可以重新赋值，但不能在同一作用域重复声明。
- `const`：声明时必须赋值，且不能再指向别的东西。**注意**：`const` 只是"绑定不可变"，对象/数组内部内容还是能改的：

```js
const user = { age: 18 }
user.age = 19        // ✅ 可以，改的是对象内部
// user = {}         // ❌ 报错，不能换引用
```

### 坑：var 的"变量提升"和 var 没有块级作用域
`var` 会提升到函数顶部，且 `{}` 关不住它，容易造成 bug。所以统一用 `let` / `const`，它们有块级作用域，且存在"暂时性死区"（声明前访问会报错，不是 undefined）。

---

## 3. 数据类型

JS 是**弱类型、动态类型**语言：变量不用声明类型，类型在运行时才确定；同一个变量可以一会儿是数字一会儿是字符串（虽然不建议这么干）。

### 原始类型（7 种，存的是值本身）
- `number`：数字，包括整数和小数，还有 `NaN`、`Infinity`
- `string`：字符串，单引号、双引号、反引号（模板字符串）都行
- `boolean`：`true` / `false`
- `undefined`：声明了但没赋值
- `null`：主动赋的"空"
- `bigint`：超大整数（数字加 `n`，如 `9007199254740993n`）
- `symbol`：独一无二的值，一般做对象 key

### 引用类型
- `object`：对象、数组、函数、日期等都算 object（typeof 都是 'object'，函数例外是 'function'）

```js
typeof 1            // 'number'
typeof 'a'          // 'string'
typeof {}           // 'object'
typeof []           // 'object'（数组也是对象，坑）
typeof null         // 'object'（历史 bug，记住就行）
typeof function(){} // 'function'
```

### 模板字符串
反引号里用 `${}` 塞变量，写起来比拼接舒服：

```js
const name = 'Tom'
const msg = `你好，${name}，你今年 ${18 + 1} 岁`
```

### 类型转换的坑
JS 会"偷偷"帮你转类型，常常出意料之外的结果：

```js
1 + '1'     // '11'（数字被转成字符串拼接）
1 - '1'     // 0（字符串被转成数字相减）
[] + {}     // '[object Object]'
{} + []     // 0（不同浏览器表现还不一样）
```

需要严格比较时用 `===`（不转型），永远优先用 `===` 和 `!==`，少用 `==`。

---

## 4. 运算符与流程控制

```js
// 算术
10 % 3       // 1（取余）

// 逻辑短路，很常用
const a = x || '默认值'     // x 为假时用默认值
const b = y && doSomething() // y 为真才执行

// 三元
const tip = age >= 18 ? '成年人' : '未成年'

// 条件
if (score >= 90) {
  // ...
} else if (score >= 60) {
  // ...
} else {
  // ...
}

// 循环
for (let i = 0; i < 5; i++) { console.log(i) }
const arr = [1, 2, 3]
for (const item of arr) { console.log(item) }   // 遍历值
for (const key in obj) { console.log(key) }      // 遍历 key（对象用）
arr.forEach(item => console.log(item))
```

小技巧：`||` 和 `&&` 短路不仅能返回布尔，还能返回实际值，常用来设默认值（`const name = input || '匿名'`）。

---

## 5. 函数：JS 的一等公民

函数可以赋值给变量、当参数传、当返回值，非常灵活。

```js
// 函数声明（会提升，调用在前也行）
function add(a, b) { return a + b }

// 函数表达式
const add2 = function (a, b) { return a + b }

// 箭头函数（没有自己的 this，写起来短）
const add3 = (a, b) => a + b
const square = n => n * n
```

### this 指向（最容易被坑）
- 普通函数里的 `this` 看"谁调用它"。
- 箭头函数没有自己的 `this`，它沿用手边的 `this`（定义时的外层 this）。

```js
const obj = {
  name: 'Tom',
  say() {
    console.log(this.name)        // 'Tom'，obj 调用的
    setTimeout(() => {
      console.log(this.name)      // 'Tom'，箭头函数沿用 say 的 this
    }, 100)
    setTimeout(function () {
      console.log(this.name)      // undefined，这里的 this 是全局
    }, 100)
  }
}
obj.say()
```

### 闭包：函数"记住"了它出生的环境
函数可以访问定义时外层作用域的变量，即使外层已经执行完。这是 JS 实现"私有变量"和 [Vue 组合式函数](../vue/vue.md)、[React Hook](../react/react.md) 的基础。

```js
function makeCounter() {
  let count = 0                       // 这个变量被"包"在里面，外面碰不到
  return {
    inc() { return ++count },
    get() { return count }
  }
}
const c = makeCounter()
c.inc()    // 1
c.inc()    // 2
c.get()    // 2
// count 从外面访问不到，这就是用闭包做的私有状态
```

### call / apply / bind：手动指定 this
```js
function greet(prefix) { console.log(prefix + this.name) }
const u = { name: 'Tom' }
greet.call(u, '你好，')     // 你好，Tom（立即调用，参数逐个传）
greet.apply(u, ['你好，'])  // 你好，Tom（立即调用，参数用数组）
const f = greet.bind(u)    // 不立即调用，返回一个 this 固定的新函数
f('嗨，')                  // 嗨，Tom
```

---

## 6. 原型与原型链、类

JS 的对象通过"原型"共享方法和属性。ES6 之后用 `class` 语法糖，写起来像其他语言，但底层还是原型。

```js
class Animal {
  constructor(name) { this.name = name }
  speak() { console.log(`${this.name} 叫`) }
}
class Dog extends Animal {
  speak() { console.log(`${this.name} 汪汪`) }  // 重写
}
const d = new Dog('旺财')
d.speak()          // 旺财 汪汪
d instanceof Dog   // true
```

原型链：访问 `d.speak` 时，先找 `d` 自己，没有就顺着 `__proto__` 往父类找，一直找到 `null`。理解这条链，才知道方法"从哪来"。

---

## 7. 数组与对象常用方法

这些是天天要用的，背下来能省很多时间。

```js
const arr = [1, 2, 3]

// 遍历与生成
arr.map(n => n * 2)            // [2, 4, 6]，映射
arr.filter(n => n > 1)         // [2, 3]，过滤
arr.reduce((sum, n) => sum + n, 0)  // 6，累计
arr.forEach(n => console.log(n))

// 查找
arr.find(n => n === 2)         // 2，找第一个符合的
arr.some(n => n > 2)           // true，有没有符合的
arr.every(n => n > 0)          // true，是不是都符合
arr.includes(2)                // true

// 增删改
arr.push(4)                    // 末尾加
arr.pop()                      // 末尾删
arr.unshift(0)                 // 开头加
arr.shift()                    // 开头删
const copy = [...arr]          // 浅拷贝，最常用
const sliced = arr.slice(1, 2) // [2]，截取（不改原数组）
arr.splice(1, 1)               // 从索引1删1个（改原数组）

// 对象
const o = { a: 1 }
Object.keys(o)                 // ['a']
Object.values(o)               // [1]
Object.entries(o)              // [['a', 1]]
const merged = { ...o, b: 2 }  // { a:1, b:2 }，展开合并
```

坑：数组的 `map`/`filter` 不会改原数组，要赋值给新变量；`splice` 会改原数组，小心。

---

## 8. 异步：回调、Promise、async/await

JS 是单线程的，但能"同时"发网络请求、读文件，靠的是异步机制。

### 回调（老写法，容易"回调地狱"）
```js
fetchData(function (err, data) {
  if (err) return handle(err)
  process(data, function (err2, result) {
    // 层层嵌套，难读
  })
})
```

### Promise（链式，清爽多了）
```js
fetch('/api/user')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))
```

### async / await（最推荐，写起来像同步）
```js
async function loadUser() {
  try {
    const res = await fetch('/api/user')
    const data = await res.json()
    console.log(data)
  } catch (err) {
    console.error('出错了', err)
  }
}
```

`async` 函数返回的总是一个 Promise；`await` 会暂停函数等结果回来，比 `.then` 好读。

### 事件循环：为什么 setTimeout 不是准时的
JS 单线程跑"调用栈"，异步任务（定时器、网络回调）先进入"任务队列"，等栈空了才执行。任务还分两种：

- **宏任务**（macrotask）：`setTimeout`、`setInterval`、I/O、UI 渲染
- **微任务**（microtask）：`Promise.then`、`async/await` 的后续、`queueMicrotask`

规则：**每跑完一个宏任务，就先把所有微任务清空，再取下一个宏任务**。所以 Promise 的回调总比 setTimeout 先执行：

```js
console.log('1')              // 同步，最先
setTimeout(() => console.log('2'), 0)   // 宏任务
Promise.resolve().then(() => console.log('3'))  // 微任务
console.log('4')              // 同步
// 输出顺序：1 4 3 2
```

---

## 9. 模块化（ESM）

现代 JS 用 `import` / `export` 拆分文件，浏览器和 [Node 原生](../../backend/nodejs/nodejs.md) 都支持（Node 要在 `.mjs` 或 `"type":"module"` 下）。

```js
// math.js
export const add = (a, b) => a + b
export default function sub(a, b) { return a - b }

// main.js
import sub, { add } from './math.js'
add(1, 2)   // 3
sub(5, 3)   // 2
```

`export default` 一个文件只能有一个，import 时不用加 `{}`；具名 `export` 可以有多个，import 时要加 `{}` 且名字对应。Vite 项目里基本都是这套写法，见 [Vite 笔记](../engineering/vite.md)。

---

## 10. 错误处理

```js
try {
  JSON.parse('不是合法json')
} catch (e) {
  console.error('解析失败：', e.message)
} finally {
  console.log('无论如何都执行')
}
```

自己也可以 `throw new Error('出错了')` 抛异常。配合 async/await 时，`try/catch` 能兜住 `await` 抛出的错误。

---

## 11. 常见坑速记

1. `==` 会自动转型，永远用 `===`。
2. `typeof null === 'object'`，判断空要用 `x === null`。
3. 数组也是 object，`Array.isArray(arr)` 才是正确判断。
4. 浮点数不精确：`0.1 + 0.2 !== 0.3`，金额用整数分或专用库。
5. 循环里用 `var` 会共享变量，改用 `let` 或 `forEach`。
6. `const` 对象内部可改，别以为它完全不可变。
7. 异步别用 `for` 循环 + `await` 串行太多次，考虑 `Promise.all` 并发。
8. `this` 在普通函数和箭头函数里不一样，回调函数优先用箭头函数保住 this。

---

## 12. 练习

1. 写一个 `debounce(fn, delay)` 函数：连续触发时只在停止 `delay` 毫秒后执行一次（闭包 + 定时器）。
2. 用 `reduce` 实现数组扁平化（处理 `[1,[2,[3,4]]]` 这种嵌套）。
3. 解释下面输出顺序并打印验证：`console.log('A'); setTimeout(()=>console.log('B'),0); Promise.resolve().then(()=>console.log('C')); console.log('D')`。
4. 用 class 写一个 `Stack`（栈），支持 `push`/`pop`/`peek`，并测试。
5. 用 async/await 封装一个 `fetchJSON(url)`，返回解析后的 JSON，出错时返回 `null`。

---

## 13. 下一步

- 给 JS 加类型保险 → 看 [TypeScript 笔记](../typescript/typescript.md)
- 用 JS 写界面 → [Vue 3](../vue/vue.md) 或 [React](../react/react.md)
- 用 Vite 把项目跑起来并打包 → [Vite 笔记](../engineering/vite.md)
- 想用 JS 写服务器 → [Node 原生](../../backend/nodejs/nodejs.md)
