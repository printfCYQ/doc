# version

## version

-   公开 Vue 的当前版本。

```javascript
import { version } from 'vue'

console.log(version)
```

## nextTick()

-   用于等待下一次 DOM 更新刷新的实用程序。

```vue
<script>
  import { nextTick } from 'vue'
  
  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      async increment() {
        this.count++
        
        // DOM not yet updated
        console.log(document.getElementById('counter').textContent) // 0
        
        await nextTick()
        // DOM is now updated
        console.log(document.getElementById('counter').textContent) // 1
      }
    }
  }
</script>

<template>
    <button id="counter" @click="increment">{{ count }}</button>
</template>
```

## defineComponent()

-   用于定义具有类型推断的 Vue 组件的类型帮助程序。

```typescript
const Foo = defineComponent(/* ... */)

type FooInstance = InstanceType<typeof Foo>
```

## defineAsyncComponent()

-   定义一个异步组件，该组件仅在呈现时才延迟加载。该参数可以是加载程序函数，也可以是用于更高级地控制加载行为的选项对象。

## defineCustomElement()

-   此方法接受与 defineComponent 相同的参数，但返回本机 Custom Element 类构造函数。

```javascript
import { defineCustomElement } from 'vue'

const MyVueElement = defineCustomElement({
  /* component options */
})

// Register the custom element.
customElements.define('my-vue-element', MyVueElement)Ï
```
