# 函数基础与Copy值参数传递

> **函数的基础知识**
> 
> 1.  函数的定义：在Rust中，你可以使用fn关键字声明和定义函数，而main是程序的入口点是一种特殊的函数。
> 
> 2.  参数和返回值：函数可以接受零个或多个参数，每个参数都需要指定类型。函数可以有返回值，使用`->`指定返回值类型。如果函数没有返回值，可以使用`->()`、或省略这部分。
> 3.  调用函数：调用函数时，使用函数名和传递给函数的实际参数。
```rust
fn add(num1: i32, num2: i32) -> i32 {
    num1 + num2
}

fn change_i32(mut num: i32) {
    num = num + 100;
    println!("change_i32 num = {}", num);
}

fn modify_i32(num: &mut i32) {
    *num = *num + 100;
    println!("modify_i32 num = {}", num);
}

fn main() {
    let a = 10;
    let b = 20;
    let result = add(a, b);
    println!("{} + {} = {}", a, b, result);

    let c = 30;
    change_i32(c);
    println!("c = {}", c); // c = 30 没有改变

    let mut d = 40;
    modify_i32(&mut d);
    println!("d = {}", d); // d = 140 改变
}
```
```rust
#[derive(Clone, Copy)]
struct Point {
    x: i32,
    y: i32,
}

fn print_point(point: Point) {
    println!("({}, {})", point.x, point.y);
}

fn main() {
    let p = Point { x: 3, y: 4 };
    print_point(p); // p 的所有权被传递给 print_point() 函数
    println!("{}", p.x) // #[derive(Clone, Copy)] can be used
}
```
