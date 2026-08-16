# JS-改变鼠标样式和指向

```vue
<template>
  <div @mousemove="mouseMove" class="w-screen h-screen cursor-none">
    <div
      ref="point"
      class="w-[24px] h-[24px] m-l-[-12px] fixed pointer-events-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m3.165 19.503l7.362-16.51c.59-1.324 2.355-1.324 2.946 0l7.362 16.51c.667 1.495-.814 3.047-2.202 2.306l-5.904-3.152c-.459-.245-1-.245-1.458 0l-5.904 3.152c-1.388.74-2.87-.81-2.202-2.306"
        />
      </svg>
    </div>
    <div v-for="i in 20" :key="i">
      <button @click="clickItem(i)">{{ i }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const point = ref();
const rad = ref(0);

const mouseMove = (e: MouseEvent) => {
  const { clientX, clientY, movementX, movementY } = e;
  if (Math.abs(movementX) + Math.abs(movementY) >= 3) {
    rad.value = Math.atan2(movementX, -movementY);
  }
  point.value.style.transform = `translate(${clientX}px,${clientY}px) rotate(${rad.value}rad)`;
};

const clickItem = (i: number) => {
  console.log(i);
};
</script>

<style>
html {
  cursor: none;
}
</style>
```
