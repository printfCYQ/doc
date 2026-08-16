# JS-获取文件路径的文件名

```javascript
let str = "/storage/emulated/0/Geetest/sensebot_log.txt";
// 获取文件名
function getFileName(name) {
  let s = name.substring(0, name.lastIndexOf("."));
  return s.substring(s.lastIndexOf("/") + 1);
}
// 获取 .后缀名
function getExtension(name) {
  return name.substring(name.lastIndexOf("."));
}
// 只获取后缀名
function getExtension1(name) {
  return name.substring(name.lastIndexOf(".") + 1);
}
console.log(getFileName(str));
console.log(getExtension(str));
console.log(getExtension1(str));
```
