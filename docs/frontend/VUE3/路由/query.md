# query

> 使用router push 或者 replace 的时候 改为对象形式新增query 必须传入一个对象

```vue
<template>
    <div>
        <button @click="nav">nav</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
const nav = () => {
    router.push({
        path: '/about',
        query: {
            a: 1
        }
    })
}
</script>
```
```vue
<template>
    <div>
        {{ route.query.a }}
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute()
</script>
```

# params

> **params传参在新版本中，已经弃用了，建议用query或者pinia [** vue-router@4.1.6]

> 使用router push 或者 replace 的时候 改为对象形式并且只能使用name，path无效，然后传入params

```vue
<template>
    <div>
        <button @click="nav">nav</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
const nav = () => {
    router.push({
        name: 'About',
        params: {
            a: 1
        }
    })
}
</script>
```
```vue
<template>
    <div>
        {{ route.params.a }}
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute()
</script>
```

# 动态路由

```vue
const routes: Array<RouteRecordRaw> = [{
    path: '/',
    name: 'Home',
    component: () => import('@/components/A.vue')
}, {
    path: '/about/:id',
    name: 'About',
    component: () => import('@/components/B.vue')
}]
```
```vue
<template>
    <div>
        <button @click="nav">nav</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()
const nav = () => {
    router.push({
        path: '/about',
        params: {
            id: 1
        }
    })
}
</script>
```
```vue
<template>
    <div>
        {{ route.params.id }}
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute()
</script>
```

# 区别

> query 传参配置的是 path，而 params 传参配置的是name，在 params中配置 path 无效
> 
> query 在路由配置不需要设置参数，而 params 必须设置
> 
> query 传递的参数会显示在地址栏中
> 
> params传参刷新会无效，但是 query 会保存传递过来的值，刷新不变 ;
> 
> 路由配置
