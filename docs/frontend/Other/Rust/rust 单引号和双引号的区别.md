# rust 单引号和双引号的区别

> -   `Integer types` 默认推断为`i32`
> 
> -   `i8`、`i16`、`i32`、`i64`、`i128`
> 
> -   `Unsigned Integer Types`
> 
> -   `u8`、`u16`、`u32`、`u64`、`u128`
> 
> -   `Platform-Specific Integer Type`(由平台决定)
> 
> -   `usize`
> -   `isize`
> 
> -   `Float Types`
> 
> -   `f32`与`f64`
> -   尽量用`f64`,除非你清楚边界需要空间
> -   `Boolean Values`
> 
> -   `true`
> -   `false`
> 
> -   `Character Types`
> 
> -   `Rust`支持`Unicode`字符
> -   表示`char`类型使用单引号
---



```rust
fn main() {
    let num1 = -1;
    let num2 = 5;
    let num3 = 0xFF;
    let num4 = 0b1010;
    let num5 = 0o14;

    println!("{num1} {num2} {num3} {num4} {num5}");

    println!("u32 min: {}", u32::MIN);
    println!("u32 max: {}", u32::MAX);
    println!("i32 min: {}", i32::MIN);
    println!("i32 max: {}", i32::MAX);
    println!("usize min: {}", usize::MIN);
    println!("usize max: {}", usize::MAX);
    println!("isize min: {}", isize::MIN);
    println!("isize max: {}", isize::MAX);

    println!("isize is {} bytes", std::mem::size_of::<isize>());
    println!("usize is {} bytes", std::mem::size_of::<usize>());

    println!("u64 is {} bytes", std::mem::size_of::<u64>());
    println!("i64 is {} bytes", std::mem::size_of::<i64>());
    println!("i32 is {} bytes", std::mem::size_of::<i32>());
    println!("u32 is {} bytes", std::mem::size_of::<u32>());
}
```
---



```rust
fn main() {
    let f1: f32 = 1.3446;
    let f2: f64 = 1.3899;
    println!("{f1} {f2}");

    println!("{:.2}", f1);
    println!("{:.2}", f2);

    let flag1 = true;
    let flag2 = false;
    let flag3 = flag1 && flag2;
    let flag4 = flag1 || flag2;

    println!("{flag1} {flag2} {flag3} {flag4}");

    let char = "CYQ";
    let char_emoji = '😄';
    println!("my name is {char} {char_emoji}");
}
```
---

## rust 单引号和双引号的区别

> 在 Rust 语言中，单引号 `'` 和双引号 `"` 有不同的用途：
> 
> 1.  单引号 `'`：
> 
> -   用于定义字符字面量（Characters）：单引号内可以表示单个字符，如 `'A'`、`'1'`、`'\n'`。
> -   用于创建字符类型（Char）的变量或值。
> 
> 2.  双引号 `"`：
> 
> -   用于定义字符串字面量（Strings）：双引号内可以表示一个或多个字符组成的字符串，如 `"Hello"`、`"World"`、`"123"`。
> -   用于创建字符串类型（String）的变量或值。
> -   字符串字面量在 Rust 中默认为&str类型，这是一个不可变的字符串切片。
```rust
let my_char = 'A';  // 字符 'A'

let my_string = "Hello, World!";  // 字符串 "Hello, World!"

let my_string_slice: &str = "Hello";  // &str 类型的字符串切片
```
