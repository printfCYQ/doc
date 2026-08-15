# TypeScript 笔记

TypeScript（简称 TS）是 JavaScript 的"超集"——所有合法的 JS 代码都是合法的 TS，但 TS 额外多了**类型系统**。打个比方：JS 像手写便签，随手写但不保证对；TS 像填表格，每格规定填什么类型，填错了当场被拦下来。

它的核心价值就一句：**在写代码时（不是运行时）就发现错误**。变量传错类型、函数少传参数、对象少了字段，编辑器立刻标红，省下大量"上线才发现"的尴尬。

> 学 TS 前建议先过一遍 [JavaScript 笔记](../javascript/javascript.md)。本篇假定你已经懂 JS 基础。之后写 [Vue 3](../vue/vue.md) 和 [React](../react/react.md) 都强烈建议上 TS。

---

## 1. 跑起来

两种方式：

### 浏览器/Vite 项目里直接用
Vite 起的 Vue/React 项目天生支持 `.ts`，写就行，见 [Vite 笔记](../engineering/vite.md)。

### 单独编译
```bash
npm install -g typescript
tsc --init        # 生成 tsconfig.json
tsc hello.ts      # 编译成 hello.js
tsc -w            # 监听模式，改了自动编译
```

---

## 2. 基础类型注解

给变量、参数、返回值"标注类型"，用冒号：

```ts
let age: number = 18
let name: string = 'Tom'
let isStudent: boolean = true
let u: undefined = undefined
let n: null = null

// 函数参数和返回值都标
function add(a: number, b: number): number {
  return a + b
}
```

不标也行（TS 会推断），但函数参数和返回值建议标，接口边界最该显式。

### 数组与元组
```ts
let list: number[] = [1, 2, 3]
let list2: Array<string> = ['a', 'b']     // 泛型写法，等价

// 元组：固定长度和每项的类型
let point: [number, number] = [10, 20]
let info: [string, number] = ['Tom', 18]
```

### 枚举 enum
```ts
enum Role {
  Guest = 0,
  User = 1,
  Admin = 2,
}
const r: Role = Role.Admin   // 2
```

---

## 3. 联合类型与交叉类型

### 联合（或）：值可以是多种类型之一
```ts
let id: number | string
id = 1
id = 'abc'

// 常用来约束参数取值
function padLeft(value: string, padding: number | string) { /* ... */ }
```

### 交叉（且）：把多个类型合并成一个
```ts
type A = { x: number }
type B = { y: string }
type C = A & B        // { x: number; y: string }
```

---

## 4. 接口 interface 与类型别名 type

两者都能描述对象形状，日常很像，区别在细节：

```ts
interface User {
  id: number
  name: string
  email?: string        // ? 表示可选
  readonly age: number  // 只读，不能改
}

// type 也能写
type User2 = {
  id: number
  name: string
}
```

粗略经验：
- 描述"对象/类的形状"用 `interface`（可声明合并，更适合 API 契约）。
- 需要联合、交叉、工具类型派生时用 `type` 更方便。

```ts
const u: User = { id: 1, name: 'Tom', age: 18 }
// u.age = 19      // ❌ 只读
// u.email 可省略
```

### 索引签名（字段名不确定的对象）
```ts
interface StringMap {
  [key: string]: string
}
const m: StringMap = { a: '1', b: '2' }
```

---

## 5. 函数类型与重载

```ts
// 完整写法
type Fn = (a: number, b: number) => number

// 可选参数、默认值
function greet(name: string, prefix?: string): string {
  return `${prefix ?? '你好'}${name}`
}
```

### 函数重载：同名不同参数
```ts
function reverse(x: string): string
function reverse(x: number): number
function reverse(x: string | number): string | number {
  if (typeof x === 'string') return x.split('').reverse().join('')
  return Number(x.toString().split('').reverse().join(''))
}
```

---

## 6. 泛型：让类型"参数化"

泛型让你写"不指定具体类型、但保持类型安全"的代码。常见容器、工具函数都用它。

```ts
function identity<T>(value: T): T {
  return value
}
identity<number>(1)   // 1
identity('a')         // 类型自动推断成 string

// 多个泛型参数
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value]
}
```

配合约束（`extends`）限定范围：
```ts
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b
}
```

### 泛型在接口/类里
```ts
interface ApiResponse<T> {
  code: number
  data: T
}
const res: ApiResponse<string[]> = { code: 0, data: ['a', 'b'] }
```

---

## 7. 工具类型（内置，超好用）

TS 自带一批"类型层面的函数"，用来基于已有类型做变换：

```ts
interface User {
  id: number
  name: string
  email: string
}

type PartialUser = Partial<User>        // 所有字段变可选
type RequiredUser = Required<User>      // 所有字段变必填
type PickUser = Pick<User, 'id' | 'name'>   // 只取部分字段
type OmitUser = Omit<User, 'email'>     // 排除部分字段
type ReadonlyUser = Readonly<User>      // 全部只读
type UserKeys = keyof User              // 'id' | 'name' | 'email'
type IdType = User['id']                // number
```

还有 `Record<K, V>` 造映射类型：`type Dict = Record<string, number>`。

---

## 8. 类型守卫与类型收窄

TS 在 `if` 里能"聪明地"缩小类型范围：

```ts
function handle(x: number | string) {
  if (typeof x === 'string') {
    x.toUpperCase()        // 这里 TS 知道 x 是 string
  } else {
    x.toFixed(2)           // 这里知道是 number
  }
}

// 自定义守卫
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}
```

`typeof`、`instanceof`、自定义的 `pet is X` 都能触发收窄，减少不必要的类型断言。

---

## 9. 类：修饰符与抽象

```ts
abstract class Animal {
  protected name: string       // 子类可见，外部不可
  private secret: number = 1   // 只有自己可见
  readonly id: number = 0      // 只读
  constructor(name: string) { this.name = name }

  abstract speak(): void       // 抽象方法，子类必须实现
}

class Dog extends Animal {
  speak() { console.log(`${this.name} 汪汪`) }
}
```

- `public`（默认）、`private`、`protected`、`readonly`、`abstract`、`static` 都能用。
- 参数属性简写：`constructor(public name: string) {}` 等于声明+赋值。

---

## 10. 模块与声明文件 .d.ts

和 [JS 模块](../javascript/javascript.md) 一样用 `import`/`export`。第三方库没有内置类型时，需要 `@types/xxx`（如 `@types/react`）或自己写 `.d.ts` 声明文件：

```ts
// lodash.d.ts
declare module 'lodash' {
  export function debounce<T extends (...args: any[]) => any>(fn: T, wait: number): T
}
```

`tsconfig.json` 里 `compilerOptions.types` / `include` 控制哪些类型被纳入。

---

## 11. tsconfig 关键项

```jsonc
{
  "compilerOptions": {
    "target": "ES2020",        // 编译到哪个 JS 版本
    "module": "ESNext",        // 模块系统
    "strict": true,            // 开启所有严格检查（强烈建议）
    "noImplicitAny": true,     // 不允许隐式 any
    "strictNullChecks": true,  // null/undefined 必须显式处理（最实用）
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

`strict: true` 会一次性打开 `strictNullChecks` 等一票检查。新手一开始会被红一片，但养成"先想清楚类型"的习惯后，bug 少一大半。

---

## 12. 与框架结合

- [Vue 3](../vue/vue.md)：`<script setup lang="ts">` 里给 `ref`、`props`、`emit` 都标类型，IDE 提示飞起。
- [React](../react/react.md)：`.tsx` 文件，组件的 `props` 用 `interface` 定义，事件、状态类型全有了。

两者都用 `defineProps`/`FC` 等机制把 TS 类型接到组件上，这是现代前端项目的标配。

---

## 13. 常见坑

1. `strictNullChecks` 下，可能为空的值要先判断再访问属性。
2. `interface` 和 `type` 混用没关系，但团队里定个规矩别各写各的。
3. 别到处 `any`，`any` 等于放弃类型检查；实在不确定用 `unknown` 更安全。
4. 类型断言 `as` 是"我比你更懂"，不会运行时转换，乱用会埋雷。
5. 枚举编译后是有运行时值的对象，注意 tree-shaking 和体积。
6. `import type` 只导入类型、不打包代码，能减小产物体积。

---

## 14. 练习

1. 定义一个 `Stack<T>` 类（泛型），支持 `push`/`pop`/`peek`，并写类型标注。
2. 用 `Pick` 和 `Omit` 从一个 `Product` 接口派生出 `ProductSummary`（去掉 `description`、`price` 保留部分）。
3. 写一个 `safeParse<T>(json: string): T | null` 函数，解析失败返回 null。
4. 用函数重载实现 `format(input: Date): string` 和 `format(input: number): string`。
5. 给下面代码加上类型，消除所有隐式 `any`：
   ```ts
   function sum(arr) { return arr.reduce((a, b) => a + b, 0) }
   ```

---

## 15. 下一步

- 用 TS 写界面框架 → [Vue 3](../vue/vue.md) 或 [React](../react/react.md)
- 用 Vite 起一个 TS 项目 → [Vite 笔记](../engineering/vite.md)
- 回头补 JS 基础 → [JavaScript 笔记](../javascript/javascript.md)
