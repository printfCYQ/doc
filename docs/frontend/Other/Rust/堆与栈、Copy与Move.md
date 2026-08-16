# 堆与栈、Copy与Move

> **stack 栈**
> 
> 1.  堆栈将按照获取值的顺序存储值，并以相反的顺序删除值。
> 2.  操作高效，函数作用域就是在栈上。
> 3.  堆栈上存储的所有数据都必须具有已知的固定大小数据。
> 
> **heap 堆**
> 
> 1.  堆的规律性较差，当你把一些东西放到你请求的堆上时，你请求，请求空间，并返回一个指针，这是该位置的地址。
> 2.  长度不确定。
> **Box**
> 
> Box是一个智能指针，它提供对堆分配内存的所有权。它允许你将数据存储在堆上而不是栈上，并且在复制或移动时保持对数据的唯一拥有权。使用Box可以避免一些内存管理问题，如悬垂指针和重复释放。
> 
> 1.  所有权转移
> 2.  释放内存
> 3.  解引用
> 4.  构建递归数据结构
> **Copy与Clone**
> 
> -   Move:所有权转移
> -   Clone:深拷贝
> -   Copy:Copy是在CIone的基础建立的marker trait(Rust中最类似继承的关系)
> 
> ​  
> 
> 1.  trait(特质)是一种定义共享行为的机制。Clone也是特质
> 2.  marker trait是一个没有任何方法的trait,它主要用于向编译器传递某些信息，以改变类型的默认行为
> **堆和栈与Copy和Move**
> 
> stack
> 
> 1.  基础类型
> 2.  tuple和array
> 3.  struct与枚举等也是存储在栈上如果属性有String等在堆上的数据类型会有指向堆的
> 
> heap
> 
> 1.  Box Rc String/Vec等
> 
> 一般来说在栈上的数据类型都默认copy,但struct等默认为move,需要Copy只需要设置数据类型实现copy特质即可，或是调用CI onei函数（需要实现CIone特质）
```rust
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let boxed_point = Box::new(Point { x: 1, y: 2 });
    println!("x: {},y: {}", boxed_point.x, boxed_point.y); // x: 1,y: 2

    let mut boxed_num = Box::new(5);
    println!("{}", boxed_num); // 5
    *boxed_num += 10;
    println!("{}", boxed_num); // 15
}
```
---



```rust
fn main() {
    let x1 = vec![1, 2, 3];
    let y1 = x1.clone();

    println!("{:?}", x1);
    println!("{:?}", y1);

    let z1 = x1;
    // println!("{:?}", x1);
    println!("{:?}", z1);

    println!("-----------------------");

    let x2 = "hello".to_string();
    let y2 = x2.clone();
    println!("{:?}", x2);
    println!("{:?}", y2);

    let z2 = x2;
    // println!("{:?}", x2);
    println!("{:?}", z2);
}

```
---





```rust
#[derive(Debug, Copy, Clone)]
struct Book {
    page: i32,
    rating: u32,
    // name: String,
}

fn main() {
    let b1 = Book {
        page: 100,
        rating: 5,
        // name: String::from("book1"),
    };
    let b2 = b1;
    println!("b1: {:?}", b1);
    println!("b2: {:?}", b2);
}
```
> **name为 String类型 没有**`**Copy**`**特质 所以不能 copy过去**
