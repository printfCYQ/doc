# Vite 笔记

Vite（法语"快"，读作 /vit/）是现代前端项目的**构建工具 + 开发服务器**。它解决两件事：开发时秒开（不用等打包）、上线时打出优化好的静态文件。

为什么需要它？早期用 Webpack，项目一大启动就要几十秒、改一行要等半天热更新。Vite 的思路是：开发时用浏览器原生的 ES Module，按需编译（用 esbuild 极速转译），所以启动几乎瞬间；生产时再用 Rollup 打包出紧凑的产物。一句话——**开发快、构建稳**。

> 本篇属于"构建工具"这一类。这个目录下以后还会补充别的工具（见第 11 节）。配合 [Vue 3](../vue/vue.md) / [React](../react/react.md) 起项目最好用，依赖 [TypeScript](../typescript/typescript.md) 也完全没问题。

---

## 1. 创建项目

```bash
npm create vite@latest my-app
# 交互里选模板：vanilla / vue / react / vue-ts / react-ts / preact / svelte ...
cd my-app
npm install
npm run dev        # 启动开发服务器，默认 http://localhost:5173
npm run build      # 打包到 dist/
npm run preview    # 本地预览打包后的产物
```

`npm create vite` 背后用的是 `create-vite`，它只是生成脚手架，真正的构建由项目里的 `vite` 完成。

---

## 2. 项目结构

```
my-app/
├── index.html          # 入口 HTML，Vite 从这儿开始
├── vite.config.ts      # Vite 配置（重点）
├── tsconfig.json       # TS 配置（用 TS 模板才有）
├── package.json
└── src/
    ├── main.ts         # 入口 JS/TS
    ├── App.vue         # Vue 根组件（vue 模板）
    └── ...
```

注意 `index.html` 在项目根目录（不是藏在 `public/`），这是 Vite 和老工具的一个区别——它把 HTML 当入口。

---

## 3. vite.config.ts 常用配置

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],                 // 框架插件，按项目选 vue / react
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 配 @ 指向 src，告别 ../../
    }
  },
  server: {
    port: 3000,                     // 改端口
    open: true,                     // 启动自动开浏览器
    proxy: {                        // 开发时代理后端接口，解决跨域
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,                // 出 sourcemap，方便排查
  }
})
```

### 路径别名 @ 在项目里怎么用
配了 `alias` 后，代码里就能 `import App from '@/App.vue'`，不用数 `../`。记得在 `tsconfig.json` 的 `paths` 也配一份，TS 才认：

```jsonc
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

---

## 4. 插件机制

Vite 的能力主要靠插件扩展，官方和社区一票现成的：

- `@vitejs/plugin-vue`：支持 `.vue` 单文件组件。
- `@vitejs/plugin-react`：支持 React + 快速刷新（HMR）。
- `unplugin-auto-import` / `unplugin-vue-components`：自动导入 API/组件，少写 import。
- `vite-plugin-vue-devtools`：Vue 调试面板。
- `vite-tsconfig-paths`：自动读 tsconfig 的 paths 当别名。

插件就是个对象（有 `name`、`transform`、`config` 等钩子），需要深度定制时也可以自己写，但多数情况用现成即可。

---

## 5. 环境变量 .env

```bash
# .env（所有环境）
VITE_API_BASE=/api

# .env.development
VITE_API_BASE=http://localhost:8080

# .env.production
VITE_API_BASE=https://api.example.com
```

规则：
- 只有 `VITE_` 开头的变量才会暴露给前端代码（`import.meta.env.VITE_API_BASE`）。
- 没前缀的（如数据库密码）只存在构建端，别泄露到浏览器。
- 不同文件按 `mode`（development / production）自动加载。

```ts
const base = import.meta.env.VITE_API_BASE
```

---

## 6. 开发服务器与 HMR 原理

Vite 开发服务器做了两件事让体验丝滑：

1. **原生 ESM 按需编译**：浏览器请求哪个模块，Vite 才用 esbuild 编译哪个（esbuild 用 Go 写，比 JS 快几十倍）。所以项目再大，启动也只是"建个服务"，不用先全量打包。
2. **HMR（热模块替换）**：改了一个模块，Vite 只把那个模块推给浏览器替换掉，页面不刷新、状态不丢。原理是建立 WebSocket，文件变化→服务端通知客户端→客户端用新模块替换旧的并保留应用状态。

对比：Webpack 是把所有模块先打包成一个大 bundle 再启动，所以越大越慢；Vite 跳过了这一步。

---

## 7. 生产构建

```bash
npm run build
```

背后用 **Rollup** 做打包优化：
- **Tree Shaking**：没用到的代码自动剔除。
- **代码压缩**：压缩 JS/CSS。
- **按需分包**：把第三方库拆成单独的 chunk，利用浏览器缓存。

产物在 `dist/`，是纯静态文件，丢到任意静态服务器（Nginx、GitHub Pages、OSS）就能跑。这个站本身（你的学习文档）就是用 Vite + [VitePress](https://vitepress.dev/) 构建的。

### 代码分割（手动分包）
```ts
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['vue', 'pinia'],   // 把 vue/pinia 单独打成 vendor 包
      }
    }
  }
}
```

### 库模式（打包成 npm 库）
```ts
// vite.config.ts
build: {
  lib: {
    entry: 'src/index.ts',
    name: 'MyLib',
    fileName: 'my-lib'
  }
}
```

---

## 8. 静态资源处理

```vue
<template>
  <img :src="logo" />          <!-- 推荐：import 进来，Vite 会处理路径和哈希 -->
</template>

<script setup>
import logo from './logo.png'   // 自动处理成带 hash 的 URL
</script>
```

- `import` 进来的资源会被处理（加哈希、优化）。
- `public/` 目录下的文件原样拷贝到 `dist/`，适合放 favicon、不参与构建的静态文件，引用时用绝对路径 `/favicon.ico`。
- 小图片可转 base64 内联（减少请求），大图片走文件。

---

## 9. 部署要点

- 如果项目不在域名根路径（比如在 `/doc/` 下），要配 `base`：
  ```ts
  export default defineConfig({ base: '/doc/' })
  ```
  否则打包后的资源路径会是 `/assets/...` 而实际在 `/doc/assets/...`，导致 404（本学习站就踩过这个）。
- 部署到 GitHub Pages / Nginx / 对象存储都行，都是静态托管。
- SPA（单页应用）需要把所有路径回退到 `index.html`（服务端配 `try_files`），否则刷新子路由 404。

---

## 10. 与框架配合

- [Vue 3](../vue/vue.md)：`npm create vite@latest -- --template vue-ts`，自带 `@vitejs/plugin-vue`。
- [React](../react/react.md)：`--template react-ts`，自带 `@vitejs/plugin-react`（含 Fast Refresh）。
- [TypeScript](../typescript/typescript.md)：TS 模板开箱即用，`tsc` 负责类型检查，`vite` 负责构建（两者分工：tsc 只查类型不打包）。

---

## 11. 构建工具全家桶（本目录后续补充）

Vite 不是唯一的构建工具，这个 `engineering/` 目录以后会逐步补上其他工具笔记：

| 工具 | 角色 | 说明 |
|------|------|------|
| **Vite** | 开发服务器 + 构建（本篇） | 开发快，生产用 Rollup |
| **Rollup** | 库/产物打包器 | Vite 生产构建的内核 |
| **esbuild** | 极速转译/压缩 | Go 写，Vite 开发期用它 |
| **Webpack** | 老牌打包器 | 配置多但生态全，老项目常见 |
| **Turbopack** | 增量打包（Rust） | Next.js 推动，主打快 |
| **Rspack / Rsbuild** | Rust 打包（字节） | Webpack 兼容，性能高 |
| **SWC** | Rust 转译器 | 替代 Babel，快 |

**后续计划**：会单独写 Rollup、esbuild、Webpack、Turbopack、Rspack 的笔记，讲清各自定位和什么时候该用谁。先掌握 Vite 足够应付绝大多数新项目。

---

## 12. 常见坑

1. `import` 路径大小写错（Linux 服务器区分大小写），本地能跑线上 404。
2. 忘了配 `base`，部署到子路径资源全 404。
3. 环境变量没加 `VITE_` 前缀，前端读不到。
4. 代理 `proxy` 只解决开发期跨域，生产要由后端/Nginx 配 CORS 或反代。
5. 在 `vite.config.ts` 里用了 `__dirname` 却没装 `@types/node`，TS 报错。
6. 第三方库没做 `manualChunks`，首屏 vendor 过大。

---

## 13. 练习

1. 用 Vite 起一个 `vue-ts` 项目，配 `@` 别名指向 `src`，并在组件里用 `@/xxx` 引入。
2. 配一个 `/api` 代理，开发时把请求转到 `http://localhost:8080`。
3. 建 `.env.development` 和 `.env.production`，分别设置不同 `VITE_API_BASE`，在代码里打印验证。
4. 用 `manualChunks` 把 `vue` 单独拆包，构建后看 `dist/assets` 是否多出 vendor 文件。
5. 把项目 `base` 设成 `/doc/` 并构建，确认资源路径都带上了 `/doc/`。

---

## 14. 下一步

- 用 Vite 起 Vue 项目 → [Vue 3 笔记](../vue/vue.md)
- 用 Vite 起 React 项目 → [React 笔记](../react/react.md)
- 给项目加类型 → [TypeScript 笔记](../typescript/typescript.md)
- 补语言基础 → [JavaScript 笔记](../javascript/javascript.md)
