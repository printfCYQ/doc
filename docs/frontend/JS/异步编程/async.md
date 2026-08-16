# async

```javascript
function generatorToAsync(generatorFun) {
  return function () {
    const gen = generatorFun.apply(this, arguments);
    return new Promise((resolve, reject) => {
      function step(key, arg) {
        let res;
        try {
          res = gen[key](arg);
        } catch (error) {
          return reject(error);
        }
        const { value, done } = res;
        if (done) {
          return resolve(value);
        } else {
          return Promise.resolve(value).then(
            (val) => step("next", val),
            (err) => step("throw", err)
          );
        }
      }
      step("next"); // 首次执行
    });
  };
}
```
