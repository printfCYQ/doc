# new

-   在调⽤ new 的过程中会发⽣以上四件事情
-   new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

```javascript
function create() {
  // 1.创建⼀个空的对象
  let obj = new Object();
  // 2.获得构造函数
  let Con = [].shift.call(arguments);
  // 链接到原型
  obj.__proto__ = Con.prototype;
  // 3.绑定 this，执⾏构造函数
  let result = Con.apply(obj, arguments);
  // 4.确保 new 出来的是个对象
  return typeof result === "object" ? result : obj;
}

function person(name, age) {
  this.name = name;
  this.age = age;
}
let p = create(person, "布兰", 12);
console.log(p); // { name: '布兰', age: 12 }
```
```javascript
const _new = function(constructor) {
  // 创建一个空对象
  const obj = {}
  // 原型链挂载
  obj.__proto__ = constructor.prototype;
  // 将obj 复制给构造体中的 this，并且返回结果
  const result = constructor.call(obj)
  // 如果返回对象不为一个对象则直接返回刚才创建的对象
  return typeof result === 'object' && result !== null ? : result : obj
}
```
