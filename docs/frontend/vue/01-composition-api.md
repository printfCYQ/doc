# Vue Composition API

## 简介

本节介绍 Vue 3 的 Composition API，包括 setup 语法、响应式 API（ref、reactive）、生命周期钩子、组合式函数封装等。

## 目录 / 章节

- `<script setup>` 语法
- ref 与 reactive
- computed 与 watch
- 生命周期钩子
- 自定义组合式函数（Composables）
- provide / inject

## 笔记正文

::: details 点击展开示例代码
```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);

function increment() {
  count.value++;
}

onMounted(() => {
  console.log('组件已挂载');
});
</script>

<template>
  <div>
    <p>Count: {{ count }} / Doubled: {{ doubled }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```
:::
