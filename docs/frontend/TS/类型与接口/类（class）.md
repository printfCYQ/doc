# 类（class）

```typescript
// 声明 Person 类
class Person {
    name: string; // name 属性
    constructor(name: string) { // 构造函数
        this.name = name
    }

    // 方法
    hello() {
        return `hello ${this.name}`
    }
}

const tom = new Person('tom') // 构造实例
console.log(tom);
```

## 继承

```typescript
// 基类（超类）
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

// 子类（派生类）【子从基类中继承了属性和方法】
class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```

-   派生类包含了一个构造函数，它必须调用`super()`，它会执行基类的构造函数。 而且，在构造函数里访问`this`的属性之前，我们一定要调用`super()`。

```typescript
class Animal {
    name: string;
    constructor(theName: string) {
        this.name = theName;
    }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) {
        super(name);
    }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) {
        super(name);
    }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");
// 即使tom被声明为Animal类型，但因为它的值是Horse，
// 调用tom.move(34)时，它会调用Horse里重写的方法
sam.move();
tom.move(34);
```

## 修饰符

### public 公共（默认）

```typescript
class Person {
    public name: string;
    public constructor(name: string) {
        this.name = name
    }

    public hello() {
        return `hello ${this.name}`
    }
}
```

### private 私有

-   当成员被标记成`private`时，它就不能在声明它的类的外部访问。

```typescript
class Person {
    private name: string;
    public constructor(name: string) {
        this.name = name
    }

    public hello() {
        return `hello ${this.name}`
    }
}

const tom = new Person('tom')
tom.name // 属性“name”为私有属性，只能在类“Person”中访问。
```

-   如果其中一个类型里包含一个`private`成员，那么只有当另外一个类型中也存在这样一个`private`成员， 并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。

```typescript
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
    constructor() { super("Rhino"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // 不能将类型“Employee”分配给类型“Animal”。类型具有私有属性“name”的单独声明。
```

### protected 受保护

-   `protected`修饰符与`private`修饰符的行为很相似，但有一点不同，`protected`成员在派生类中仍然可以访问。

```typescript
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name)
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 错误属性“name”受保护，只能在类“Person”及其子类中访问。
```

-   构造函数也可以被标记成`protected`。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。

```typescript
class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee 能够继承 Person
class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // 类“Person”的构造函数是受保护的，仅可在类声明中访问。
```

### readonly 只读

-   只读属性必须在声明时或构造函数里被初始化。

```typescript
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor(theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // 无法为“name”赋值，因为它是只读属性。
```

## 参数属性

-   参数属性通过给构造函数参数添加一个访问限定符来声明。 使用`private`限定一个参数属性会声明并初始化一个私有成员；对于`public`和`protected`来说也是一样。

```typescript
class Animal {
    constructor(private name: string) { }
    move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

const dog = new Animal('DOG')
dog.move(1)
```

## 存取器

-   通过`getters/setters`来截取对对象成员的访问。
-   存取器要求你将编译器设置为输出`ES5`或更高。 不支持降级到`ES3`。
-   只带有`get`不带有`set`的存取器自动被推断为`readonly`。

```typescript
let passcode = "secret passcode";

class Employee {
    private _fullName: string | undefined;

    get fullName(): string | undefined {
        return this._fullName;
    }

    set fullName(newName: string | undefined) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) { // 密码通过是为新值，未通过时为undefined
    console.log(employee.fullName);
}
```

## 静态属性

-   类的静态成员，存在于类本身上面而不是类的实例上。

```typescript
class Circle {
    static PI = 3.14;
    getCircleArea() {
        return Circle.PI * this.r * this.r;
    }
    constructor(public r: number) { }
}

let circle1 = new Circle(1);
let circle2 = new Circle(5);

console.log(circle1.getCircleArea());
console.log(circle2.getCircleArea());
```

## 抽象类

-   抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。
-   不同于接口，抽象类可以包含成员的实现细节。
-   `abstract`关键字是用于定义抽象类和在抽象类内部定义抽象方法。

```typescript
abstract class Circle {
    abstract getLen(): void
    getCircleArea(): void {
        console.log('get area');
    }
}
```

-   抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。
-   抽象方法必须包含`abstract`关键字并且可以包含访问修饰符。

```typescript
abstract class Department {
    constructor(public name: string) { }
  
    printName(): void {
        console.log('Department name: ' + this.name);
    }
  
    abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {
    constructor() {
        super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
    }

    printMeeting(): void {
        console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
        console.log('Generating accounting reports...');
    }
}

let department: Department; // 允许创建一个对抽象类型的引用
department = new Department(); // 无法创建抽象类的实例。
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
department.generateReports(); // 类型“Department”上不存在属性“generateReports”。
```

## 高级技巧

### 构造函数

-   `TypeScript`声明一个类的时候，实际上同时声明了很多东西。 首先就是类的实例的类型。

```typescript
class Circle {
    static PI = 3.14;
    getCircleArea() {
        return Circle.PI * this.r * this.r;
    }
    constructor(public r: number) { }
}

let circle: Circle;
circle = new Circle(1)
console.log(circle.getCircleArea());
```

-   还创建了`**构造函数**`
-   `let Circle`将被赋值为构造函数。 当我们调用`new`并执行了这个函数后，便会得到一个类的实例。 这个构造函数也包含了类的所有静态属性。 我们可以认为类具有实例部分与静态部分这两个部分。

```typescript
var Circle = /** @class */ (function () {
    function Circle(r) {
        this.r = r;
    }
    Circle.prototype.getCircleArea = function () {
        return Circle.PI * this.r * this.r;
    };
    Circle.PI = 3.14;
    return Circle;
}());
var circle;
circle = new Circle(1);
console.log(circle.getCircleArea());
```

### 把类当做接口使用

```typescript
class Point {
    x: number | undefined;
    y: number | undefined;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };
```
