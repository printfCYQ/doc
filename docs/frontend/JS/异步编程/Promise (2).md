# Promise

```html
({}).toString().call()
```
```javascript
const getType = (param) => {
  return Object.prototype.toString.call(param).slice(8, -1);
};

const isNumber = (param) => { return "Number" === getType(param) };

const isString = (param) => { return "String" === getType(param) };

const isBoolean = (param) => { return "Boolean" === getType(param) };

const isNull = (param) => { return "Null" === getType(param) };

const isUndefined = (param) => { return "Undefined" === getType(param) };

const isSymbol = (param) => { return "Symbol" === getType(param) };

const isBigInt = (param) => { return "BigInt" === getType(param) };

const isObject = (param) => { return "Object" === getType(param) };

const isFunction = (param) => { return "Function" === getType(param) };

const isArray = (param) => { return "Array" === getType(param) };

const isDate = (param) => { return "Date" === getType(param) };

const isRegExp = (param) => { return "RegExp" === getType(param) };

const isJSON = (param) => { return "JSON" === getType(param) };

const isError = (param) => { return "Error" === getType(param) };
```
```javascript
const typeOfTest = (type) => (thing) => typeof thing === type;

const isUndefined = typeOfTest("undefined");
const isString = typeOfTest("string");
const isFunction = typeOfTest("function");
const isNumber = typeOfTest("number");
const isRealNumber = (thing) =>
  Number.isNaN(thing) ? false : typeOfTest("number")(thing);

const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;

```

## Promise

```javascript
const res = new Promise((resolve, reject) => {
  resolve(1);
});

console.log(res instanceof Promise);
console.log(getType(res) === "Promise");
console.log(res.__proto__.constructor === Promise);
```

## Array

```javascript
const arr = [1, 2, 3];

console.log(Array.isArray(arr));
console.log(getType(arr) === "Array");
console.log(arr instanceof Array);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.constructor === Array);
```
