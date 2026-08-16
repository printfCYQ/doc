# 使用state

## 修改值

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

  const add = () => {
    userStore.count++
  }
</script>
```

## 批量修改

```vue
<template>
  <div>
    {{ userStore.count }}---{{userStore.total}}
    <hr>
    <button @click="change">change</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';

const userStore = useUserStore()

const change = () => {
  userStore.$patch({
    count: 100,
    total: 200
  })
}
</script>
```

## 批量修改函数形式

```vue
<template>
  <div>
    {{ userStore.count }}---{{ userStore.total }}
    <hr>
    <button @click="change">change</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';

const userStore = useUserStore()

const change = () => {
  userStore.$patch((state) => {
    state.count++
    state.total += 10
  })
}
</script>
```

## 通过原始对象修改整个实例

```vue
<template>
  <div>
    {{ userStore.count }}---{{ userStore.total }}
    <hr>
    <button @click="change">change</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';

const userStore = useUserStore()
const resetStore = {
  count: 200,
  total: 300
}
const change = () => {
  userStore.$state = resetStore
}
</script>
```

## 通过actions修改

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

const add = () => {
  userStore.addCount()
}
</script>
```
```vue
import { defineStore } from 'pinia'
import { Names } from './store-namespace'

export const useUserStore = defineStore(Names.User, {
    state: () => {
        return {
            count: 0,
        }
    },
    //类似于computed 可以帮我们去修饰我们的值
    getters: {

    },
    //可以操作异步 和 同步提交state
    actions: {
        addCount() {
            this.count++
        }
    }
})
```
