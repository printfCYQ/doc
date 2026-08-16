# 接口(interface)

-   在TypeScript里，接口的作用就是为类型命名和代码定义契约。
-   类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。

```typescript
interface ObjectValue {
  userName: string
  age: number
}
let obj: ObjectValue = {
  userName: 'CYQ',
  age: 25
}
```

## 可选属性（?）

```typescript
interface ObjectValue {
    userName: string
    age: number
}
let obj: ObjectValue = { // 类型 "{ userName: string; }" 中缺少属性 "age"，但类型 "ObjectValue" 中需要该属性。
    userName: 'CYQ',
}
```
```typescript
interface ObjectValue {
    userName: string
    age?: number
}
let obj: ObjectValue = {
    userName: 'CYQ',
}
```

## 只读属性（readonly）

-   一些对象属性只能在对象刚刚创建的时候修改其值。 你可以在属性名前用`readonly`来指定只读属性:

```typescript
interface ObjectValue {
    userName: string
    readonly age: number
}
let obj: ObjectValue = {
    userName: 'CYQ',
    age: 25
}
obj.age = 12 // 无法为“age”赋值，因为它是只读属性。
```

-   `ReadonlyArray&lt;T>`

```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // 类型“readonly number[]”中的索引签名仅允许读取。
ro.push(5); // 类型“readonly number[]”上不存在属性“push”。
ro.length = 100; // 无法为“length”赋值，因为它是只读属性。
a = ro; // 类型 "readonly number[]" 为 "readonly"，不能分配给可变类型 "number[]"。
```

-   断言重写

```typescript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
a = ro as number[];
```

## 额外属性

```typescript
interface ObjectValue {
    userName: string
    age: number
    [propName: string]: any
}
let obj: ObjectValue = {
    userName: 'CYQ',
    age: 25,
    gender: 'male',
    other: false
}
```

## 函数类型

-   函数的参数名不需要与接口里定义的名字相匹配。

```typescript
interface MyFunc {
    (userName: string, age: number): boolean;
}

let myFunc: MyFunc;
myFunc = function (name: string, num: number) {
    return num > 10
}
```

## 可索引的类型

```typescript
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```
```typescript
interface NumberDictionary {
    [index: string]: number;
    length: number;
    name: string; // 类型“string”的属性“name”不能赋给“string”索引类型“number”。
}
```
```typescript
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // 类型“ReadonlyStringArray”中的索引签名仅允许读取。
```

## 类类型

### 实现接口

-   接口描述了类的公共部分，而不是公共和私有两部分。不会检查类是否具有某些私有成员。

```typescript
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: Date) {
        this.currentTime = h;
    }
}
```

### 类静态部分与实例部分的区别

-   当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内。因此，我们应该直接操作类的静态部分。

```typescript
interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

## 继承接口

```typescript
interface Person {
    userName: string
}

interface Student extends Person {
    grade: number
}

let xiaoMing: Student = {
    userName: 'xiaomign',
    grade: 7
}
```

-   继承多个接口

```typescript
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{
    color: 'blue',
    sideLength: 10,
    penWidth: 5
};
```

## 混合类型

-   一个对象可以同时做为函数和对象使用，并带有额外的属性。

```typescript
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) {
        return ''
    };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

## 接口继承类

-   当接口继承了一个类类型时，它会继承类的成员但不包括其实现。

😵‍💫😵‍💫😵‍💫😵‍💫😵‍💫😵‍💫😵‍💫

```typescript
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {

}

// 类“Img”错误实现接口“SelectableControl”。
// 类型 "Img" 中缺少属性 "state"，但类型 "SelectableControl" 中需要该属性。
class Img implements SelectableControl {
    select() { }
}
class Local {

}
```
