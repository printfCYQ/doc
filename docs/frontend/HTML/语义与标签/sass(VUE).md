# sass(VUE)

中文网：[https://www.sass.hk/](https://www.sass.hk/)

# 安装

```html
npm i sass
```
```html
npm i sass-loader
```

-   安装`sass-loader`可能报错

```html
npm uninstall sass-loader    //卸载当前的sass-loader版本
```
```html
npm i sass-loader@10
```

# 入门

## 1.变量

### 1-1.变量声明，引用

```html
<style lang="scss">
  $font-color: #000; // 声明

  #app {
  	color: $font-color; // 引用
  }
  div {
    color: $font_color; // 引用,下划线和中划线一样可以使用
  }
</style>
```

## 2\. 嵌套规则

```html
<style lang="scss">
html {
  color: red;

  .title {
    font-size: 12px;

    span {
      width: 100px;
    }
  }
}
</style>
```

### 2-1. 标识符&

`&`代表父选择器

---
```html
article a {
  color: blue;
  &:hover { color: red }
}
```

编辑后

```html
article a {
  color: blue;
}
article a:hover { 
	color: red 
}
```
---
```html
.content-box {
	color: red;
	
  &-title {
    font-size: 20px;
  }
}
```

编译后

```html
.content-box {
	color: red;
}
.content-box-title {
  font-size: 20px;
}
```

### 2-2. 群组选择器

-   群组选择器 的规则会对命中群组中任何一个选择器的元素生效。

```html
nav, aside {
  a {color: blue}
}
```
```html
nav a, aside a {color: blue}
```

### 2-3. >、+、~

-   `>`子组合选择器, 选择一个元素的直接子元素(孙子元素不会选择)
-   `+`同层相邻组合选择器 （紧挨着的元素）
-   `~`同层全体组合选择器 （所有符合的兄弟元素）

> 上边这三个组合选择器必须和其他选择器配合使用

```html
// 选择article下紧跟着的子元素中命中section选择器的元素。
article > section { border: 1px solid #ccc }
```
```html
// 选择header元素后紧跟的p元素
header + p { font-size: 1.1em }
```
```html
// 选择所有跟在article后的同层article元素
article ~ article { border-top: 1px dashed #ccc }
```

### 2-4. 嵌套属性

```html
nav {
  border: {
  style: solid;
  width: 1px;
  color: #ccc;
  }
}
```
```html
nav {
  border-style: solid;
  border-width: 1px;
  border-color: #ccc;
}
```
---
```html
nav {
  border: 1px solid #ccc {
  left: 0px;
  right: 0px;
  }
}
```
```html
nav {
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
}
```

## 3.导入SASS文件

-   @import 'xxxxx'

### 3-1. 使用SASS部分文件

### 3-2. 默认变量值

-   反复声明一个变量，只有最后一处声明有效且它会覆盖前边的值
-   !default 如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值。(会被覆盖)

### 3-3.嵌套导入

-   sass允许@import命令写在css规则内。

```html
.blue-theme {@import "blue-theme"}
```

编译后

```html
.blue-theme {
  xxx // 文件内的sass代码
}
```

### 3-4. 原生的CSS导入

## 4.静默注释

```html
body {
  color: #333; // 这种注释内容不会出现在生成的css文件中
  padding: 0; /* 这种注释内容会出现在生成的css文件中 */
}
```

## 5\. 混合器

-   混合器实现大段样式的重用
-   混合器使用@mixin标识符定义
-   @include来使用混合器

```html
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```
```html
.notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}
```
```html
.notice {
  background-color: green;
  border: 2px solid #00aa00;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```
---

### 5-1. 何时使用混合器

### 5-2. 混合器中的CSS规则

-   混合器中不仅可以包含属性，也可以包含css规则，包含选择器和选择器中的属性

```html
@mixin no-bullets {
  list-style: none;
  li {
    list-style-image: none;
    list-style-type: none;
    margin-left: 0px;
  }
}
```

### 5-3. 给混合器传参

```html
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```
```html
a {
  @include link-colors(blue, red, green);
}

//Sass最终生成的是：

a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }
```

-   $name 指定参数。（不用按顺序传参)

```html
a {
    @include link-colors(
      $normal: blue,
      $visited: green,
      $hover: red
  );
}
```

### 5-4. 默认参数值

```html
@mixin link-colors(
    $normal,
    $hover: $normal,
    $visited: $normal
  )
{
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```
```html
@include link-colors(red)
编辑后

{
	color: red;
  &:hover { color: red; }
  &:visited { color: red; }
}
```

# 6.选择器继承

-   `@extend` 一个选择器可以继承为另一个选择器定义的所有样式
-   不要在css规则中使用后代选择器 去继承css规则

```html
.title {
  color: red;
}

.content-box {
  @extend .title;
  font-size: 20px;

}
```
