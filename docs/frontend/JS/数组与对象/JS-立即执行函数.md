# JS-立即执行函数

-   自动执行
-   立即执行
-   执行后销毁

> ***Immediately Invoked Functional Expressions***
> 
> 立即调用的匿名函数又被称作立即调用的函数表达式（**IIFE**），它类似于函数声明，但由于被包含在括号中，所以会被解释为函数表达式。紧跟在第一组括号后面的第二组括号会立即调用前面的函数表达式，位于IIFE中的代码在其外部是无法访问的。

### 声明方式

```javascript
(function test(){
  //todo
}()) // w3c建议

(function test(){
  //todo
})()

(function test(形参){
  //todo
}(实参))
```

### 表达式

> （）包裹任何东西都会变成一个表达式
> 
> （everything）
> 
> \+ - ！ || && 等能将后面变成一个表达式
> 
> \+ function test1 () { console.log('b') }();

  

-   在（）里面会自动忽略函数名

```javascript
var a = 10;
if (function b() {}) { // b 会被忽略掉
  a += typeof b;
}
console.log(a); // 10undefined

//转为
var a = 10;
if (function () {}) {
  a += typeof b;
}
console.log(a);
```

-   ，运算符

-   返回最后一个值

```javascript
let a = (5, 6)
let b = (1, 2, 3)
console.log(a, b) // 6, 3
```

### code

-   每隔一秒打印1,2,3,4

```javascript
for(var i = 1; i < 5; i++){
	setTimeout(() => {
		console.log(i)
	}, i * 1000)
}
// 5 5 5 5 

for(var i = 1; i < 5; i++) {
  (function(x) {
    setTimeout(() => {
      console.log(x)
    }, x * 1000)
  })(i)
}
```
