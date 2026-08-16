# Vue 3 笔记

Vue 是一个"渐进式"前端框架——你可以只在页面里用一小块，也可以整站都用它。它最大的特点是**响应式**：你改了数据，页面自动跟着变，不用手动去操作 DOM。Vue 3 是目前主流版本，核心写法是 Composition API（组合式 API）。

打个比方：jQuery 时代你要自己"搬砖"（找到元素、改内容、绑事件）；Vue 让你只管"描述想要的结果"（数据长这样、模板这么摆），剩下的同步它帮你做。

> 学本篇前建议先有 [JavaScript](../javascript/javascript.md) 和 [TypeScript](../typescript/typescript.md) 基础，[Vite](../engineering/vite.md) 用来起项目最顺手。对比可看 [React](../react/react.md)。

---

## 1. 创建项目（用 Vite）

```bash
npm create vite@latest my-vue-app -- --template vue-ts
cd my-vue-app
npm install
npm run dev
```

打开终端给的本地地址就能看到默认页面。具体配置见 [Vite 笔记](../engineering/vite.md)。

---

## 2. 模板语法

Vue 单文件组件（`.vue`）分三块：`<template>`（结构）、`<script>`（逻辑）、`<style>`（样式）。

```vue
<template>
  <h1>{{ title }}</h1>                      <!-- 插值 -->
  <p v-if="show">看得见我</p>                <!-- 条件 -->
  <ul>
    <li v-for="item in list" :key="item.id">{{ item.name }}</li>  <!-- 列表 -->
  </ul>
  <button :disabled="loading" @click="handleClick">点我</button>  <!-- 绑定属性/事件 -->
  <input v-model="text" />                  <!-- 双向绑定 -->
</template>
```

- `{{ }}`：插值，把数据渲染成文本。
- `v-bind`（简写 `:`）：把数据绑到 HTML 属性上。
- `v-on`（简写 `@`）：绑定事件。
- `v-model`：表单输入和数据的双向绑定（输入即改数据）。
- `v-if` / `v-show`：条件渲染（if 是真删/建 DOM，show 只是切换 display）。

---

## 3. 响应式：ref 与 reactive

数据要让 Vue"盯"着，才会自动更新视图。

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'

// ref：基本类型（也支持对象），用 .value 访问
const count = ref(0)
console.log(count.value)   // 0
count.value++              // 改了，模板里自动更新

// reactive：对象/数组，直接访问属性
const state = reactive({ name: 'Tom', age: 18 })
state.age = 19
</script>
```

选择经验：
- 基本类型、单个值用 `ref`。
- 一坨相关数据用 `reactive`（但注意解构会丢失响应性，要配合 `toRefs`）。

```vue
<script setup lang="ts">
import { reactive, toRefs } from 'vue'
const state = reactive({ x: 1, y: 2 })
const { x, y } = toRefs(state)   // 解构成 ref，响应性保留
</script>
```

---

## 4. computed 与 watch

```vue
<script setup lang="ts">
import { ref, computed, watch, watchEffect } from 'vue'

const price = ref(10)
const qty = ref(2)
const total = computed(() => price.value * qty.value)  // 派生值，缓存，不手动更新

watch(price, (newVal, oldVal) => {
  console.log(`价格从 ${oldVal} 变到 ${newVal}`)
})

watchEffect(() => {
  console.log('price 或 qty 变了：', price.value, qty.value)  // 自动收集依赖
})
</script>
```

- `computed`：根据其他数据算出来的"只读"值，依赖变了它才重算（有缓存）。
- `watch`：监听某个数据，变化时做副作用（请求、日志等），能拿到新旧值。
- `watchEffect`：函数里用到啥就监听啥，立即跑一次。

---

## 5. 生命周期钩子

组件从创建到销毁会经过几个阶段，Vue 提供钩子让你在对应时机做事：

```vue
<script setup lang="ts">
import { onMounted, onUpdated, onUnmounted } from 'vue'

onMounted(() => {
  console.log('组件挂载完，可以发请求、拿 DOM')
})
onUpdated(() => console.log('数据变了，DOM 更新后'))
onUnmounted(() => console.log('组件销毁，记得清定时器/监听'))
</script>
```

常用就这三个。对应 [React 的 useEffect](../react/react.md) 依赖 `[]` 等于 `onMounted`，依赖变化等于 `onUpdated`。

---

## 6. 组件：props 与 emit

页面拆成小组件复用。父传子用 `props`，子通知父用 `emit`。

```vue
<!-- Child.vue -->
<script setup lang="ts">
const props = defineProps<{ title: string; count?: number }>()
const emit = defineEmits<{ (e: 'change', value: number): void }>()

function onClick() {
  emit('change', 1)
}
</script>

<template>
  <h2>{{ title }}</h2>
  <button @click="onClick">+1</button>
</template>
```

```vue
<!-- Parent.vue -->
<script setup lang="ts">
import Child from './Child.vue'
function onChange(v: number) { console.log('收到', v) }
</script>

<template>
  <Child title="标题" @change="onChange" />
</template>
```

`defineProps` / `defineEmits` 是 `<script setup>` 的编译器宏，不用 import。配合 TS 后，传错 props 类型编辑器直接报错。

---

## 7. 组合式函数 Composables

把可复用的逻辑抽成函数（约定以 `use` 开头），这就是 Vue 的"逻辑复用"方式，对应 [React 的自定义 Hook](../react/react.md)。

```ts
// useCounter.ts
import { ref } from 'vue'
export function useCounter(init = 0) {
  const count = ref(init)
  const inc = () => count.value++
  const dec = () => count.value--
  return { count, inc, dec }
}
```

```vue
<script setup lang="ts">
import { useCounter } from './useCounter'
const { count, inc } = useCounter(10)
</script>
```

---

## 8. provide / inject 与插槽

### 跨层传数据
祖先用 `provide`，后代用 `inject`，不用一层层 props 透传：

```vue
<!-- 祖先 -->
<script setup lang="ts">
import { provide } from 'vue'
provide('theme', 'dark')
</script>

<!-- 后代（任意深层） -->
<script setup lang="ts">
import { inject } from 'vue'
const theme = inject('theme', 'light')   // 第二个是默认值
</script>
```

### 插槽 slot：把内容"塞"进组件
```vue
<!-- Card.vue -->
<template>
  <div class="card">
    <slot />                      <!-- 默认插槽 -->
    <slot name="footer" />        <!-- 具名插槽 -->
  </div>
</template>

<!-- 使用 -->
<Card>
  正文内容
  <template #footer>底部</template>
</Card>
```

---

## 9. 其他常用能力

- **Teleport**：把内容传送到 `body` 下的指定节点，常做弹窗/提示，避免被父级样式 `overflow` 裁剪。
- **Transition**：给元素进入/离开加动画，包一层 `<Transition>` 即可。
- **动态组件**：`<component :is="currentComp" />` 按变量切换组件。
- **路由**：用 `vue-router` 做多页面跳转（`<RouterLink>`、`<RouterView>`）。
- **状态管理**：跨组件共享用 `Pinia`（比老版 Vuex 简洁很多），见 [Vite 笔记](../engineering/vite.md) 起项目后按需引入。

---

## 10. 数据请求示例

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const list = ref<any[]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetch('/api/list')
    list.value = await res.json()
  } finally {
    loading.value = false
  }
})
</script>
```

请求逻辑也能抽进 composable（如 `useFetch`）复用。

---

## 11. Vue 3 与 React 对比

| 维度 | Vue 3 | React |
|------|-------|-------|
| 模板 | 有 `.vue` 模板，HTML 感强 | JSX，JS 里写标签 |
| 响应式 | 框架自动追踪依赖 | 手动 `setState` 触发重渲染 |
| 逻辑复用 | Composables（`useX`） | 自定义 Hook（`useX`） |
| 学习曲线 | 模板直观，上手快 | 概念少但灵活，易写出复杂代码 |
| 状态更新 | 改 `ref.value` 即更新 | 必须调 `setState` |

两者本质都能做同样的事，选哪个看团队和口味。详见 [React 笔记](../react/react.md)。

---

## 12. 常见坑

1. `reactive` 解构会丢响应性，用 `toRefs` 或干脆用 `ref`。
2. `v-for` 一定要加 `:key`，且用稳定唯一值，别用索引（列表重排会出 bug）。
3. `ref` 在 `<script>` 里要 `.value`，在模板里不用（模板自动解包）。
4. 异步请求要在 `onUnmounted` 里防"组件没了还在 setState"，或用标志位。
5. `computed` 默认只读，想改要写 `get`/`set`。
6. 过度用 `watch` 监听做派生，应该优先考虑 `computed`。

---

## 13. 练习

1. 写一个 `useToggle` composable：返回 `[value, toggle]`，`toggle` 翻转布尔值。
2. 用 `v-for` + `:key` 渲染一个待办列表，支持添加和删除。
3. 用 `provide/inject` 实现主题切换（dark/light），子组件读取并显示。
4. 写一个 `useFetch<T>(url)` composable，返回 `{ data, loading, error }`。
5. 用 `computed` 实现一个购物车总价（单价×数量求和），并加"全选"开关。

---

## 14. 下一步

- 对比学习 → [React 笔记](../react/react.md)
- 用 TS 给组件加类型 → [TypeScript 笔记](../typescript/typescript.md)
- 起项目、配路由、打包 → [Vite 笔记](../engineering/vite.md)
- 补齐语言基础 → [JavaScript 笔记](../javascript/javascript.md)
