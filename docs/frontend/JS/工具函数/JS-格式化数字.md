# JS-格式化数字

```javascript
let str = "100000000";
const reg = /(?=\B(\d{3})+$)/g;
const res = str.replaceAll(reg, ",");
console.log(res); // 100,000,000
```
