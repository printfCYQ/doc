# Map

## 新建

> **Map** 对象保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者基本类型）都可以作为一个键或一个值。

### Maps 和 Object 的区别

一个 Object 的键只能是字符串或者 Symbols，但一个 Map 的键可以是任意值。

Map 中的键值是有序的（FIFO 原则），而添加到对象中的键则不是。

Map 的键值对个数可以从 size 属性获取，而 Object 的键值对个数只能手动计算。

Object 都有自己的原型，原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。

### 创建一个空 Map 对象

```javascript
const m = new Map()
```

### 初始化实例

> 任何值（对象或者基本类型）都可以作为一个键或一个值。

```javascript
const map = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);
console.log(map);
```



> key 唯一

```javascript
const map = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
  [1, "111"],
]);
console.log(map);
```



> key可以用`字符串` `对象` `函数` `NaN`

```javascript
var myMap = new Map();
var keyString = "a string";  
myMap.set(keyString, "和键'a string'关联的值");
myMap.get(keyString);    // "和键'a string'关联的值"
myMap.get("a string");  // "和键'a string'关联的值"                         
// 因为 keyString === 'a string'
```
```javascript
var myMap = new Map();
var keyObj = {};
myMap.set(keyObj, "和键 keyObj 关联的值");
myMap.get(keyObj); // "和键 keyObj 关联的值"
myMap.get({}); // undefined, 因为 keyObj !== {}
```
```javascript
var myMap = new Map();
var keyFunc = function () {}; // 函数 
myMap.set(keyFunc, "和键 keyFunc 关联的值"); 
myMap.get(keyFunc); // "和键 keyFunc 关联的值"
myMap.get(function() {}) // undefined, 因为 keyFunc !== function () {}
```
```javascript
var myMap = new Map();
myMap.set(NaN, "not a number"); 
myMap.get(NaN); // "not a number"
var otherNaN = Number("foo");
myMap.get(otherNaN); // "not a number"
```

## 属性/方法

### size

> Map 对象 的成员数量

```javascript
const map = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);
console.log(map.size); // 3
```

### set

> 向 Map 内添加新的键值对
> 
> `map.set('key','value')`

```javascript
map.set('bar', 'foo');
```

### get

> 方法从 Map 对象返回指定的元素。
> 
> 不存在的返回 `undefined`
> 
> `map.get('key')`

```javascript
map.get('bar'); // foo
map.get('bar1'); // undefined
```

### clear

> 移除 Map 对象中的所有元素

```javascript
map.clear()
```

### delete

> 移除 Map 对象中指定的元素。成功返回`true`
> 
> `map.delete('key')`

```javascript
map.delete('bar')
```

### has

> 指定键的元素是否存在。 存在返回 `true`,不存在返回`false`

```javascript
map.has('bar')
```

### forEach（for...of）

> 迭代方法

```javascript
function logMapElements(value, key, map) {
  console.log(`m[${key}] = ${value}`);
}

new Map([['foo', 3], ['bar', {}], ['baz', undefined]])
  .forEach(logMapElements);

// expected output: "m[foo] = 3"
// expected output: "m[bar] = [object Object]"
// expected output: "m[baz] = undefined"
```
```javascript
const map = new Map([
  ["foo", 3],
  ["bar", {}],
  ["baz", undefined],
]);

for (let item of map) {
  console.log(item);
}
// [ 'foo', 3 ]
// [ 'bar', {} ]
// [ 'baz', undefined ]
```

### entries

> 返回一个新的迭代器对象

```javascript
const map = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);
let items = map.entries();
console.log(items);
console.log(items.next().value);
console.log(items.next().value);
console.log(items.next().value);
```



```javascript
const map = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);
let items = map.entries();
console.log(items);
for (let item of items) {
  console.log(item);
}
```



### values

> 返回一个新的迭代器对象。包含按顺序插入 Map 对象中每个元素的 value 值。

```javascript
const map = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);
let items = map.values();
console.log(items);
// console.log(items.next().value);
// console.log(items.next().value);
// console.log(items.next().value);
for (let item of items) {
  console.log(item);
}
```



### keys

> 返回一个引用的迭代器对象。它包含按照顺序插入 Map 对象中每个元素的 key 值。

```javascript
const map = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"],
]);
let items = map.keys();
console.log(items);
// console.log(items.next().value);
// console.log(items.next().value);
// console.log(items.next().value);
for (let item of items) {
  console.log(item);
}
```



  

## 常用方法

### 利用map计数

```javascript
const arr = ["a", "b", "c", "a", "b", "a"];
const map = new Map();
for (const item of arr) {
  map.set(item, (map.get(item) || 0) + 1);
}
console.log(map); // Map(3) { 'a' => 3, 'b' => 2, 'c' => 1 }
```

### map转数组

```javascript
const map = new Map();
map.set("a", 3);
map.set("b", 2);
map.set("c", 1);
console.log(map); // Map(3) { 'a' => 3, 'b' => 2, 'c' => 1 }
console.log(Array.from(map)); // [ [ 'a', 3 ], [ 'b', 2 ], [ 'c', 1 ] ]
console.log(Array.from(map.entries())); // [ [ 'a', 3 ], [ 'b', 2 ], [ 'c', 1 ] ]
console.log(Array.from(map.keys())); // [ 'a', 'b', 'c' ]
console.log(Array.from(map.values())); // [ 3, 2, 1 ]
```

### 克隆

```javascript
var myMap1 = new Map([["key1", "value1"], ["key2", "value2"]]);
var myMap2 = new Map(myMap1); 

console.log(original === clone); // 打印 false。 
// Map 对象构造函数生成实例，迭代出新的对象。
```

### 合并

```javascript
var first = new Map([[1, 'one'], [2, 'two'], [3, 'three']]);
var second = new Map([[1, 'uno'], [2, 'dos']]); 
// 合并两个 Map 对象时，如果有重复的键值，则后面的会覆盖前面的，
// 对应值即 uno，dos， three
var merged = new Map([...first, ...second]);
```
