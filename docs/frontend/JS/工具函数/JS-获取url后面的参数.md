# JS-获取url后面的参数

```javascript
/**
 *
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href; exp: "https://example.com?foo=1&bar=2"
 * @return {Object}
 */
const getAllParams = (url) => {
  url = url ?? window.location.href;
  if (URLSearchParams) {
    const Url = new URL(url);
    const paramsMap = new URLSearchParams(Url.search); // 返回的是一个map对象
    return Object.fromEntries(paramsMap); // map ---> object
  } else {
    const paramArr = url.slice(url.indexOf("?") + 1).split("&");
    const params = {};
    paramArr.map((param) => {
      const [key, val] = param.split("=");
      params[key] = decodeURIComponent(val);
    });
    return params;
  }
};

const params = getAllParams(url);
console.log(params); // { foo: '1', bar: '2' }
```
