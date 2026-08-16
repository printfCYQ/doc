# JS-判断数字是不是稀疏数组

> 稀疏数组是指数组中包含一个或多个未定义元素的数组。
> 
> JavaScript 中的数组可以是稀疏数组，因为数组的长度不必等于它包含的元素数目。
```javascript
// 判断数组是不是稀疏数组

function isSparseArray(arr) {
  if (!Array.isArray(arr)) {
    return false;
  }
  for (let i = 0; i < arr.length; i++) {
    if (!(i in arr)) {
      return true; // 数组包含未定义的元素，因此是稀疏数组
    }
  }
  return false; // 数组中没有未定义的元素，因此不是稀疏数组
}

// 示例用法
const sparseArray = [, 2, , 4]; // 稀疏数组，包含两个未定义的元素
const notSparseArray = [1, 2, 3, 4]; // 非稀疏数组

console.log(isSparseArray(sparseArray)); // 输出 true
console.log(isSparseArray(notSparseArray)); // 输出 false

```
