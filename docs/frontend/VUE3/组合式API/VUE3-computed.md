# VUE3-computed

> 计算属性会自动追踪响应式依赖。
> 
> 计算属性有缓存。
> 
> 计算属性仅会在其响应式依赖更新时才重新计算。

> ⚠️ 计算属性不建议有副作用，即修改其他响应式值。
> 
> 不要在 getter 中做异步请求或者更改 DOM。
> 
> 避免直接修改计算属性。值

```vue
<template>
  <div>
    username:<input v-model="username" type="text" name="" id="">
    <hr>
    {{ reversUsername }}
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  const username = ref('')

  const reversUsername = computed(() => {
    return username.value.split('').reverse().join('')
  })
</script>
```
```vue
<template>
  <div>
    username:<input v-model="username" type="text" name="" id="">
    <hr>
    {{ reversUsername }}
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, toRaw } from 'vue';
const username = ref('')

const reversUsername = computed({
  get() {
    return username.value.split('').reverse().join('')
  },
  set(val) {
    console.log(val);
  }
})
</script>
```
