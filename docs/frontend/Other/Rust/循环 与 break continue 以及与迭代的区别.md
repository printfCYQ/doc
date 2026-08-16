# 循环 与 break continue 以及与迭代的区别

> **循环与迭代的不同**
> 
> 循环适用于需要明确控制循环流程的情况，而迭代器测提供了一种更抽象的方式来处理集合元素。
> 
> 通常，推荐使用迭代器，因为它们可以提高代码的可读性和表达力。
> 
> for循环是一种语法结构，用于遍历集合中的元素。它依赖于集合类型实现lterator trait.
> 
> 在Rust中，迭代器提供了一系列用于遍历集合元素的方法，比如next0、map)、filter()等，可以让我们的代码更具有表达性。
```rust
fn main() {
    loop {
        println!("这是一个无限循环！");
    }
}
```
```rust
fn main() {
    let mut count = 0; 
    while count < 10 { 
        println!("这是一个有限循环！当前计数: {}", count);
        count += 1; 
    }
}
```
```rust
fn main() {
    for i in 0..10 {
        println!("0..10当前数字是: {}", i); // 0-9
    }

    for i in 0..=10 {
        println!("0..=10当前数字是: {}", i); // 0-10
    }

    let numbers = [10, 20, 30, 40, 50];
    for number in numbers.iter() {
        println!("numbers数字是: {}", number);
    }
    for (index, number) in numbers.iter().enumerate() {
        println!("当前索引是{}，数字是: {}", index, number);
    }
}
```
```rust
fn main() {
    for i in 0..10 {
        if i == 5 {
            break; // 当i等于5时，退出循环
        }
        println!("当前数字是: {}", i);
    }

    let mut count = 0;
    while count < 10 {
        println!("当前计数: {}", count);
        if count == 5 {
            break; // 当计数达到5时，退出循环
        }
        count += 1;
    }

    'outer: loop {
        println!("outer 这是一个无限循环！");
        loop {
            println!("inner 这是一个无限循环！");
            // break; // 跳出内层循环
            break 'outer; // 跳出外层循环
        }
    }
}
```
