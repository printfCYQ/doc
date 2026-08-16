# toRef

## toRef

> 如果原始对象是非响应式的就不会更新视图 数据是会变的
> 
> 如果原始对象是响应式的是会更新视图并且改变数据的

```vue
<template>
  <div>
    <button @click="change">按钮</button>
    {{ number }}
    <button @click="change1">按钮</button>
    {{ number1 }}
  </div>
</template>

<script setup lang="ts">
import { reactive, toRef } from 'vue'

const obj = {
  a: 1,
  b: 1
}
const obj1 = reactive({
  a: 1,
  b: 1
})

const number = toRef(obj, 'a') // 非响应式数据
const number1 = toRef(obj1, 'a') // 响应式数据

const change = () => {
  number.value++
  console.log(number);

}
const change1 = () => {
  number1.value++
  console.log(number1);
}
</script>

```

## toRefs

> 批量创建ref对象,方便 解构使用

```vue
<template>
  <div>
    <button @click="handelClick">button</button>
    {{ name }}--{{ age }}
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from 'vue';

const info = reactive({
  name: 'CYQ',
  age: 23
})
let { name, age } = toRefs(info)

const handelClick = () => {
  name.value = 'cyq';
  age.value++
}
</script>
```

## toRaw

> 将响应式对象转化为普通对象

```vue
<template>
  <div>
    <button @click="handelClick">button</button>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRaw } from 'vue';

const info = reactive({
  name: 'CYQ',
  age: 23
})
let obj = toRaw(info)

const handelClick = () => {
  console.log(info, obj);
}
</script>
```
