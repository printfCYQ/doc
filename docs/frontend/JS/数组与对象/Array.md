# Array

> 解构赋值是对赋值运算符的扩展。
> 
> 他是一种针对数组或者对象进行模式匹配，然后对其中的变量进行赋值。

## Array

```javascript
let [a, b, c] = [1, 2, 3];
// a = 1 b = 2 c = 3
```
```javascript
let [a, [[b], c]] = [1, [[2], 3]];
// a = 1 b = 2 c = 3
```
```javascript
let [a, , b] = [1, 2, 3];
// a = 1  b = 3
```
```javascript
let [a = 1, b] = []; 
// a = 1, b = undefined
```
```javascript
let [a, ...b] = [1, 2, 3];
//a = 1 b = [2, 3]
```
```javascript
// 在数组的解构中，解构的目标若为可遍历对象，皆可进行解构赋值。
// 可遍历对象即实现 Iterator 接口的数据。
let [a, b, c, d, e] = 'hello';
// a = 'h' b = 'e' c = 'l' d = 'l' e = 'o'
```
```javascript
// 当解构模式有匹配结果，且匹配结果是 undefined 时，会触发默认值作为返回结果。

let [a = 2] = [undefined]; // a = 2

let [a = 3, b = a] = [];     // a = 3, b = 3
let [a = 3, b = a] = [1];    // a = 1, b = 1
let [a = 3, b = a] = [1, 2]; // a = 1, b = 2
// a 与 b 匹配结果为 undefined ，触发默认值：a = 3; b = a =3
// a 正常解构赋值，匹配结果：a = 1，b 匹配结果 undefined ，触发默认值：b = a =1
// a 与 b 正常解构赋值，匹配结果：a = 1，b = 2 
```

## Object

```javascript
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
// foo = 'aaa'
// bar = 'bbb' 

let { baz : foo } = { baz : 'ddd' };
// foo = 'ddd'
```
```javascript
let obj = {p: ['hello', {y: 'world'}] };
let {p: [x, { y }] } = obj;
// x = 'hello'
// y = 'world'

let obj = {p: ['hello', {y: 'world'}] };
let {p: [x, {  }] } = obj;
// x = 'hello'
```
```javascript
let obj = {p: [{y: 'world'}] };
let {p: [{ y }, x ] } = obj;
// x = undefined
// y = 'world'
```
```javascript
let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40};
// a = 10
// b = 20
// rest = {c: 30, d: 40}
```
```javascript
let {a = 10, b = 5} = {a: 3};
// a = 3; b = 5;
let {a: aa = 10, b: bb = 5} = {a: 3};
// aa = 3; bb = 5;
```
