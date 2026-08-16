# for

## for

```javascript
function sum (arr) {
  let res = 0;
  for (let i = 0; i < arr.length; i++) {
    res += arr[i];
  }
  return res;
};
```

## 递归

```javascript
function sum (arr) {
  var len = arr.length;
  if(len == 0){
    return 0;
  } else if (len == 1){
    return arr[0];
  } else {
    return arr[0] + sum(arr.slice(1));
  }
}
```

## forEach

```javascript
function sum(arr) {
  var res = 0;
  arr.forEach((item) => {
    res += item;
  });
  return res;
}
```

## reduce

> 如果数组为空且未提供 `initialValue`（第三个参数），则会抛出异常。
```javascript
function sum (arr) {
  return arr.reduce((a, b) => a + b, 0);
}
```

## eval

```javascript
function sum(arr) {
  return eval(arr.join("+"));
};
```
> 这两个函数都用于计算数组中所有元素的和，但是它们使用了两种不同的方法。让我们来分析一下它们的性能和综合评价。
> 
> 1.  性能分析：
> 
> -   function sum(arr) { return eval(arr.join("+")) || 0; }：这个函数使用了eval()函数来将通过join()方法连接起来的字符串转换回计算表达式，并求和。eval()函数在处理字符串时需要执行解析和执行操作，这可能会导致一些性能开销。此外，join()方法会将数组中的元素转换为字符串，然后再将它们连接起来，这也会有一些额外的性能开销。
> -   function sum (arr) { return arr.reduce((a, b) => a + b, 0); }：这个函数使用了reduce()方法来遍历数组中的元素并将它们相加。reduce()方法是一种高阶函数，它通过迭代数组中的元素来计算结果。与eval()相比，reduce()的性能通常更好，因为它不需要执行额外的解析和执行操作。
> 
> 基于性能分析，第二个函数使用reduce()方法的版本通常更快。
> 
>   
> 2\. 综合评价：
> 
> -   可读性：第二个函数的代码更简洁，使用了更现代的箭头函数和\`reduce()\`方法。第一个函数使用了\`eval()\`函数，这可能会引起一些安全性和可维护性的问题。因此，第二个函数的可读性更好。
> -   安全性：使用\`eval()\`函数可能会引入一些安全问题，因为它允许执行任意的JavaScript代码。相比之下，使用\`reduce()\`方法更安全，因为它不会执行任何非预期的代码。
> -   兼容性：\`reduce()\`方法在ECMAScript 5（ES5）中就已经引入，因此在大多数现代浏览器和环境中都可以使用。而\`eval()\`函数在更旧的浏览器中可能不可用或具有不同的行为。
> 
> ​  
> 
> 基于综合评价，第二个函数使用reduce()方法的版本通常更优秀，因为它具有更好的性能、可读性和安全性。
