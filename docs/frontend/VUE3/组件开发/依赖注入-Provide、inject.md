# 依赖注入-Provide、inject

> 父组件相对于其所有的后代组件，会作为**依赖提供者**。任何后代的组件树，无论层级有多深，都可以**注入**由父组件提供给整条链路的依赖。

> 提供的响应式状态使后代组件可以由此和提供者建立响应式的联系。
> 
> 如果传递普通的值 是不具有响应式的 。

> Provide(提供)
> 
> Inject (注入)

```vue
<template>
  <div>
    一级组件：{{ flag }}
    <hr>
      <A></A>
    </div>
</template>

<script setup lang="ts">
  import { provide, ref } from 'vue';
  import A from './A.vue';
  let flag = ref<number>(1)
  provide('flag', flag)
</script>
```
```vue
<template>
  <div>
    二级组件：{{ flag }}
    <hr>
      <B></B>
    </div>
</template>
<script setup lang="ts">
  import B from './B.vue'
  import { inject, Ref, ref } from 'vue'
  const flag = inject<Ref<number>>('flag', ref(0))
</script>

```
```vue
<template>
  <div>
    三级组件：
    <button @click="change">change</button>
    {{ flag }}
  </div>
</template>

<script setup lang="ts">
  import { inject, Ref, ref } from 'vue'
  const flag = inject<Ref<number>>('flag', ref(0))
  const change = () => {
    flag.value++
  }
</script>
```

  

# 使用

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
