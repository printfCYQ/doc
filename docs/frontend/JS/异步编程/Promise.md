# Promise

> promise 解决异步回调地狱

  

-   Promise(承诺)，给予调用者一个承诺，过一会返回数据给你，就可以创建一个promise对象
-   当我们new一个promise，此时我们需要传递一个回调函数，这个函数为立即执行的，称之为（executor）
-   这个回调函数，我们需要传入两个参数回调函数，reslove,reject(函数可以进行传参)

-   当执行了reslove函数，会回调promise对象的.then函数
-   当执行了reject函数，会回调promise对象的.catch函数

  

> 早期解决异步问题的方法

```javascript
function requestData(url, successCB, failureCB) {
  setTimeout(() => {
    if (url) {
      successCB(); // 成功回调
    } else {
      failureCB(); // 失败回调
    }
  }, 3000);
}

requestData(
  "xxx",
  () => {
    console.log("success");
  },
  () => {
    console.log("failure");
  }
);
```

​  

> promise 方式

```javascript
function requestData(url) {
  return new Promise((resolve, reject) => {
    if (url) {
      resolve();
    } else {
      reject();
    }
  });
}

requestData("xxx")
  .then((res) => {
    console.log(res); // 成功
  })
  .catch((err) => {
    console.log(err); // 失败
  });
```

  

### promise 状态

> 状态只要从待定状态，变为其他状态，则状态不能再改变

-   pending(待定)，执行了executor，状态还在等待中，没有被兑现，也没有被拒绝
-   fulfilled(已兑现)，执行了resolve函数则代表了已兑现状态
-   rejected(已拒绝)，执行了reject函数则代表了已拒绝状态

  

> 无论promise状态是fulfilled还是rejected都会执行一次finally方法

```javascript
requestData("xxx")
  .then((res) => {
    console.log(res); // 成功
  })
  .catch((err) => {
    console.log(err); // 失败
  })
  .finally(() => {
    console.log("finally");
  });
```

  

> 如果resolve里是另一个Promise,,,那么这个新Promise会决定原Promise的状态

```javascript
const promise = new Promise((resolve, reject) => {
  resolve(new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('aaa')
    }, 3000);
  }))
})

promise.then(res => console.log(res))

//3s后 aaa
```

### ajax

```javascript
function ajax(url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.responseText);
        }
      }
    };
  });
}
```

  

### Promise中的类方法/静态方法

#### Promise.reslove

> 已经预知了状态的结果为fulfilled

> 返回值是一个promise对象

```javascript
let res = Promise.resolve('aaa')
//等价于
let res = new Promise((resolve, reject) => resolve('aaa'))
```
---

#### Promise.reject

> 已经预知了状态的结果为rejected

```javascript
let err = Promise.reject('aaa error')
//等价于
let err = new Promise((resolve, reject) => reject('aaa error'))
```
---

#### Promise.all

> fulfilled状态

-   all方法的参数传入为一个可迭代对象，返回一个promise，只有都为resolve状态的时候才会调用.then方法。
-   只要有一个promise的状态为rejected，则会回调.catch方法

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("1");
  }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("2");
  }, 2000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("3");
  }, 3000);
});

Promise.all([promise1, promise2, promise3]).then((res) => console.log(res));

//[ '1', '2', '3' ]
```

> rejected状态

-   当遇到rejectd的时候，后续的promise结果我们是获取不到，并且会把reject的实参，传递给catch的err形参中

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("1");
  }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("2 err");
  }, 2000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("3");
  }, 3000);
});

Promise.all([promise1, promise2, promise3])
  .then((res) => console.log(res)) // 不会打印
  .catch((err) => console.log(err)); // 2 err

```

#### Promise.allSettled

> 和`all`对比：无论状态是fulfilled/rejected都会把参数返回

-   所有promise都有结果, fulfilled/rejected

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("1");
  }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("2 err");
  }, 2000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("3");
  }, 3000);
});

Promise.allSettled([promise1, promise2, promise3])
  .then((res) => console.log(res))
// [
//   { status: 'rejected', reason: '1' },
//   { status: 'fulfilled', value: '2 err' },
//   { status: 'rejected', reason: '3' }
// ]
```

-   有promise没有结果 则什么都结果都拿不到

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("1");
  }, 1000);
});

const promise2 = new Promise(() => { });

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("3");
  }, 3000);
});

Promise.allSettled([promise1, promise2, promise3])
  .then((res) => console.log(res)) // 什么都不打印
```

#### Promise.race

> 优先获取第一个返回的结果，无论结果是fulfilled还是rejectd

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("1");
  }, 2000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("2 err");
  }, 1000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("3");
  }, 3000);
});

Promise.race([promise1, promise2, promise3])
  .then((res) => console.log(res))
  .catch((err) => console.log(err)) // 2 err
```

#### Promise.any

> 只获取第一个状态为`fulfilled`，如果全部为`rejected`则报错`AggregateError`

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("1");
  }, 2000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("2 err");
  }, 1000);
});

// eslint-disable-next-line no-unused-vars
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("3");
  }, 3000);
});

Promise.any([promise1, promise2, promise3])
  .then((res) => console.log(res)) // 1
  .catch((err) => console.log(err))
```

  

```javascript
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

Promise.prototype.finally = function (callback) {
  return this.then(
    (value) => Promise.resolve(callback()).then(() => value),
    (reason) => Promise.resolve(callback()).then(() => { throw reason })
  )
}

Promise.resolve = function (value) {
  if (value instanceof Promise) return value

  if (isPromiseLike(value)) {
    return new Promise((resolve, reject) => {
      value.then(resolve, reject)
    })
  }
  return new Promise((resolve) => resolve(value))
}

const isPromiseLike = (obj) => {
  return obj && typeof obj.then === 'function'
}

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => reject(reason))
}
```

### Promise 回调地狱

```javascript
requestData('1').then(res => {
  requestData(`2 ${res}`).then(res => {
    requestData(`3 ${res}`).then(res => {
      console.log(res)
    })
  })
})
```

\`

> generator 函数

```javascript
function* getData(url) {
  const res1 = yield requestData(url)
  const res2 = yield requestData(res1)
  const res3 = yield requestData(res2)
  console.log(res3)
}

const generator = getData('1')

generator.next().value.then(res1 => {
  generator.next(`2 ${res1}`).value.then(res2 => {
    generator.next(`3 ${res2}`).value.then(res3 => {
      generator.next(res3)
    })
  })
})
```

> 自动化执行

```javascript
function* getData() {
  const res1 = yield requestData('1')
  const res2 = yield requestData(`2 ${res1}`)
  const res3 = yield requestData(`3 ${res2}`)

  console.log(res3)
}

//自动化执行 async await相当于自动帮我们执行.next
function asyncAutomation(genFn) {
  const generator = genFn()

  const _automation = (result) => {
    let nextData = generator.next(result)
    if(nextData.done) return

    nextData.value.then(res => {
      _automation(res)
    })
  }

  _automation()
}

asyncAutomation(getData)
```

> async / await

```javascript
async function getData() {
  const res1 = await requestData('1')
  const res2 = await requestData(`2 ${res1}`)
  const res3 = await requestData(`3 ${res2}`)

  console.log(res3)
}

getData()
```

### 手写promise

#### base

```javascript
const PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED";
class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;

        // 发布
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;

        // 发布
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
    // 处理异步问题
    if (this.status === PENDING) {
      // 订阅
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

let promise = new MyPromise((resolve, reject) => {
  // resolve(1);
  // reject(2);
  // throw new Error(3);

  setTimeout(() => {
    resolve(4);
  }, 2000);
});
promise.then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.warn(reason);
  }
);
```

#### 链式调用、then\\catch

```javascript
const PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED";

// x 的值可能是promise 也可能是一个普通值
function resolvePromise(promise2, x, resolve, reject) {
  // 死循环
  if (promise2 === x) {
    return reject(
      new TypeError("chaining cycle detected for promise #<Mypromise>")
    );
  }

  let called = false;

  if (
    (typeof x === "object" && typeof x !== "null") ||
    typeof x === "function"
  ) {
    try {
      let then = x.then;
      // promise
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            // resolve(y);
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}
class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;

    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;

        // 发布
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;

        // 发布
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    // new 执行
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
      ? onRejected
      : (reason) => {
        throw reason;
      };
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      // 处理异步问题
      if (this.status === PENDING) {
        // 订阅
        this.onFulfilledCallbacks.push(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
    return promise2;
  }

  catch(errorCallback) {
    return this.then(null, errorCallback);
  }
}
```
```javascript
const PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED";

class MyPromise {
  constructor(executor) {
    this.state = PENDING; // 初始化state为等待态
    this.value = undefined; // 成功的值
    this.reason = undefined; // 失败的原因
    this.onResolvedCallbacks = []; // 成功存放的数组
    this.onRejectedCallbacks = []; // 失败存放法数组
    let resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn()); // 一旦resolve执行，调用成功数组的函数
      }
    };
    let reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn()); // 一旦reject执行，调用失败数组的函数
      }
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
      ? onRejected
      : (err) => {
        throw err;
      };
    let promise2 = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.state === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
  catch(fn) {
    return this.then(null, fn);
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }
  let called;
  if (x != null && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (err) => {
            if (called) return;
            called = true;
            reject(err);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}
//resolve方法
MyPromise.resolve = function (val) {
  return new MyPromise((resolve, reject) => {
    resolve(val);
  });
};
//reject方法
MyPromise.reject = function (val) {
  return new MyPromise((resolve, reject) => {
    reject(val);
  });
};
//race方法
MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  });
};
//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
MyPromise.all = function (promises) {
  let arr = [];
  let i = 0;
  function processData(index, data) {
    arr[index] = data;
    i++;
    if (i == promises.length) {
      resolve(arr);
    }
  }
  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then((data) => {
        processData(i, data);
      }, reject);
    }
  });
};
```
