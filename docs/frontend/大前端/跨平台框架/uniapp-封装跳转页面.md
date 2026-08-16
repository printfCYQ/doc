# uniapp-封装跳转页面

```javascript
/**
 * @description  跳转通用延迟模式
 * @param {String} path 路径
 * @param {String} type 跳转类型
 * @param {Object} params 参数
 * @return {}
 * */
const timedelay = 500;

export function navigationToPage(path, type, params) {
  let timeout = null;

  if (getApp().globalData.is_flag) {
    getApp().globalData.is_flag = false;
    switch (type) {
      // 关闭当前页面跳转
      case "redirectTo":
        uni.redirectTo({
          url: params ? path + makeQuery(params) : path,
        });
        timeout = setTimeout(() => {
          getApp().globalData.is_flag = true;
          clearTimeout(timeout);
        }, timedelay);
        break;
      // 关闭所有跳转
      case "reLaunch":
        uni.reLaunch({
          url: params ? path + makeQuery(params) : path,
        });
        timeout = setTimeout(() => {
          getApp().globalData.is_flag = true;
          clearTimeout(timeout);
        }, timedelay);
        break;
      default:
        console.log("default");
        uni.navigateTo({
          url: params ? path + makeQuery(params) : path,
        });
        timeout = setTimeout(() => {
          getApp().globalData.is_flag = true;
          clearTimeout(timeout);
        }, timedelay);
    }
  } else {
    console.log("请稍后跳转");
  }
}

/**
 * @description  obj转换url请求
 * @param {Object} queryObject 参数
 * */
export function makeQuery(queryObject) {
  const query = Object.entries(queryObject)
    .reduce((result, entry) => {
      result.push(entry.join("="));
      return result;
    }, [])
    .join("&");
  return `?${query}`;
}
```
