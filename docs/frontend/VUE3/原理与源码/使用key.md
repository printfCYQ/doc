# 使用key

## 使用key

> 对于通过循环生成的列表，应给每个列表项一个稳定且唯一的ky,这有利于在列表变动时，尽量少的删
> 
> 除、新增、改动元素

## 使用冻结的对象

> 冻结的对象不会被响应式
> [(MDN)-Object.freeze](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

## 使用函数式组件

> [(Vue.js)-函数式组件](http://vue.dashgame.com/guide/migration/functional-components.html#)
```vue
<template functional>
	<h1> FunctionalComp: {{ props.count }} </h1>
</template>

<script>
  export default {
    functional: true,
    props: {
      count: Number
    }
  }
</script>
```

## 使用计算属性

> 如果模板中某个数据会使用多次，并且该数据是通过计算得到的，使用计算属性以缓存它们

## 非实时绑定的表单项

> ​当使用`v-model`绑定一个表单项时，当用户改变表单项的状态时，也会随之改变数据，
> 
> 从而导致`vue​`发生重渲染(`rerender`),这会带来一些性能的开销。
> 
> 我们可以通过使用`lazy`或不使用`v-model`的方式解决该问题，但要注意，这样可能会导致在某一个时间段内数据和表单项的值是不一致的。

## 保持对象引用稳定

> 在绝大部分情况下，vue触发rerender的时机是其依赖的数据发生变化
> 
> 若数据没有发生变化，哪怕给数据重新赋值了，vue也是不会做出任何处理的
> 
> 下面是vue判断数据没有变化的源码
```typescript
function hasChanged(x, y) {
  if (x === y) {
    return x === 0 && 1 / x !== 1 / y; // +0、-0情况
  } else {
    return x === x || y === y; // NaN的情况
  }
}
```
> 因此，如果需要，只要能保证组件的依赖数据不发生变化，组件就不会重新渲染。
> 
> 对于原始数据类型，保持其值不变即可
> 
> 对于对象类型，保持其引用不变即可
> 
> 另一方面来说，由于可以通过保持属性引用稳定来避免子组件的重渲染，那么我们应该细分组件来尽量避免多余的渲染

## 使用v-show替代v-if

> 对于频繁切换显示状态的元素，使用v-show可以保证虚拟dom树的稳定，避免频繁的新增和删除元素，特别是对于那些内部包含大量dom元素的节点，这一点极其重要
> 
> 关键字：频繁切换显示状态、内部包含大量dom元素

## 使用延迟装载（defer）

> JS传输完成后，浏览器开始执行JS构造页面。
> 
> 但可能一开始要渲染的组件太多，不仅JS执行的时间很长，而且执行完后浏览器要渲染的元素过多，从而导致页面白屏
> 
> 一个可行的办法就是延迟装载组件，让组件按照指定的先后顺序依次一个一个渲染出来
> 延迟装载是一个思路，本质上就是利用`requestAnimationFrame`事件分批渲染内容，它的具体实现多种多样

## 使用keep-alive

> 

## 长列表优化

> 

## 打包体积优化

>
