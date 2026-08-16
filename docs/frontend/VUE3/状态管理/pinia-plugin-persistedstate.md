# pinia-plugin-persistedstate

> 页面刷新，pinia的值会消失。所以需要数据持久化。
> 
> 成熟插件：[https://github.com/prazdevs/pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate)

## pinia-plugin-persistedstate

```vue
pnpm i pinia-plugin-persistedstate
```
```typescript
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import App from './App.vue'

const store = createPinia()
store.use(piniaPluginPersistedstate)

let app = createApp(App)
app.use(store)
app.mount('#app')
```
```typescript
import { defineStore } from 'pinia'
import { Names } from './store-namespace'

export const useUserStore = defineStore(Names.User, {
  state: () => {
    return {
      count: 0
    }
  },
  persist: true, // 开启--------页面刷新，数据也不会改变
  actions: {
    addCount() {
      this.count++
    }
  }
})
```

## 自己实现

```typescript
import { createPinia, type PiniaPluginContext } from "pinia";
import { toRaw } from "vue";
const __piniaKey = "__PINIAKEY__";
//定义兜底变量

type Options = {
    key?: string;
};
//定义入参类型

//将数据存在本地
const setStorage = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

//在缓存中读取
const getStorage = (key: string) => {
    return localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key) as string)
        : {};
};

//利用函数柯里化接受用户入参
const piniaPlugin = (options: Options) => {
    //将函数返回给pinia  让pinia  调用 注入 context
    return (context: PiniaPluginContext) => {
        const { store } = context;

        const data = getStorage(`${options?.key ?? __piniaKey}-${store.$id}`);

        store.$subscribe(() => {
            setStorage(
                `${options?.key ?? __piniaKey}-${store.$id}`,
                toRaw(store.$state)
            );
        });

        //返回值覆盖pinia 原始值
        return {
            ...data,
        };
    };
};

export default piniaPlugin
```
```typescript
import piniaPlugin from '@/store/storage';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';

const store = createPinia()
store.use(piniaPlugin({
    key: 'pinia'
}))

let app = createApp(App)
app.use(store)
app.mount('#app')
```
