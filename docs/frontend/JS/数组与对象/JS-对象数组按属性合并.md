# JS-对象数组按属性合并

```javascript
const a = [{ deviceId: "111" }, { deviceId: "111" }, { deviceId: "222" }];
const b = [{ 111: "密码1" }, { 222: "密码2" }];
const c = a.map((item) => {
  return {
    ...item,
    password: Object.entries(
      b.filter((i) => {
        return Object.keys(i)[0] === item.deviceId;
      })[0]
    )[0][1],
  };
});
console.log(c);
// [
//   { deviceId: "111", password: "密码1" },
//   { deviceId: "111", password: "密码1" },
//   { deviceId: "222", password: "密码2" },
// ];
```
