# readonly

## reactive

> 用来绑定复杂的数据类型 例如 对象 数组

> 使用`reactive` 去修改值无须.value

### 基础用法

```vue
<script setup lang="ts">
  import { reactive } from 'vue'
  interface InfoType {
    name: string,
      age: number
  }
  const info = reactive<InfoType>({
    name: 'CYQ',
    age: 24
  })
  console.log(info);
  console.log(info.name);
</script>
```



### 数组赋值破坏响应式

> 数据发送变化。视图不自动刷新。破坏了数据的响应式

```vue
<template>
  <div>
    <div v-for="item in list">{{ item }}</div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
let list = reactive<number[]>([])

setTimeout(() => {
  list = [1, 2, 3]
  console.log(list);
}, 1000)
</script>
```

> 解决

> -   使用数组方法不会破坏响应式`list.push(...[1, 2, 3])`
> -   定义时，使用对象定义数据`obj.list = [1, 2, 3]`

# readonly

拷贝一份`proxy`对象将其设置为只读

```vue
<script setup lang="ts">
import { reactive, readonly } from 'vue'
const info = reactive({ count: 1 })
const copy = readonly(info)

//person.count++

copy.count++

</script>
```

> `copy`的值不可修改。
> 
> 修改`info`的值会使`copy`的值也变化

# shallowReactive

> shallowReactive只会包装第一层的数据
> 
> 默认情况它只能够监听数据的第一层。
> 
> 如果想更改多层的数据， 你必须先更改第一层的数据。
> 
> 然后在去更改其他层的数据。 这样视图上的数据才会发生变化。

```vue
<template>
  <div>
    <div>
      <div>{{ state }}</div>
      <button @click="func1">按钮</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { shallowReactive } from 'vue'
let state = shallowReactive({
  a: 'a',
  b: {
    bb: 'bb',
    c: 'cc'
  }
})
function func1() {
  state.a = '1' // 注释这行，数据更新，视图不更新
  state.b.c = '1'
  console.log(state);

}
</script>
```
