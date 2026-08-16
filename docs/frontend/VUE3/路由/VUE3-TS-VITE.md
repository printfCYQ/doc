# VUE3-TS-VITE

  

`yarn create vite`

  

[参考文章](https://juejin.cn/post/7006108454028836895)

---

## 〇、文件结构

  

```html
<script setup lang="ts">
  //js
</script>

<template>
  <!-- html -->
</template>

<style lang="scss" scoped>
  /* css */
</style>
```

  

## 一、全局变量方法

  

> main.ts 定义

  

```typescript
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

const propotype = app.config.globalProperties;

propotype.$clg = function (a: unknown) {
  console.log(a);
};
app.mount("#app");
```

  

> 使用

  

```html
<script setup lang="ts">
  import { getCurrentInstance } from "vue";
  const { proxy } = getCurrentInstance();
  proxy.$clg(213);
</script>
```

  

## 二、数据定义-data

  

```html
<script setup lang="ts">
  import { reactive, ref, toRefs } from "vue";

  interface Student {
    userName: string;
    age: number;
  }

  // ref声明响应式数据，用于声明基本数据类型
  const name = ref<string>("javascript");
  // 修改
  name.value = "typescript";

  // reactive声明响应式数据，用于声明引用数据类型
  const userData = reactive<Student>({
    userName: "vue2",
    age: 18,
  });
  // 修改
  userData.userName = "vue3";

  // 使用toRefs解构
  const { userName, age } = toRefs(userData);
  //使用时{{userName}}、{{age}}
</script>
```

  

## 三、方法-methods

  

```html
<template>
  <button @click="changeName">add num</button>
  {{num}}
</template>

<script setup lang="ts">
  import { ref } from "vue";

  let num = ref<number>(0);

  const changeName = () => {
    num.value++;
  };
</script>
```

  

## 四、计算属性-computed

  

```html
<template> {{doubleCount}} </template>

<script setup lang="ts">
  import { computed, ref } from "vue";

  const num = ref<number>(1);

  const doubleCount = computed(() => {
    return num.value + 100;
  });
</script>
```

  

## 五、侦听器-watch

  

```html
<template>
  {{ num }}
  <button @click="addNum">addNum</button>
</template>

<script setup lang="ts">
  import { watch, ref } from "vue";

  const num = ref<number>(1);

  const addNum = () => {
    num.value++;
  };

  watch(
    () => num.value,
    (newVal, oldVal) => {
      console.log(newVal, oldVal);
    },
    {
      immediate: true, // 立即执行
      deep: true, // 深度监听
    }
  );
</script>
```

  

-   多个参数

  

```typescript
watch(
  () => [num.value, num2.value],
  ([newVal1, newVal2], [oldVal1, oldVal2]) => {
    console.log(newVal1, oldVal1);
    console.log(newVal2, oldVal2);
  }
);
```

  

## 六 传参-父传子-props

  

> 父组件

  

```html
<script setup lang="ts">
  import Child from "./components/Child.vue";
</script>

<template>
  <Child msg="hello vue3" />
</template>
```

  

> 子组件

  

```html
<template>
  <div>{{props.msg}}</div>
  <!-- 可省略【props.】 -->
  <div>{{msg}}</div>
</template>

<script setup lang="ts">
  // import { defineProps } from 'vue'
  // defineProps、defineEmits在<script setup>中自动可用，无需导入
  // 需在.eslintrc.js文件中【globals】下配置【defineProps: true】

  const props = defineProps({
    msg: {
      type: String,
      default: "",
    },
  });
</script>
```

  

## 七、传参-子传父-emit

  

> 子组件

  

```html
<template>
  <span>{{ msg }}</span>
  <button @click="changeMsg">changeMsg</button>
</template>

<script setup lang="ts">
  const props = defineProps({
    msg: {
      type: String,
      default: "",
    },
  });

  const emit = defineEmits(["changeMsgEmit"]);

  const changeMsg = () => {
    emit("changeMsgEmit", "new Msg");
  };
</script>
```

  

> 父组件

  

```html
<template>
  <Child :msg="msg" @changeMsgEmit="changeMsgEmit" />
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import Child from "./Child.vue";

  const msg = ref("old Msg");

  const changeMsgEmit = (newMsg: string) => {
    msg.value = newMsg;
  };
</script>
```

  

## 八、自定义事件-v-model

  

> 子组件

  

```html
<template>
  <span @click="changeData">{{ num }}，{{ isBoy }}</span>
</template>

<script setup lang="ts">
  defineProps({
    num: {
      type: Number,
      default: 0,
    },
    isBoy: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits(["update:num", "update:isBoy"]);
  const changeData = () => {
    emit("update:num", 100);
    emit("update:isBoy", true);
  };
</script>
```

  

> 父组件

  

```html
<template>
  <Child v-model:num="data.num" v-model:isBoy="data.isBoy" />
</template>

<script setup lang="ts">
  import { reactive } from "vue";
  import Child from "./Child.vue";

  const data = reactive({
    num: 0,
    isBoy: false,
  });
</script>
```

  

## 九、nextTick

  

```html
<script setup lang="ts">
  import { nextTick } from "vue";

  nextTick(() => {
    // code...
  });
</script>
```

  

## 十、defineExpose

  

-   如果父组件要调用子组件的数据，需要先在子组件显示的暴露出来，才能够正确的拿到，这个操作，就是由 defineExpose 来完成。

  

> 子组件

  

```html
<template>
  <span>{{ num }}</span>
</template>

<script setup lang="ts">
  import { reactive, ref, toRefs } from "vue";
  interface User {
    username: string;
    age: number;
  }

  const num = ref<number>(0);

  const user = reactive<User>({
    username: "vue3",
    age: 18,
  });

  defineExpose({
    num,
    ...toRefs(user),
    addNum() {
      num.value++;
    },
  });
</script>
```

  

> 父组件

  

```html
<template>
  <Child ref="childRef" />
</template>

<script setup lang="ts">
  import { ref, nextTick } from "vue";
  import Child from "./Child.vue";
  const childRef = ref("childRef");

  nextTick(() => {
    console.log(childRef.value.num);
    console.log(childRef.value.username);
    childRef.value.addNum();
  });
</script>
```

  

## 十一、插槽-solt

  

> 子组件

  

```html
<template>
  <!-- 匿名插槽 -->
  <slot />
  <!-- 具名插槽 -->
  <slot name="title" />
  <!-- 作用域插槽 -->
  <slot name="footer" :scope="state" />
</template>

<script setup lang="ts">
  import { useSlots, ref, reactive } from "vue";
  const state = reactive({
    title: "vue3 blog",
    year: "2021",
  });

  const slots = useSlots();
  // 匿名插槽
  const defaultSlot = ref(slots.default && slots.default().length);
  console.log(defaultSlot.value); // 1
  // 具名插槽
  const titleSlot = ref(slots.title && slots.title().length);
  console.log(titleSlot.value); // 3
</script>
```

  

> 父组件

  

```html
<template>
  <Child>
    <!-- 匿名插槽 -->
    <h1>我是默认插槽</h1>

    <!-- 具名插槽 -->
    <template #title>
      <h2>我是具名插槽</h2>
      <h2>我是具名插槽</h2>
      <h2>我是具名插槽</h2>
    </template>

    <!-- 作用域插槽 -->
    <template #footer="{ scope }">
      <footer>Copyright © {{ scope.year }} {{ scope.title }}</footer>
    </template>
  </Child>
</template>

<script setup lang="ts">
  import Child from "./Child.vue";
</script>
```

  

## 十二、路由 useRoute 和 useRouter

  

[vue-router](https://next.router.vuejs.org/zh/introduction.html) - [https://next.router.vuejs.org/zh/introduction.html](https://next.router.vuejs.org/zh/introduction.html)

  

### 安装 vue-router

  

```typescript
yarn add vue-router@4
```

  

### 配置

  

> 新建`src\router\index.ts`

  

```typescript
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Father from "../components/Father.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Father",
    component: Father,
  },
  {
    path: "/child",
    name: "Child",
    component: () => import("../components/Child.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
```

  

> 添加`process` - vite.config.ts

  

```typescript
export default defineConfig({
  // ...
  define: {
    "process.env": {},
  },
  //...
});
```

  

> 添加`router` - main.ts

  

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
const app = createApp(App)

app.use(router)
app.mount('#app')
```

  

> App.vue

  

```html
<template>
  <router-view />
</template>
```

  

### 使用

  

```html
<template>
  <button @click="btn">btn</button>
</template>

<script setup lang="ts">
  import { useRoute, useRouter } from "vue-router";

  // 必须先声明调用
  const route = useRoute();
  const router = useRouter();

  console.log(route);

  const btn = () => {
    router.push("/child");
  };
</script>
```

  

## 十三、路由导航守卫

  

### 全局前置 beforeEach

  

-   作用 : 初始化的时候 和 在每一次路由切换之前调用 beforeEach 里面的函数
-   参数 :

-   to : 目标路由
-   from : 跳转前的路由
-   next : 放行

  

> src/router/index.ts

  

```typescript
router.beforeEach((to, from, next) => {
  if (...) {
    // do something
    next();
  } else {
    next();
  }
});
```

  

### 全局后置 afterEach

  

-   afterEach 和 beforeEach 使用方法基本一致.区别就是 afterEach 没有 next 这个参数

  

> 在 beforEach 里面修改 title 名 - src/router/index.ts

  

```typescript
router.afterEach((to, from) => {
  const { title } = to.meta;
  document.title = title || "VUE3";
});
```

  

### 组件内守卫

  

-   beforeRouteEnter  
    通过路由规则, 进入该组件时被调用
-   beforeRouteLeave  
    通过路由规则, 离开该组件时被调用

  

```html
<script setup lang="ts">
  import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";

  onBeforeRouteLeave((to, from, next) => {
    console.log(to, from);
    next();
  });

  onBeforeRouteUpdate((to, from, next) => {
    console.log(to, from);
    next();
  });
</script>
```

  

## 十四、状态管理-Vuex

  

[vuex](https://next.vuex.vuejs.org/zh/)\-[https://next.vuex.vuejs.org/zh/](https://next.vuex.vuejs.org/zh/)

  

### 安装

  

```typescript
yarn add vuex@next --save
```

  

### 配置

  

> src/store/index.ts

  

```typescript
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

export interface State {
  count: number;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state() {
    return {
      count: 0,
    };
  },
  getters: {
    isZero: (state) => {
      return state.count > 0;
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
  },
});
```

  

> main.ts

  

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";

const app = createApp(App);

app.use(router);
app.use(store, key);
app.mount("#app");
```

  

### 使用

  

```html
<template>
  <div>{{ store.state.count }}</div>
  <div>{{ store.getters.isZero }}</div>
  <button @click="commit">commit</button>
  <button @click="dispatch">dispatch</button>
</template>

<script setup lang="ts">
  import { useStore } from "vuex";
  import { key } from "../store/index";

  // 必须先声明调用
  const store = useStore(key);

  // 获取Vuex的state
  // store.state.xxx;

  // 获取Getters
  // store.getters.xxx;

  const commit = () => {
    // 触发mutations的方法
    store.commit("increment");
  };

  const dispatch = () => {
    // 触发actions的方法
    store.dispatch("increment");
  };
</script>
```

  

## 十五、生命周期钩子

  

[生命周期钩子](https://v3.cn.vuejs.org/guide/composition-api-lifecycle-hooks.html) - [https://v3.cn.vuejs.org/guide/composition-api-lifecycle-hooks.html](https://v3.cn.vuejs.org/guide/composition-api-lifecycle-hooks.html)

| 选项式 API | Hook inside setup |
| --- | --- |
| beforeCreate | Not needed* |
| created | Not needed* |
| beforeMount | onBeforeMount |
| mounted | onMounted |
| beforeUpdate | onBeforeUpdate |
| updated | onUpdated |
| beforeUnmount | onBeforeUnmount |
| unmounted | onUnmounted |
| errorCaptured | onErrorCaptured |
| renderTracked | onRenderTracked |
| renderTriggered | onRenderTriggered |
| activated | onActivated |
| deactivated | onDeactivated |

  

## 十六、CSS 变量注入

  

```html
<template>
  <div>Jerry</div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const textColor = ref<string>("red");
</script>

<style scoped>
  div {
    color: v-bind("textColor");
  }
</style>
```

  

## 十七、JSX || TSX

  

### 安装依赖

  

```plain
yarn add @vitejs/plugin-vue-jsx -D
```

  

### 配置

  

> vite.config.ts

  

```typescript
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
export default defineConfig({
  plugins: [vue(), vueJsx()],
});
```

  

### 使用

  

> Demo.tsx

  

```typescript
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      type: String,
    },
  },
  setup(props) {
    const render = () => {
      return <div>hello {props.name}</div>;
    };
    return render;
  },
});
```

  

> App.vue

  

```html
<template>
  <Demo name="tsx" />
</template>

<script setup lang="ts">
  import Demo from "./Demo";
</script>
```

  

## 十八、await

  

-   不必再配合 async 就可以直接使用 await 了，这种情况下，组件的 setup 会自动变成 async setup

  

```html
<script setup lang="ts">
  const post = await fetch("/api").then(() => {});
</script>
```

  

## 十九、name

  

-   需要用单独的`&lt;script>`块来定义

  

```html
<script>
  export default {
    name: "ComponentName",
  };
</script>
```

  

## 二十、provide 和 inject

  

-   成对出现：provide 和 inject 是成对出现的
-   作用：用于父组件向子孙组件传递数据
-   使用方法：provide 在父组件中返回要传给下级的数据，inject 在需要使用这个数据的子辈组件或者孙辈等下级组件中注入数据。
-   使用场景：由于 vue 有$parent 属性可以让子组件访问父组件。但孙组件想要访问祖先组件就比较困难。通过 provide/inject 可以轻松实现跨级访问父组件的数据

  

> Father.vue

  

```html
<template>
  <Child />
</template>

<script setup lang="ts">
  import { provide } from "vue";
  import { ref } from "vue";
  // 引入子组件
  import Child from "./Child.vue";

  let num = ref<number>(0);
  // 声明provide
  provide("provideState", {
    num,
    numAdd: () => {
      num.value++;
    },
  });
</script>
```

  

> Child.vue

  

```html
<template>
  {{ temp }}
  <Sun />
</template>

<script setup lang="ts">
  import Sun from "./Sun.vue";
  import { inject, ref } from "vue";
  let temp = ref<number>(0);
  // 注入
  const provideState: any = inject("provideState");
  // 子组件获取值
  temp.value = provideState.num;
</script>
```

  

> Sun.vue

  

```html
<template>
  <button @click="btn">btn</button>
</template>

<script setup lang="ts">
  import { inject } from "vue";
  // 注入
  const provideState: any = inject("provideState");

  const btn = () => {
    // 孙组件触发方法
    provideState.numAdd();
  };
</script>
```
