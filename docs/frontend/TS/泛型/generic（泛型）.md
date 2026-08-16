# generic（泛型）

-   需要一种方法使返回值的类型与传入参数的类型是相同的。 这里，我们使用了类型变量，它是一种特殊的变量，只用于表示类型而不是值。

```typescript
function identity<T>(arg: T): T {
  return arg;
}

// 第一种使用方式 传入所有的参数，包含类型参数
console.log(identity<string>('1')); // '1'
console.log(identity<number>(1)); // 1

// 第二种方法更普遍。利用了类型推论 – 自动确定T的类型：
console.log(identity('1')); // '1'
console.log(identity(1)); // 1
```

## 使用泛型变量

-   必须把这些参数当做是任意或所有类型。

```typescript
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  // Error: 类型“T”上不存在属性“length”。
    return arg;
}
```
```typescript
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);
    return arg;
}

// 等价于

function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);
    return arg;
}
```

## 泛型类型

-   泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面。

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: <T>(arg: T) => T = identity;

console.log(myIdentity<number>(1)); // 1
console.log(myIdentity<string>('1')); // '1'
```

-   可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: <U>(arg: U) => U = identity;
```

-   可以使用带有调用签名的对象字面量来定义泛型函数。

```typescript
function identity<T>(arg: T): T {
    return arg;
}
let myIdentity: {<T>(arg: T): T} = identity;

// 对象字面量拿出来做为一个接口（等价）

interface GenericIdentityFn {
    <T>(arg: T): T;
}
function identity<T>(arg: T): T {
    return arg;
}
let myIdentity: GenericIdentityFn = identity;
```

-   把泛型参数当作整个接口的一个参数。

```typescript
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;

console.log(myIdentity(1)); // 1
console.log(myIdentity('1')); // Error: 类型“string”的参数不能赋给类型“number”的参数。
```

## 泛型类

-   **注意，无法创建泛型枚举和泛型命名空间。**
-   泛型类看上去与泛型接口差不多。 泛型类使用（`<>`）括起泛型类型，跟在类名后面。
-   **泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。**

```typescript
class GenericNumber<T> {
    zeroValue: T | undefined;
    add: ((x: T, y: T) => T) | undefined;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
console.log(myGenericNumber.add(1, 2)); // 3

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) { return x + y; };
console.log(stringNumeric.add(stringNumeric.zeroValue, "test")); //test
```

## 泛型约束

-   **extends**
-   定义一个接口来描述约束条件。
-   泛型函数被定义了约束，因此它不再是适用于任意类型。
-   需要传入符合约束类型的值，必须包含必须的属性。

```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

console.log(loggingIdentity(1)); // 类型“number”的参数不能赋给类型“Lengthwise”的参数。
console.log(loggingIdentity([]));
```

## 在泛型约束中使用类型参数

-   **keyof**
-   声明一个类型参数，且它被另一个类型参数所约束。

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
getProperty(x, "m"); // Error: 类型“"m"”的参数不能赋给类型“"a" | "b" | "c" | "d"”的参数。
```

## 在泛型里使用类类型

-   在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型。

```typescript
function create<T>(c: {new(): T; }): T {
    return new c();
}
```
