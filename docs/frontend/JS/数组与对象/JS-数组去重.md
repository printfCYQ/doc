# JS-数组去重

### 普通数组

```javascript
const arr = [1, 2, 3, 1, 2, 3];

function unique(arr) {
  return Array.from(new Set(arr));
}

function unique(arr) {
  return [...new Set(arr))];
}

console.log(unique(arr)); // [1, 2, 3]
```
```javascript
function uniqueArray(arr) {
  var result = [];
  for (let i = 0; i < arr.length; i++) {
    var isFind = false;
    for (let j = 0; j < result.length; j++) {
      if (result[j] === arr[i]) {
        isFind = true;
        break;
      }
    }
    if (!isFind) {
      result.push(arr[i]);
    }
  }
  return result;
}
```
```javascript
function uniqueArray(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
```

  

### 对象数组

```javascript
const arr = [
  { id: 1, value: "a" },
  { id: 2, value: "aa" },
  { id: 1, value: "a" },
  { id: 2, value: "aa" },
];
function unique(arr) {
  const set = new Set(arr.map((item) => JSON.stringify(item)));
  return [...set].map((item) => JSON.parse(item));
}
console.log(unique(arr)); // [{ id: 1, value: "a" },{ id: 2, value: "aa" }]
```

  

### 复杂情况

```javascript
/**
* 数组去重
* 原始值使用严格相等比较
* 对象值递归比较所有属性，属性数量和属性名必须要一致
* 数组中的对象均为plain object
* @param {Array} arr
* @return {Array}
*/
function uniqueArray(arr) {
  var result = [];
  for (let i = 0; i < arr.length; i++) {
    var isFind = false;
    for (let j = 0; j < result.length; j++) {
      if (equals(arr[i], result[j])) {
        isFind = true;
        break;
      }
    }
    if (!isFind) {
      result.push(arr[i]);
    }
  }
  return result;
}

/**
* 比较两个值是否完全相等
* @param {any} v1
* @param {any} v2
* @returns {Boolean}
*/
function equals(v1, v2) {
  if (getType(v1) === getType(v2)) {
    // 处理 原始值 null、undefined、number、string、symbol、bigInt、boolean
    if (
      (typeof v1 !== "object" || v1 === null) &&
      (typeof v2 !== "object" || v2 === null)
    ) {
      return v1 === v2;
    } else {
      console.log(v1, v2);
      return equalsObject(v1, v2);
    }
  } else {
    return false;
  }
}
/**
* 获取参数的类型
* @param {any} data
* @returns {String}
*/
function getType(data) {
  return Object.prototype.toString.call(data);
}

/**
* 递归比较两个对象是否相等
* @param {any} obj1
* @param {any} obj2
* @returns {Boolean}
*/
function equalsObject(obj1, obj2) {
  var o1 = obj1 instanceof Object;
  var o2 = obj2 instanceof Object;
  // 判断是不是对象
  if (!o1 || !o2) {
    return obj1 === obj2;
  }

  //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,
  //例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (var o in obj1) {
    // 遍历对象 fon in 循环 o 为 对象的属性名
    var t1 = obj1[o] instanceof Object;
    var t2 = obj2[o] instanceof Object;
    if (t1 && t2) {
      return equalsObject(obj1[o], obj2[o]);
    } else if (obj1[o] !== obj2[o]) {
      return false;
    }
  }
  return true;
}

const arr = [
  1,
  2,
  1,
  null,
  undefined,
  NaN,
  true,
  false,
  "1",
  "2",
  "2",
  undefined,
  null,
  NaN,
  false,
  Symbol(1),
  Symbol(1),
  BigInt(2),
  BigInt(2),
  BigInt(1),
  { a: 1 },
  { a: 2 },
  { b: 1 },
  { b: 1 },
  { b: 1, c: 2 },
  { b: 1, c: 2, d: 3 },
  { b: 1, d: 3, c: 2 },
  { b: 1, c: { d: 1 } },
  { b: 1, c: { d: 2 } },
  { b: 1, c: { d: 1 } },
];
console.log(uniqueArray(arr));
```
