# if 流程控制 与 match 模式匹配

```rust
fn main() {
    let score: i32 = 75;
    if score > 100 || score < 0 {
        println!("分数错误");
    } else if score >= 90 {
        println!("你的分数是{}，成绩优秀", score);
    } else if score >= 80 {
        println!("你的分数是{}，成绩良好", score);
    } else if score >= 70 {
        println!("你的分数是{}，成绩中等", score);
    } else if score >= 60 {
        println!("你的分数是{}，成绩及格", score);
    } else {
        println!("你的分数是{}，成绩不及格", score);
    }

    // 在Rust中，并没有内置的三元表达式（ternary operator），
    // 三元表达式是一种简洁的条件判断语句，在许多其他编程语言中用于根据一个条件选择两个值中的一个。
    // 不过你可以使用if-else语句来模拟三元表达式的行为。
    let score = 75;
    let result = if score >= 60 { "及格" } else { "不及格" };
    println!("你的分数是{}，成绩{}", score, result);
}

```
```rust
fn main() {
    let score: i32 = 75;
    match score {
        x if x > 100 || x < 0 => println!("分数错误"),
        x if x >= 90 => println!("你的分数是{}，成绩优秀", x),
        x if x >= 80 => println!("你的分数是{}，成绩良好", x),
        x if x >= 70 => println!("你的分数是{}，成绩中等", x),
        x if x >= 60 => println!("你的分数是{}，成绩及格", x),
        _ => println!("你的分数是{}，成绩不及格", score),
    }

    let score: i32 = 90;
    match score {
        x if x > 100 || x < 0 => println!("分数错误"),
        90..=100 => println!("你的分数是{}，成绩优秀", score),
        80..=89 => println!("你的分数是{}，成绩良好", score),
        70..=79 => println!("你的分数是{}，成绩中等", score),
        60..=69 => println!("你的分数是{}，成绩及格", score),
        _ => println!("你的分数是{}，成绩不及格", score),
    }

    let num: i32 = 1000;
    match num {
        100 | 200 => println!("100或200"),
        _ => println!("others"),
    }

    let score: i32 = 60;
    let res = match score {
        x if x >= 60 => "及格".to_owned(),
        _ => "不及格".to_owned(),
    };
    println!("你的分数是{}，成绩{}", score, res);
}
```
