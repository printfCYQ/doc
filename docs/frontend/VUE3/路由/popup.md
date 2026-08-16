# popup

```vue
<template>
  <view class="container" v-show="visible" @touchmove.stop.prevent="() => {}">
    <view class="mask" @click.stop="clickMask" @touchmove.stop.prevent="touchMask"></view>
    <view v-if="showMask" class="popup" id="popup" :style="{
      height:inMinPopupHeight + 'px'
      }">
      <view class="darg" @touchstart="touchstart" @touchmove.stop.prevent="touchmove" @touchend="touchend"
        @click.stop.prevent="clickToggle">
        <view class="darg-icon" :class="isMove ? 'is-move':''">
        </view>
      </view>
      <slot></slot>
    </view>
  </view>
</template>

<script>
  export default {
    name: "Popup",
    data: function() {
      return {
        isMove: false,
        windowHeight: 0,
        inMinPopupHeight: 0,
        inMaxPopupHeight: 0,
      }
    },
    props: {
      minPopupHeight: {
        default: 400,
        type: Number
      },
      maxPopupHeight: {
        default: 700,
        type: Number
      },
      visible: {
        type: Boolean,
        required: true
      },
      showMask: {
        type: Boolean,
        default: true
      },
      closeOnClickVisible: {
        type: Boolean,
        default: true
      },
      clickToChange: {
        type: Boolean,
        default: false
      }
    },
    model: {
      prop: 'visible',
    },
    mounted() {
      const sys = uni.getSystemInfoSync();
      console.log(sys);
      this.windowHeight = sys.windowHeight; // 窗口高度
      this.statusBarHeight = sys.statusBarHeight; // 导航栏高度
      this.inMinPopupHeight = this.minPopupHeight
      this.inMaxPopupHeight = this.inMinPopupHeight
    },
    methods: {
      // 点击遮罩
      clickMask(e) {
        if (this.closeOnClickVisible && e.target.id !== 'popup') {
          this.$emit('input', false)
        }
      },
      clickToggle() {
        if (!this.clickToChange) return false;
        if (this.inMinPopupHeight === this.minPopupHeight) {
          this.inMinPopupHeight = this.maxPopupHeight
        } else {
          this.inMinPopupHeight = this.minPopupHeight
        }
      },
      touchMask() {
        console.log('touchMask');
      },
      touchstart(e) {
        console.log(e);
        this.isMove = true;
      },
      touchmove(e) {
        if (e.touches[0].clientY < this.statusBarHeight) {
          return false
        }
        if (e.touches[0].clientY > this.windowHeight) {
          return false
        }
        this.inMinPopupHeight = this.windowHeight - e.touches[0].clientY
      },
      touchend(e) {
        this.isMove = false;
        if (this.inMinPopupHeight > (this.minPopupHeight + this.maxPopupHeight) / 2) {
          this.inMinPopupHeight = this.maxPopupHeight
        } else {
          this.inMinPopupHeight = this.minPopupHeight
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    z-index: 999;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    bottom: 0;

    .mask {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      position: fixed;
      top: 0;
      bottom: 0;
      z-index: 40;
    }

    .popup {
      position: fixed;
      bottom: 0;
      width: 100%;
      border-radius: 30px 30px 0 0;
      background-color: #fff;
      padding: 0 10px 10px 10px;
      box-sizing: border-box;
      transition: all ease-in-out;
      z-index: 50;

      .darg {
        display: flex;
        justify-content: center;
        height: 10px;
        padding: 10px 0;

        .darg-icon {
          width: 50px;
          height: 5px;
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          cursor: pointer;
        }

        .darg-icon.is-move {
          background-color: rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
</style>

```
```html
<Popup v-model="visible" :closeOnClickVisible="true">
  <view class="">
    <h1>哈哈哈</h1>
  </view>
</Popup>
```
