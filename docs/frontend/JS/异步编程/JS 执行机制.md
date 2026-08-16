# JS 执行机制

## JS 执行机制

> `js` 是单线程的, `HTML5`的`webWorker`支持多线程 但是不允许操作DOM

​  

> 单线程就意味着所有的任务都需要排队，后面的任务需要等前面的任务执行完才能执行，如果前面的任务耗时过长，后面的任务就需要一直等，一些从用户角度上不需要等待的任务就会一直等待，这个从体验角度上来讲是不可接受的，所以JS中就出现了异步的概念。

## 同步任务

> 代码从上到下按顺序执行

## 异步任务

> 1.宏任务
> 
> script(整体代码)、setTimeout、setInterval、UI交互事件、postMessage、Ajax
> 2.微任务
> 
> Promise.then catch finally、MutaionObserver、process.nextTick(Node.js 环境)

## 运行机制

> 所有的同步任务都是在主进程执行的形成一个执行栈，主线程之外，还存在一个"任务队列"，异步任务执行队列中先执行宏任务，然后清空当次宏任务中的所有微任务，然后进行下一个tick如此形成循环。

## 说一说事件循环Event loop，宏任务与微任务？

-   ​得分点

任务挂起、同步任务执行结束执行队列中的异步任务、执行script标签内部代码、setTimeout/setInterval、ajax请、postMessageMessageChannel、setImmediate、I/O（Node.js）Promise、MutonObserver、Object.observe、process.nextTick（Node.js）

每个宏任务中都包含了一个微任务队列

-   标准回答

-   浏览器的事件循环：执行js代码的时候，遇见同步任务，直接推入调用栈中执行，遇到异步任务，将该任务挂起，等到异步任务有返回之后推入到任务队列中，当调用栈中的所有同步任务全部执行完成，将任务队列中的任务按顺序一个一个的推入并执行，重复执行这一系列的行为。
-   异步任务又分为宏任务和微任务。

-   宏任务：任务队列中的任务称为宏任务，每个宏任务中都包含了一个微任务队列。
-   微任务：等宏任务中的主要功能都完成后，渲染引擎不急着去执行下一个宏任务，而是执行当前宏任务中的微任务
-   宏任务包含：执行script标签内部代码、setTimeout/setInterval、ajax请、postMessageMessageChannel、setImmediate，I/O（Node.js）
-   微任务包含：Promise、MutonObserver、Object.observe、process.nextTick（Node.js） 加分回答 浏览器和Node 环境下，microtask 任务队列的执行时机不同 - Node端，microtask 在事件循环的各个阶段之间执行 - 浏览器端，microtask 在事件循环的 macrotask 执行完之后执行

​  

---

## 题

```javascript
setTimeout(function () {
  console.log("2");
  process.nextTick(function () {
    console.log("3");
  });
  new Promise(function (resolve) {
    console.log("4");
    resolve();
  }).then(function () {
    console.log("5");
  });
}, 0);

setImmediate(function () {
  console.log("6");
}, 0);

process.nextTick(function () {
  console.log("7");
});

new Promise(function (resolve) {
  console.log("8");
  resolve();
}).then(function () {
  console.log("9");
});

console.log("1");

setTimeout(function () {
  console.log("10");
  process.nextTick(function () {
    console.log("11");
  });
  new Promise(function (resolve) {
    console.log("12");
    resolve();
  }).then(function () {
    console.log("13");
  });
});
```
