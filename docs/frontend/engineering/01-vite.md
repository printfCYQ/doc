# Vite 构建工具

## 简介

本节介绍 Vite 构建工具的使用，包括项目初始化、配置文件、插件开发、HMR 原理、生产环境构建优化等。

## 目录 / 章节

- Vite 项目初始化
- vite.config.ts 常用配置
- 插件机制与常用插件
- HMR（热模块替换）原理
- 生产环境 Rollup 构建
- 性能优化与分包策略

## 笔记正文

::: details 点击展开示例代码
```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia']
        }
      }
    }
  }
});
```
:::
