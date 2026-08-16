# 原子化CSS

> [https://github.com/unocss/unocss#readme](https://github.com/unocss/unocss#readme)

## 原子化CSS

> 1.减少了css体积，提高了css复用
> 
> 2.减少起名的复杂度
> 
> 3.增加了记忆成本 将css拆分为原子之后，你势必要记住一些class才能书写，哪怕tailwindcss提供了完善的工具链，你写background，也要记住开头是bg

## 接入unocss

  

```html
pnpm i -D unocss
```
```typescript
import unocss from 'unocss/vite'

plugins: [vue(), vueJsx(),unocss({
  rules:[

  ]
})],
```
```typescript
import 'uno.css'
```

### rules

```typescript
rules: [
  ['flex', { display: "flex" }]
]
```
```html
<template>
  <div class="flex">
    <div>1</div>
    <div>2</div>
  </div>
</template>
```

### 动态rules

```typescript
rules: [
  [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) * 10}px` })],
  ['flex', { display: "flex" }]
]
```
```vue
<template>
  <div class="flex">
    <div>1</div>
    <div class="m-10">2</div>  // margin:100px
  </div>
</template>
```

### shortcuts

> 自定义组合样式

```typescript
rules: [
  [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) * 10}px` })],
  ['flex', { display: "flex" }],
  ['pink', { color: 'pink' }]
],
  shortcuts: {
  flexpink: "pink flex"
}
```
```vue
<template>
  <div class="flexpink">
    <div>1</div>
    <div class="m-10">2</div>
  </div>
</template>
```

### unocss 预设

```typescript
import { presetAttributify, presetUno, presetIcons } from 'unocss'

//...
rules: [
  [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) * 10}px` })],
  ['flex', { display: "flex" }],
  ['pink', { color: 'pink' }]
],
  shortcuts: {
  flexpink: "pink flex"
},
presets: [presetIcons(), presetAttributify(), presetUno()]
```

#### presetIcons 图标

> [https://icones.js.org](https://icones.js.org)

```vue
pnpm i -D @iconify-json/ic
```
```typescript
<div class="i-ic-baseline-backspace text-3xl bg-green-500" />
```

#### presetAttributify属性化模式支持

> 属性语义化 无须class

```vue
<template>
  <div flex>
    <div>1</div>
    <div m-10>2</div>
  </div>
</template>
```

#### presetUno工具类预设

> 默认的 @unocss/preset-uno 预设（实验阶段）是一系列流行的原子化框架的 通用超集，包括了 Tailwind CSS，Windi CSS，Bootstrap，Tachyons 等。
> 
> ​  
> 
> 例如，ml-3（Tailwind），ms-2（Bootstrap），ma4（Tachyons），mt-10px（Windi CSS）均会生效。
