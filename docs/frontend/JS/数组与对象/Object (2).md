# Object

## Object

### pick

```javascript
  /*
  * 在对象里取固定的字段返回新的对象
  * @params { object } obj - 要处理的对象
  * @params { array } arr - 选取的字段数组
  * @example
  * const obj = { a: 1, b: 2, c: 3, d: 4 };
  * const newObj = objectPick(obj, ["a", "b"])
  * console.log(newObj); // { a: 1, b: 2 }
  */
  const objectPick = (obj, arr) => {
    let tempObj = {};
    for (let item in obj) {
      if (arr.includes(item)) {
        tempObj[item] = obj[item];
      }
    }
    return tempObj;
  };
  
  const obj = { a: 1, b: 2, c: 3, d: 4 };
  const newObj = objectPick(obj, ["a", "b"])
  console.log(newObj); // { a: 1, b: 2 }
```

  

```javascript
/*
* 在对象里取固定的字段返回新的对象
* @params { object } obj - 要处理的对象
* @params { array } arr - 选取的字段数组
* @params { function } fn - 处理函数
* @example
* const obj = { a: 1, b: 0, c: 3, d: 4, e: 5 }
* const newObj = objectPick(obj, ["a", "b"], (v) => v || '')
* console.log(newObj); // { a: 1, b: '' }
*/
const objectPick = (obj, arr, fn) => {
  let tempObj = {};
  for (let item in obj) {
    if (arr.includes(item)) {
      tempObj[item] = fn ? fn(obj[item]) : obj[item];
    }
  }
  return tempObj;
};

const obj = { a: 1, b: 0, c: 3, d: 4, e: 5 };

const newObj = objectPick(obj, ["a", "b"], (v) => v || '')
console.log(newObj); // { a: 1, b: '' }
```

### get

```javascript
function get(object, path, defaultValue) {
  let obj = object;
  if (typeof path === "string") {
    const reg = /[^[].]+/g;
    path = path.match(reg);
  }
  for (const key of path) {
    if (!obj) {
      return defaultValue;
    }
    obj = obj[key];
  }
  return obj === undefined ? defaultValue : obj;
}
const obj = { a: [{ b: { c: 1 } }] };
console.log(get(obj, "a[0].b.c", "defaultValue")); // 1
```

  

## Array

### chunk:一维数组转二维数组

```javascript
function chunk(array, size = 1) {
  if (size < 1) return [];
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}
console.log(chunk([1, 2, 3, 4, 5, 6, 7, 8], 2));
```
```javascript
function chunk(array, size = 1) {
  if (size < 1) return [];

  const result = [];
  let chunk = [];

  for (let i = 0; i < array.length; i++) {
    chunk.push(array[i]);

    if (chunk.length === size) {
      result.push(chunk);
      chunk = [];
    }
  }

  if (chunk.length > 0) {
    result.push(chunk);
  }

  return result;
}

console.log(chunk([1, 2, 3, 4, 5, 6, 7, 8], 3));
```

## 集合

### countBy

```javascript
function countBy(collection, cb) {
  const result = {};
  for (const item of collection) {
    const key = cb(item);
    result[key] ? result[key]++ : (result[key] = 1);
  }
  return result;
}
const arr = [
  { name: "a", score: "60" },
  { name: "b", score: "62" },
  { name: "c", score: "61" },
  { name: "d", score: "60" },
];
console.log(countBy(arr, (value) => value.score)); // {60: 2, 61: 1, 62: 1}
```

## 函数
