# JavaScript 基础入门

## 简介

本节介绍 JavaScript 语言基础，包括变量声明、数据类型、运算符、流程控制、函数、作用域与闭包等核心概念。

## 目录 / 章节

- 变量与数据类型
- 运算符与表达式
- 条件与循环
- 函数与作用域
- 闭包与原型链
- 数组与对象常用方法

## 笔记正文

::: details 点击展开示例代码
```javascript
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    get: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.get());       // 2
```
:::
