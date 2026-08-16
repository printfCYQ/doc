# watch

> 12
> 
> watch函数在每次响应式状态发生变化时触发回调函数

## 基本使用

```vue
<template>
  <div>
    username:<input v-model="username" type="text" name="" id="">
    <hr>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
const username = ref('')

watch(username, (newValue, oldValue) => {
  console.log(newValue, oldValue);
})

</script>
```

## 多个值一起监听

> 响应值以数组的格式返回

```vue
<template>
  <div>
    username:<input v-model="username" type="text" name="" id="">
    <hr>
    password:<input v-model="password" type="text" name="" id="">
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
const username = ref('');
const password = ref('');

watch([username, password], (newValue, oldValue) => {
  console.log(newValue, oldValue);
})

</script>
```

## 对象

```vue
<template>
  <div>
    username:<input v-model="info.username" type="text" name="" id="">
    <hr>
  </div>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue';
const info = reactive({
  username: ''
});

watch(info, (newValue, oldValue) => {
  console.log(newValue, oldValue);
})

</script>
```

## 对象的某个属性值

> 一定要 `()=>`格式

```vue
<template>
  <div>
    username:<input v-model="info.username" type="text" name="" id="">
    <hr>
  </div>
</template>

<script setup lang="ts">
import { watch, reactive } from 'vue';
const info = reactive({
  username: ''
});

watch(() => info.username, (newValue, oldValue) => {
  console.log(newValue, oldValue);
})

</script>
```

## options 配置

> deep: true, // 深度监听
> 
> immediate: true, //立即执行一次
> 
> flush:'post' // pre: 组件更新之前被调用; sync: 同步; post: 组件更新之后被调用;

```vue
<template>
  <div>
    username:<input v-model="info.username" type="text" name="" id="">
    <hr>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
const info = reactive({
  username: ''
});

watch(() => info, (newValue, oldValue) => {
  console.log(newValue, oldValue);
}, {
  deep: true, // 深度监听
  immediate: true, //立即执行一次
  flush:'post' // pre: 组件更新之前被调用; sync: 同步; post: 组件更新之后被调用;
})
</script>
```
