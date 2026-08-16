# JS-随机数组(Fisher-Yates)

```javascript
function generateRandomArray(len, min, max) {
  const range = Array.from({length: max - min + 1}, (_, index) => index + min);
  for (let i = range.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [range[i], range[j]] = [range[j], range[i]];
  }
  const result = range.slice(0, len);
  return result;
}

const len = 100;
const min = 0;
const max = 200;

const randomArray = generateRandomArray(len, min, max);
console.log(randomArray);
```
