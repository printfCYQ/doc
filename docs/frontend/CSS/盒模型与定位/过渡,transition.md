# 使用transition

```typescript
transition: property duration timing-function delay;
```

-   `transition-property` 指定CSS属性的name，transition效果。可以用逗号分隔。

-   `none` 默认，不发生效果
-   `all`
-   `width`
-   `border-radius`
-   `background-color`
-   ......
-   ⚠️ `display` 属性不可控

-   `transition-duration` 指定多少秒或毫秒才能完成

-   `0` 默认，不会发生效果。
-   `2s`

-   `transition-timing-function` 转速曲线

-   `linear`规定以相同速度开始至结束的过渡效果。
-   `ease`规定慢速开始，然后变快，然后慢速结束的过渡效果。
-   `ease-in`规定以慢速开始的过渡效果。
-   `ease-out`规定以慢速结束的过渡效果。
-   `ease-in-out`规定以慢速开始和结束的过渡效果。
-   `cubic-bezier(*n*,*n*,*n*,*n*)`可能的值是 0 至 1 之间的数值。
-   `setps(n)` 一秒多少帧刷新。

-   `transition-delay` 延迟几秒开始

-   `2s`

​  

> 合并写法

```css
transition: width 2s ease .5s;
```

> 多属性，分开写

```css
button {
  font-size: 20px;
  background-color: red;
  border none;
	padding:20px 40px;
  transition-property: background-color, border-radius;
  transition-duration: 0.5s, 0.5s;
  transition-timing-function: ease, linear;
  transition-delay: 1s, 2s;
}

button:hover {
  background-color: blue;
  border-radius: 20px;
  color: #fff;
}
```

# js 监听transition

```javascript
ele.addEventListener('transitionstart', function() {
  consloe.log('过渡开始')
})
ele.addEventListener('transitionrun', function() {
  consloe.log('过渡中')
})
ele.addEventListener('transitionend', function() {
  consloe.log('过渡结束')
})
```
