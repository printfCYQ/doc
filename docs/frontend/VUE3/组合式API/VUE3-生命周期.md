# VUE3-生命周期

| 选项式 API | Hook inside setup |  |
| --- | --- | --- |
| beforeCreate | Not needed* | vue实例创建前 |
| created | Not needed* | 创建后 |
| beforeMount | onBeforeMount | 挂载前 |
| mounted | onMounted | 挂载后 |
| beforeUpdate | onBeforeUpdate | 更新前 |
| updated | onUpdated | 更新后 |
| beforeUnmount | onBeforeUnmount | 销毁前 |
| unmounted | onUnmounted | 销毁后 |
| errorCaptured | onErrorCaptured | 子组件出错会调用 |
| renderTracked | onRenderTracked | 注册一个调试钩子，当组件渲染过程中追踪到响应式依赖时调用。&lt;br>这个钩子仅在开发模式下可用，且在服务器端渲染期间不会被调用。 |
| renderTriggered | onRenderTriggered | 注册一个调试钩子，当响应式依赖的变更触发了组件渲染时调用。&lt;br>这个钩子仅在开发模式下可用，且在服务器端渲染期间不会被调用。 |
| activated | onActivated | keep-alive 激活后触发 |
| deactivated | onDeactivated | keep-alive 停用缓存后触发 |
| serverPrefetch | onServerPrefetch | 注册一个异步函数，在组件实例在服务器上被渲染之前调用。&lt;br>SSR only |

```vue
<template>
  <div>
    {{ name }}
    <hr>
    <button @click="handelClick">更新name</button>
  </div>
</template>

<script lang="ts">
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue';

export default {
  name: 'Home',
  setup() {
    let name = ref('这是name的值')
    console.log('setup');
    const handelClick = () => {
      name.value = '新name'
    }

    // 挂载前
    onBeforeMount(() => { console.log('onBeforeMount'); })
    // 挂载
    onMounted(() => { console.log('onMounted'); })
    // 更新前
    onBeforeUpdate(() => { console.log('onBeforeUpdate'); })
    // 更新
    onUpdated(() => { console.log('onUpdated'); })
    // 销毁前
    onBeforeUnmount(() => { console.log('onBeforeUnmount'); })
    // 销毁
    onUnmounted(() => { console.log('onUnmounted'); })
    return {
      name,
      handelClick
    }
  },
}
</script>
```
```vue
<template>
  <div>
    {{ name }}
    <hr>
    <button @click="handelClick">更新name</button>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue';
  
  let name = ref('这是name的值')
  console.log('setup');
  const handelClick = () => {
    name.value = '新name'
  }
  
  // 挂载前
  onBeforeMount(() => { console.log('onBeforeMount'); })
  // 挂载
  onMounted(() => { console.log('onMounted'); })
  // 更新前
  onBeforeUpdate(() => { console.log('onBeforeUpdate'); })
  // 更新
  onUpdated(() => { console.log('onUpdated'); })
  // 销毁前
  onBeforeUnmount(() => { console.log('onBeforeUnmount'); })
  // 销毁
  onUnmounted(() => { console.log('onUnmounted'); })
</script>

```
