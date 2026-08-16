# Teleport组件

> `&lt;Teleport>` 是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。

## 一般使用

-   `to`来指定传送的目标。`to` 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象。这段代码的作用就是告诉 Vue，把以下模板片段**传送到** **body** 标签下。

```vue
<template>
  <div>
    <Teleport to='body'>
      <Child></Child>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import Child from './Child.vue'
</script>
```



## 禁用

> 动态操作 `Teleport`是否生效

```vue
<template>
  <div>
    <Teleport to='body' :disabled="disabled">
      <Child></Child>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Child from './Child.vue'
const disabled = ref(true)
</script>
```
