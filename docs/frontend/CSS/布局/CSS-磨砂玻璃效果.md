# CSS-磨砂玻璃效果

```vue
<template>
  <div>
    <div class="top-content">
      <div class="text">磨砂玻璃效果</div>
      <div class="modal">Card</div>
    </div>
    <div class="bottom-content">
      <div class="modal"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
  .top-content {
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: linear-gradient(#c0a5f3, #7f95f7);

    .text {
      color: white;
      font-size: 50px;
      font-weight: 700;
    }

    .modal {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      width: 180px;
      height: 130px;
      font-size: 30px;
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(3px);
    }
  }
  .bottom-content {
    height: 50vh;
    background: url("/public/lol.png") no-repeat center/cover;
    margin: 0;
    position: relative;

    .modal {
      position: absolute;
      width: 100%;
      height: 100%;
      right: 0;
      top: 0;
      transition: 2s;
      border-left: 5px solid #7f95f7;
      backdrop-filter: grayscale(1);
    }
    &:hover {
      .modal {
        width: 0;
      }
    }
  }
</style>
```
