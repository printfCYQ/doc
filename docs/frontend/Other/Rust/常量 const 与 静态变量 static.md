# 常量 const 与 静态变量 static

> `const`常量
> 
> -   常量的值必须是在编译时已知的常量表达式，必须指定类型与值。
> -   与C语言的宏定义（宏替换）不同，Rust的const常量的值被直接嵌入到生成的底层机器代码中，而不是进行简单的字符替换。
> -   常量名与静态变量命名必须全部大写，单词之间加入下划线。
> -   常量的作用域是块级作用域，它们只在声明它们的作用域内可见。
> `statici`静态变量
> 
> -   与const常量不同，static变量是在运行时分配内存的。
> -   并不是不可变的，可以使用unsafe修改。
> -   静态变量的生命周期为整个程序的运行时间。
---
```rust
fn main() {
    // 常量
    const ONE_DAY_HOUR: usize = 24;
    const ONE_DAY_SECOND: usize = 60 * 60 * ONE_DAY_HOUR;
    println!("{}", ONE_DAY_SECOND);

    {
        const PI: f32 = 3.1415926;
        println!("{}", PI);
    }
}
```



> 在 Rust 语言中，`usize` 是一个代表无符号整数类型的关键字。它通常用于表示数组的索引、内存地址和其他需要使用整数大小来处理数据的场景。`usize` 类型的大小取决于你的目标架构，在 32 位系统上，它是 32 位，而在 64 位系统上，它是 64 位。
---
```rust
static ONE_DAY_HOUR: usize = 24;
static mut ONE_MUTTER: usize = 60;

fn main() {
    println!("{ONE_DAY_HOUR}");

    unsafe {
        ONE_MUTTER = 10;
        println!("{ONE_MUTTER}")
    }

    // println!("{ONE_MUTTER}") // use of mutable static is unsafe and requires unsafe function or block
}
```



> 在Rust中，`unsafe`关键字用于标记一段代码块或函数，表明其中包含了一些不符合Rust安全检查规则的操作。这些操作通常涉及到直接访问内存、使用指针进行操作或执行其他未被Rust编译器自动检查的行为。 标记为`unsafe`的代码块或函数需要开发者自行确保其安全性，因为Rust编译器不会对其进行额外的检查。这意味着如果开发者在`unsafe`代码块中执行了错误的操作，可能会引发内存安全问题，如空指针引用、悬挂指针、越界访问等。
