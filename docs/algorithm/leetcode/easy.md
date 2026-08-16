## 70.爬楼梯

[https://leetcode.cn/problems/climbing-stairs/](https://leetcode.cn/problems/climbing-stairs/)

​  

> 斐波那契数列
> 
> `f(x) = f(x − 1) + f(x − 2)`
```javascript
var climbStairs = function(n) {
    let p = 0, q = 0, r = 1;
    for (let i = 1; i <= n; ++i) {
        p = q;
        q = r;
        r = p + q;
    }
    return r;
};
```
