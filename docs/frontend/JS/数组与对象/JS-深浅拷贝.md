# JS-深浅拷贝

### 浅拷贝

> 如果原始对象的深层次数据发生改变，拷贝对象也会发生改变，因为他们保持了相同的引用

1.  ...

```javascript
const obj = {a:{b:1}}
const res = {...obj} 
```

2.  Object.assign()

```javascript
const obj = {a:{b:1}}
const res = Object.assign({},obj)
```

### 深拷贝

> 深拷贝对原戏象的所有层次的数据都进行了一次拷贝，原对象深层次数据发生改变，不会改变拷贝对象的值。

1.  JSON.parse(JSON.stringify(target))

> 缺陷：
> 
> -   1\. 忽略函数；
> -   2\. 忽略原型链；
> -   3.会忽略值是 undefined 的属性；
> -   4\. 当数据的层次很深，会栈溢出；

2.  手写深拷贝 —— 递归

> 缺陷：
> 
> -   1\. 循环引用待解决...

3.  structuredClone()

> [https://developer.mozilla.org/en-US/docs/Web/API/structuredClone#parameters](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone#parameters)

```javascript
function deepCloneFunction(target) {
    if (structuredClone(target)) {
        console.log("structuredClone");
        return structuredClone(target);
    } else {
        console.log("deepClone");
        return deepClone(target);
    }
}
function getType(target) {
    return Object.prototype.toString.call(target).slice(8, -1);
}
function deepClone(target) {
    // 处理 原始值 null、undefined、number、string、symbol、bigInt、boolean
    if (typeof target !== "object" || target === null) {
        return target;
    }
    // 处理 array
    if (Array.isArray(target)) {
        return target.map((e) => deepClone(e));
    }
    // 处理 function
    if (getType(target) === "Function") {
        return eval(`(${target.toString()})`).bind(this); 
        // function 声明需要用"("、")"包裹
    }
    // 拷贝日期
    if (getType(target) === "Date") {
        return new Date(target.valueOf());
    }
    // 拷贝正则
    if (getType(target) === "RegExp") {
        return new RegExp(target);
    }
    // 处理 map
    if (getType(target) === "Map") {
        let map = new Map();
        target.forEach((v, k) => {
            map.set(k, deepClone(v));
        });
        return map;
    }
    // 处理 set
    if (getType(target) === "Set") {
        let set = new Set();
        for (let val of target.values()) {
            set.add(deepClone(val));
        }
        return set;
    }
    // 处理 object
    if (getType(target) === "Object") {
        let cloneTarget = {};
        for (let key in target) {
            cloneTarget[key] = deepClone(target[key]);
        }
        return cloneTarget;
    }
    return target;
}
```
```javascript
const deepClone = (origin, hashMap = new WeakMap()) => {
  // 处理 原始值 null、undefined、number、string、symbol、bigInt、boolean
  if (typeof origin !== "object" || origin === null) {
    return origin;
  }
  // 拷贝日期
  if (origin instanceof Date) {
    return new Date(origin.valueOf());
  }
  // 拷贝正则
  if (origin instanceof RegExp) {
    return new RegExp(origin);
  }

  // 解决循环引用
  const hashKey = hashMap.get(origin);
  if (hashKey) return hashKey;

  const target = new origin.constructor();
  
  hashMap.set(origin, target);

  for (let k in origin) {
    if (origin.hasOwnProperty(k)) {
      target[k] = deepClone(origin[k], hashMap);
    }
  }
  return target;
};

let test1 = {};
let test2 = {};
test2.test1 = test1;
test1.test2 = test2;
console.log(deepClone(test2));
```
```javascript
function deepClone(obj) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port1.postMessage(obj);
    port2.onmessage = (msg) => {
      resolve(msg.data);
    };
  });
}
```
