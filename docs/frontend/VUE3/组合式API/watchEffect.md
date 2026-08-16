# watchEffect

## **watchEffect**

> 立即执行一遍回调函数，如果这时函数产生了副作用，Vue 会自动追踪副作用的依赖关系，自动分析出响应源。

```vue
watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
```

> 回调会立即执行 ，当`url.value`改变时，再次执行回调。

---

## 清除副作用-oninvalidate

> 一般是在触发监听之前会调用一个函数可以处理你的逻辑

```vue
import { watchEffect, ref } from 'vue'
let message = ref<string>('')
 watchEffect((oninvalidate) => {
    oninvalidate(()=>{
      // do something
    })
    console.log('message', message.value);
})
```
---

## **回调的触发时机-**flush

> 默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新之前被调用。也就是侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。

> -   flush：
> 
> -   pre - 组件**更新前**执行
> -   sync - 效果始终同步触发
> -   post - 组件**更新后**执行

> 想在侦听器回调中能访问被 Vue 更新之后的DOM，你需要指明 flush: 'post'

```vue
watchEffect(callback, {
  flush: 'post'
})
```

也可以使用`watchPostEffect`。等价于

```vue
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})
```

还有`watchSyncEffect`

---

## 停止侦听器

> 侦听器必须用同步语句创建：如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。

```vue
<script setup>
import { watchEffect } from 'vue'

// 它会自动停止
watchEffect(() => {})

// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>

```
```vue
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()

```

## 侦听器调试

> onTrack 和 onTrigger 选项可用于调试侦听器的行为。
> 
> -   onTrack 将在响应式 property 或 ref 作为依赖项被追踪时被调用。
> -   onTrigger 将在依赖项变更导致副作用被触发时被调用。
> 
> 这两个回调都将接收到一个包含有关所依赖项信息的调试器事件。建议在以下回调中编写 debugger 语句来检查依赖关系：
> 
> -   onTrack 和 onTrigger 只能在开发模式下工作。

```vue
watchEffect(
  () => {
    /* 副作用 */
  },
  {
    onTrigger(e) {
      debugger
    }
  }
)
```
