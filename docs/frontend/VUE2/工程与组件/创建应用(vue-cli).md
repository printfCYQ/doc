# 创建应用(vue-cli)

> Vue.use 源码（src/core/global-api/use.js）

```javascript
export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}

```

## 创建应用(vue-cli)

```javascript
vue create vue2-pre-img-plugin
```

-   选择defult

​  

## 地址

[https://gitee.com/cyq459987870/vue2-pre-img-plugin/tree/master](https://gitee.com/cyq459987870/vue2-pre-img-plugin/tree/master)

  

## ​
