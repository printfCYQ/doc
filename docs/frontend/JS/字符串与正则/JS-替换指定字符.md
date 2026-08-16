# JS-替换指定字符

```vue
<template>
  <div>
    <div v-html="str"></div>
  </div>
</template>

<script setup lang="ts">
  const str = ref<string>('您有GB1232342323423什么什么GB1232342323423的“贯标启动”任务“贯标启动”任务')
  const reg1 = /(GB)\d+/g;
  const reg2 = /(?<=“)[^“]*(?=”)/g;
  const changeWordColor = (target: string, reg: any, color: string = 'red') =>
    target.replace(reg, (match) => `<span style="color:${color}">${match}</span>`)

  str.value = changeWordColor(str.value, reg1)
  str.value = changeWordColor(str.value, reg2, 'green')
</script>
```
