# Rust的内存管理模型

> Rust 的内存管理模型是基于所有权（Ownership）和借用（Borrowing）的概念。这种模型确保了内存安全，避免了悬挂指针、内存泄漏和数据竞争等问题。以下是 Rust 内存管理模型的主要特点：
> 
> ### 1\. 所有权
> 
> -   每个值在Rust中都有一个所有者。
> -   所有者负责在其生命周期结束时释放资源。
> 
> ### 2\. 变量作用域
> 
> -   变量的作用域决定了它的生命周期。
> -   当变量离开作用域时，它的生命周期结束，Rust自动释放资源。
> 
> ### 3\. 移动语义（Move Semantics）
> 
> -   将值赋予新变量时，所有权会随着值一起移动。
> -   原始变量不再拥有这个值，不能再访问它。
> 
> ### 4\. 复制语义（Copy Semantics）
> 
> -   对于具有复制语义的类型（如整数），赋值操作会复制值，而不是移动值。
> -   因此，两个变量可以独立地使用同一值。
> 
> ### 5\. 借用
> 
> -   借用允许一个变量（称为借用者）引用另一个变量（称为被借用者）的值。
> -   借用者在其生命周期内使用被借用的值，但不拥有它。
> -   借用者可以读取被借用者的值，但不能修改它。
> 
> ### 6\. 引用规则
> 
> -   借用可以分为可变借用（&mut T）和不可变借用（&T）。
> -   同一时间，只能有一个可变借用或多个不可变借用指向同一个值。
> -   借用不能超过被借用者的生命周期。
> 
> ### 7\. 生命周期参数
> 
> -   对于返回引用的函数，Rust要求指定生命周期参数，以确保返回的引用在其生命周期内有效。
> -   生命周期参数帮助编译器检查引用的有效性。
> 
> ### 8\. Drop trait
> 
> -   实现Drop trait可以自定义值被销毁时的清理逻辑。
> -   当所有者离开作用域时，Rust会自动调用drop函数。
> 
> 这种内存管理模型使得Rust程序在编译时就能发现大多数内存安全问题，从而显著减少了运行时错误。它还提高了代码的可读性和可维护性，因为内存管理的责任被清晰地定义和限制。
---
> 在 Rust 中，确实有一个概念与"`stop the world`"类似，这通常涉及到在特定代码块执行期间暂停所有其他线程或中断当前线程的执行。然而，与其他语言中的"stop the world"机制相比，Rust中的实现方式可能更加细致，以确保内存安全和并发操作的正确性。 一种可能的实现方式是使用 Rust 的互斥锁（Mutex）来保护共享资源。当一个线程获取互斥锁时，其他线程将被阻塞，直到持有锁的线程释放它。这种方式可以确保在临界区执行时，其他线程不会访问或修改共享资源，从而避免竞争条件和不一致的状态。 例如，如果你有一个共享的计数器，你可以使用`std::sync::Mutex`来保证在任何时候只有一个线程能够访问或修改计数器：
```rust
use std::sync::{Mutex, Arc};
let counter = Arc::new(Mutex::new(0));
// 在多个线程中访问计数器
for _ in 0..10 {
    let shared_counter = counter.clone();
    std::thread::spawn(move || {
        let mut value = shared_counter.lock().unwrap();
        *value += 1;
    });
}
// 等待所有线程完成
std::thread::sleep(std::time::Duration::from_millis(500));
// 打印最终计数器值
println!("Counter value: {}", counter.lock().unwrap());
```
> 在这个例子中，`Arc::new(Mutex::new(0))`创建了一个计数器，并且使用`Arc`来允许多个线程安全地访问它。每个线程通过`lock`方法获取锁，执行计数操作，并最终释放锁。`thread::sleep`用于等待所有线程完成。最后，`lock`打印计数器的最终值。 这种方法通过使用互斥锁，实现了在操作共享资源时，其他线程必须等待，类似于"stop the world"的效果。然而，与某些语言中的全局"stop the world"机制不同，Rust中的这种暂停是局部的，仅限于互斥锁保护的代码块。
---



```rust
fn print_len(s: String) {
    println!("print len {}", s.len());
}

fn get_len(s: String) -> usize {
    s.len()
}

fn get_len_copy(s: &String) -> usize {
    s.len()
}

fn main() {
    let num1 = 10;
    let num2 = num1; // copy
    println!("num1: {}, num2: {}", num1, num2);
    println!("--------------------------------");

    let s1 = String::from("hello");
    let s2 = s1; // move
    // println!("s1: {}", s1); // value borrowed here after move
    println!("s2: {}", s2);
    println!("--------------------------------");

    let str1 = String::from("hello");
    let str2 = str1.clone(); // copy
    println!("str1: {}, str2: {}", str1, str2);
    println!("--------------------------------");

    let string1 = String::from("hello");
    print_len(string1); // move
    // println!("string1: {}", string1); // value borrowed here after move
    println!("--------------------------------");

    let string2 = String::from("hello");
    let len = get_len(string2);
    println!("string2 len: {}", len);
    // println!("string2: {}", string2); // value borrowed here after move
    println!("--------------------------------");

    let string3 = String::from("hello");
    let len = get_len_copy(&string3);
    println!("string3 len: {}", len);
    println!("string3: {}", string3);
    println!("--------------------------------");
}
```
---



```rust
// 返回句子的第一个单词
fn get_first_word(sentence: &str) -> &str { 
    let bytes = sentence.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &sentence[0..i];
        }
    }
    &sentence[..]
}
fn main() {
    let s = "hello world";
    println!("first word: {}", get_first_word(s));
}
```
