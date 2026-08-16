# Lifetime 与 Struct

> -   结构体中的引用
> 
> -   在结构体中的引用需要标注生命周期
> -   结构体的方法(`&self`等)不需要标注生命周期

​  

```rust
struct MyString<'a> {
    text: &'a str,
}

impl<'a> MyString<'a> {
    fn get_len(&self) -> usize {
        self.text.len()
    }

    fn set_data(&mut self) {
        self.text = "hello world";
    }
}

fn main() {
    let str = String::from("hello");
    let mut my_string = MyString { text: str.as_str() };
    println!("{}", my_string.get_len());
    my_string.set_data();
    println!("{}", my_string.get_len());
}
```
```rust
struct StringHolder {
    data: String,
}

impl StringHolder {
    fn get_len(&self) -> usize {
        self.data.len()
    }

    fn get_reference<'a>(&'a self) -> &'a String {
        &self.data
    }

    fn get_ref(&self) -> &String {
        &self.data
    }
}

fn main() {
    let holder = StringHolder {
        data: String::from("Hello, world!"),
    };

    let len = holder.get_len();
    println!("Length of the string: {}", len);

    println!("Reference to the string: {}", holder.get_reference());

    println!("Reference to the string: {}", holder.get_ref());
}

```
