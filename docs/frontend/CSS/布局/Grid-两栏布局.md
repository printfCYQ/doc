# Grid-两栏布局

```vue
<template>
  <div class="grid grid-cols-2 gap-2">
    <div v-for="item in 1" :key="item" class="bg-purple-500 p-5">{{ item }}</div>
  </div>

  <hr>
  <div class="grid grid-cols-2 gap-2">
    <div v-for="item in 2" :key="item" class="bg-rose-500 p-5">{{ item }}</div>
  </div>

  <hr>
  <div class="grid grid-cols-2 gap-2">
    <div v-for="item in 3" :key="item" class="bg-indigo-500 p-5">{{ item }}</div>
  </div>
</template>

```



  

---

> flex 实现

```vue
<template>
  <div class="flex flex-wrap ">
    <div v-for="item in 1" :key="item" class="bg-purple-500 p-5 basis-[calc(50%-10px)] m-[5px] box-border">{{ item }}
    </div>
  </div>

  <hr>
  <div class="flex flex-wrap">
    <div v-for="item in 2" :key="item" class="bg-rose-500 p-5 basis-[calc(50%-10px)] m-[5px] box-border">{{ item }}</div>
  </div>

  <hr>
  <div class="flex flex-wrap">
    <div v-for="item in 3" :key="item" class="bg-indigo-500 p-5 basis-[calc(50%-10px)] m-[5px] box-border">{{ item }}
    </div>
  </div>
</template>

```
