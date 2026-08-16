# Transition

> `&lt;Transition>` 是一个内置组件，这意味着它在任意别的组件中都可以被使用，无需注册。它可以将进入和离开动画应用到通过默认插槽传递给它的元素或组件上。进入或离开可以由以下的条件之一触发：
> 
> -   由`v-if` 所触发的切换
> -   由`v-show` 所触发的切换
> -   由特殊元素 `&lt;component>` 切换的动态组件

> ⚠️
> 
> `&lt;Transition>` 仅支持单个元素或组件作为其插槽内容。如果内容是一个组件，这个组件必须仅有一个根元素。

# 基本使用

```vue
<template>
  <div>
    <button @click="show = !show">Toggle</button>
    <Transition>
      <p v-if="show">hello</p>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let show = ref(false)
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
```

# name

> `name` 声明一个过渡效果名。

> 1.  v-enter-from：**进入动画的起始状态。**在元素插入之前添加，在元素插入完成后的下一帧移除。
> 2.  v-enter-active：**进入动画的生效状态。**应用于整个进入动画阶段。在元素被插入之前添加，在过渡或动画完成之后移除。这个 class 可以被用来定义进入动画的持续时间、延迟与速度曲线类型。
> 3.  v-enter-to：**进入动画的结束状态。**在元素插入完成后的下一帧被添加 (也就是 v-enter-from 被移除的同时)，在过渡或动画完成之后移除。
> 4.  v-leave-from：**离开动画的起始状态。**在离开过渡效果被触发时立即添加，在一帧后被移除。
> 5.  v-leave-active：**离开动画的生效状态。**应用于整个离开动画阶段。在离开过渡效果被触发时立即添加，在过渡或动画完成之后移除。这个 class 可以被用来定义离开动画的持续时间、延迟与速度曲线类型。
> 6.  v-leave-to：**离开动画的结束状态。**在一个离开动画被触发后的下一帧被添加 (也就是 v-leave-from 被移除的同时)，在过渡或动画完成之后移除。

```vue
<template>
  <div>
    <button @click="show = !show">Toggle</button>
    <Transition name="cyq">
      <p v-if="show">hello</p>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let show = ref(false)
</script>

<style scoped>
.cyq-enter-active,
.cyq-leave-active {
  transition: opacity 0.5s ease;
}

.cyq-enter-from,
.cyq-leave-to {
  opacity: 0;
}
</style>
```

# Animate.css

> [https://github.com/animate-css/animate.css](https://github.com/animate-css/animate.css)
> 
> v4+

```vue
npm install animate.css --save
```
```vue
import 'animate.css';
```
```vue
<template>
  <div>
    <button @click="show = !show">Toggle</button>
    <Transition enter-active-class="animate__animated animate__tada"
      leave-active-class="animate__animated animate__bounceOutRight">
      <p v-if="show">hello</p>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let show = ref(false)
</script>
```

# 生命周期

> @before-enter="onBeforeEnter"
> 
> @enter="onEnter"
> 
> @after-enter="onAfterEnter"
> 
> @enter-cancelled="onEnterCancelled"
> 
> @before-leave="onBeforeLeave"
> 
> @leave="onLeave"
> 
> @after-leave="onAfterLeave"
> 
> @leave-cancelled="onLeaveCancelled"

```vue
<template>
  <div>
    <button @click="show = !show">Toggle</button>
    <Transition @before-enter="onBeforeEnter" @enter="onEnter" @after-enter="onAfterEnter"
      @enter-cancelled="onEnterCancelled" @before-leave="onBeforeLeave" @leave="onLeave" @after-leave="onAfterLeave"
      @leave-cancelled="onLeaveCancelled">
      <p v-if="show">hello</p>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
let show = ref(false)

// 在元素被插入到 DOM 之前被调用
// 用这个来设置元素的 "enter-from" 状态
const onBeforeEnter = (el: Element) => {
  
}

// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
const onEnter = (el: Element, done: Function) => {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done()
}

// 当进入过渡完成时调用。
const onAfterEnter = (el: Element) => { }
const onEnterCancelled = (el: Element) => { }

// 在 leave 钩子之前调用
// 大多数时候，你应该只会用到 leave 钩子
const onBeforeLeave = (el: Element) => { }

// 在离开过渡开始时调用
// 用这个来开始离开动画
const onLeave = (el: Element, done: Function) => {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done()
}

// 在离开过渡完成、
// 且元素已从 DOM 中移除时调用
const onAfterLeave = (el: Element) => { }

// 仅在 v-show 过渡中可用
const onLeaveCancelled = (el: Element) => { }

</script>
```

# appear

> 某个节点初次渲染时应用一个过渡效果。

```vue
<template>
  <div>
    <Transition 
      appear 
      appear-active-class="animate__animated animate__tada"
      appear-from-class="animate__animated animate__tada"
      appear-to-class="animate__animated animate__tada">
      <p>hello</p>
    </Transition>
  </div>
</template>
```

# 外

-   [https://greensock.com](https://greensock.com)
-   [https://aerotwist.com](https://aerotwist.com)

```vue
<template>
    <div>
        <input step="20" v-model="num.current" type="number" />
        <div>{{ num.tweenedNumber.toFixed(0) }}</div>
    </div>
</template>
    
<script setup lang='ts'>
import { reactive, watch } from 'vue'
import gsap from 'gsap'
const num = reactive({
    tweenedNumber: 0,
    current:0
})
 
watch(()=>num.current, (newVal) => {
    gsap.to(num, {
        duration: 1,
        tweenedNumber: newVal
    })
})
 
</script>

```
