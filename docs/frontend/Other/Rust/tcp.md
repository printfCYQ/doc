# tcp

```rust
use std::io::{Read, Write};
use std::net::TcpListener;

fn main() {
    // 监听本地地址的 8080 端口
    let listener = TcpListener::bind("127.0.0.1:8080").unwrap();
    println!("Server listening on port 8080");

    // 循环接受客户端连接
    for stream in listener.incoming() {
        match stream {
            Ok(mut stream) => {
                println!("Client connected!");

                let mut buffer = [0; 1024];
                // 读取客户端发送的数据
                stream.read(&mut buffer).unwrap();
                let received = String::from_utf8_lossy(&buffer);
                println!("Received: {}", received);

                // 向客户端发送响应
                let response = "Hello, client!";
                stream.write_all(response.as_bytes()).unwrap();
            }
            Err(e) => {
                println!("Error: {}", e);
            }
        }
    }
}
```
```rust
use std::io::{Read, Write};
use std::net::TcpStream;

fn main() {
    // 连接到服务端的 8080 端口
    if let Ok(mut stream) = TcpStream::connect("127.0.0.1:8080") {
        println!("Connected to the server!");

        // 发送消息到服务端
        let message = "Hello, server!";
        stream.write_all(message.as_bytes()).unwrap();

        // 接收服务端的响应
        let mut buffer = [0; 1024];
        stream.read(&mut buffer).unwrap();
        let received = String::from_utf8_lossy(&buffer);
        println!("Received: {}", received);
    } else {
        println!("Failed to connect to the server");
    }
}
```
