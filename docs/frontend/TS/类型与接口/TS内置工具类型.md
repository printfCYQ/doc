# TS内置工具类型

## TS内置工具类型

> [https://www.typescriptlang.org/docs/handbook/utility-types.html](https://www.typescriptlang.org/docs/handbook/utility-types.html)

### Record

```typescript
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```
> Record&lt;K,T>
> 
> Constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type.” —
> 
> 构造一个对象类型，Keys 表示对象的属性键 、Type 表示对象的属性值，用于将一种类型属性映射到另一种类型
> 理解为：将 K 的每一个值都定义为 T 类型
```typescript
type PromiseType = "pending" | "fulfilled" | "rejected";

type Type2 = Record<PromiseType, string>;

const data: Type2 = {
  pending: "a",
  fulfilled: "b",
  rejected: "c",
};
```

### Readonly

```typescript
type Readonly<T> = {
 readonly [P in keyof T]: T[P];
};

```
> 将数组或对象的属性值换为只读的
```typescript
interface Todo {
 title: string;
}

const todo: Readonly<Todo> = {
 title: "Delete inactive users"
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
```

### Require

```typescript
type Required<T> = { 
    [P in keyof T]-?: T[P] 
};
```
> 将类型的所有属性变成必选
```typescript
interface User {
  name?: string;
  age?: number;
}

const user: Required<User> = {
  name: "a",
};
// Error 缺少属性 "age"，
```

### Partial

```typescript
/**
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```
> 将T中的所有属性设置为可选
```typescript
interface User {
  name: string;
  age: number;
}

const user: Partial<User> = {
  name: "a",
};
```

### Extract

```typescript
type Extract<T, U> = T extends U ? T : never;
```
> 从 T 中提取出 U
```typescript
type T0 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T1 = Extract<string | number | (() => void), Function>; // () =>void
```

### Exclude

```typescript
type Exclude<T, U> = T extends U ? never : T;
```
> 某个类型中属于另一个的类型移除掉
```typescript
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

### Pick

```typescript
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```
> 从某个类型中挑出一些属性出来
```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

### Omit

```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```
> 使用 T 类型中除了 K 类型的所有属性，来构造一个新的类型
```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

### NonNullable

```typescript
type NonNullable<T> = T extends null | undefined ? nerver : T
```
> 过滤类型中的 null 及 undefined 类型。
```typescript
type T0 = NonNullable<string | number | undefined>; // string | number
type T1 = NonNullable<string[] | null | undefined>; // string[]
```

### Parameters

```typescript
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) 
  => any ? P : never;
```
> 获得函数的参数类型组成的元组类型。
```typescript
type A = Parameters<() =>void>// []
type B = Parameters<typeof Array.isArray>// [any]
type C = Parameters<typeof parseInt>// [string, (number | undefined)?]
type D = Parameters<typeof Math.max>// number[]
```

### ReturnType

```typescript
type ReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;
```
> 用来得到一个函数的返回值类型
```typescript
type Func = (value: number) => string;
const foo: ReturnType<Func> = "1";
```
