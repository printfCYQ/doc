# Object.create

## Object.create

-   Object.create() 方法用于创建一个新对象，使用现有的对象来作为新创建对象的原型（prototype）。

```javascript
Object.prototype._create = function (proto) {
  const Fn = function () { }
  Fn.prototype = proto
  return new Fn()
}
function A() { }
const obj = Object.create(A)
const obj2 = Object._create(A)
console.log(obj.__proto__ === A) // true
console.log(obj.__proto__ === A) // true
```

## Object.is

-   [MDN(Object.is)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
-   [MDN(JavaScript 中的相等性判断)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)

```javascript
const myObjectIs = (a, b) => {
  if (a === b) {
    return a !== b || 1 / a === 1 / b;
  }
  return a !== a && b !== b;
};
```
