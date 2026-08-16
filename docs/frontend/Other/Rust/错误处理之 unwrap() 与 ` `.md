# 错误处理之 unwrap() 与 ` `

> **unwrap()**
> 
> 注意：该方法并不安全
> 
> `unwrap()`是`Result`和`Option`类型提供的方法之一。它是一个简便的方法，用于获取`0k`或`Some`的值，如果是`Err`或`None`则会引发`panic`
---
> **?**
> 
> `?`用于简化Result或Option类型的错误传播。它只能用于返回Result或Option的函数中，并且在函数内部可以像使用unwrap()一样访问0k或Some的值，但是如果是Err或None则会提前返回。
---
&lt;details open>
&lt;summary>unwrap&lt;/summary>

> 在Rust中，`unwrap`是一种处理`Option`类型的方法。`Option`类型是一个枚举，有两个可能的值：`Some(T)`和`None`，其中`T`是值的类型。`unwrap`方法用于从`Option`中提取出`Some`中的值。如果`Option`是`Some(T)`，`unwrap`将返回包含的值`T`。如果`Option`是`None`，`unwrap`将引发一个恐慌（panic）。 在Rust中，`unwrap`方法被定义在`Option`枚举上，用于从中提取`Some`变体中的值。如果`Option`是`None`，`unwrap`将触发一个运行时错误，通常以恐慌（panic）的形式表现。 下面是`unwrap`方法的一个示例：
```rust
fn main() {
    let number: Option<i32> = Some(5);
    
    // 使用 unwrap 提取值
    let unwrapped_number = number.unwrap();
    
    println!("Unwrapped Number: {}", unwrapped_number); 
}
```
> 在这个例子中，`number.unwrap()`将返回`Some(5)`中的`5`。如果你尝试对一个`None`类型的`Option`使用`unwrap`：
```rust
fn main() {
    let empty: Option<i32> = None;
    
    // 使用 unwrap 提取值
    let unwrapped_value = empty.unwrap(); 
}
```
> 这将导致一个恐慌，错误信息可能是：`thread 'main' panicked at 'called` Option::unwrap()`on a`None `value'`。 `unwrap`方法在调试阶段很有用，因为它可以帮助开发者发现潜在的逻辑错误，比如未正确处理`None`情况。然而，在生产代码中，频繁地触发恐慌是不推荐的，因为这会导致程序崩溃。在实际应用中，开发者应该根据具体情况来决定是否使用`unwrap`，或者使用其他处理`Option`类型的方法，比如`match`表达式或者`map`/`and_then`等。这样可以确保程序在遇到错误情况时能够优雅地处理，而不是崩溃。

&lt;/details>
---
&lt;details open>
&lt;summary>？&lt;/summary>

> 在Rust中，`?`操作符通常被用作“try”操作符，它允许你处理可能会返回错误的操作。这是Rust语言中错误处理机制的一部分，被设计成一种简洁且表达力强的方式来处理潜在的错误情况。
> 
> 基本用法：
> 
> -   当你在Rust中调用一个函数或执行一个操作时，如果这个函数或操作可能会失败并返回一个错误值（通常是实现了`std::error::Error` trait的类型），你可以在调用之后使用`?`操作符来自动传播这个错误。这意味着如果函数调用成功，你将得到它的返回值；如果函数调用失败并返回一个错误，`?`操作符会将这个错误向上传播到当前作用域，你需要在当前作用域中处理它。
> 
> 传播错误：
> 
> -   如果你在一个函数中使用`?`操作符，并且这个函数因为`?`操作符得到了一个错误，这个错误会被传播到调用这个函数的地方。调用者可以选择自己处理这个错误，或者继续向上传播。
> 
> 示例：
> 
> -   想象你有一个函数`read_file`，它返回一个`Result&lt;String, std::io::Error>`。如果文件读取成功，它返回`Ok&lt;String>`，其中`String`是文件内容。如果读取失败，它返回`Err&lt;std::io::Error>`，其中包含了错误的具体原因。你可以在调用`read_file`之后使用`?`操作符来自动处理错误传播：
```rust
fn main() {
    let file_content = read_file("my_file.txt")?;
    println!("文件内容: {}", file_content);
}

fn read_file(file_path: &str) -> Result<String, std::io::Error> {
    // 文件读取逻辑，返回一个 Result 类型
}
```
> -   在这个例子中，`?`操作符从`read_file`函数接收一个`Result`类型。如果文件读取成功，`Ok`变体中的值会被解包并赋值给`file_content`变量。如果文件读取失败，`Err`变体中的错误会被`?`操作符捕获并向上传播到`main`函数中。
> 
> 结合Option类型：
> 
> -   `?`操作符还可以与`Option`类型一起使用。如果`Option`是`Some(T)`，`?`操作符将提取`T`的值。如果`Option`是`None`，`?`操作符将引发一个恐慌（panic）。这通常用于快速失败的场景，确保代码不会在缺少必要值的情况下继续执行。
> 
> 自定义错误类型：
> 
> -   你可以创建自己的错误类型，并让它们实现`std::error::Error` trait，这样你的自定义错误类型也可以与`?`操作符一起使用。
> 
> 使用`?`操作符可以显著减少样板代码，使你的错误处理更优雅且更易于维护。它是Rust语言中一个强大的特性，用于确保代码的健壮性和错误处理的一致性。

&lt;/details>
---
```rust
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let result_ok: Result<i32, &str> = Ok(1);
    let value = result_ok?;
    println!("value: {}", value);
    Ok(())
}
```
```rust
fn find_first_even_number(arr: &[i32]) -> Option<i32> {
    let first_even_number = arr.iter().find(|&num| num % 2 == 0)?;
    println!("find_first_even_number: {}", first_even_number);
    Some(*first_even_number)
}

fn main() {
    let arr = vec![1, 2, 3, 4, 5];
    match find_first_even_number(&arr) {
        Some(num) => println!("First Even Number: {}", num),
        None => println!("No even number found in the array."),
    }

    println!("------------------------");

    let arr = vec![1, 3, 5, 7, 9];
    match find_first_even_number(&arr) {
        Some(num) => println!("First Even Number: {}", num),
        None => println!("No even number found in the array."),
    }
}
```

_与_`_`-1.png)

---
```rust
use std::num::ParseIntError;

// 传递错误
fn parse_number(input: &str) -> Result<i32, ParseIntError> {
    let num: i32 = input.parse()?;
    Ok(num)
}
fn main() {
    match parse_number("10") {
        Ok(num) => println!("Parsed number: {}", num),
        Err(error) => println!("Error parsing number: {}", error),
    }

    match parse_number("😅") {
        Ok(num) => println!("Parsed number: {}", num),
        Err(error) => println!("Error parsing number: {}", error),
    }
}
```
