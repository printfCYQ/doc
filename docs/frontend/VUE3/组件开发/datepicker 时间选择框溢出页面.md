# datepicker 时间选择框溢出页面

## datepicker 时间选择框溢出页面



```vue
<template>
  <div class="container">
    <el-date-picker class="custom-datepicker" ref="picker" v-model="value" type="datetimerange" range-separator="至"
      start-placeholder="开始日期" @focus="focus" end-placeholder="结束日期" popper-class="my-pop-box">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: ''
      }
    },
    methods: {
      focus () {
        const input = document.querySelector('.my-pop-box input[placeholder="结束时间"]')
        if (input) {
          input.addEventListener('focus', () => {
            const panel = document.querySelectorAll('.el-time-panel')
            panel[1].__vue__.$el.style.left = '-33px'
          })
        }
      }
    }
  }
</script>
```



  

## datepicker datetime 两个时间选择框 disabled
