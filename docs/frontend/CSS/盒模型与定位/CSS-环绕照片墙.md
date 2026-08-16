# CSS-环绕照片墙

```vue
<template>
  <div class="content">
    <div ref="imgs" class="imgs">
      <img v-for="item in 10" :key="item" src="../../public/lol.png" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const imgs = ref();
  const rotateY = ref(0);
  // onMounted(() => {
  //   let timer = setInterval(() => {
  //     rotateY.value += 10;
  //     imgs.value.style.transform = `rotateY(${rotateY.value}deg)`;
  //   }, 300);
  // });
  onMounted(() => {
    let startTime: number | null = null;
    const duration = 30000; // 滑动的总时间，单位为毫秒
    const startY = 0; // 初始的 rotateY 值
    const endY = 360; // 结束的 rotateY 值

    const animate = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const elapsed = timestamp - startTime;
      const progress = elapsed / duration;
      rotateY.value = startY + (endY - startY) * progress;
      if (imgs.value) {
        imgs.value.style.transform = `rotateY(${rotateY.value}deg)`;
      }

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  });
</script>

<style scoped lang="scss">
  @use "sass:math";
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .content {
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    background: #000;
    perspective: 2000px;
  }

  .imgs {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.5s ease-out;
    img {
      position: absolute;
      $imgWidth: 300px;
      $imgHeight: 400px;
      width: $imgWidth;
      height: $imgHeight;
      left: 50%;
      top: 50%;
      margin-left: -$imgWidth / 2;
      margin-top: -$imgHeight / 2;
      $n: 10;
      $pDeg: 360deg / $n;
      $r: 500px;
      backface-visibility: hidden;
      opacity: 0.5;
      transition: 0.5s;
      &:hover {
        opacity: 1;
      }
      @for $i from 1 through $n {
        &:nth-child(#{$i}) {
        $deg: $pDeg * ($i - 1);
        $x: math.sin($deg) * $r;
        $z: math.cos($deg) * $r;
        transform: translate3d($x, 0, $z) rotateY(180deg + $deg);
      }
    }
  }
  }
</style>
```
