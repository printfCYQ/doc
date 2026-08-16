# VUE3 核心设置思想

[链接](https://www.yuque.com/caiyongqing/wm36gg/pql41m)

## VUE3 核心设置思想

## monorepo 开发环境搭建

```plain
shamefully-hoist=true
```
> [https://pnpm.io/zh/npmrc#shamefully-hoist](https://pnpm.io/zh/npmrc#shamefully-hoist)
> 
> ### shamefully-hoist
> 
> -   默认值： false
> -   类型：Boolean
> 
> 默认情况下，pnpm 创建一个半严格的 `node_modules`，这意味着依赖项可以访问未声明的依赖项，但 `node_modules` 之外的模块不行。 通过这种布局，生态系统中的大多数的包都可以正常工作。 但是，如果某些工具仅在提升的依赖项位于根目录的 `node_modules` 时才有效，你可以将其设置为 `true` 来提升它们。
---

> 指定工作空间

```yaml
packages:
  - "packages/*"
```
> [https://pnpm.io/zh/pnpm-workspace\_yaml](https://pnpm.io/zh/pnpm-workspace_yaml)
---

> 在全局（项目根目录）安装依赖

```plain
pnpm add vue -w
```
> [https://pnpm.io/zh/pnpm-cli#-w---workspace-root](https://pnpm.io/zh/pnpm-cli#-w---workspace-root)
---
```plain
pnpm install typescript esbuild minimist -D -w
```
---
```json
{
  "compilerOptions": {
    "outDir": "dist", // 输出的目录
    "sourceMap": true, // 采用sourceMap
    "target": "ES2016", // 目标语法
    "module": "ESNext", // 模块格式
    "moduleResolution": "node", // 模块解析方式
    "strict": false, // 严格模式
    "resolveJsonModule": true, // 解析json模块
    "esModuleInterop": true, // 允许通过es6语法引入commonjs模块
    "jsx": "preserve", // jsx不转译
    "lib": [
      "ESNext",
      "DOM"
    ] // 支持的类库 esnext及dom
  }
}
```
---

> 将本地包安装到另一个包的依赖里
> 
> shared 安装到 reactivity 里

```json
pnpm add @vue/shared --workspace --filter @vue/reactivity
```
> [https://pnpm.io/zh/workspaces](https://pnpm.io/zh/workspaces)

## 搭建 esbuild 开发环境

> [https://github.com/printfCYQ/vue3-learn/commit/9a6c53aef646f6d9e2628beb11cc8240f2dc2967](https://github.com/printfCYQ/vue3-learn/commit/9a6c53aef646f6d9e2628beb11cc8240f2dc2967)

## 手写 reactive 实现

> [https://github.com/printfCYQ/vue3-learn/commit/96cc1a301b1a26036b0d6d227e0645bcacbb8707](https://github.com/printfCYQ/vue3-learn/commit/96cc1a301b1a26036b0d6d227e0645bcacbb8707)

## Reflect 的使用

> [https://github.com/printfCYQ/vue3-learn/commit/3e2bb285941ecc40d9b11046f339b59703fae220](https://github.com/printfCYQ/vue3-learn/commit/3e2bb285941ecc40d9b11046f339b59703fae220)
```javascript
const obj = {
  get name() {
    return this._name;
  }
};
const proxyObj = { _name: 'Proxy John' };
console.log(Reflect.get(obj, 'name', proxyObj)); // 输出 'Proxy John'
```

## effect 函数的基本实现

> [https://github.com/printfCYQ/vue3-learn/commit/9ea045274199f01adc14e82c9ee4f4f075229422](https://github.com/printfCYQ/vue3-learn/commit/9ea045274199f01adc14e82c9ee4f4f075229422)

## 小结

> 

## 依赖收集实现原理

> [https://github.com/printfCYQ/vue3-learn/commit/6c476ad05c847d14015564cc02298cf88bdfb7b5](https://github.com/printfCYQ/vue3-learn/commit/6c476ad05c847d14015564cc02298cf88bdfb7b5)

## 依赖清理

> [https://github.com/printfCYQ/vue3-learn/commit/f34b0add4b14f1456666104cfdc7ba862e49799a](https://github.com/printfCYQ/vue3-learn/commit/f34b0add4b14f1456666104cfdc7ba862e49799a)

## effect 调度实现
