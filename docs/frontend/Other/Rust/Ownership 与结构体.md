# Ownership 与结构体

> 在Rust中，所有权（Ownership）是一个核心概念，它是Rust语言内存安全的基础。所有权的规则确保了每个值在任何特定时间点都只有一个所有者，并且当所有者离开作用域时，该值将被自动释放。
> 
> 以下是所有权规则的关键点：
> 
> 1.  每个值都有一个所有者：值可以是变量、对象或内存中的一块数据。在任何特定时间，只有一个变量可以拥有这个值。
> 2.  变量作用域：当变量进入作用域时，它变为有效；当它离开作用域时，它不再有效，并且它所拥有的值将被释放。作用域通常由大括号`{}`定义。
> 3.  移动语义：当赋值或传递变量时，Rust会执行移动（Move）操作。这意味着值的所有权从一个变量转移到另一个变量。移动后，原变量不再拥有该值。
> 4.  Copy语义：对于实现了Copy trait的类型，如整数和布尔类型，它们遵循Copy语义。这意味着当它们被赋值或传递时，会制作一份副本，而原变量仍然保留自己的值。
> 5.  Drop函数：Rust中的每个类型都可以有一个Drop函数，它在所有者离开作用域时自动执行。Drop函数通常用于释放资源，如内存、文件句柄或网络连接。
> 
> 所有权的好处包括：
> 
> -   它防止了内存泄漏，因为值会在适当的时候被自动释放。
> -   它防止了悬挂指针，因为所有者在作用域结束后不能再访问该值。
> -   它确保了内存安全，因为编译器可以静态地分析代码，确保所有资源都被正确地释放。
> **Value Passing Semantics值传递语义**
> 
> 每当将值从一个位置传递到另一个位置时，borrow checker:都会重新评估所有权。
> 
> 1.  Immutable Borrow使用不可变的借用，值的所有权仍归发送方所有，接收方直接接收对该值的引用，
> 
> 而不是该值的副本。但是，他们不能使用该引用来修改它指向的值，编译器不允许这样做。释放资源的
> 
> 责任仍由发送方承担。仅当发件人本身超出范围时，才会删除该值。
> 
> 2.  Mutab|e Borrow使用可变的借用所有权和删除值的责任也由发送者承担。但是接收方能够通过他们
> 
> 接收的引用来修改该值。
> 
> 3.  Move这是所有权从一个地点转移到另一个地点。borrow checker关于释放该值的决定将由该值的接
> 
> 收者（而不是发送者）通知。由于所有权已从发送方转移到接收方，因此发送方在将引用移动到另一个
> 
> 上下文后不能再使用该引用，发送方在移动后对vlaue的任何使用都会导致错误。





```rust
struct Counter {
    number: i32,
}

impl Counter {
    fn new(number: i32) -> Self {
        Self { number }
    }
    fn get_number(&self) -> i32 {
        self.number
    }

    fn increment(&mut self, number: i32) {
        self.number += number;
    }

    fn give_up(self) {
        println!("give up {}", self.number);
    }
    fn combine(counter1: Self, counter2: Self) -> Self {
        Self {
            number: counter1.number + counter2.number,
        }
    }
}
fn main() {
    let mut counter1 = Counter::new(10);
    println!("counter1 {}", counter1.get_number());
    println!("counter1 {}", counter1.get_number());
    println!("-----------------------");
    counter1.increment(5);
    println!("counter1 {}", counter1.get_number());
    println!("counter1 {}", counter1.get_number());
    println!("-----------------------");
    counter1.give_up();
    // println!("counter1 {}", counter1.get_number());
    println!("-----------------------");
    let counter2 = Counter::new(20);
    let counter3 = Counter::new(30);
    let counter4 = Counter::combine(counter2, counter3);
    // println!("counter2 {}", counter2.get_number());
    // println!("counter3 {}", counter3.get_number());
    println!("counter4 {}", counter4.get_number());
}

```
