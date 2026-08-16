# Trait Object 与 Box

> ### Trait Object
> 
> Trait Object是Rust中实现动态分发的一种方式。动态分发允许你在运行时决定调用哪个具体的实现，这与静态分发（static dispatch）相对，静态分发是在编译时确定的。Trait Object允许你将实现了某个特定Trait的多种类型的值存储在同一个容器中，并在运行时调用这些类型的方法。
> 
> Trait Object的语法是`&dyn Trait`或`Box&lt;dyn Trait>`，其中`Trait`是你想要实现的Trait的名称。例如，如果你有一个`Draw` Trait，你可以创建一个`&dyn Draw`或`Box&lt;dyn Draw>`来存储实现了`Draw` Trait的任何类型的值。
> 
> ### Box
> 
> `Box&lt;T>`是Rust中的一个智能指针，它用于在堆上分配内存。当你需要一个值在堆上而不是在栈上时，你可以使用`Box`。`Box`提供了对堆上数据的唯一所有权，并且当`Box`超出作用域时，它所指向的数据会被自动释放。
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

    let mut shapes: Vec<Box<dyn Draw>> = vec![Box::new(circle), Box::new(square)];

    for shape in &shapes {
        shape.draw();
    }

    println!("------");

    shapes.push(Box::new(Circle { radius: 3.0 }));

    for shape in &shapes {
        shape.draw();
    }
}
```
