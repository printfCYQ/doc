# JS-手写Promise.all

```javascript
Promise.myAll = function (proms) {
  return new Promise((resolve, reject) => {
    const promsArray = Array.from(proms);
    const results = [];
    let completed = 0;

    if (promsArray.length === 0) {
      resolve(results);
      return;
    }

    for (let i = 0; i < promsArray.length; i++) {
      Promise.resolve(promsArray[i]).then((data) => {
        results[i] = data;
        completed++;

        if (completed === promsArray.length) {
          resolve(results);
        }
      }).catch(reject);
    }
  });
};

// 示例用法
Promise.myAll([
  Promise.resolve('resolved'),
  Promise.reject('rejected'),
  3,
  Promise.resolve('another resolved')
]).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});

```
```javascript
Promise.myAll = function (proms) {
    let res, rej;

    const p = new Promise((resolve, reject) => {
        res = resolve
        rej = reject
    })

    let i = 0;
    let count = 0;
    const result = [];
    // proms 可能是任意可叠戴对象
    for (let prom of proms) {
        const index = i
        i++;

        Promise.resolve(prom).then((data) => {
            result[index] = data; // 1. 完成的数据汇总到最终结果
            count++;

            // 2. 判断是否全部完成
            if (count === i) {
                res(result)
            }
        }, rej);
    }

    if (i === 0) res([])

    return p;
}

Promise.myAll([1, Promise.reject(1)]).then(res => {
    console.log(res);
}, err => {
    console.log(err);
})

```
