# 错误处理之 Result、Option以及panic!宏

> **Rust中的错误**
> 
> Rust中的错误可以分为两种
> 
> -   Recoverable error:有返回类型
> 
> -   返回`Result`类型
> -   返回`Option`类型
> 
> -   Unrecoverable type:没有返回类型，直接崩溃
> 
> -   panic macro将终止当前线程
> -   `Result`是一个枚举类型，有两个变体：`Ok`和`Err`。它通常用于表示函数的执行结果，其中`Ok`表示成功的结果，`Err`表示出现了错误
```rust
pub enum Result<T,E> {
    Ok(T)
    Err (E)
}
```
> -   `Option` 也是一个枚举类型，有两个变体：`Some`和`None`。它通常用于表示一个可能为空的值。
```rust
pub enum Option<T>{
    None,
    Some (T)  
}
```
> -   当程序遇到无法继续执行的错误时，可以使用`panic!`宏来引发恐慌。恐慌会导致程序立即终止，并显示一条错误消息。
---
```rust
fn divide(x: i32, y: i32) -> Result<f64, String> {
    if y == 0 {
        return Err("Cannot divide by zero".to_string());
    } else {
        Ok(x as f64 / y as f64)
    }
}

fn main() {
    match divide(10, 0) {
        Ok(result) => println!("Result: {}", result),
        Err(error) => println!("Error: {}", error),
    }

    match divide(10, 4) {
        Ok(result) => println!("Result: {}", result),
        Err(error) => println!("Error: {}", error),
    }
}
```
---
```rust
fn find_index(arr: &[i32], target: i32) -> Option<usize> {
    for (index, value) in arr.iter().enumerate() {
        if *value == target {
            return Some(index);
        }
    }
    None
}

fn main() {
    let arr = [1, 2, 3, 4, 5];
    match find_index(&arr, 3) {
        Some(index) => println!("Found at index: {}", index),
        None => println!("Not found"),
    }

    match find_index(&arr, 6) {
        Some(index) => println!("Found at index: {}", index),
        None => println!("Not found"),
    }
}
```
---



> 在Rust中，"panic"是Rust语言的运行时错误处理机制的一部分。当程序遇到严重错误时，它会触发"panic"，这会导致程序立即停止执行，并展开调用堆栈，打印出错误发生时的调用堆栈跟踪，以及错误的原因。这有助于开发者调试程序，找出错误的根源。
> 
> 如果你的程序触发了"panic"，通常意味着你的代码中有一个错误，需要进行修复。查看"panic"信息中的错误消息和调用堆栈跟踪，可以帮助你找出错误发生的具体位置和原因。
```rust
fn main() {
    let arr = vec![1, 2, 3, 4, 5];
    arr[10];
}
```
