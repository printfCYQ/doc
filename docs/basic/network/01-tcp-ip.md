# TCP / IP 协议

## 简介

本节介绍 TCP/IP 协议栈，包括 OSI 七层模型与 TCP/IP 四层模型、TCP 三次握手四次挥手、拥塞控制、UDP 协议、HTTP 协议版本对比等。

## 目录 / 章节

- OSI 七层模型与 TCP/IP 四层模型对比
- IP 协议、子网划分、ARP 协议
- TCP 报文格式、三次握手与四次挥手
- TCP 可靠传输（超时重传、滑动窗口）
- TCP 拥塞控制（慢启动、拥塞避免、快重传、快恢复）
- HTTP/1.1 vs HTTP/2 vs HTTP/3

## 笔记正文

::: details 点击展开示例代码
```python
import socket

def tcp_server():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind(('127.0.0.1', 8888))
    server.listen(5)
    print("Server listening on 8888...")
    while True:
        conn, addr = server.accept()
        data = conn.recv(1024)
        print(f"From {addr}: {data.decode()}")
        conn.sendall(b"Hello Client")
        conn.close()

def tcp_client():
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client.connect(('127.0.0.1', 8888))
    client.sendall(b"Hello Server")
    print(f"Received: {client.recv(1024).decode()}")
    client.close()
```
:::
