# JS-反转数字

```javascript
function rev(num) {
  let res = 0;
  while (num) {
    res = res * 10 + (num % 10);
    num = Math.floor(num / 10);
  }
  return res;
}
console.log(rev(3123)); // 3213
```
