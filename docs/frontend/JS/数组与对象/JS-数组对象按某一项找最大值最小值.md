# JS-数组对象按某一项找最大值最小值

```javascript
/*
 * @params {array} list - 需要处理的数组
 * @params {string} field - 按哪个字段查找
 * @params {number} limit - 最大【0】默认||最小【1】
 * @params {number} onlyField - 只返回查找的field【0】默认||返回全部字段【1】
 *
 * @example
 * const list = [
 *  { id: 1, name: "jack" },
 *  { id: 2, name: "may" },
 *  { id: 3, name: "shawn" },
 *  { id: 4, name: "tony" },
 * ];
 * console.log(findItemByField(list, "id", 1, 1)); //===> { id: 1, name: "jack" }
 * console.log(findItemByField(list, "id", 0, 1)); //===> { id: 4, name: "tony" }
 * console.log(findItemByField(list, "id", 1, 0)); //===> 1
 * console.log(findItemByField(list, "id", 0, 0)); //===> 4
 *
 * */
const list = [
  { id: 1, name: "jack" },
  { id: 2, name: "may" },
  { id: 3, name: "shawn" },
  { id: 4, name: "tony" },
];

const findItemByField = (list, field, limit = 0, onlyField = 0) => {
  let item = list.reduce((p, v) => {
    return (limit ? p[field] > v[field] : p[field] < v[field]) ? v : p;
  });
  return onlyField ? item : item[field];
};

console.log(findItemByField(list, "id", 1, 1)); //===> { id: 1, name: "jack" }
console.log(findItemByField(list, "id", 0, 1)); //===> { id: 4, name: "tony" }
console.log(findItemByField(list, "id", 1, 0)); //===> 1
console.log(findItemByField(list, "id", 0, 0)); //===> 4
```
