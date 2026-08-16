# actions

## actions

### 同步

```typescript
import { defineStore } from 'pinia'
import { Names } from './store-namespace'

export const useUserStore = defineStore(Names.User, {
  state: () => {
    return {
      count: 0,
    }
  },
  actions: {
    addCount() {
      this.count++
    }
  }
})
```
```vue
<template>
  <div>
    {{ userStore.count }}
    <hr>
    <button @click="change">change</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';

const userStore = useUserStore()
const change = () => {
  userStore.addCount()
}
</script>
```

### 异步

```typescript
import { defineStore } from 'pinia'
import { Names } from './store-namespace'

interface User {
  name: string,
  age: number
}
export const useUserStore = defineStore(Names.User, {
  state: () => {
    return {
      user: <User>{
        name: '',
        age: 0
      }
    }
  },
  actions: {
    async fetchLogin() {
      const res = await login()
      this.user = res
    }
  }
})

const login = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'CYQ',
        age: 23
      })
    }, 3000)
  })
}
```
```vue
<template>
  <div>
    {{ userStore.user }}
    <hr>
    <button @click="login">login</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';

const userStore = useUserStore()
const login = () => {
  userStore.fetchLogin()
}
</script>
```

### action 互相调用

```typescript
import { defineStore } from 'pinia'
import { Names } from './store-namespace'

interface User {
  name: string,
  age: number
}
export const useUserStore = defineStore(Names.User, {
  state: () => {
    return {
      user: <User>{
        name: '',
        age: 0
      }
    }
  },
  actions: {
    async fetchLogin() {
      const res = await login()
      this.setUser(res)
    },
    setUser(user: User) {
      this.user = user
    }
  }
})

const login = (): Promise<User> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'CYQ',
        age: 23
      })
    }, 3000)
  })
}
```

## getters

### 一般使用

```typescript
import { defineStore } from 'pinia'
import { Names } from './store-namespace'

export const useUserStore = defineStore(Names.User, {
    state: () => {
        return {
            price: 100
        }
    },
    getters: {
        formatPrice(): string {
            return '¥' + this.price
        }
    }
})
```
```typescript
<template>
  <div>
    {{ userStore.formatPrice }}
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user';
const userStore = useUserStore()

</script>
```

### 箭头函数

> 使用箭头函数不能使用this this指向已经改变指向undefined 修改值请用state

```typescript
import { defineStore } from 'pinia'
import { Names } from './store-namespace'

export const useUserStore = defineStore(Names.User, {
    state: () => {
        return {
            price: 100
        }
    },
    getters: {
        formatPrice: (state) => `¥${state.price}`
    }
})
```

### getter 互相调用

```typescript
import { defineStore } from 'pinia'
import { Names } from './store-namespace'

export const useUserStore = defineStore(Names.User, {
    state: () => {
        return {
            price: 100
        }
    },
    getters: {
        formatPrice: (state) => `¥${state.price}`,
        addPoint(): string {
            return this.formatPrice + '.00'
        }
    }
})
```
