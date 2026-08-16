# JS-乱序数组

> 洗牌

```javascript
/**
* 乱序数组
* @param array Array 数组
* ex: randomArray([1,2,3])
*/
function randomArray(array = []) {
  const temp = array.concat();
  for (let i = 0; i < temp.length; i++) {
    const idx = Math.floor(Math.random() * (temp.length - i)) + i;
    [temp[idx], temp[i]] = [temp[i], temp[idx]];
  }
  return temp;
}
```
