# $reset

## $reset

> 初始化store

```typescript
import { defineStore } from 'pinia'
import { Names } from './store-namespace'

export const useUserStore = defineStore(Names.User, {
    state: () => {
        return {
            count: 0
        }
    },
})
```
```typescript
<template>
  <div>
    {{ userStore.count }}
    <hr>
    <button @click="add">add</button>
    <hr>
    <button @click="reset">reset</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';
const userStore = useUserStore()

const add = () => {
  userStore.count++
}
const reset = () => {
  userStore.$reset()
}
</script>
```

## $subscribe

> 订阅state的改变

```vue
<template>
  <div>
    {{ userStore.count }}
    <hr>
      <button @click="add">add</button>
      <hr>
        <button @click="reset">reset</button>
      </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/store/user';
  const userStore = useUserStore()

  userStore.$subscribe((args, state) => {
    console.log(args, state);
  })

  const add = () => {
    userStore.count++
  }
  const reset = () => {
    userStore.$reset()
  }
</script>
```



> 如果你的组件卸载之后还想继续调用请设置第二个参数

```typescript
userStore.$subscribe((args, state) => {
  console.log(args, state);
}, {
  detached: true
})
```

## $onAction

> 订阅Actions的调用

```vue
<template>
  <div>
    {{ userStore.count }}
    <hr>
    <button @click="add">add</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';
const userStore = useUserStore()
  
userStore.$onAction((args) => {
  console.log(args);

})
const add = () =>{
  userStore.addCount()
}
</script>
```
