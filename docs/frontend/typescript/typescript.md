# TypeScript 类型基础

## 简介

本节介绍 TypeScript 的核心类型系统，包括原始类型、联合类型、交叉类型、接口、类型别名、泛型等。

## 目录 / 章节

- 原始类型与数组
- 联合类型与类型守卫
- 接口（interface）与类型别名（type）
- 泛型基础
- 工具类型（Partial、Required、Pick 等）
- 条件类型与映射类型

## 笔记正文

::: details 点击展开示例代码
```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

type PartialUser = Partial<User>;
type ReadonlyUser = Readonly<User>;

function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    result[key] = obj[key];
  });
  return result;
}

const user: User = { id: 1, name: 'Alice' };
const picked = pick(user, ['id', 'name']);
```
:::
