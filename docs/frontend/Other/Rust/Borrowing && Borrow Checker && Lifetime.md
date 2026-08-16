# Borrowing && Borrow Checker && Lifetime

> Rust 中的借用（Borrowing）是 Rust 语言的一个核心概念，它允许一个变量的内存可以被安全地访问或修改，而不需要拥有该内存的所有权。借用的主要目的是为了避免内存安全问题，例如悬垂指针（Dangling Pointer）和内存泄漏（Memory Leak）。
> 
> 在 Rust 中，每个值都有一个所有者（Owner），当所有者超出作用域时，该值的内存将被自动释放。借用允许我们在不转移所有权的情况下使用这些值。借用有两种类型：不可变借用（Immutable Borrowing）和可变借用（Mutable Borrowing）。
> 
> -   不可变借用：使用`&`符号来创建不可变借用。不可变借用允许你读取但不允许修改借用的值。在同一时间，一个值可以有多个不可变借用。
> -   可变借用：使用`&mut`符号来创建可变借用。可变借用允许你读取和修改借用的值。在同一时间，一个值只能有一个可变借用。
> 
> 借用规则（Borrowing Rules）确保了内存安全：
> 
> 1.  任何时候，你都可以拥有任意数量的不可变借用。
> 2.  任何时候，你只能拥有一个可变借用。
> 3.  可变借用不能与不可变借用同时存在。
```rust
fn main() {
    let vec = vec![1, 2, 3, 4, 5];
    let v = &vec;
    v[0] = 10; // `v` is a `&` reference, so the data it refers to cannot be borrowed as mutable
    println!("{:?}", v);

    let mut vec = vec![1, 2, 3, 4, 5];
    let v = &mut vec;
    v[0] = 10;
    println!("{:?}", v);
}
```
---
> Borrow Checker 是 Rust 编程语言中的一个特性，它是 Rust 编译器的一个组成部分，负责确保在任何给定的时间点，对特定内存区域的访问是安全的，并且遵循 Rust 的所有权和借用规则。
> 
> Rust 的所有权系统是其独特的特性之一，它确保了内存安全。每个值都有一个唯一的所有者，当所有者超出作用域时，该值将被自动释放。这避免了悬垂指针和内存泄漏等常见问题。
> 
> 借用（Borrowing）允许你在不获取所有权的情况下使用值。不可变借用（`&T`）允许你读取但不能修改值，而可变借用（`&mut T`）允许你读取和修改值。Borrow Checker 确保在同一时间，一个值只能有一个可变借用或多个不可变借用，从而防止数据竞争和不一致的状态。
> 
> 例如，如果你有一个变量`x`，并且你想借用它的值，你可以创建一个不可变借用`&x`或一个可变借用`&mut x`。Borrow Checker 会确保你不会违反借用规则，例如，如果你已经有一个可变借用`&mut x`，那么在该借用仍然有效的情况下，你不能创建另一个可变借用或不可变借用。
```rust
fn main() {
    let mut x = 5;
    let y = &mut x; // 创建一个可变借用
    *y += 1;
    println!("{}", x); // 输出: 6
}
```

-   在这个例子中，Borrow Checker 确保在`y`持有可变借用的期间，没有其他借用可以访问`x`，从而保证了内存安全和数据一致性。

---
> Lifetime（生命周期）是 Rust 编程语言中的一个重要概念，它用于确保引用的有效性，防止出现悬垂引用（Dangling References）。悬垂引用是指一个引用指向的内存已经被释放或者被重新分配，这可能导致程序崩溃或者出现未定义的行为。
> 
> 在 Rust 中，每个引用都有一个生命周期，它定义了引用的有效作用域。生命周期参数用于函数签名中，以指定参数和返回值的引用之间的关系。这样，Rust 编译器可以在编译时检查引用的有效性，确保没有违反生命周期规则。
---
```rust
fn main() {
    let mut result: &str = "fff"; // value assigned to `result` is never read
    {
        result = "aaa";
    }
    println!("{}", result);
}
```
```rust
fn test_fn<'a>(s: &'a str) -> &'a str {
    s
}
fn main() {
    let s = String::from("Hello, world!");
    // 不可变引用 可以同时存在多个不可变引用
    let r1 = &s;
    let r2 = &s;

    println!("{} {}", r1, r2);

    println!("-------------");

    // 可变引用 只能存在一个可变引用
    let mut ss = String::from("Hello, world!");
    let r3 = &mut ss;
    // let r4 = &mut s; // cannot borrow `ss` as mutable more than once at a time

    println!("{}", r3);

    println!("-------------");

    let result: &str;
    {
        let res = &s;
        result = test_fn(res);
    }
    println!("{}", res); // cannot find value `res` in this scope
    println!("{}", result);
}

```
