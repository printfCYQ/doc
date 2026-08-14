# 单例模式

## 简介

本节介绍创建型设计模式中的单例模式（Singleton），包括饿汉式、懒汉式、双重检查锁定（DCL）、静态内部类、枚举等多种实现方式，以及线程安全分析与适用场景。

## 目录 / 章节

- 单例模式的定义与使用场景
- 饿汉式（Eager）初始化
- 懒汉式（Lazy）与线程安全问题
- 双重检查锁定（Double-Checked Locking）
- 静态内部类（Initialization-on-demand holder）
- 枚举实现（Effective Java 推荐）

## 笔记正文

::: details 点击展开示例代码
```java
public class Singleton {

    private static volatile Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}

// 枚举实现（最简洁、自动防反射与反序列化攻击）
enum EnumSingleton {
    INSTANCE;
    public void doWork() { /* ... */ }
}
```
:::
