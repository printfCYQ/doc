# Swift 基础入门

## 简介

本节介绍 Swift 语言的基础知识，包括变量与常量、可选类型、控制流、结构体与类、协议与扩展、错误处理、闭包等。

## 目录 / 章节

- 变量、常量与数据类型
- 可选类型（Optional）与解包
- 控制流（if / switch / for-in）
- 结构体（struct）与类（class）
- 协议（Protocol）与面向协议编程
- 闭包与高阶函数

## 笔记正文

::: details 点击展开示例代码
```swift
protocol Stackable {
    associatedtype Element
    mutating func push(_ element: Element)
    mutating func pop() -> Element?
}

struct Stack<Element>: Stackable {
    private var items: [Element] = []

    mutating func push(_ element: Element) {
        items.append(element)
    }

    mutating func pop() -> Element? {
        return items.popLast()
    }
}

var intStack = Stack<Int>()
intStack.push(1)
intStack.push(2)
print(intStack.pop() ?? "empty") // 2
```
:::
