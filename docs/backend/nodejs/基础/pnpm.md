# pnpm 包管理

## 安装

```vue
npm install pnpm -g
```
```vue
//查看源
pnpm config get registry 
//切换淘宝源
pnpm config set registry https://registry.npmmirror.com/
```
```vue
pnpm install pkg --registry https://registry.npmmirror.com
```

## 常用命令

```basic
pnpm store path
```

## monorepo

```typescript
pnpm init
```
```yaml
packages:
- "projects/*"
```



## 软硬链接

```basic
mklink ruan.js index.js

mklink /H ying.js index.js
```
```basic
ln -s index.js ruan.js

ln -f index.js ying.js
```
