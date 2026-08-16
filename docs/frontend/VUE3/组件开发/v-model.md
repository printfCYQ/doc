# v-model

> VUE3的v-model
> 
> 破坏性（非兼容）

> 新增:
> 
> -   可以在同一个组件上使用多个 v-model 绑定；
> -   可以自定义 v-model 修饰符。
> 
> 非兼容:
> 
> -   用于自定义组件时， v-model prop 和事件默认名称已更改：
> 
> -   prop： value -> modelValue；
> -   事件：input -> update:modelValue；
> 
> -   v-bind 的 .sync 修饰符和组件的 model 选项已移除，可在 v-model 上加一个参数代替；

## 一般使用

```vue
<template>
  <button @click="show = !show">显隐子组件{{ show }}</button>
  <hr>
  <A v-model="show"></A>
</template>

<script setup lang='ts'>
  import A from './A.vue';
  const show = ref(false)
</script>
```
```vue
<template>
  <div v-if="propData.modelValue" class="dialog">
    <button @click="close">关闭自己</button>
  </div>
</template>

<script setup lang='ts'>
  type Props = {
    modelValue: boolean
  }
  const propData = defineProps<Props>()

  const emit = defineEmits(['update:modelValue'])

  const close = () => {
    emit('update:modelValue', false)
  }
</script>
```

## 多个参数

```vue
<template>
  <button @click="show = !show">显隐子组件{{ show }}</button>
  <hr>
  <A v-model:title='title' v-model="show"></A>
</template>

<script setup lang='ts'>
  import A from './A.vue';
  const show = ref(false);
  const title = ref('标题')
</script>
```
```vue
<template>
  <div v-if="propData.modelValue" class="dialog">
    <button @click="close">{{ propData.title }}-关闭自己</button>
  </div>
</template>

<script setup lang='ts'>
  type Props = {
    modelValue: boolean,
    title: string
  }
  const propData = defineProps<Props>()

  const emit = defineEmits(['update:modelValue', 'update:title'])

  const close = () => {
    emit('update:modelValue', false)
    emit('update:title', '我要改变') //修改title
  }
</script>
```

## 自定义修饰符

> 根据是否加了`.uppercase`，userName字段的值变为大写。

```vue
<template>
  <div>show :{{ show }}</div>
  <div>userName:{{ userName }}</div>
  <button @click="show = !show">显隐子组件{{ show }}</button>
  <hr>
  <A v-model:userName.uppercase="userName" v-model.uppercase="show"></A>
</template>
 
<script setup lang='ts'>
import A from './A.vue';
const show = ref(false);
const userName = ref('cyq')
</script>
```
```vue
<template>
    <div v-if="propData.modelValue" class="dialog">
        <button @click="close">关闭</button>
        userName:<input :value="propData.userName" @change="change">
    </div>
</template>

<script setup lang='ts'>

type Props = {
    modelValue: boolean,
    userName: string,
    modelModifiers?: {
        // 设置默认值 
        default: () => {
        }
    },
    userNameModifiers?: {
        uppercase: boolean
    }
}

const propData = defineProps<Props>()

const emit = defineEmits(['update:modelValue', 'update:userName'])

const close = () => {
    emit('update:modelValue', false)
}

const change = (e: Event) => {
    const target = e.target as HTMLInputElement
    let userName = target.value
    if (propData?.userNameModifiers?.uppercase) {
        userName = target.value.toUpperCase()
    }
    emit('update:userName', userName)
}
</script>

<style>
.dialog {
    width: 500px;
    height: 500px;
    background: #ede;
}
</style>
```
