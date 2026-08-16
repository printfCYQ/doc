# x. Objet object {}

## x. Objet object {}

| Object | 原型链顶端，可以作为任何类型 |
| --- | --- |
| object | 仅仅作为object类型 |
| {} | 基本等价于 new Object 与Object 一样【但是定义后的变量不可修改】 |

```typescript
let a1: Object = 123;
let a2: Object = "123";

let a3: object = 123; // 不能将类型“number”分配给类型“object”。
let a4: object = { name: 1 };

let a5: {} = { name: 1 };
let a6: {} = 123;
```

## 3\. interface

> 重名合并
> interface A extends B { }
> 
> 接口继承
> interface Fn {
> 
> (name:string):number[]
> 
> }
> 
> 接口定义函数类型

## 4\. 数组类型

```typescript
const arr:Array<number> = [1,2,3]
const arr2:string[] = ['a','b','c']

function fn(a: number, b: number) {
  let arr: IArguments = arguments;
  console.log(arr); // [Arguments] { '0': 1, '1': 3 }
}
fn(1, 3);
```
```typescript
interface NewIArguments {
  callee: Function;
  length: number;
  [index: number]: any;
}
```

## 5\. 函数类型

```typescript
interface Obj {
  arr: number[];
  add: (number: number) => void;
}

let obj: Obj = {
  arr: [1, 2, 3],
  add(this: Obj, number: number) {
    this.arr.push(number);
  },
};
obj.add(4);
```
```typescript
function add(a: string, b: string): number;
function add(a: number, b: number): number;

function add(a: any, b: any): any {
  if (typeof a === "string") {
    return Number(a) + Number(b);
  } else {
    return a;
  }
}

console.log(add(1, 2));
console.log(add("1", "2"));
```

## 6\. 联合、交叉、断言

```typescript
interface A {
  name: string;
}

interface B {
  age: number;
}

const user: A & B = {
  name: "name",
  age: 1,
};
```
```typescript
interface A {
  name: string;
}

interface B {
  age: number;
}

const user: A | B = {
  name: "name",
};
```
```typescript
interface A {
  name: string;
}

interface B {
  age: number;
}

function fn(user: A | B) {
  console.log((user as A).name);
  console.log((<B>user).age);
}
```

## 7\. 内置对象

```typescript
function fn(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    resolve(1);
  });
}
fn().then((res) => {
  console.log(res);
});
```

## 8\. class

```typescript
interface Person {
  run(type: boolean): boolean;
}
interface H {
  set(): void;
}

class Max implements Person, H {
  run(type: boolean): boolean {
    return type;
  }
  set(): void {
    console.log("set");
  }
}
```

### 8.1抽象类

```typescript
abstract class A {}
```

## 9\. 元祖

```typescript
const arr:[number,string,boolean] = [ 1,'2',false];
```

## 10\. 枚举

```typescript
enum = {
  red,
  green,
  blue
}
```

## 11\. 类型推论、类型别名

```typescript
let a = 1

type s = number | string
```
> type 重名 【报错】

## 12\. never

```typescript
type A = number & string
```

## 13\. symbol

```typescript
// var Symbol: SymbolConstructor
// (description?: string | number | undefined) => symbol
let s: symbol = Symbol();
```
> -   symbol 作为 对象的 key时
> 
> -   for in // 不能读取symbol
> -   Object.keys() // 不能读取symbol
> -   Object.getOwnPropertyNames() // 不能读取symbol
> -   Object.getOwnPropertySymbols() // 只能读取symbol
> 
> -   解决
> 
> -   Reflect.ownKeys(obj) // 都能取到

### 13.1 迭代器

```typescript
const map: Map<any, any> = new Map();
map.set("a", 1);
map.set("b", 2);
map.set("c", 3);

const each = (value: any) => {
  let It: any = value[Symbol.iterator]();
  let next: any = { done: false };
  while (!next.done) {
    next = It.next();
    if (!next.done) {
      console.log(next.value);
    }
  }
};
each(map);
```
> iterator 的语法糖 for...of
> 对象不能使用 for...of ，因为对象没有`[Symbol.iterator]`

### 13.2 生成器

```typescript
function* generator(arr) {
  for (let v of arr) {
    yield v;
  }
}
```

## 14\. 泛型

```typescript
function fn<T>(a: T, b: T): Array<T> {
  return [a, b];
}
fn(1, 2);
fn("a", "b");
```
```typescript
type A<T> = number | string | T;

let a: A<boolean> = true;
```
```typescript
function fn<T = number, K = boolean>(a: T, b: K): Array<T | K> {
  return [a, b];
}
fn(1, false);
fn("1", undefined);
```

### 14.1 泛型约束

```typescript
function fn<T extends number>(a: T, b: T): Array<T> {
  return [a, b];
}
fn(1, 2);
```
```typescript
const obj = {
  name: "name",
  age: 1,
};

type T = keyof typeof obj; // type T = "name" | "age"
```
```typescript
interface Data {
  name: string;
  age: number;
}

// 将属性都变为可选
type Options<T extends object> = {
  [Key in keyof T]?: T[Key];
};

type A = Options<Data>;
// type A = {
//   name?: string | undefined;
//   age?: number | undefined;
// }
```

## 15\. ts.config配置文件

## 16\. namespace
