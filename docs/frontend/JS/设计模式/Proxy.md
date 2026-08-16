# Proxy

```javascript
const queuedObservers = new Set();

const observe = (fn) => queuedObservers.add(fn);
const observable = (obj) => new Proxy(obj, { set });

function set(target, key, value, receiver) {
  console.log(target, key, value, receiver);
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach((observer) => observer());
  return result;
}
```
```javascript
/**
 * 实例：使用 Proxy 实现观察者模式
 */
const person = observable({
    name: '张三',
    age: 20
});

function print() {
    console.log(`${person.name}, ${person.age}`)
}

function say() {
    console.log(`我是${person.name}，今年${person.age}`);
}

var funcList = new Set();

observe(print);
observe(say);

person.name = '李四';

person.name = "Clig";

// 输出
// 李四, 20

/**
 * 观察者模式方法
 * @param {*} obj 
 */
function observable(obj) {
    let target = obj || {};
    let handler = {
        set: function (tar, key, value) {
            funcList.forEach(v => v());
            Reflect.set(tar, key, value);
        }
    }
    let res = new Proxy(target, handler);
    return res;
}

/**
 * 添加观察者方法
 * @param {*} fun 
 */
function observe(func) {
    funcList.add(func);
}
```
