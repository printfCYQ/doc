# Generic Structures

> -   泛型是一种编程语言的特性，它允许在代码中使用参数化类型，以便在不同地方使用相同的代码逻辑处理多种数据类型，而无需为每种类型编写单独的代码！
> 
> -   作用：
> 
> -   1.提高代码的重用性
> -   2.提高代码的可读性
> -   3.提高代码的抽象度
```rust
#[derive(Debug)]
struct Point<T> {
    x: T,
    y: T,
}

#[derive(Debug)]
struct Point2<T, U> {
    x: T,
    y: U,
}

fn main() {
    let integer = Point { x: 5, y: 10 };
    let string = Point { x: "5", y: "10" };
    let mix = Point2 { x: 5, y: "10" };

    println!("integer: {:?}", integer);
    println!("string: {:?}", string);
    println!("mix: {:?}", mix);
}

```
