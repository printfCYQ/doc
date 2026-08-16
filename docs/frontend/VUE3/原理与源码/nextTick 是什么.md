# nextTick 是什么

-   是用来获取更新后的dom内容的

```javascript
<script>
  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      increment() {
        this.count += 100
        console.log(this.$ref.btn.innerHtml) // 0
        
        this.nextTick(()=>{
          console.log(this.$ref.btn.innerHtml) // 100
        })
      }
    }
  }
</script>

<template>
    <button ref="btn" @click="increment">{{ count }}</button>
</template>
```
