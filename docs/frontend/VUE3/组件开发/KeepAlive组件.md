# KeepAlive组件

> 在多个组件间动态切换时缓存被移除的组件实例。

> 组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。而是希望组件可以缓存下来,维持当前的状态。

# 基本使用

> 点击按钮切换组件，输入框的值不会消失。

```vue
<template>
  <div>
    <button @click="flag = !flag">toggle</button>
    <KeepAlive>
      <A v-if="flag"></A>
      <B v-else></B>
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import A from './A.vue'
import B from './B.vue'
let flag = ref<boolean>(false)
</script>
```
```vue
<template>
    <div>
        a<input v-model="a" type="text" name="" id="">
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const a = ref()
</script>
```
```vue
<template>
    <div>
        b<input v-model="b" type="text" name="" id="">
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const b = ref()
</script>
```

# 属性

> include 和 exclude 允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示。
> 
> max: 最大缓存数量。

## **include**

> 规定哪个**被缓存**

```vue
<template>
  <div>
    <button @click="flag = !flag">toggle</button>
    <KeepAlive include="A">
      <A v-if="flag"></A>
      <B v-else></B>
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import A from './A.vue'
import B from './B.vue'
let flag = ref<boolean>(false)
</script>
```

## **exclude**

> 规定哪个**不被缓存**

```vue
<template>
  <div>
    <button @click="flag = !flag">toggle</button>
    <KeepAlive exclude="A">
      <A v-if="flag"></A>
      <B v-else></B>
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import A from './A.vue'
import B from './B.vue'
let flag = ref<boolean>(false)
</script>
```
```vue
<!-- 以英文逗号分隔的字符串 -->
<KeepAlive include="a,b">
  <component :is="view" />
</KeepAlive>

<!-- 正则表达式 (需使用 `v-bind`) -->
<KeepAlive :include="/a|b/">
  <component :is="view" />
</KeepAlive>

<!-- 数组 (需使用 `v-bind`) -->
<KeepAlive :include="['a', 'b']">
  <component :is="view" />
</KeepAlive>
```

## max

```vue
<template>
  <div>
    <button @click="flag = !flag">toggle</button>
    <KeepAlive :max="2">
      <A v-if="flag"></A>
      <B v-else></B>
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import A from './A.vue'
import B from './B.vue'
let flag = ref<boolean>(false)
</script>
```

# 生命周期

> KeepAlive 组件有两个单独的生命周期

> ⚠️
> 
> -   `onActivated` 在组件挂载时也会调用，并且 `onDeactivated` 在组件卸载时也会调用。
> -   这两个钩子不仅适用于 `&lt;KeepAlive>` 缓存的根组件，也适用于缓存树中的后代组件。

## onActivated

> 组件被插入到 DOM 中时调用。

## onDeactivated

> 组件从 DOM 中被移除时调用。

```vue
<template>
    <div>
        a<input v-model="a" type="text" name="" id="">
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'
const a = ref();
onMounted(() => {
    console.log('onMounted');
})

onActivated(() => {
    console.log('onActivated');
})

onUnmounted(() => {
    console.log('onUnmounted');
})

onDeactivated(() => {
    console.log('onDeactivated');
})
</script>
```
