# SVG-stroke

```vue
<template>
  <div>
    <svg class="icon" width="200" height="200">
      <line class="line p" x1="0" y1="50%" x2="100%" y2="50%"></line>
    </svg>
  </div>
  <div>
    <svg class="icon" width="200" height="200">
      <circle class="circle p" cx="50%" cy="50%" r="30%"></circle>
    </svg>
  </div>
  <div>
    <svg class="icon" width="100" viewBox="0 0 24 24">
      <path class="path p" fill="none"
        d="M13 19V7.83l4.88 4.88c.39.39 1.03.39 1.42 0a.996.996 0 0 0 0-1.41l-6.59-6.59a.996.996 0 0 0-1.41 0l-6.6 6.58a.996.996 0 1 0 1.41 1.41L11 7.83V19c0 .55.45 1 1 1s1-.45 1-1z">
      </path>
    </svg>
  </div>
  <div>
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
      <path class="path p" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
        stroke-width="2" d="M3 8h7a3 3 0 1 0-3-3M4 16h11a3 3 0 1 1-3 3M2 12h17a3 3 0 1 0-3-3" />
    </svg>
  </div>
</template>

<script setup lang="ts">
  onMounted(() => {
    const elements: NodeListOf<Element> = document.querySelectorAll('.icon .p')
    const paths: SVGLineElement[] = Array.from(elements) as SVGLineElement[];
    paths.forEach(path => {
      // 循环取svg length 
      const len = path.getTotalLength()
      // +1 解决圆形会有缝隙问题
      path.style.setProperty('--l', (len + 1).toString())
    })
  })
</script>

<style scoped lang="scss">
  .icon {
    .line {
      stroke: #f40; // 描边
      stroke-width: 10; // 描边宽度
      stroke-dasharray: var(--l); // 虚线
      stroke-dashoffset: var(--l); // 虚线偏移量
      animation: stroke 2s forwards;
    }

    .circle {
      fill: none; // 不填充
      stroke: #f40; // 描边
      stroke-width: 10; // 描边宽度
      stroke-dasharray: var(--l); // 虚线
      stroke-dashoffset: var(--l); // 虚线偏移量
      stroke-linecap: round; // 线头圆角
      animation: stroke 2s forwards;
    }

    .path {
      stroke: #f40; // 描边
      stroke-width: 1; // 描边宽度
      stroke-dasharray: var(--l); // 虚线
      stroke-dashoffset: var(--l); // 虚线偏移量
      animation: stroke 2s forwards;
    }
  }

  @keyframes stroke {
    to {
      stroke-dashoffset: 0;
    }
  }
</style>
```
