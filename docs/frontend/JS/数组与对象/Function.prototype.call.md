# Function.prototype.call

## Function.prototype.call

-   call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

```javascript
Function.prototype._call = function (ctx, ...args) {
  // 如果不为空，则需要进行对象包装
  const o = ctx == undefined ? window : Object(ctx)
  // 给 ctx 添加独一无二的属性
  const key = Symbol()
  o[key] = this
  // 执行函数，得到返回结果
  const result = o[key](...args "key")
  // 删除该属性
  delete o[key]
  return result
}

const obj = {
  name: '11',
  fun() {
    console.log(this.name)
  }
}

const obj2 = { name: '22' }
obj.fun() // 11
obj.fun.call(obj2) // 22
obj.fun._call(obj2) // 22
```
```javascript
Function.prototype.myCall = function (ctx) {
  ctx = ctx ? Object(ctx) : window;
  ctx.originFn = this;

  var args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push("arguments[" + i + "]");
  }

  var ret = eval("ctx.originFn(" + args + ")");
  delete ctx.originFn;
  return ret;
};
```

## Function.prototype.bind

-   bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```javascript
const obj = {
  name: '11',
  fun() {
    console.log(this.name)
  }
}
Function.prototype._bind = function (ctx, ...args) {
  // 获取函数体
  const _self = this
  // 用一个新函数包裹，避免立即执行
  const bindFn = (...reset) => {
    return _self.call(ctx, ...args, ...reset)
  }
  return bindFn
}
const obj2 = { name: '22' }
obj.fun() // 11
const fn = obj.fun.bind(obj2)
const fn2 = obj.fun._bind(obj2)
fn() // 22
fn2() // 22
```
```javascript
Function.prototype.myBind = function (ctx) {
  var originFn = this;
  var args = [].slice.call(arguments, 1);
  var _tempFn = function () {};

  var newFn = function () {
    var newArgs = [].slice.call(arguments);
    return originFn.apply(
      this instanceof newFn ? this : ctx,
      args.concat(newArgs)
    );
  };

  _tempFn.prototype = this.prototype;
  newFn.prototype = new _tempFn();
  return newFn;
};
```

## Function.prototype.apply

```javascript
Function.prototype.myApply = function (ctx, args) {
  ctx = ctx ? Object(ctx) : window;
  ctx.originFn = this;

  if (
    args &&
    typeof args !== "object" &&
    typeof args !== "function"
  ) {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  }

  if (!Array.isArray(args)) {
    return ctx.originFn();
  }

  var ret = eval("ctx.originFn(" + args + ")");
  delete ctx.originFn;
  return ret;
};
```

## call、bind、apply

```html
<script>
  Function.prototype.myCall = function (ctx) {
    ctx = ctx ? Object(ctx) : window;
    ctx.originFn = this;

    var args = [];
    for (let i = 1; i < arguments.length; i++) {
      args.push("arguments[" + i + "]");
    }

    var ret = eval("ctx.originFn(" + args + ")");
    delete ctx.originFn;
    return ret;
  };

  Function.prototype.myApply = function (ctx, args) {
    ctx = ctx ? Object(ctx) : window;
    ctx.originFn = this;

    if (args && typeof args !== "object" && typeof args !== "function") {
      throw new TypeError("CreateListFromArrayLike called on non-object");
    }

    if (!Array.isArray(args)) {
      return ctx.originFn();
    }

    var ret = eval("ctx.originFn(" + args + ")");
    delete ctx.originFn;
    return ret;
  };

  Function.prototype.myBind = function (ctx) {
    var originFn = this;
    var args = [].slice.call(arguments, 1);
    var _tempFn = function () {};

    var newFn = function () {
      var newArgs = [].slice.call(arguments);
      return originFn.apply(
        this instanceof newFn ? this : ctx,
        args.concat(newArgs)
      );
    };

    _tempFn.prototype = this.prototype;
    newFn.prototype = new _tempFn();
    return newFn;
  };

  function test(a, b, c) {
    console.log(this);
    console.log(a, b, c);
  }

  console.log("------call-------");
  test.call({ a: 1 }, "q", "w");

  console.log("------myCall-------");
  test.myCall({ a: 1 }, "q", "w");

  console.log("------apply-------");
  test.apply({ a: 1 }, [1, 2, 3]);

  console.log("------myApply-------");
  test.myApply({ a: 1 }, [1, 2, 3]);

  console.log("-------bind------");
  let t1 = test.bind({ b: 1 }, 1, 2); // 不会执行
  t1(3); // 执行

  console.log("-------myBind------");
  let t2 = test.bind({ bb: 1 }, 1, 2); // 不会执行
  t2(6); // 执行
</script>
```
