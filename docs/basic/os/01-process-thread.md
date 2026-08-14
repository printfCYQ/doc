# 进程与线程

## 简介

本节介绍操作系统中进程与线程的核心概念，包括进程状态转换、调度算法、进程间通信（IPC）、线程同步与互斥、死锁等。

## 目录 / 章节

- 进程定义、PCB 与状态转换
- 进程调度算法（FCFS、SJF、RR、优先级）
- 进程间通信（管道、消息队列、共享内存、信号量）
- 线程与协程的区别
- 同步与互斥（互斥锁、自旋锁、读写锁、条件变量）
- 死锁产生条件与银行家算法

## 笔记正文

::: details 点击展开示例代码
```c
#include <stdio.h>
#include <pthread.h>

static int counter = 0;
static pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

void *worker(void *arg) {
    for (int i = 0; i < 10000; i++) {
        pthread_mutex_lock(&mutex);
        counter++;
        pthread_mutex_unlock(&mutex);
    }
    return NULL;
}

int main() {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, worker, NULL);
    pthread_create(&t2, NULL, worker, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("Counter = %d (expected 20000)\n", counter);
    return 0;
}
```
:::
