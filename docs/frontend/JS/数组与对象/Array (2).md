# Array (2)

## reverse

```javascript
const myReverse = (nums, start, end) => {
  start = start || 0;
  end = end || nums.length - 1;
  while (start < end) {
    const temp = nums[start];
    nums[start] = nums[end];
    nums[end] = temp;
    start += 1;
    end -= 1;
  }
};
const arr = [1, 2, 3, 4, 5];
myReverse(arr);
console.log(arr); // [ 5, 4, 3, 2, 1 ]
```

## flat

-   [https://leetcode.cn/problems/flatten-deeply-nested-array/description/](https://leetcode.cn/problems/flatten-deeply-nested-array/description/)

```typescript
const myFlat = (array) => {
  const res = []
  const rec = (arr) => {
    arr.forEach(item => {
      if (Array.isArray(item)) {
        rec(item)
      } else {
        newArr.push(item)
      }
    })
  }
  rec(array)
  return res
}
const arr = [1, [2, 3], [4, [5, [6]], 7]];
console.log(myFlat(arr)) // [1, 2, 3, 4, 5, 6, 7]
```
```javascript
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for (let i = 0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = [1, [2, 3], [4, [5, [6]], 7]];
console.log([...iterTree(tree)]); // [1, 2, 3, 4, 5, 6, 7]
```
```typescript
/**
 * @param {any[]} arr
 * @param {number} depth
 * @return {any[]}
 */
var flat = function (arr, n) {
    if (n === 0) {
        return arr
    }
    let result = []
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result.push(...flat(arr[i], n - 1))
        } else {
            result.push(arr[i])
        }
    }
    return result
};
```
```typescript
const myFlat = (arr = [], depth = 1) => {
  const result = [];
  (function flat(arr, depth) { // 形参
    arr.forEach((item) => {
      if (Array.isArray(item) && depth > 0) {
        flat(item, depth - 1)
      } else {
        result.push(item)
      }
    })	
  })(arr, depth) // 实参
  return result;
}
const arr = [1, [2, 3], [4, [5, [6]], 7]];
console.log(myFlat(arr, 1)) //[1, 2, 3, 4, [5, [6]], 7]
console.log(myFlat(arr, Infinity)) // [1, 2, 3, 4, 5, 6, 7]
```
```typescript
// leetcode 超时
const myFlat = (arr, deep = 1) => {
  if (deep <= 0) return arr;
  return arr.reduce(
    (res, curr) =>
      res.concat(Array.isArray(curr) ? myFlat(curr, deep - 1) : curr),
    []
  );
};

const arr = [1, [2, 3], [4, [5, [6]], 7]];
console.log(myFlat(arr, 2)) //[1, 2, 3, 4, 5, [6], 7]
```

## Array.prototype.map

-   map 中的 exc 接受三个参数，分别是: 元素值、元素下标和原数组
-   map 返回的是一个新的数组，地址不一样

```vue
Array.prototype.myMap = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg = arguments[1] || window;
  var _newArr = [];
  var _item;
  var _res;
  for (let i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]);
    _res = cb.apply(_arg, [_item, i, _arr]);
    _res && _newArr.push(_res);
  }
  return _newArr
};
```

## Array.prototype.filter

-   filter 中的 exc 接受三个参数，与map一致，主要实现的是数组的过滤功能，会根据 exc 函数的返回值来判断是否“留下”该值。
-   filter 返回的是一个新的数组，地址不一致。

```javascript
Array.prototype._filter = function (exc) {
  const result = []
  this.forEach((item, index, arr) => {
    if (exc(item, index, arr)) {
      result.push(item)
    }
  })
  return result
}
const b = [1, 3, 4, 5, 6, 2, 5, 1, 8, 20]

console.log(b._filter(item => item % 2 === 0)) // [ 4, 6, 2, 8, 20 ]
```
```vue
Array.prototype.myFilter = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg = arguments[1] || window;
  var _newArr = [];
  var _item;
  var _res;
  for (let i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]);
    _res = cb.apply(_arg, [_item, i, _arr]);
    _res && _newArr.push(_item);
  }
  return _newArr;
};
```

## Array.prototype.reduce

-   callbackFn

-   `previousValue`：上一次调用 callbackFn 时的返回值。在第一次调用时，若指定了初始值 initialValue，其值则为 initialValue，否则为数组索引为 0 的元素 array[0]。
-   `currentValue`：数组中正在处理的元素。在第一次调用时，若指定了初始值 initialValue，其值则为数组索引为 0 的元素 array[0]，否则为 array[1]。
-   `currentIndex`：数组中正在处理的元素的索引。若指定了初始值 initialValue，则起始索引号为 0，否则从索引 1 起始。
-   `array`：用于遍历的数组。

-   initialValue

-   作为第一次调用 callback 函数时参数 *previousValue* 的值。若指定了初始值 initialValue，则 currentValue 则将使用数组第一个元素；否则 previousValue 将使用数组第一个元素，而 currentValue 将使用数组第二个元素。

```vue
Array.prototype.myReduce = function (cb, initialValue = 0) {
  var _arr = this;
  var _len = _arr.length;
  var _item;
  for (let i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]);
    initialValue = cb(initialValue, _item, i, _arr);
  }
  return initialValue;
};
```
```vue
Array.prototype.myReduce = function (cb, initialValue = 0, arg = window) {
  var _arr = this;
  var _len = _arr.length;
  var _item;
  for (let i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]);
    initialValue = cb.apply(arg, [initialValue, _item, i, _arr]);
  }
  return initialValue;
};
```

## Array.prototype.reduceRight

```vue
Array.prototype.myReduceRight = function (cb, initialValue = 0) {
  var _arr = this;
  var _len = _arr.length;
  var _item;
  for (let i = _len - 1; i >= 0; i--) {
    _item = deepClone(_arr[i]);
    initialValue = cb(initialValue, _item, i, _arr);
  }
  return initialValue;
};
```
```vue
Array.prototype.myReduceRight = function (cb, initialValue = 0, arg = window) {
  var _arr = this;
  var _len = _arr.length;
  var _item;
  for (let i = _len - 1; i >= 0; i--) {
    _item = deepClone(_arr[i]);
    initialValue = cb.apply(arg, [initialValue, _item, i, _arr]);
  }
  return initialValue;
};
```

## Array.prototype.forEach

```vue
Array.prototype.myForEach = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg = arguments[1] || window; // 第二个参数 默认 window
  for (let i = 0; i < _len; i++) {
    cb.apply(_arg, [_arr[i], i, _arr]); // 第二个参数改变 cb this 指向
  }
};

[1, 2, 3].myForEach(function(item, index, array) {
  console.log(item, index, array);
});
```

## Array.prototype.every

```vue
Array.prototype.myEvery = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg = arguments[1] || window;
  var _res = true;
  for (let i = 0; i < _len; i++) {
    _res = cb.apply(_arg, [_arr[i], i, _arr]);
    if (!_res) break;
  }
  return _res;
};
```

## Array.prototype.some

```vue
Array.prototype.mySome = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg = arguments[1] || window;
  var _res = false;
  for (let i = 0; i < _len; i++) {
    _res = cb.apply(_arg, [_arr[i], i, _arr]);
    if (_res) break;
  }
  return _res;
};
```
