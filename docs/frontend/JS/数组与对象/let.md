# let

## let

-   let 声明的变量只在 let 命令所在的代码块内有效。

```javascript
{  let a = 0;  
 		a   // 0
}
a   // 报错 ReferenceError: a is not defined
```
```javascript
{  
  let a = 0;
  var b = 1;
}
a  // ReferenceError: a is not defined
b  // 1
```

-   let 只能声明一次 var 可以声明多次。

```javascript
let a = 1;
let a = 2;
var b = 3;
var b = 4;
a  // Identifier 'a' has already been declared
b  // 4
```

-   for 循环计数器很适合用 let

```javascript
for (var i = 0; i < 10; i++) {
  setTimeout(function(){ 
    console.log(i);  
  })
}
// 输出十个 10
```
```javascript
for (let j = 0; j < 10; j++) {  
  setTimeout(function(){   
    console.log(j);  
  })
}
// 输出 0123456789
```

-   let 不存在变量提升，var 会变量提升

```javascript
console.log(a);  
//ReferenceError: a is not defined
let a = "apple"; 
console.log(b);  //undefined
var b = "banana";
```

## const

-   const 声明一个只读变量，声明之后不允许改变。意味着，一旦声明必须初始化，否则会报错。

```javascript
const PI = "3.1415926";
PI  // 3.1415926

const MY_AGE;  // SyntaxError: Missing initializer in const declaration  
```

-   暂时性死区:

-   ES6 明确规定，代码块内如果存在 let 或者 const，代码块会对这些命令声明的变量从块的开始就形成一个封闭作用域。代码块内，在声明变量 PI 之前使用它会报错。

```javascript
var PI = "a";
if(true){  
  console.log(PI);  // ReferenceError: PI is not defined  
  const PI = "3.1415926";
}
```
