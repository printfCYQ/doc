# $ref

> 要求 vue版本 3.2.25 及以上
> 
> vite 开启 reactivityTransform

```typescript
plugins: [
    vue({
      reactivityTransform: true,
    }),
]
```

## $ref

在之前ref 修改值 和 获取值 都要.value 一下 感觉很繁琐，不想用.value 我们可以使用vue3的新特性$ref 。

我们可以直接使用$ref 宏函数 就不需要.value 了。能帮我们快速书写，但是宏函数是基于运行时的他最终还是会转换成ref 加.value 只不过vue帮我们做了这个操作了

```typescript
<template>
     <div>
          <button @click="add">add</button>
     </div>
     <h2>
          {{ count }}
     </h2>
</template>
     
<script setup lang='ts'>
import { $ref } from 'vue/macros'
let count = $ref(0)

const add = () => {
     count++
}
</script>
```

> 跟ref 有关的函数都做处理 都不需要.value了

```typescript
import {
     $ref,
     $computed,
     $shallowRef,
     $customRef,
     $toRef
} from "vue/macros";
```
```vue
<template>
     <div>
          <h1>{{ count }}</h1>
          <h1>{{ addCount }}</h1>
     </div>
</template>
   
<script setup lang="ts">
import { $computed, $ref } from 'vue/macros';
let count = $ref(1)

const addCount = $computed(() => {
     return count * 10
})
</script>
```

## $$

`$ref`编译之后就是 `count.value` 并不是一个`ref`对象所以`watch` 无法监听而且会抛出一个警告

```vue
[Vue warn]: Invalid watch source:  0 A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types. 
  at <App>

```
```vue
<template>
     {{ count }}
</template>
    
<script setup lang='ts'>
import { watch } from 'vue';
import { $ref } from 'vue/macros';

let count = $ref<number>(0)

watch(count, (v) => {
     console.log(v)
})

setInterval(() => {
     count++
}, 1000)
</script>
```

`$$`解决这个问题。 `$$` 让他编译的时候变成一个`ref` 对象不加`.value`

```vue
<template>
     {{ count }}
</template>
    
<script setup lang='ts'>
import { watch } from 'vue';
import { $$, $ref } from 'vue/macros';

let count = $ref<number>(0)

watch($$(count), (v) => {
     console.log(v)
})

setInterval(() => {
     count++
}, 1000)
</script>
```

## $()

> 之前我们解构一个对象使用toRefs 解构完成之后 获取值和修改值 还是需要.value
> 
> vue3 $() 解构完之后可以直接赋值

```vue
<template>
     <div>
          {{ name }}
     </div>
</template>
     
<script setup lang='ts'>
import { reactive } from 'vue';
import { $ } from 'vue/macros';
const obj = reactive({
     name: 'cyq'
})

let { name } = $(obj);

setTimeout(() => {
     name = 'CYQ'
}, 2000)
</script>
```
