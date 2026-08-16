# TS-前置的不定量参数

```typescript
type JSTypeMap = {
    'string': string,
    'number': number,
    'boolean': boolean,
    'undefined': undefined,
    'null': null,
    'object': object,
    'function': Function
    'symbol': symbol
    'bigint': bigint
}

type JSTypeNames = keyof JSTypeMap

type ArgsType<T extends JSTypeNames[]> = {
    [I in keyof T]: JSTypeMap[T[I]]
}

declare function addTmpl<T extends JSTypeNames[]>(
    ...args: [
        ...T,
        (...args: ArgsType<T>) => any
    ]
): void

addTmpl('string', 'number', 'boolean', (a, b, c) => {
    console.log(a, b, c);
})

```

  

> `keyof`
> 
> 是 TypeScript 中的一个关键字，它用于获取对象类型的所有键（属性名）的联合类型。
```typescript
type Person = {
    name: string,
    age: number,
    email: string
};

type PersonKey = keyof Person;

// PersonKey 的类型是 "name" | "age" | "email"
let key: PersonKey;

key = 'name'; // 可以赋值为 'name', 'age', 或 'email'
// key = 'address'; // 这行会报错，因为 'address' 不是 Person 类型的键
```
> `**extends**` 是 TypeScript 中用于表示类型约束或类型扩展的关键字。
> ### 类型约束（Type Constraints）
> 
> 通过 **extends** 关键字，你可以对泛型进行约束，限制传入的类型必须满足某些条件。这被称为类型约束。
```typescript
// 例如，限制泛型 T 必须是某个类型的子集
interface Lengthy {
    length: number;
}

function logLength<T extends Lengthy>(arg: T): void {
    console.log(arg.length);
}

logLength("Hello"); // 可以正常工作，因为字符串有 length 属性
logLength(10); // 会报错，因为数字类型没有 length 属性

```
> ### 类型扩展（Type Inheritance）
> 
> 除了约束，**extends** 也用于类和接口的继承，允许一个类型继承另一个类型的特性。
```typescript
interface Animal {
    name: string;
    makeSound(): void;
}

interface Dog extends Animal {
    breed: string;
}

const myDog: Dog = {
    name: 'Buddy',
    breed: 'Golden Retriever',
    makeSound() {
        console.log('Woof!');
    }
};

myDog.makeSound(); // 输出 'Woof!'
```
> `**in**` 关键字主要用于检查对象是否具有某个特定属性或键。
> ### 用法一：检查对象中是否存在某个属性
```typescript
interface Person {
    name: string;
    age?: number;
}

const person: Person = { name: 'Alice' };

if ('age' in person) {
    console.log('Person has age:', person.age);
} else {
    console.log('Person does not have age');
}

```
>
