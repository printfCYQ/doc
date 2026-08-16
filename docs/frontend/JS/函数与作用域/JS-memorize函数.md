# JS-memorize函数

```javascript
function memorize() { }

var object = { a: 1, b: 2 }
var other = { c: 3, d: 4 }

var values = memorize((obj) => Object.values(obj));
console.log(values(object)); // [ 1, 2 ]

console.log(values(other)); // [ 3, 4 ]

object.a = 2;
console.log(values(object)); // [ 1, 2 ]

values.cache.set(object, ['a', 'b']);
console.log(values(object)); // [ 'a', 'b' ]

```
```javascript
class MemorizeMap {
    constructor() {
        this._normalMap = new Map();
        this._objectMap = new WeakMap();
    }

    _isObject(key) {
        return key !== null && typeof key === 'object';
    }

    get(key) {
        if (this._isObject(key)) {
            return this._objectMap.get(key);
        } else {
            return this._normalMap.get(key);
        }
    }

    set(key, value) {
        if (this._isObject(key)) {
            this._objectMap.set(key, value);
        } else {
            this._normalMap.set(key, value);
        }
    }

    has(key) {
        if (this._isObject(key)) {
            return this._objectMap.has(key);
        } else {
            return this._normalMap.has(key);
        }
    }
}

function memorize(fn, resolver) {
    function memorized(...args) {
        const key = resolver ? resolver(...args) : args[0];
        if (memorized.cache.has(key)) {
            return memorized.cache.get(key);
        }
        const result = fn.apply(this, args);
        memorized.cache.set(key, result);
        return result;
    }
    memorized.cache = new MemorizeMap();
    return memorized;
}

var object = { a: 1, b: 2 }
var other = { c: 3, d: 4 }

var values = memorize((obj) => Object.values(obj));
console.log(values(object)); // [ 1, 2 ]

console.log(values(other)); // [ 3, 4 ]

object.a = 2;
console.log(values(object)); // [ 1, 2 ]

values.cache.set(object, ['a', 'b']);
console.log(values(object)); // [ 'a', 'b' ]
```
