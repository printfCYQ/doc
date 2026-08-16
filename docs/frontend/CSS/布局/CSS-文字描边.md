# CSS-文字描边

```javascript
<template>
  <div
    class="w-screen h-screen bg-gradient-to-r from-[#C33764] to-[#1D2671] flex flex-col justify-between"
  >
    <div
      class="text-[80px] flex-1 flex items-center justify-center text-stroke1"
    >
      你好，世界 【text-shadow】
    </div>

    <div
      class="text-[80px] flex-1 flex items-center justify-center text-stroke2"
    >
      你好，世界【-webkit-text-stroke】
    </div>

    <div
      class="text-[80px] flex-1 flex items-center justify-center text-stroke3"
    >
      <p :data-content="txt">{{ txt }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const txt = ref("你好，世界 【-webkit-text-stroke + after】");
</script>

<style scoped lang="scss">
@mixin text-stroke($width: 1px, $color: #fff) {
  text-shadow: 0 -#{$width} #{$color}, #{$width} 0 #{$color},
    0 #{$width} #{$color}, -#{$width} 0 #{$color},
    -#{$width} -#{$width} #{$color}, #{$width} #{$width} #{$color},
    #{$width} -#{$width} #{$color}, -#{$width} #{$width} #{$color};
}
.text-stroke1 {
  @include text-stroke;
  // color: transparent; // text-shadow 1.不能设置文字透明 2.描边效果不圆滑
}

.text-stroke2 {
  -webkit-text-stroke: 2px #fff; // 效果圆滑 但是 会将原来的文字变细
  //  color: transparent; // 可以设置文字透明
}

.text-stroke3 {
  p {
    -webkit-text-stroke: 2px #fff;
    position: relative;

    // 解决变细
    &::after {
      content: attr(data-content);
      position: absolute;
      top: 0;
      left: 0;
      -webkit-text-stroke: 0;
    }
  }
}
</style>
```
