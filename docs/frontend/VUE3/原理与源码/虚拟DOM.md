# 虚拟DOM

```vue
<template>
  <div id="app" class="container">
    <h1>DOM</h1>
  </div>
</template>
```
```json
{
  tag:'div',
  props:{ id:'app', class:'container' },
	children: [
  	{ tag: 'h1', children:'DOM' }
	]
}
```

**虚拟 DOM** (Virtual Node)，简称 vnode。简单理解就是 **用JS对象来模拟 DOM 结构。**

原生 DOM，操作起来很消耗性能。通过diff算法操作虚拟DOM可以大大节省消耗。

> 源码：
> 
> -   [https://github.com/vuejs/core.git](https://github.com/vuejs/core.git) /packages/runtime-core/src/renderer.ts
> 
> -   【patchKeyedChildren】

# Diff算法

-   `diff算法`在Vue里叫做`pacth`。
-   通过新旧虚拟 DOM 对比(即 patch 过程)，找出最小变化的地方转为进行 DOM 操作。

  

---

[https://www.bilibili.com/video/BV1JR4y1R7Ln/?spm\_id\_from=333.337.search-card.all.click&vd\_source=abab9d7dbda0748f609013ac799c9002](https://www.bilibili.com/video/BV1JR4y1R7Ln/?spm_id_from=333.337.search-card.all.click&vd_source=abab9d7dbda0748f609013ac799c9002)

> 虚拟 DOM (Virtual Node)，简称 vnode。简单理解就是 用JS对象来模拟 DOM 结构。



> diff 算法的目的就是找出差异【比较两个JS对象的差异】



> updateChildren首尾指针法
> 
> ①依次比较，当比较成功后退出当前比较
> 
> ②渲染结果以newVnode为准
> 
> ③每次比较成功后start点和end点向中间靠拢
> 
> ④当新旧节点中有一个start点跑到end点右侧时终止比较
> 
> ⑤如果都匹配不到，则旧虚拟DOM key值去比对新虚拟DOM的key值，如果key相同则复用，并移动到新虚拟DOM的位置
