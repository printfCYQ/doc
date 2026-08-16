# TransitionGroup

> `&lt;TransitionGroup>` 是一个内置组件，用于对 v-for 列表中的元素或组件的插入、移除和顺序改变添加动画效果。

> &lt;TransitionGroup> 支持和 &lt;Transition> 基本相同的 props、CSS 过渡 class 和 JavaScript 钩子监听器，但有以下几点区别：
> 
> -   默认情况下，它不会渲染一个容器元素。但你可以通过传入 tag prop 来指定一个元素作为容器元素来渲染。
> -   过渡模式在这里不可用，因为我们不再是在互斥的元素之间进行切换。
> -   列表中的每个元素都必须有一个独一无二的 key attribute。
> -   CSS 过渡 class 会被应用在列表内的元素上，而不是容器元素上。

> [https://cn.vuejs.org/guide/built-ins/transition-group.html](https://cn.vuejs.org/guide/built-ins/transition-group.html)

# 基本使用

> 安装lodash
> 
> `pnpm i lodash -S`
> 
> `pnpm i @types/lodash -S`

```vue
<script setup lang="ts">
import _ from 'lodash'
import { ref } from 'vue'

const getInitialItems = () => [1, 2, 3, 4, 5]
const items = ref(getInitialItems())
let id = items.value.length + 1

function insert() {
  const i = Math.round(Math.random() * items.value.length)
  items.value.splice(i, 0, id++)
}

function reset() {
  items.value = getInitialItems()
}

function shuffle() {
  items.value = _.shuffle(items.value)
}

function remove(item: number) {
  const i = items.value.indexOf(item)
  if (i > -1) {
    items.value.splice(i, 1)
  }
}
</script>

<template>
  <button @click="insert">insert at random index</button>
  <button @click="reset">reset</button>
  <button @click="shuffle">shuffle</button>

  <TransitionGroup tag="ul" name="fade" class="container">
    <div v-for="item in items" class="item" :key="item">
      {{ item }}
      <button @click="remove(item)">x</button>
    </div>
  </TransitionGroup>
</template>

<style>
.container {
  position: relative;
  padding: 0;
}

.item {
  width: 100%;
  height: 30px;
  background-color: #f3f3f3;
  border: 1px solid #666;
  box-sizing: border-box;
}

/* 1. 声明过渡效果 */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. 声明进入和离开的状态 */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
.fade-leave-active {
  position: absolute;
}
</style>
```
```vue
<template>
  <div>
    <button @click="shuffle">Shuffle</button>
    <transition-group class="wraps" name="mmm" tag="ul">
      <li class="cell" v-for="item in items" :key="item.id">{{ item.number }}</li>
    </transition-group>
  </div>
</template>

<script setup  lang='ts'>
import _ from 'lodash'
import { ref } from 'vue'
let items = ref(Array.apply(null, { length: 81 } as number[]).map((_, index) => {
  return {
    id: index,
    number: (index % 9) + 1
  }
}))
const shuffle = () => {
  items.value = _.shuffle(items.value)
}
</script>

<style scoped lang="less">
.wraps {
  display: flex;
  flex-wrap: wrap;
  width: calc(25px * 10 + 9px);

  .cell {
    width: 25px;
    height: 25px;
    border: 1px solid #ccc;
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.mmm-move {
  transition: transform 0.8s ease;
}
</style>
```

# JS 动画库

-   [https://greensock.com](https://greensock.com)
-   [https://aerotwist.com](https://aerotwist.com)
