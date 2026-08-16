# Generic Function

> -   在Rust中，泛型也可以用于函数，使得函数能够处理多种类型的参数，提高代码的重用性和灵活性
> 
> -   1.泛型与函数
> -   2.泛型与结构体中的方法
```rust
fn swap<T>(a: T, b: T) -> (T, T) {
    (b, a)
}

struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn new(x: T, y: T) -> Self {
        Point { x, y }
    }

    fn get_coordinates(&self) -> (&T, &T) {
        (&self.x, &self.y)
    }
}
fn main() {
    let res1: (i32, i32) = swap(1, 2);
    let res2 = swap::<f64>(3.14, 2.71);
    println!("res1 {:?}", res1);
    println!("res2 {:?}", res2);

    let res3 = swap("hello", "world");
    println!("res3 {:?}", res3);
    let res4 = swap(res3.0, res3.1);
    println!("res4 {:?}", res4);

    let i32_point = Point::new(1, 2);
    let f64_point = Point::new(3.14, 2.71);
    let (x1, y1) = i32_point.get_coordinates();
    let (x2, y2) = f64_point.get_coordinates();
    println!("i32_point: ({}, {})", x1, y1);
    println!("f64_point: ({}, {})", x2, y2);

    let str_point = Point::new("hello", "world");
    println!("str_point: x = {:?} y = {:?}", str_point.x, str_point.y)
}
```
