# Tauri

Tauri 也是用网页技术做跨平台桌面应用，但思路和 [Electron](../electron/electron.md) 正好相反：**不打包浏览器，而是用操作系统自带的 WebView 来渲染界面，后端用 Rust 写**。结果就是安装包小到几 MB、内存占用低、启动飞快。

打个比方：Electron 是"每人发一台自带屏幕的电脑"，Tauri 是"借你系统里已经装好的浏览器内核来显示，自己只带一个轻量 Rust 引擎干活"。所以 Tauri 应用瘦，但对 Rust 有一点要求。

本篇讲清 Tauri 的架构、Rust command 怎么调、安全模型，以及和 Electron 怎么选。

---

## 一、核心架构

```
┌──────────────────────────────────────────┐
│  Rust 核心 (tauri runtime)                 │  ← 一个，应用逻辑、系统调用
│  窗口管理、文件系统、通知、托盘、数据库…   │
└───────────────┬──────────────────────────┘
                │ 前端通过 @tauri-apps/api 调用 command
┌───────────────┴──────────────────────────┐
│  系统原生 WebView                          │  ← 不打包浏览器！
│  macOS: WKWebView | Win: WebView2         │
│  Linux: WebKitGTK                          │
│  里面跑你的前端（React / Vue / Svelte…）   │
└───────────────────────────────────────────┘
```

关键点：**UI 用系统 WebView，不塞 Chromium**。所以体积主要取决于你的前端代码，而不是框架。后端逻辑用 Rust，编译成很小的原生二进制。

> 和 Electron 的区别一句话：Electron 自带 Chromium + Node；Tauri 借用系统 WebView + Rust。

---

## 二、快速开始

官方脚手架 `create-tauri-app`：
```bash
npm create tauri-app@latest
# 交互选择：前端框架（React/Vue/Svelte/vanilla）、包管理、TypeScript
cd your-app
npm install
npm run tauri dev      # 开发模式，会编译 Rust + 起前端
```

生成的项目结构（要点）：
```
src/            ← 你的前端（和普通 web 项目一样）
src-tauri/      ← Rust 世界
  ├─ Cargo.toml     Rust 依赖
  ├─ tauri.conf.json  应用配置（窗口、产物名、权限）
  ├─ src/main.rs      Rust 入口，注册 command
  └─ build.rs
tauri.conf.json ← 窗口尺寸、图标、标识符、允许的 API（capabilities）
```

跑 `npm run tauri build` 产出各平台安装包（macOS `.app`/`.dmg`、Windows `.msi`、Linux `.deb`/`.AppImage`），体积通常 **3–15 MB**。

---

## 三、Rust command：把后端能力暴露给前端

这是 Tauri 的核心套路。在 Rust 里写一个函数，标上 `#[tauri::command]`，注册进应用，前端就能像调接口一样调用它。

`src-tauri/src/main.rs`：
```rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("你好，{}！来自 Rust", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("启动失败");
}
```

前端（以 TS 为例）：
```ts
import { invoke } from '@tauri-apps/api/tauri'

const msg = await invoke('greet', { name: '小明' })
console.log(msg)   // "你好，小明！来自 Rust"
```
`invoke('命令名', { 参数 })` 第二个对象就是传给 Rust 函数的实参，类型要对上（Rust 侧会自动反序列化 JSON）。

### 能做的更多
- 读写文件、调用系统对话框：用 Tauri 官方插件（如 `@tauri-apps/plugin-fs`、`plugin-dialog`）
- 访问数据库、HTTP、通知、全局快捷键、托盘、自动更新：都有对应插件
- 异步 command：Rust 函数返回 `async fn` + `Result`，前端照常 `await`

---

## 四、系统能力与插件

Tauri 把"危险的系统能力"做成**插件 + 权限白名单**，默认不给，要显式开：

| 能力 | 插件 | 说明 |
|------|------|------|
| 文件系统 | `@tauri-apps/plugin-fs` | 读写成需声明作用域（哪些路径允许） |
| 对话框 | `@tauri-apps/plugin-dialog` | 打开/保存文件、消息框 |
| 通知 | `@tauri-apps/plugin-notification` | 系统通知 |
| 托盘 | `tauri::tray` | 状态栏常驻 |
| HTTP | `@tauri-apps/plugin-http` | 比浏览器 fetch 更自由（无 CORS 限制） |
| 自动更新 | `@tauri-apps/plugin-updater` | 增量更新 |
| 全局快捷键 | `@tauri-apps/plugin-global-shortcut` | 系统级热键 |

配置权限在 `src-tauri/capabilities/default.json`（Tauri v2 的 capabilities 机制），声明"这个前端能调哪些 command、访问哪些路径"，比 Electron 的"全开或手挡"更细。

---

## 五、打包与签名

- 体积对比是 Tauri 最大卖点：同样功能，往往只有 Electron 的 **1/10 到 1/20**。
- **macOS 必须签名 + 公证**（Notarization）才能正常分发，需要 Apple 开发者账号；Windows 同理建议代码签名证书，否则 SmartScreen 会拦。
- 各平台产物在 `src-tauri/target/release/bundle/` 下。

---

## 六、安全模型

Tauri 安全是"默认收紧 + 显式授权"：
- **CSP（内容安全策略）**：配置文件里给前端设白名单，限制能加载哪些资源、跑哪些脚本。
- **Capabilities 权限白名单**：前端能调的 Rust command、能访问的文件路径，都要声明，没声明的一律拒。
- **Rust 编译期安全**：后端用 Rust，内存安全由编译器保证，少一类崩溃/漏洞。
- 同样建议：**不要 `eval` 用户输入、不要关掉 CSP、远程内容要可信**。

---

## 七、Tauri vs Electron（选型速决）

| 你的情况 | 选 |
|---------|-----|
| 纯前端团队、赶时间、要生态成熟 | Electron |
| 要小安装包、低内存、快启动 | Tauri |
| 愿意学/已会 Rust、做工具类轻应用 | Tauri |
| 重度依赖 Node 生态（已有大量 npm 系统库） | Electron |
| 追求长期维护成本与体积 | Tauri |

更详细对比见 [Electron](../electron/electron.md) 第七章的表格。

---

## 八、新手最常踩的坑

1. **没装 Rust 工具链**：`npm run tauri dev` 要先装 Rust（rustup）。首次编译慢（要编 Rust 依赖），后续增量快。
2. **WebView 版本差异**：不同系统/版本 WebView 对 CSS/JS 支持略有差异（尤其 Linux 的 WebKitGTK 老版本），别全信"和 Chrome 一模一样"。
3. **command 参数类型对不上**：前端传的对象字段名/类型要和 Rust 函数签名一致，否则 `invoke` 报错。
4. **权限没开就调 API**：v2 用 capabilities，没在 `default.json` 声明就调用，会被拒。报错看控制台"permission denied"。
5. **macOS 不签名跑不起来**：开发模式能跑，分发给别人必须签名+公证。
6. **把 Tauri 当纯前端框架**：它前端只是壳，重逻辑在 Rust；别把所有业务塞进 JS。
7. **以为体积一定小**：如果你前端引了一堆大库（Three.js、Monaco 等），总体积还是会被前端撑大，只是省了 Chromium 那份。

---

## 九、练习

1. 用 `create-tauri-app` 跑起一个最小应用，点按钮调用一个 Rust command 返回字符串并显示。
2. 写一个 Rust command `add(a: i32, b: i32) -> i32`，前端输入两个数求和。
3. 用 `@tauri-apps/plugin-dialog` 弹一个"选择文件夹"对话框，把路径显示出来。
4. （进阶）配置 capabilities，让前端只能读取某个特定目录，体会权限白名单。

---

## 十、速查口诀

- Tauri = 系统 WebView + Rust 后端，不打包浏览器
- 前端任意框架，重逻辑写 Rust
- command 是桥梁：Rust 标 `#[tauri::command]`，前端 `invoke`
- 系统能力走插件，权限靠 capabilities 显式开
- 体积小的秘密：省了 Chromium
- 安全默认收紧：CSP + 白名单 + Rust 编译期保证
- 要小快省选 Tauri，要生态纯前端选 Electron

---

## 十一、学习路线

1. 架构认知：WebView + Rust（本章一）
2. 脚手架跑起来（二）
3. Rust command 与前端 invoke（三，核心）
4. 插件与系统能力（四）
5. 打包签名（五）、安全（六）
6. 对比 [Electron](../electron/electron.md) 选型（七）
7. 进阶：状态管理、Rust 与前端数据共享、多窗口、与前端框架深度整合

> 联动：Tauri 前端同样是你熟悉的 [HTML/CSS](../../frontend/html-css/html-css.md)；后端是 Rust（本站暂无 Rust 笔记）；它和 [Electron](../electron/electron.md) 是桌面端两条路线，按需选。
