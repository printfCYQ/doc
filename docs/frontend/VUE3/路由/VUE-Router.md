# VUE-Router

> [https://router.vuejs.org](https://router.vuejs.org)
> 
> Vue Router 是 [Vue.js](https://vuejs.org/) 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。功能包括：
> 
> -   嵌套路由映射
> -   动态路由选择
> -   模块化、基于组件的路由配置
> -   路由参数、查询、通配符
> -   展示由 Vue.js 的过渡系统提供的过渡效果
> -   细致的导航控制
> -   自动激活 CSS 类的链接
> -   HTML5 history 模式或 hash 模式
> -   可定制的滚动行为
> -   URL 的正确编码

> vue是单页应用不会有那么多html 让我们跳转 所以要使用路由做页面的跳转
> 
> Vue 路由允许我们通过不同的 URL 访问不同的内容。通过 Vue 可以实现多视图的单页Web应用

## 安装

```html
pnpm install vue-router@4
```
```typescript
//引入路由对象
import { createRouter, 
        createWebHistory, 
        createWebHashHistory, 
        createMemoryHistory, 
        RouteRecordRaw 
} from 'vue-router'

//vue2 mode history vue3 createWebHistory
//vue2 mode  hash  vue3  createWebHashHistory
//vue2 mode abstact vue3  createMemoryHistory

//路由数组的类型 RouteRecordRaw
// 定义一些路由
// 每个路由都需要映射到一个组件。
const routes: Array<RouteRecordRaw> = [{
  path: '/',
  component: () => import('../components/a.vue')
},{
  path: '/about',
  component: () => import('../components/b.vue')
}]

const router = createRouter({
  history: createWebHistory(),
  routes
})

//导出router
export default router
```
```typescript
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

let app = createApp(App)
app.use(router)
app.mount('#app')
```
```html
<template>
  <div>
    <h1>Hello App!</h1>
    <p>
      <!--使用 router-link 组件进行导航 -->
      <!--通过传递 `to` 来指定链接 -->
      <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
      <router-link to="/">Go to Home</router-link>
      <router-link to="/about">Go to About</router-link>
    </p>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>
```

## router-link

> 请注意，我们没有使用常规的 a 标签，而是使用一个自定义组件 router-link 来创建链接。这使得 Vue Router 可以在不重新加载页面的情况下更改 URL，处理 URL 的生成以及编码。我们将在后面看到如何从这些功能中获益。

## router-view

> router-view 将显示与 url 对应的组件。你可以把它放在任何地方，以适应你的布局。
