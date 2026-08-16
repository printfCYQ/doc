# vscode 格式化代码失败

## vscode 格式化代码失败

```rust
Request textDocument/formatting failed.
```
```rust
Message: rustfmt exited with: Status: exit status: 1 stdout: stderr: error: 'rustfmt' is not installed for the toolchain 'nightly-aarch64-apple-darwin' To install, run rustup component add rustfmt
```
> 根据你提供的信息，似乎在运行 `rustfmt` 命令时出现了错误。错误信息显示 `rustfmt` 未安装在名为 `nightly-aarch64-apple-darwin` 的工具链中。
> 
> 要解决这个问题，你可以按照错误信息中的建议运行 `rustup component add rustfmt` 命令来安装 `rustfmt`。这将在当前工具链中安装 `rustfmt` 组件。
> 
> 请确保你已经正确安装了 Rust 和相关的工具链，并且你的环境变量已正确配置。然后，尝试再次运行 `rustfmt`命令来格式化你的代码。
