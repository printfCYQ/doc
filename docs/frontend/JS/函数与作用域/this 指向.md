# this 指向

> **this 永远指向最后调用它的那个对象。**

> **箭头函数的 this 始终指向函数定义时的 this。**

---

> apply() 方法调用一个函数, 其具有一个指定的this值，以及作为一个数组（或类似数组的对象）提供的参数。
> 
> `fun.apply(thisArg, [argsArray])`
> 
> -   thisArg：在 fun 函数运行时指定的 this 值。需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是window对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。
> -   argsArray：一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。

```typescript
var sum = 0;
var obj = {
  sum: 10,
};
var test = function (a, b) {
  return this.sum + a + b;
};
console.log(test(1, 2)); // 3
console.log(test.apply(obj, [1, 2])); // 13
```
---

> fun.call(thisArg, arg1, arg2, ...)
> 
> apply 和 call 的区别是 call 方法接受的是若干个参数列表，而 apply 接收的是一个包含多个参数的数组。

```typescript
var sum = 0;
var obj = {
  sum: 10,
};
var test = function (a, b) {
  return this.sum + a + b;
};
console.log(test(1, 2)); // 3
console.log(test.call(obj, 1, 2)); // 13
```
---

​  

> fun.bind(thisArg, arg1, arg2, ...)
> 
> **bind()** **方法创建一个新的函数**，在 bind() 被调用时，这个新函数的 this 被指定为 bind()的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```typescript
var sum = 0;
var obj = {
  sum: 10,
};
var test = function (a, b) {
  return this.sum + a + b;
};
console.log(test(1, 2)); // 3
var newTest = test.bind(obj, 1, 2);
console.log(newTest()); // 13
```
---

## this 指向

| 调用方式 | 示例 | 函数中的this指向 |
| --- | --- | --- |
| 通过new调用 | new method() | 新对象 |
| 直接调用 | method() | 全局对象 |
| 通过对象调用 | obj.method() | 前面的对象 |
| call、apply、bind | method.call(ctx) | 第一个参数 |
