# Lifetime 与 函数

> -   任何引用都有生命周期
> 
> -   一般情况，生命周期是隐式且被推断的
> -   生命周期的作用是为了防止悬垂引用
> -   悬垂引用是指：在Rust中，悬垂引用（Dangling Reference）是指一个引用指向的内存已经被释放或者不再有效。这通常是由于在某个作用域内创建了一个引用，然后在该引用仍然有效的时候，其指向的内存被释放或者生命周期结束。

  

> -   编译器在没有显式注解的情况下，使用三个规则来推断这些生命周期：
> 
> -   1.第一个规则是每个作为引用的参数都会得到它自己的生命周期参数。
> -   2.第二个规则是，如果只有一个输入生命周期参数，那么该生命周期将被分配给所有输出生命周期参数（该生命周期将分配给返回值）
> 
> -   3.第三个规则是，如果有多个输入生命周期参数，但其中一个是对`self`或不可变`self`的引用时。因为在这种情况下它是一个方法，所以`self`的生命周期被分配给所有输出生命参数
---
```rust
fn main() {
    let string1 = String::from("abcd");
    let string2 = "xyz";

    let result = longest(string1.as_str(), string2);
    println!("The longest string is {}", result);
}

fn longest<'a, 'b, 'c>(x: &'a str, y: &'b str) -> &'c str
where
    'a: 'c,
    'b: 'c,
{
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```
---
```rust
// 定义一个结构体，包含一个字符串切片
struct Book<'a> {
    title: &'a str,
}

// 定义一个函数，带有三个生命周期参数
// 这个函数接受两个 Book 引用和一个分隔符，然后返回一个新的字符串
fn merge_book_titles<'a, 'b, 'c>(
    book1: &'a Book<'a>,
    book2: &'b Book<'b>,
    separator: &'c str,
) -> String {
    let mut result = String::from(book1.title);
    result.push_str(separator);
    result.push_str(book2.title);
    result
}

fn main() {
    let book1 = Book {
        title: "The Rust Programming Language",
    };
    let book2 = Book {
        title: "Programming in Rust",
    };
    let separator = " & ";

    // 调用带有三个生命周期参数的函数
    let result = merge_book_titles(&book1, &book2, separator);

    // 打印结果
    println!("{}", result); 
    // The Rust Programming Language & Programming in Rust
}
```
