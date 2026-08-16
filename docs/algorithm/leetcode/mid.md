## 62.不同路径

> `dp(i, j)`表示到达第i行第j列共有多少条路径
> 
> 【到每一个格子, 只能是从上到下，或者从左到右。】
> 
> 状态方程：`dp(i, j) = dp(i - 1, j) + dp(i, j - 1)`
> 
> 当 `i == 0 || j == 0`时 `dp(i, j) = 1`
```javascript
var uniquePaths = function (m, n) {
  const cache = new Map();
  const dp = (i, j) => {
    if (i === 0 || j === 0) return 1;
    const key = `${i}-${j}`;
    if (cache.has(key)) {
      return cache.get(key);
    } else {
      cache.set(key, dp(i, j - 1) + dp(i - 1, j));
      return cache.get(key);
    }
  };
  return dp(m - 1, n - 1);
};
const m = 3,
  n = 7;
console.log(uniquePaths(m, n));
```
```javascript
var uniquePaths = function (m, n) {
  const dp = [];
  for (let i = 0; i < m; i++) {
    dp.push([]);
    for (let j = 0; j < n; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 1;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }
  return dp[m - 1][n - 1];
};
const m = 3,
  n = 7;
console.log(uniquePaths(m, n));
```
```javascript
var uniquePaths = function (m, n) {
  const dp = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }
  return dp[n - 1];
};
const m = 3,
  n = 7;
console.log(uniquePaths(m, n));
```

## 64.最小路径和

> `dp(i, j)`表示到达第i行第j列的数字和
> 
> 状态方程：`dp(i, j) = Math.min(dp(i - 1, j), dp(i, j - 1)) + grid[i][j]`
> 
> 当 `i == 0 || j == 0`时 `dp(i, j) = grid[i][j]`

## 198.打家劫舍

> **求最优解：找局部性的最优解**
> 
> `dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1])`
> 
> 当 `i === 0` `dp[i] = nums[0]`
> 
> 当 `i === 1` `dp[i] = Math.max(num[0], nums[1])`
