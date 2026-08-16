# JS-获取数组的所有子集

```javascript
/*
* 获取数组的所有子集(包含空数组)
* @param nums Array 原数组
* ex: getAllSubsets([1,2,3])
*/
var getAllSubsets = function (nums) {
  let res = [],
      len = nums.length;
  for (let i = 0; i < 1 << len; i++) {
    let arr = [];
    for (let j = 0; j < len; j++) {
      if (i & (1 << j)) arr.push(nums[j]);
    }
    res.push(arr);
  }
  return res;
};

// -----
[]
[1]
[2]
[1, 2]
[3]
[1, 3] 
[2, 3]
[1, 2, 3]
```
```javascript
var subsets = function(nums) {
  const t = [];
  const ans = [];
  const dfs = (cur) => {
    if (cur === nums.length) {
      ans.push(t.slice());
      return;
    }
    t.push(nums[cur]);
    dfs(cur + 1);
    t.pop(t.length - 1);
    dfs(cur + 1);
  }
  dfs(0);
  return ans;
};
```
