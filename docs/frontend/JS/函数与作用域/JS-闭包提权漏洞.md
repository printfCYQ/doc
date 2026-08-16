# JS-闭包提权漏洞

```javascript
var o = (function () {
  var obj = {
    a: 1,
    b: 2
  }
  return {
    get: function (k) {
      return obj[k];
    }
  }
})()

// 如何在不改变上面代码的情况下 修改 obj 对象
```
```javascript
Object.defineProperty(Object.prototype, 'hack', {
    get() {
        return this
    }
})

console.log(o.get('a')); // 1

const obj = o.get('hack')
obj.a = 3

console.log(o.get('a')); // 3

```
```javascript
var o = (function () {
    var obj = {
        a: 1,
        b: 2
    }

    // Object.setPrototypeOf(obj, null) // 1. 将 obj 原型设置为 null

    return {
        get: function (k) {
            // 2. 不去 obj 原型链上找
            if (obj.hasOwnProperty(k)) {
                return obj[k]
            }
        }
    }
})()
```
