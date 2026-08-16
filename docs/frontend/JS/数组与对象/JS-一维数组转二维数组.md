# JS-一维数组转二维数组

```javascript
const groupList = (array, subGroupLength) => {
  let index = 0;
  let newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)));
  }
  return newArray;
};

const nums = [3, 3, 3, 1, 1, 1, 1, 2, 2];
console.log(groupList(nums, 3));
```
