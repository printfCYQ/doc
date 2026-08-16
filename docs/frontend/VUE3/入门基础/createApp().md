# createApp()

##   

## createApp()

-   创建应用程序实例。

```javascript
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
```

## createSSRApp()

-   在SSR模式下创建应用实例。使用方法与createApp()完全相同。

## app.mount()

-   在容器元素中装载应用程序实例。

```javascript
import { createApp } from 'vue'
const app = createApp(/* ... */)

app.mount('#app')
```
```javascript
app.mount(document.body.firstChild)
```

## app.unmount()

-   卸载已挂载的应用实例，触发应用程序组件树中所有组件的卸载生命周期钩子。

## app.provide()

-   提供一个可以注入到应用程序中的所有子代组件中的值。
-   期望注入键作为第一个参数，而提供的值作为第二个参数。返回应用程序实例本身。

```javascript
import { createApp } from 'vue'

const app = createApp(/* ... */)

app.provide('message', 'hello')
```
```javascript
export default {
  inject: ['message'],
  created() {
    console.log(this.message) // 'hello'
  }
}
```

## app.component()

-   如果同时传递名称字符串和组件定义，则注册全局组件;如果仅传递名称，则检索已注册的全局组件。

```javascript
import { createApp } from 'vue'

const app = createApp({})

// 注册选项对象
app.component('my-component', {
  /* ... */
})

// 检索已注册的组件
const MyComponent = app.component('my-component')
```

## app.directive()

-   如果同时传递名称字符串和指令定义，则注册全局自定义指令;如果仅传递名称，则检索已注册的自定义指令。

```javascript
import { createApp } from 'vue'

const app = createApp({
  /* ... */
})

app.directive('my-directive', {
  /* custom directive hooks */
})

app.directive('my-directive', () => {
  /* ... */
})

// 检索已注册的指令
const myDirective = app.directive('my-directive')
```

## app.use()

-   安装插件。

```javascript
import { createApp } from 'vue'
import MyPlugin from './plugins/MyPlugin'

const app = createApp({
  /* ... */
})

app.use(MyPlugin)
```

## app.mixin()

-   应用全局混合（作用域限定为应用程序）。全局 mixin 将其包含的选项应用于应用程序中的每个组件实例。

## app.version

-   提供创建应用程序时使用的Vue版本。这在插件中非常有用，在插件中您可能需要基于不同Vue版本的条件逻辑。

```javascript
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

console.log(app)
console.log(app.version)
```

## app.config

-   每个应用程序实例都公开一个配置对象，其中包含该应用程序的配置设置。您可以在装载应用程序之前修改其属性（如下所述）。

```javascript
import { createApp } from 'vue'

const app = createApp(/* ... */)

console.log(app.config)
```

## app.config.errorHandler

-   为从应用程序内部传播的未捕获错误分配全局处理程序。

```javascript
app.config.errorHandler = (err, instance, info) => {
  // handle error, e.g. report to a service
}
```

## app.config.warnHandler

-   为来自 Vue 的运行时警告分配自定义处理程序。

```javascript
app.config.warnHandler = (msg, instance, trace) => {
  // `trace` is the component hierarchy trace
}
```

## app.config.performance

-   将此值设置为 true 可在浏览器 devtool 性能/时间轴面板中启用组件初始化、编译、渲染和修补性能跟踪。仅适用于开发模式和支持 performance.mark API 的浏览器。

## app.config.compilerOptions

-   配置运行时编译器选项。在此对象上设置的值将传递到浏览器内模板编译器，并影响已配置应用中的每个组件。请注意，您还可以使用编译器选项在每个组件的基础上覆盖这些选项。

```javascript
// treat all tags starting with 'ion-' as custom elements
app.config.compilerOptions.isCustomElement = (tag) => {
  return tag.startsWith('ion-')
}
```

## app.config.globalProperties

-   一个对象，可用于注册可在应用程序内的任何组件实例上访问的全局属性。

```javascript
app.config.globalProperties.msg = 'hello'
```
```javascript
export default {
  mounted() {
    console.log(this.msg) // 'hello'
  }
}
```

## app.config.optionMergeStrategies

-   用于定义自定义组件选项的合并策略的对象。

```javascript
const app = createApp({
  // option from self
  msg: 'Vue',
  // option from a mixin
  mixins: [
    {
      msg: 'Hello '
    }
  ],
  mounted() {
    // merged options exposed on this.$options
    console.log(this.$options.msg)
  }
})

// define a custom merge strategy for `msg`
app.config.optionMergeStrategies.msg = (parent, child) => {
  return (parent || '') + (child || '')
}

app.mount('#app')
// logs 'Hello Vue'
```
