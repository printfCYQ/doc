# JS-sleep

```javascript
function pause(ms) {
  const start = new Date().getTime();
  while (new Date().getTime() < start + ms);
}
pause.prototype.then((fn) => fn());
console.log("Start");
pause(3000); // 将代码暂停 3 秒
console.log("End");
```
```javascript
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
sleep(3000).then(() => {
  console.log(1);
});
```
