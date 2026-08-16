# Grid-响应式布局

```vue
<template>
  <div class="grid-container">
    <div v-for="item in 50" :key="item" class="p-1 bg-[#ccc]">{{ item }}</div>
  </div>
</template>

<style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: 50px;
    border: 1px solid #dea;
    gap: 10px;
  }
</style>
```
