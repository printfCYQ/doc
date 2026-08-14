# React Hooks 入门

## 简介

本节介绍 React 常用 Hooks 的使用方法，包括 useState、useEffect、useContext、useMemo、useCallback 以及自定义 Hook 的封装。

## 目录 / 章节

- useState 与 useReducer
- useEffect 与清理函数
- useContext 跨组件通信
- useMemo 与 useCallback 性能优化
- useRef 获取 DOM 引用
- 自定义 Hook 封装

## 笔记正文

::: details 点击展开示例代码
```tsx
import { useState, useEffect, useMemo } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
    return () => {
      console.log('清理副作用');
    };
  }, [count]);

  const doubled = useMemo(() => count * 2, [count]);

  return (
    <div>
      <p>Count: {count} / Doubled: {doubled}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}
```
:::
