# React 笔记

React 是 Meta 出的前端库，核心思想就一句话：**用组件拼界面，用状态（state）描述"当前长什么样"，状态变了界面就重画**。它不帮你操作 DOM，而是让你声明"界面应该是 state 的函数"——`UI = f(state)`。

和 [Vue 3](../vue/vue.md) 不同，React 没有专门的模板语言，界面用 **JSX**（长得像 HTML 的 JS 语法）写，逻辑和视图在同一个地方，灵活度很高。

> 学本篇前建议先有 [JavaScript](../javascript/javascript.md) 和 [TypeScript](../typescript/typescript.md) 基础，用 [Vite](../engineering/vite.md) 起 React 项目最省事。

---

## 1. 创建项目（用 Vite）

```bash
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install
npm run dev
```

`react-ts` 模板自带 TS。配置细节见 [Vite 笔记](../engineering/vite.md)。

---

## 2. JSX 与函数组件

React 组件就是一个返回 JSX 的函数。函数组件是现在的主流写法（类组件基本淘汰）。

```tsx
function Hello({ name }: { name: string }) {
  return <h1>你好，{name}</h1>   // JSX，{ } 里塞 JS 表达式
}

// 使用
<Hello name="Tom" />
```

JSX 会被编译成 `React.createElement(...)` 调用。注意：
- 标签类名用 `className` 而不是 `class`。
- 多行 JSX 用 `()` 包起来。
- 列表渲染要加 `key`（见第 8 节）。

---

## 3. useState：让组件"记得"东西

```tsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)   // [值, 改值的函数]

  return (
    <button onClick={() => setCount(count + 1)}>
      点了 {count} 次
    </button>
  )
}
```

- `useState(初始值)` 返回数组，解构成 `[值, setter]`。
- 改状态**必须调 setter**，直接改 `count++` 不会重渲染。
- 多个独立状态就多次调用 `useState`。

### useReducer：复杂状态用reducer
当状态逻辑多、多个字段联动时，用 `useReducer` 更清晰：

```tsx
import { useReducer } from 'react'

function reducer(state: { n: number }, action: { type: 'inc' | 'dec' }) {
  switch (action.type) {
    case 'inc': return { n: state.n + 1 }
    case 'dec': return { n: state.n - 1 }
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { n: 0 })
  return (
    <>
      <button onClick={() => dispatch({ type: 'dec' })}>-</button>
      <span>{state.n}</span>
      <button onClick={() => dispatch({ type: 'inc' })}>+</button>
    </>
  )
}
```

---

## 4. useEffect：处理"副作用"

副作用指不是纯渲染的事：发请求、订阅、操作 DOM、设定时器。useEffect 在渲染后执行。

```tsx
import { useState, useEffect } from 'react'

function User({ id }: { id: number }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    let alive = true
    fetch(`/api/user/${id}`)
      .then(r => r.json())
      .then(d => { if (alive) setData(d) })   // 防组件卸载后 setState

    return () => { alive = false }   // 清理函数：卸载/重跑前执行
  }, [id])   // 依赖：id 变了才重新执行

  return <div>{data ? data.name : '加载中'}</div>
}
```

依赖数组 `[]` 等于"只在挂载时跑一次"（类似 `onMounted`）；`[id]` 表示 id 变就重跑；不写依赖则每次渲染都跑（慎用）。**清理函数**用来取消请求、清定时器，避免内存泄漏。

---

## 5. useContext：跨组件传值

不想一层层 props 透传时，用 Context 在全局"广播"值。

```tsx
import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext<'light' | 'dark'>('light')

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        切换
      </button>
    </ThemeContext.Provider>
  )
}

function Toolbar() {
  const theme = useContext(ThemeContext)
  return <div>当前主题：{theme}</div>
}
```

对应 [Vue 的 provide/inject](../vue/vue.md)。

---

## 6. useMemo 与 useCallback：性能优化

```tsx
import { useMemo, useCallback } from 'react'

function List({ items }: { items: number[] }) {
  const sorted = useMemo(() => [...items].sort(), [items])  // 只有 items 变才重算
  const onClick = useCallback(() => console.log('click'), []) // 函数引用稳定
  return <ul>{sorted.map(i => <li key={i}>{i}</li>)}</ul>
}
```

- `useMemo`：缓存"算出来的值"，依赖没变就不重算。
- `useCallback`：缓存"函数本身"，避免每次渲染都生成新函数引用（传给子组件能减少不必要的重渲染）。

别滥用——大多数情况 React 够快，先写对再优化。

---

## 7. useRef：拿 DOM 与存"不触发渲染"的值

```tsx
import { useRef, useEffect } from 'react'

function Input() {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    ref.current?.focus()   // 挂载后自动聚焦输入框
  }, [])

  return <input ref={ref} />
}
```

`useRef` 的值（`.current`）变了**不会**触发重渲染，适合存 DOM 引用、定时器 ID 等"不想引起刷新"的变量。

---

## 8. 列表渲染与 key

```tsx
function TodoList({ todos }: { todos: { id: number; text: string }[] }) {
  return (
    <ul>
      {todos.map(t => (
        <li key={t.id}>{t.text}</li>   // key 用稳定唯一 id，别用索引
      ))}
    </ul>
  )
}
```

`key` 帮 React 识别"哪项是哪项"。用数组索引当 key，在增删/排序时会让 React 搞错，导致状态串味。

---

## 9. 受控表单

React 里表单值由 state 掌控（受控组件）：

```tsx
function Form() {
  const [text, setText] = useState('')
  return (
    <input
      value={text}
      onChange={e => setText(e.target.value)}  // 每次输入更新 state
    />
  )
}
```

`e.target.value` 拿输入值，`onChange` 同步到 state，界面和数据始终一致。

---

## 10. 自定义 Hook

把复用逻辑抽成 `use` 开头的函数，对应 [Vue 的 composable](../vue/vue.md)。

```tsx
import { useState, useEffect } from 'react'

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    fetch(url).then(r => r.json()).then(d => {
      if (alive) { setData(d); setLoading(false) }
    })
    return () => { alive = false }
  }, [url])

  return { data, loading }
}
```

---

## 11. 路由与状态管理

- **路由**：用 `react-router-dom`，`<Routes>`/`<Route>` 配路由，`<Link>` 跳转。
- **全局状态**：小型用 `Context` + `useReducer`；大型常用 `Zustand`（轻）、`Redux Toolkit`（规范）。不必一上来就上 Redux。

这些按需引入，先掌握上面 10 节的核心 Hook，再做整站。

---

## 12. 虚拟 DOM 与 diff

React 并不会每次都重画整个真实 DOM（那样太慢）。它维护一个"虚拟 DOM"（JS 对象描述界面），状态变化时生成新虚拟 DOM，和旧的对比（diff），只把"变了的那小块"更新到真实 DOM。这就是为什么改 state 比手动操作 DOM 高效又省心。`key` 就是 diff 时用来精准定位列表项的。

---

## 13. React 与 Vue 3 对比

| 维度 | React | Vue 3 |
|------|-------|-------|
| 视图写法 | JSX（JS 里写标签） | 模板（HTML 感强） |
| 状态更新 | 手动 `setState` | 改 `ref.value` 自动更新 |
| 响应式 | 靠重渲染 + diff | 框架自动追踪依赖 |
| 逻辑复用 | 自定义 Hook | Composables |
| 灵活性 | 高，写法自由 | 约定多，模板约束强 |

两者都能做出同样的应用。详见 [Vue 3 笔记](../vue/vue.md)。

---

## 14. 常见坑

1. 直接改 state（如 `count++`）不生效，必须调 setter。
2. 忘记写/写错 `useEffect` 依赖，导致"没刷新"或"无限循环"（依赖里放了对象/函数且不 memo）。
3. 列表 key 用索引，重排后状态错乱。
4. 在 `useEffect` 里忘了清理（`return` 清理函数），造成内存泄漏、重复请求。
5. 在渲染期间执行副作用（如直接 fetch），应放进 `useEffect`。
6. 把函数/对象当依赖却不 memo，每次渲染都是新引用，触发无限 effect。

---

## 15. 练习

1. 写一个 `useToggle`：`const [on, toggle] = useToggle(false)`。
2. 写一个待办应用：添加、删除、标记完成，状态用 `useState` 数组。
3. 用 `useEffect` + `fetch` 写一个组件，加载 GitHub 用户信息并显示，带 loading 态。
4. 用 `useReducer` 实现计数器（inc/dec/reset）。
5. 用 `useMemo` 优化一个"对大数组排序并求和"的组件，避免每次渲染重算。

---

## 16. 下一步

- 对比学习 → [Vue 3 笔记](../vue/vue.md)
- 给组件加 TS 类型 → [TypeScript 笔记](../typescript/typescript.md)
- 起项目、配路由、打包 → [Vite 笔记](../engineering/vite.md)
- 补语言基础 → [JavaScript 笔记](../javascript/javascript.md)
