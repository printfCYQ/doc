# Cargo

> **c**argo 是一个用于管理 Rust 项目的命令行工具。它是 Rust 的包管理器和构建系统。它用于编译和构建 Rust 项目，管理依赖项，并运行测试。
```powershell
cargo new hello-world
```

  



  



  

```powershell
my_project/
├── Cargo.toml
└── src/
    └── main.rs
```
> -   Cargo.toml 是项目的配置文件，用于指定项目的名称、版本、依赖项等信息。
> -   src/main.rs 是项目的主要源代码文件，用于编写 Rust 代
> **Cargo.lock** 是 Rust 项目中的一个文件，它记录了项目的依赖关系及其确切版本。它由 Cargo 自动生成，用于确保在不同的开发环境和构建系统之间的一致性。
> 
> **Cargo.lock** 文件应该被添加到版本控制系统中，因为它记录了项目的确切依赖关系，并且在构建项目时会被 Cargo 使用。如果省略了 **Cargo.lock** 文件，Cargo 可能会选择不同的依赖版本，导致构建结果不一致。
> 
> 在项目的根目录下，**Cargo.lock** 文件通常位于与 **Cargo.toml** 文件相同的位置。

  

> 以下是一些常用的 cargo 基本命令：
> 
> -   cargo new: 创建一个新的 Rust 项目。
> -   cargo build: 编译项目。
> -   cargo run: 编译并运行项目。
> -   cargo test: 运行项目的测试。
> -   cargo doc: 生成项目的文档。
> -   cargo update: 更新项目的依赖项。
> -   cargo publish: 发布项目到 Crates.io。
> 
> 这些命令可以通过在终端中运行 cargo &lt;command> 来执行。

  

```powershell
cargo run 
```



  

```powershell
cargo build
```
