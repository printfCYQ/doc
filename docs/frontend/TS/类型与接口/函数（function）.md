# 函数（function）

```javascript
// 具名函数
function add(x, y) {
    return x + y;
}

// 匿名函数
let myAdd = function (x, y) { 
  return x + y; 
};
```

## 函数类型

### 为函数定义类型

-   `TypeScript`能够根据返回语句自动推断出返回值类型，因此通常可以省略它。

```javascript
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function (x: number, y: number): number { 
  return x + y; 
};
```

## 推断类型

-   如果在赋值语句的一边指定了类型但是另一边没有类型的话，`TypeScript`编译器会自动识别出类型：

```javascript
let myAdd: (baseValue: number, increment: number) => number =
    function (x, y) { return x + y; };
```

## 可选参数和默认参数

-   `TypeScript`里的每个函数参数都是必须的。

```javascript
function add(x: number, y: number) {
    return x + y
}

add(1) // error 应有 2 个参数，但获得 1 个。
add(1, 2)
add(1, 2, 3) // error 应有 2 个参数，但获得 3 个。
```

-   `JavaScript`里，每个参数都是可选的，可传可不传。 没传参的时候，它的值就是`undefined`。 在`TypeScript`里我们可以在参数名旁使用`**?**`实现可选参数的功能。
-   **可选参数必须跟在必须参数后面。**

```javascript
function add(x: number, y?: number) {
    return y ? x + y : x
}

add(1)
add(1, 2)
add(1, 2, 3) // error 应有 1-2 个参数，但获得 3 个。
```
```javascript
function add(x?: number, y: number) { // error 必选参数不能位于可选参数后。
    return x ? x + y : y
}
```

-   在`TypeScript`里，可以为参数提供一个默认值当用户没有传递这个参数或传递的值是`undefined`时。 它们叫做有默认初始化值的参数。
-   默认参数没有顺序要求，默认值的参数**不需要**放在必须参数的后面。
-   如果带默认值的参数出现在必须参数前面，用户必须明确的传入undefined值来获得默认值。

```javascript
function add(x: number, y: number = 1) {
    return x + y
}

add(1)
add(1, 2)
```
```javascript
function add(x: number = 1, y: number) {
    return x + y
}

add(undefined, 1)
add(1, 2)
```

## 剩余参数

-   在`JavaScript`里，你可以使用`arguments`来访问所有传入的参数。在`TypeScript`里，你可以把所有参数收集到一个变量里：

```javascript
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```
```javascript
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
```

## this

-   和`js`一样

### this和箭头函数

```javascript
const obj = {
    a: 1,
    b: 2,
    add() {
        return function () {
            return this.a + this.b  // error 此容器隐藏了 "this" 的外部值。
        }
    }
}

const addFun = obj.add()
console.log(addFun());
```
```javascript
const obj = {
    a: 1,
    b: 2,
    add() {
        return  () => {
            return this.a + this.b
        }
    }
}

const addFun = obj.add()
console.log(addFun()); // 3
```

### this参数

```javascript
interface Obj {
    a: number
    b: number
    add(this: Obj): () => number
}
const obj: Obj = {
    a: 1,
    b: 2,
    add(this: Obj) {
        return () => {
            return this.a + this.b
        }
    }
}

const addFun = obj.add()
console.log(addFun()); // 3
```

### 回调函数里的this参数

```javascript

```

## 重载

-   在同一范围中声明几个功能类似的同名函数，但是这些同名函数的形式参数（指参数的个数、类型或者顺序）必须不同，也就是说用同一个函数完成不同的功能。

```javascript
function add(a: string, b: string): number
function add(a: number, b: number): number

function add(a: any, b: any): any {
    if (typeof a === 'string') {
        return Number(a) + Number(b)
    } else {
        return a
    }
}

console.log(add(1, 2));
console.log(add('1', '2'));
```
