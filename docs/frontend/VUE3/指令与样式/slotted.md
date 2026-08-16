# slotted

## slotted

> VUE3-CSS 的新特性。
> 
> 插槽选择器。
> 
> 功能：在组件内修改插槽的样式。

```vue
<template>
  <div>
    我是插槽
    <slot></slot>
  </div>
</template>

<style scoped>
/*   直接写是不生效的 
  .a {
    color: red;
  } */
  :slotted(.a) {
    color: red
  }
</style>
```
```typescript
<template>
  <div>
      <A>
          <div class="a">我的颜色是什么</div>
      </A>
  </div>
</template>

<script lang="ts" setup>
import A from "./A.vue"
</script>
```

## global

> VUE3-CSS 的新特性。
> 
> 全局选择器。

> 全局的`div`的文字都是红色

```vue
<style lang="less" scoped>
:global(div) {
  color: red
}
</style>
```

## 动态 CSS

> 将`js`的变量使用到`CSS`中
> 
> -   字符串
> -   对象; **注意对象要加**`**''**`

```vue
<template>
  <div>
    <div class="a">aaaaa</div>
    <div class="b">bbbbb</div>
  </div>
</template>

<script lang="ts" setup>
const red = ref<string>('red')
const green = reactive({
  color: 'green'
})
</script>

<style lang="less" scoped>
.a {
  color: v-bind(red);
}

.b {
  color: v-bind('green.color');
}
</style>
```

## css module

> `React`风格
> 
> `&lt;style module>` 标签会被编译为 CSS Modules 并且将生成的 CSS 类作为 `$style` 对象的键暴露给组件

```vue
<template>
  <div>
    <div :class="$style.a">aaaaa</div>
    <div :class="[$style.a, $style.b]">bbbbb</div>
  </div>
</template>

<style lang="less" scoped module>
.a {
  color: red;
}

.b {
  background: green;
}
</style>
```

### 自定义名称

> `module="cyq"` 自定义名字替换`$style`。

```vue
<template>
  <div>
    <div :class="cyq.a">aaaaa</div>
    <div :class="[cyq.a, cyq.b]">bbbbb</div>
  </div>
</template>

<style lang="less" scoped module="cyq">
.a {
  color: red;
}

.b {
  background: green;
}
</style>
```

### useCssModule - 没理解（缺少使用场景）

> 注入的类可以通过 useCssModule API 在 setup() 和 &lt;script setup> 中使用。对于使用了自定义注入名称的 &lt;style module> 模块，useCssModule 接收一个对应的 module attribute 值作为第一个参数。

> 使用场景一般用于TSX 和 render 函数 居多。

```vue
<template>
  <div>
    <div :class="cyq.a">aaaaa</div>
    <div :class="[cyq.a, cyq.b]">bbbbb</div>
  </div>
</template>
<script lang="ts" setup>
import { useCssModule } from 'vue'
const css = useCssModule('cyq')
console.log(css);
</script>

<style lang="less" scoped module="cyq">
.a {
  color: red;
}

.b {
  background: green;
}
</style>
```
