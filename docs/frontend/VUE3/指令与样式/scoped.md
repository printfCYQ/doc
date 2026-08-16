# scoped

## scoped

[链接](https://www.yuque.com/caiyongqing/wm36gg/wfxlou?#%20《6.scoped》)[链接](https://www.yuque.com/caiyongqing/wm36gg/ny6568?#%20《7.样式穿透》)

## :deep()

> vue3 新特性

```typescript
<template>
  <div>
    <el-input class="input" placeholder="" size="normal" clearable></el-input>
  </div>
</template>

<style lang="less" scoped>
.input {
  background: red; // 无效
}
</style>
```
```typescript
<template>
  <div>
    <el-input class="input" placeholder="" size="normal" clearable></el-input>
  </div>
</template>

<style lang="less" scoped>
.input {
  :deep(input) {
    background: red; //
  }
}
</style>
```

### tdesign
