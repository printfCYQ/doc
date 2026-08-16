# 对象for...of

```javascript
let jane = { first: "Jane", last: "Doe" };

function* objectEntries1(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

for (let [key, value] of objectEntries1(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe

function* objectEntries2() {
  let propKeys = Object.keys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

jane[Symbol.iterator] = objectEntries2;

for (let [key, value] of jane) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```
