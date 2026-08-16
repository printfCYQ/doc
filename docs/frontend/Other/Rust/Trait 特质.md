# Trait 特质

> Rust 的 Trait 是一种定义共享行为的方式。它类似于其他编程语言中的接口（Interface）或抽象类（Abstract Class），但在 Rust 中，Trait 更加灵活和强大。

> Trait 的一些主要特点：
> 
> 1.  定义共享行为：Trait 可以定义一组方法签名，这些方法可以被任何实现了该 Trait 的类型所使用。这使得代码更加模块化和可重用。
> 2.  实现多态：通过 Trait，我们可以定义一组行为规范，然后让不同的类型遵循这些规范，从而实现代码的多态性。
> 3.  默认实现：Trait 可以包含默认实现，这样即使类型没有显式实现 Trait 中的方法，也可以使用默认实现。
> 4.  作为函数参数的类型约束：Trait 可以作为函数参数的类型约束，使得函数可以接受实现了特定 Trait 的任何类型。
> 5.  泛型支持：Trait 可以与泛型一起使用，允许你定义可以应用于多种类型的行为。
> 6.  扩展现有类型：通过 Trait，你可以为现有的类型添加新的方法，而不需要修改原始类型的定义。
> 7.  避免代码重复：通过 Trait，你可以将公共的行为提取到一个地方，避免在不同的类型中重复实现相同的方法。
> 8.  静态分发：Rust 的 Trait 系统是静态分发的，这意味着在编译时就确定了调用哪个具体的实现，从而提高了运行时效率。
> 9.  安全和内存安全：Rust 的 Trait 系统确保了内存安全，因为它遵循 Rust 的所有权和借用规则。
> 10.  易于理解和维护：Trait 使得代码更加清晰和易于理解，因为它们提供了一个明确的接口，说明类型应该如何行为。
```javascript
trait Draw {
    fn draw(&self);
}

struct Circle {
    radius: f64,
}

impl Draw for Circle {
    fn draw(&self) {
        println!("Drawing a circle with radius {}", self.radius);
    }
}

struct Square {
    side: f64,
}

impl Draw for Square {
    fn draw(&self) {
        println!("Drawing a square with side {}", self.side);
    }
}

fn main() {
    let circle = Circle { radius: 5.0 };
    let square = Square { side: 4.0 };

    circle.draw();
    square.draw();
}
```
