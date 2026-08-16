# 自定义一个Error类型

> **自定义Error类型的三个步骤**
> 
> 1.  定义错误类型结构体：创建一个结构体来表示你的错误类型，通常包含一些字段来描述错误的详细信息。
> 
> 2.  实现`std:fmt::Display trait:`实现这个trait以定义如何展示错误信息。这是为了使错误能够以人类可读的方式打印出来。
> 
> 3.  实现`std:error:Error trait:`实现这个trait以满足Rust的错误处理机制的要求。
```rust
#[derive(Debug)]
struct MyError {
    message: String,
}

impl std::fmt::Display for MyError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "Display Display: {}", self.message)
    }
}

impl std::error::Error for MyError {
    fn description(&self) -> &str {
        &self.message
    }
}
fn func() -> Result<String, MyError> {
    Err(MyError {
        message: "错误".to_string(),
    })
}

fn func2() -> Result<String, MyError> {
    Ok("成功".to_string())
}

// fn main() -> Result<(), Box<dyn std::error::Error>> {
//     func()?;
//     Ok(())
// }

fn main() {
    match func() {
        Ok(value) => println!("成功: {}", value),
        Err(error) => println!("失败: {}", error),
    }

    match func2() {
        Ok(value) => println!("成功: {}", value),
        Err(error) => println!("失败: {}", error),
    }
}
```
