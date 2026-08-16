# Pinia不允许直接解构

## Pinia不允许直接解构

> 直接解构是会失去响应性的。（页面不会自动刷新）

```vue
<template>
  <div>
    {{ count }}---{{ total }} // 不变
    <hr>
    {{ userStore.count }} --- {{ userStore.total }} // 改变
    <hr>
    <button @click="change">change</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';

const userStore = useUserStore()

let { count, total } = userStore
const change = () => {
  userStore.count++;
  userStore.total += 10
}
</script>
```

## storeToRefs

> 其原理跟toRefs 一样的给里面的数据包裹一层toref

```vue
<template>
  <div>
    {{ count }}---{{ total }} // 改变
    <hr>
    {{ userStore.count }} --- {{ userStore.total }} // 改变
    <hr>
    <button @click="change">change</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore()

let { count, total } = storeToRefs(userStore)
const change = () => {
  userStore.count++;
  userStore.total += 10
}
</script>
```
