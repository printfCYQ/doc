# redirect

## redirect

> 访问`/`重定向到 `/about` （地址栏显示`/about`,内容为`/about`路由的内容）

> 字符串

```typescript
const routes: Array<RouteRecordRaw> = [{
    path: '/',
    name: 'Home',
    redirect:'/about',
    children: [
        {
            path: '/about',
            name: 'About',
            component: () => import('@/components/B.vue')
        },
        {
            path: 'info',
            name: 'Info',
            component: () => import('@/components/C.vue')
        }
    ]
}]
```

> 对象

```typescript
const routes: Array<RouteRecordRaw> = [{
    path: '/',
    name: 'Home',
    redirect: { path: '/about' },
    children: [
        {
            path: '/about',
            name: 'About',
            component: () => import('@/components/B.vue')
        },
        {
            path: 'info',
            name: 'Info',
            component: () => import('@/components/C.vue')
        }
    ]
}]
```

> 带参数

```typescript
const routes: Array<RouteRecordRaw> = [{
    path: '/',
    name: 'Home',
    redirect: (to) => {
        return {
            path: '/about',
            query: to.query
        }
    },
    children: [
        {
            path: '/about',
            name: 'About',
            component: () => import('@/components/B.vue')
        },
        {
            path: 'info',
            name: 'Info',
            component: () => import('@/components/C.vue')
        }
    ]
}]
```

## alias

> 访问`/home1`｜`/home2`｜`home3`访问的页面都是`/`。URL上显示的是`/home1`｜`/home2`｜`home3`

```typescript
const routes: Array<RouteRecordRaw> = [{
    path: '/',
    name: 'Home',
    component: () => import('@/components/A.vue'),
    alias: ["/home1", "/home2", "/home3"],
    children: [
        {
            path: '/about',
            name: 'About',
            component: () => import('@/components/B.vue')
        },
        {
            path: 'info',
            name: 'Info',
            component: () => import('@/components/C.vue')
        }
    ]
}]
```
