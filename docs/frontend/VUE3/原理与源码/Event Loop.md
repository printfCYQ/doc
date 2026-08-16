# Event Loop

> js 是单线程。
> 
> 在一行代码执行的过程中，必然不会存在同时执行的另一行代码。

## 同步任务

> 代码从上到下按顺序执行

## 异步任务

> **1.宏任务**
> 
> script(整体代码)、setTimeout、setInterval、UI交互事件、postMessage、Ajax

  

> **2.微任务**
> 
> Promise.then catch finally、MutaionObserver、process.nextTick(Node.js 环境)

  

> **执行机制**
> 
> 所有的同步任务都是在主进程执行的形成一个执行栈，主线程之外，还存在一个"任务队列"，异步任务执行队列中先执行宏任务，然后清空当次宏任务中的所有微任务，然后进行下一个tick如此形成循环。
> 
> 

# nextTick

> 等待下一次 DOM 更新刷新的工具方法。
> 
> 当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存在一个队列中，直到下一个“tick”才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新。
> 
> nextTick() 可以在状态改变后立即使用，以等待 DOM 更新完成。你可以传递一个回调函数作为参数，或者 await 返回的 Promise。
> 
> **nextTick就是创建一个异步任务，那么它自然要等到同步任务执行完成后才执行。**
