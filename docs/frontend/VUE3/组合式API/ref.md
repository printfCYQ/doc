# ref

接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象仅有一个 .value property，指向该内部值。

> `.value`才可以改变值。

```vue
<template>
  <div>
    <button @click="add">add</button>
    <div>{{ number }}</div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  let number = ref(0)
  const add = () => {
    number.value++
  }
</script>
```

# isRef

判断是不是一个ref对象

```vue
<template>
  <div>
    <button @click="add">change</button>
    <div>{{ number }}</div>
  </div>
</template>
 
<script setup lang="ts">
import { isRef, ref } from 'vue';
let number = ref(0)
let msg = 'message'
const add = () => {
  number.value++
  console.log(isRef(number)); // true
  console.log(isRef(msg)); // false
}
</script>
```

# shallowRef

如果只传递一个基本类型的值，用shalloRef和ref并没有什么区别。

`shallowRef`只处理了 value 的响应式, 不进行对象的 reactive 处理，也就是说如果传给 shallowRef 一个对象，这个对象的任何一层属性都不是响应式的。

```vue
<template>
  <div>
    {{ info }}
    <button @click="changeInfo">changeInfo</button>
  </div>
</template>

<script setup lang="ts">
import { Ref, shallowRef, } from 'vue';

let info: Ref = shallowRef({ name: 'cyq' })

const changeInfo = () => {
  info.value.name = 'CYQ'
}
</script>
// script里的info已经变了，但是页面上不变。
```
```vue
<template>
  <div>
    {{ info }}
    <button @click="changeInfo">changeInfo</button>
  </div>
</template>

<script setup lang="ts">
import { Ref, shallowRef, } from 'vue';

let info: Ref = shallowRef({ name: 'cyq' })

const changeInfo = () => {
  info.value = { name: 'CYQ' }
}
</script>
// 这样写页面也会变
```

# triggerRef

强制更新页面DOM

> ⚠️ `ref的页面更新也是因为触发了triggerRef`

```vue
<template>
  <div>
    {{ info }}
    <button @click="changeInfo">changeInfo</button>
  </div>
</template>

<script setup lang="ts">
import { Ref, shallowRef, triggerRef } from 'vue';

let info: Ref = shallowRef({ name: 'cyq' })

const changeInfo = () => {
  info.value.name = 'CYQ'
  triggerRef(info)
}
</script>
```

# customRef

自定义ref

`customRef`是个工厂函数要求我们返回一个对象 并且实现 `get` 和 `set`

```vue
<template>
  <div>
    {{ info }}
    <button @click="changeInfo">changeInfo</button>
  </div>
</template>

<script setup lang="ts">
import { customRef } from 'vue'
function useCustomRef(value: string, delay: number) {
  let timeout: number
  // 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。
  // 它需要一个工厂函数，该函数接收 track 和 trigger 函数作为参数，
  // 并且应该返回一个带有 get 和 set 的对象。
  return customRef((track, trigger) => {
    return {
      get() {
        console.log('get');
        track();
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue;
          console.log('set');
          trigger()
        }, delay)
      }
    }
  })
}
let info = useCustomRef('cyq', 1000)
const changeInfo = () => {
  info.value = 'CYQ'
}
</script>
```
