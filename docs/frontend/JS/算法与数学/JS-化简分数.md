# JS-化简分数

```javascript
function reduce(m, n) {
    let flag = false; // 正数/负数
    if (m * n > 0) {
      flag = true;
    }
    if (m * n < 0) {
      flag = false;
    }
    if (m * n === 0) {
      return "0/1";
    }
    m = Math.abs(m);
    n = Math.abs(n);
    var min = m > n ? n : m;
    for (let i = min; i >= 2; i--) {
      if (m % i == 0 && n % i == 0) {
        m = m / i;
        n = n / i;
      }
    }
    return (flag ? "" : "-") + m + "/" + n;
}
```
