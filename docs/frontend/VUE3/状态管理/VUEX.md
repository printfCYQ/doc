# VUEX

> Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

```vue
npm install vuex@next --save
```

## 规则

> 1.  应用层级的状态应该集中到单个 store 对象中。
> 2.  提交 **mutation** 是更改状态的唯一方法，并且这个过程是同步的。
> 3.  异步逻辑都应该封装到 **action** 里面。

## 代码

-   **ChildA.vue (**dispatch触发actions**)**

```vue
<template>
  <div class="child-a">
    <p>ChildA:{{count}}</p>
    <button @click="handleClick(10)">ChildA-Add</button>
  </div>
</template>

<script>
export default {
  name: 'ChildA',
  data () {
    return {
      //count: 0
    }
  },
  computed: {
    count: function(){
      return this.$store.state.count
    }
  },
  methods: {
    handleClick:function(num){
    //通过dispatch触发actions中的方法countAdd，actions提交mutations，num是携带的参数
      this.$store.dispatch('countAdd',num)
    }
  }
}
</script>
```

-   **ChildB.vue (**commit触发actions**)**

```vue
<template>
  <div class="child-b">
      <p>ChildB:{{count}}</p>
      <button>ChildB-Add</button>
  </div>
</template>

<script>
export default {
  name: 'ChildB',
  data () {
    return {
      //count: 0
    }
  },
  computed: {
      count(){
          return this.$store.state.count
      }
  }
}
</script>
```

-   **Parent.vue**

```vue
<template>
  <div class="parent">
      <child-a></child-a>
      <child-b></child-b>
  </div>
</template>

<script>
import ChildA from './ChildA'
import ChildB from './ChildB'
export default {
  name: 'Parent',
  data () {
    return {}
  },
  components: {
      ChildA,
      ChildB
  }
}
</script>

```

-   **store/index.js**

```javascript
import Vue from 'vue'
import Vuex from 'vuex'

//使用vuex
Vue.use(Vuex)

//导出store
export default new Vuex.Store({
    state: {
        count: 0
    },
    //组件通过dispatch方法触发actions里面的countAdd方法，然后actions提交mutations里面的			countAdd方法。
    actions: {
    //接收组件传过来的参数num，Action 函数接受一个与 store 实例具有相同方法和属性的 						context 对象
        countAdd(context,num){
            context.commit(' ',num)
        }
    },
    mutations: {
    //传入一个state对象，接收传过来的参数num
        countAdd(state,num){
            state.count+=num
        }
    }
})
import Vue from 'vue'
import Vuex from 'vuex'

//使用vuex
Vue.use(Vuex)

//导出store
export default new Vuex.Store({
  //将数据定义在state里面，state是一个对象
  state: {
    count: 0
  }
})
```

### 展开运算符简化代码

```vue
<template>
<div class="child-a">
  //使用新的countA
  <p>ChildA:{{countA}}</p>
  <button @click="handleClick(10)">ChildA-Add</button>
  </div>
</template>

<script>
  //要想使用展开运算符，就要先引入
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'ChildA',
    data () {
      return {
      }
    },
    computed: {
      //通过mapState获得state里面的count，并赋值给countA
      ...mapState({
        countA: 'count'
      })
    },
    methods: {
      handleClick:function(num){
        //this.$store.commit('countAdd',num)
        this.countAdd(num)
      },
      //通过展开运算符提交mutations里面的方法countAdd
      ...mapMutations(['countAdd'])
    }
  }
</script>
```
