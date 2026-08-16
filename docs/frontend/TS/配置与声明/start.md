# [TS中文手册](https://typescript.bootcss.com/tutorials/typescript-in-5-minutes.html)

**—— 个人学习记录 ——**

> 基本都是[TS中文手册](https://typescript.bootcss.com/tutorials/typescript-in-5-minutes.html)上的内容

> 小满ZS([https://www.bilibili.com/video/BV1wR4y1377K](https://www.bilibili.com/video/BV1wR4y1377K))
> 
> 小余笔记（[https://github.com/2002XiaoYu/Latest-front-end-Notes](https://github.com/2002XiaoYu/Latest-front-end-Notes)）

# 安装

-   **​**`**npm install typescript -g**`
-   **​**`**npm install -g ts-node**` **直接运行需要**
-   **​**`**tsc -v**`

# 运行

-   `**tsc index.ts**`编译成`.js`文件
-   `**ts-node index.ts**` 直接运行`.ts`文件

# 类型

-   TypeScript支持与JavaScript几乎相同的数据类型

  

> JS 基础类型：`Boolean`、`Number`、`String`、`null`、`undefined` 以及 `ES6` 的 `Symbol`和 `ES10`的 `BigInt`。

> TS新加的类型：`数组`、`元组 Tuple`、`枚举 eunm` 、`任意值 any`、`空值 void`、`never`

### 1\. 布尔类型`Boolean`

```typescript
let isDone: boolean = false;
```

### 2\. 数字`Number`​

-   和JavaScript一样，TypeScript里的所有数字都是浮点数。

```typescript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d; // 十六进制
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744; // 八进制
```

### 3\. 字符串`String`

```typescript
let a: string = '123'
let str: string = `dddd${a}`
```

### 4\. null & undefined

-   undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 string、number等类型的变量

```typescript
let u: undefined = undefined;
let n: null = null;
```

-   指定了`--strictNullChecks`标记，`null`和`undefined`只能赋值给void和它们各自。

### 5\. Symbol

-   基本数据类型，可以创建第一无二的值
-   可以传递参做为唯一标识 只支持 string 和 number类型的参数

```typescript
let sym1 = Symbol();

let sym2 = Symbol("key");
let sym3 = Symbol("key");
sym2 === sym3; // false, symbols是唯一的
```

### 6\. BigInt

-   BigInt是一种特殊的数字类型，它支持任意长度的整数。
-   对 bigint 的所有操作都返回 bigint。
-   不能混用 bigint 和常规数字。
-   bigint 不支持前置加号+。

```typescript
const bigint =1234567890123456789012345678901234567890n;
const sameBigint = BigInt("1234567890123456789012345678901234567890");
const bigintFromNumber =BigInt(10);// same as 10n
```

### 7\. 数组

```typescript
let list: number[] = [1, 2, 3];
let list: Array<number> = [1, 2, 3];
```

### 8\. 元组 Tuple

-   元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。

```typescript
let x: [string, number] = ['hello', 10]
```

-   当访问一个已知索引的元素，会得到正确的类型：

```typescript
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
```

-   当访问一个越界的元素，会使用联合类型替代：

```typescript
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
```

### 9\. 枚举 eunm

-   默认情况下，从0开始为元素编号。

```typescript
enum Color {Red, Green, Blue}
let c: Color = Color.Green; // 1

let colorName: string = Color[2]; // Blue
```

-   手动赋值

```typescript
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green; // 2
```

-   可以由枚举的值得到它的名字

```typescript
enum Color {Red = 1, Green, Blue}
let colorName: string = Color[2];

console.log(colorName);  // Green
```

### 10\. any & unknown

-   `any`任意类型

-   声明变量的时候没有指定任意类型默认为any
-   有一个数组，它包含了不同的类型的数据:`let list: any[] = [1, true, "free"];`

-   `unknown`

-   与 any 一样，所有类型都可以分配给unknown
-   unknow类型不能作为子类型只能作为父类型(unknown类型不能赋值给其他类型,any可以)

-   unknow 只能赋值给`unknow`和`any`类型

### 11\. 空值 void

-   某种程度上来说，`void`类型像是与`any`类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是`void`：

```typescript
function voidFn(): void {
    console.log('test void')
}
```

-   只能为它赋予undefined和null：

```typescript
let u: void = undefined;
let n: void = null;
```

### 12\. never

-   `never`表示的是那些永不存在的值的类型
-   `never`类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是`never`的子类型或可以赋值给`never`类型（除了never本身之外）。 即使`any`也不可以赋值给`never`。

```typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

### 类型断言（as）

-   通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。
-   它没有运行时的影响，只是在编译阶段起作用。

```typescript
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```
```typescript
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```
