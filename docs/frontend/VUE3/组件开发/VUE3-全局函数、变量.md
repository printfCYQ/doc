# VUE3-全局函数、变量

```typescript
import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App)

type Filter = {
  format: <T>(str: T) => string
}
declare module 'vue' {
  export interface ComponentCustomProperties {
    $filters: Filter,
    $env: string
  }
}
app.config.globalProperties.$env = 'dev'
app.config.globalProperties.$filters = {
  format<T>(str: T): string {
    return `¥${str}`
  }
}

app.mount('#app')
```
```vue
<template>
  <div>
    {{ $filters.format('123.123') }}
    {{ $env }}
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ComponentInternalInstance } from 'vue';
const instance = getCurrentInstance()
const { appContext } = <ComponentInternalInstance>getCurrentInstance()
console.log(appContext.config.globalProperties.$env);
console.log(appContext.config.globalProperties.$filters.format('111.111'));
console.log(instance?.proxy?.$env)
console.log(instance?.proxy?.$filters.format('111.111'))
</script>

```
