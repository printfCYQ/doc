# Electron

Electron 让你用写网页的技术（HTML / CSS / JavaScript）做出**原生桌面应用**——Windows、macOS、Linux 一个代码库全搞定。VS Code、Slack、Discord、Figma 桌面端都是它做的。

打个比方：Electron 把一个**定制过的 Chromium 浏览器**和 **Node.js 运行时**打包进你的应用，再套个系统窗口壳。你写的页面跑在 Chromium 里，想干系统级的事（读文件、弹通知）就通过 Node.js 那层去做。好处是前端工程师零成本上手，代价是**体积大、吃内存**（因为每个应用都自带一个浏览器）。

本篇讲清 Electron 的核心架构、进程通信、安全坑，以及它和 [Tauri](../tauri/tauri.md) 怎么选。

---

## 一、核心架构：三个角色

Electron 不是一个进程，是**多个进程协作**：

```
┌─────────────────────────────────────────┐
│  主进程 Main Process (Node.js)            │  ← 一个，应用入口
│  管窗口、菜单、托盘、文件系统、原生 API    │
└───────────┬─────────────────────────────┘
            │ IPC 进程间通信
┌───────────┴──────────┐  ┌──────────────┴──────────┐
│ 渲染进程 Renderer 1    │  │ 渲染进程 Renderer 2        │  ← 每个窗口一个
│ (Chromium + 你的页面)  │  │ (Chromium + 你的页面)      │
└───────────────────────┘  └──────────────────────────┘
```

- **主进程（Main）**：应用入口（`main.js`），全局只有一个。负责创建 `BrowserWindow`、访问 Node.js / 操作系统 API、管生命周期。
- **渲染进程（Renderer）**：每个窗口一个，就是跑你网页的地方（Chromium）。默认**不能直接**用 Node API、不能直接碰系统。
- **预加载脚本（Preload）**：夹在主进程和渲染进程之间的"安全桥"，能在渲染进程加载前运行，把需要的能力**有选择地**暴露给页面。

> 关键认知：**主进程和渲染进程内存隔离**，不能直接共享变量。要通信必须走 IPC。这点和浏览器的多标签页隔离一个道理。

---

## 二、快速开始

```bash
mkdir my-app && cd my-app
npm init -y
npm install electron --save-dev
```

`package.json` 加启动脚本和入口：
```json
{
  "main": "main.js",
  "scripts": { "start": "electron ." }
}
```

`main.js`——创建一个窗口并加载页面：
```js
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1000, height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,     // 必须 true（见安全章节）
      nodeIntegration: false      // 必须 false
    }
  })
  win.loadFile('index.html')      // 或 win.loadURL('https://...')
}

app.whenReady().then(createWindow)
```

`index.html`（就是普通网页）：
```html
<!doctype html><html><body>
  <h1>Hello Electron</h1>
  <button id="btn">Ping 主进程</button>
  <script src="renderer.js"></script>
</body></html>
```

跑 `npm start` 就能看到窗口。

---

## 三、进程间通信（IPC）—— 重点

页面想让主进程读个文件、弹个对话框，得发消息过去、等回复。Electron 提供两套 API：

### 方式一：invoke / handle（推荐，像 async 函数）
```js
// preload.js —— 用 contextBridge 把安全接口挂到 window
const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('api', {
  getVersion: () => ipcRenderer.invoke('get-version')
})

// main.js —— 主进程监听并回复
const { ipcMain } = require('electron')
ipcMain.handle('get-version', () => {
  return require('electron').app.getVersion()
})

// renderer.js —— 页面里像调普通函数一样用
document.getElementById('btn').onclick = async () => {
  const v = await window.api.getVersion()
  console.log('应用版本:', v)
}
```

### 方式二：send / on（单向、事件式）
```js
// 渲染进程发
ipcRenderer.send('do-something', { id: 1 })
// 主进程收
ipcMain.on('do-something', (event, payload) => { /* ... */ })
```

**记住**：`ipcMain.handle` 配 `ipcRenderer.invoke` 是请求-响应模型（能拿返回值）；`ipcMain.on` 配 `ipcRenderer.send` 是单向通知（拿不到返回值）。新手优先用 invoke/handle。

---

## 四、窗口、菜单与托盘

- **BrowserWindow 选项**：`width/height`（尺寸）、`frame: false`（无边框，做自定义标题栏）、`transparent`（透明）、`webPreferences`（前面那些安全开关）。
- **原生菜单**：用 `Menu.buildFromTemplate([...])` + `Menu.setApplicationMenu(menu)`，可设快捷键（`accelerator: 'CmdOrCtrl+S'`）。
- **托盘（Tray）**：`new Tray(iconPath)`，做"最小化到状态栏、右键菜单"那种常驻应用（如网盘客户端）。
- **自动更新**：社区方案 `electron-updater`（配合 `electron-builder`），支持增量更新。

---

## 五、打包发布

| 工具 | 特点 |
|------|------|
| electron-builder | 最流行，一条命令产出 dmg/exe/AppImage，自带自动更新 |
| electron-forge | 官方推荐脚手架，集成打包、发布、CI |

```bash
npm install electron-builder --save-dev
# package.json 配 build 字段（appId、图标、目标平台）
npx electron-builder --mac --win --linux
```
产物体积：一个空 Electron 应用 macOS 包 ~80–150 MB（因为塞了整个 Chromium + Node）。

---

## 六、安全（必看，很多人栽这里）

旧教程爱写 `nodeIntegration: true` + `contextIsolation: false`，**这是危险的**：页面里的任意 JS（包括被 XSS 注入的）都能直接调用 Node、读写文件系统。正确姿势：

- ✅ `contextIsolation: true`（隔离页面和 Electron 内部）
- ✅ `nodeIntegration: false`（渲染进程不能用 `require`）
- ✅ 只允许通过 `preload` + `contextBridge` 暴露**最少必要**的接口
- ✅ 加载远程内容要谨慎，最好只加载本地文件或可信源；设 `Content-Security-Policy`
- ❌ 别用已废弃的 `remote` 模块（它会绕过隔离，把主进程对象直接暴露给页面）
- ❌ 别 `eval` 或把用户输入拼进 `executeJavaScript`

一句话：**把渲染进程当成一个不可信的网页来防**。

---

## 七、Electron vs Tauri（怎么选）

| 维度 | Electron | Tauri |
|------|----------|-------|
| UI 内核 | 自带 Chromium | 系统原生 WebView（mac 用 WKWebView） |
| 后端语言 | Node.js | Rust |
| 安装包体积 | 大（~80–150 MB） | 小（~3–15 MB） |
| 内存占用 | 高 | 低 |
| 技术栈要求 | 纯前端即可 | 需要会一点 Rust |
| 生态成熟度 | 极成熟，资料多 | 较新，增长快 |
| 启动速度 | 偏慢 | 快 |
| 代表产品 | VS Code、Slack、Discord | 一些新晋轻量应用 |

**选 Electron**：团队是前端、要快速出活、不在意体积、依赖 Node 生态。
**选 [Tauri](../tauri/tauri.md)**：追求小体积/低内存/快启动、愿意学 Rust、做工具类轻应用。

---

## 八、新手最常踩的坑

1. **端口/路径用相对还是绝对**：`loadFile` 用相对路径要基于 `__dirname`；加载本地资源注意 `webPreferences` 的 `webSecurity`。
2. **误开 `nodeIntegration`**：图省事开了，留下严重安全漏洞。老老实实走 preload。
3. **主进程卡死拖垮 UI**：主进程是单线程，耗时操作（大文件、密集计算）会冻住所有窗口。重活丢给 Worker 或子进程，或放渲染进程用 Web Worker。
4. **IPC 把所有东西都传主进程**：频繁小消息 IPC 也有开销，批量发、只在必要时跨进程。
5. **忘记打包时签名**：macOS 不签名无法分发运行；提前准备开发者证书。
6. **以为渲染进程能用 Node**：开了隔离后 `require` 是 undefined，必须通过 preload 暴露。
7. **多窗口共享状态**：每个渲染进程独立，共享状态用主进程做中转或外部存储（如 SQLite）。

---

## 九、练习

1. 用上面的最小例子跑出一个窗口，点击按钮后通过 IPC 让主进程返回一个字符串并显示。
2. 加一个系统菜单，含"退出"项和快捷键 `Cmd/Ctrl+Q`。
3. 用 `electron-builder` 把自己写的 demo 打一个 macOS 或 Windows 包，看体积多大。
4. （进阶）在主进程里读一个本地 txt 文件内容，通过 IPC 传给页面展示，体会"系统能力走主进程"。

---

## 十、速查口诀

- 主进程管窗口系统、渲染进程跑页面、preload 当安全桥
- 进程隔离不能直接共享，通信走 IPC
- 请求-响应用 invoke/handle，单向用 send/on
- 安全三件套：contextIsolation=true、nodeIntegration=false、preload 最小暴露
- 体积大内存高选 Electron，小快省选 Tauri
- 重活在别处做，别卡主进程

---

## 十一、学习路线

1. 架构认知：主进程/渲染进程/Preload（本章一）
2. 最小可跑例子（二）
3. IPC 通信，重点 invoke/handle（三）
4. 窗口/菜单/托盘（四）
5. 打包（五）、安全（六，必读）
6. 对比 [Tauri](../tauri/tauri.md) 选型（七）
7. 进阶：自动更新、多窗口架构、与前端框架（React/Vue）结合、性能调优

> 联动：Electron 前端部分就是你熟悉的 [HTML/CSS](../../frontend/html-css/html-css.md) 和 [Node.js](../../backend/nodejs/nodejs.md)；它和 [Tauri](../tauri/tauri.md) 是桌面端两条路线。
