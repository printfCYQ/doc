# generator

```typescript
let arr = [1, 2, 3];
function* generator(arr) {
  for (let v of arr) {
    yield v;
  }
}
let iterator = generator(arr);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

function myGenerator(arr) {
  let nextIndex = 0;
  return {
    next() {
      return nextIndex < arr.length
        ? { value: arr[nextIndex++], done: false }
        : { value: undefined, done: true };
    },
  };
}
let iterator1 = myGenerator(arr);
console.log(iterator1.next()); // {value: 1, done: false}
console.log(iterator1.next()); // {value: 2, done: false}
console.log(iterator1.next()); // {value: 3, done: false}
console.log(iterator1.next()); // {value: undefined, done: true}
```
