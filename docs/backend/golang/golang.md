# Golang 基础入门

## 简介

本节介绍 Go 语言的基础知识，包括变量声明、数据类型、函数、结构体、接口、错误处理、并发编程（goroutine + channel）等。

## 目录 / 章节

- 变量与基本数据类型
- 函数与多返回值
- 结构体与方法
- 接口（interface）
- 错误处理
- goroutine 与 channel

## 笔记正文

::: details 点击展开示例代码
```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	ch := make(chan int, 5)

	for i := 0; i < 5; i++ {
		wg.Add(1)
		go func(n int) {
			defer wg.Done()
			ch <- n * n
		}(i)
	}

	wg.Wait()
	close(ch)

	for result := range ch {
		fmt.Println(result)
	}
}
```
:::
