# Set

## 新建

### 创建一个空集合

```javascript
const s = new Set();
```

### 初始化实例

> Set 可以包含任何 JavaScript 数据类型作为值

```javascript
const s = new Set(["val1", 1, true, {}, undefined, function fun() {}]);
```

> Set 结构 不会添加重复的值

```javascript
const s = new Set([1, 1, 2, 3, 4, 4, 5, 6, 7, 4, 2, 1]);
console.log(s);
```



> Set 解决数组去重

```javascript
const arr = [1, 2, 3, 3, 4, 5, 4, 4, 2, 1, 3];
Array.from(new Set(arr)); // [1, 2, 3, 4, 5]
```

## 转数组

```javascript
const s = new Set([1, 2, 3]);
Array.from(s); // [1, 2, 3]
```

## 属性/方法

### size

> Set 实例 的元素个数

```javascript
const s = new Set([1, 2, 3]);
console.log(s.size); // 3
```

### add

> 向 Set 内添加元素

```javascript
const s = new Set();
s.add(1).add(2).add(3);
Array.from(s); // [1, 2, 3]
```

### clear

> 清空 Set

```javascript
const s = new Set([1, 2, 3]);
s.clear();
```

### delete

> 删除 Set 中的元素

```javascript
const s = new Set([1, 2, 3]);
s.delete(2);
```

### has

> 判断 Set 中是否存在目标值

```javascript
const s = new Set([1, 2, 3]);
let res = s.has(2); // true
```

### forEach

> 迭代方法

```javascript
function logSetElements(value1, value2, set) {
  console.log(`s[${value1}] = ${value2}`);
}

new Set(['foo', 'bar', undefined]).forEach(logSetElements);

// expected output: "s[foo] = foo"
// expected output: "s[bar] = bar"
// expected output: "s[undefined] = undefined"

```

### entries

> 返回键值对的遍历器

```javascript
let s = new Set([1,2,3])
for(let item of s.entries()) {
    console.log(item) // [1,1] [2,2] [3,3]
}
```

### values

> 返回键值的遍历器

```javascript
let s = new Set([1,2,3])
for(let item of s.values()) {
    console.log(item) // 1 2 3
}
```

### keys

> 返回键名的遍历器

```javascript
let s = new Set([1,2,3])
for(let item of s.keys()) {
    console.log(item) // 1 2 3
}
```
