# display属性、盒模型

> [display-菜鸟教程](https://www.runoob.com/cssref/pr-class-display.html)

| none | 此元素不会被显示。 |
| --- | --- |
| block | 此元素将显示为块级元素，此元素前后会带有换行符。 |
| inline | 默认。此元素会被显示为内联元素，元素前后没有换行符。 |
| inline-block | 行内块元素。 |
| list-item | 此元素会作为列表显示。 |
| ...... |  |
| flex | Flex布局 |
| inline-flex | 行内元素Flex布局 |
| gird | 网格布局 |
| inline-grid |  |

-   list-item



  

---

> 盒模型
> 
> -   **Margin(外边距)** - 清除边框外的区域，外边距是透明的。
> -   **Border(边框)** - 围绕在内边距和内容外的边框。
> -   **Padding(内边距)** - 清除内容周围的区域，内边距是透明的。
> -   **Content(内容)** - 盒子的内容，显示文本和图像。
> 
> [MDN(什么是盒模型)](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model#什么是_css_盒模型？)
> 
> ​  

```css
margin: 10px;
padding: 10px;
border: 10px solid red;
width: 300px;
height: 300px;
/* box-sizing: content-box; */
/* box-sizing: border-box; */
```

> 标准盒模型
> 
> -   `box-sizing: content-box;`
> -   
> 
> -   在标准模型中，如果你给盒设置 width 和 height，实际设置的是 *content box*。padding 和 border 再加上设置的宽高一起决定整个盒子的大小。

> **备注：** ***margin 不计入实际大小 —— 当然，它会影响盒子在页面所占空间，但是影响的是盒子外部空间。盒子的范围到边框为止 —— 不会延伸到 margin。***

  

> IE盒模型（怪异盒模型）
> 
> -   `box-sizing: border-box;`
> -   
> 
> -   所有宽度都是可见宽度，所以内容宽度是该宽度减去边框和填充部分。

  

  

---

  

-   设置行内元素的高宽：在标准模式下，给行内元素设置width和height都不会生效，而在怪异模式下会生效
-   用margin：0 auto设置水平居中:在标准模式下，设置margin：0 auto；可以使元素水平居中，但是在怪异模式下失效
-   设置百分比高度:在标准模式下，元素的高度是由包含的内容决定的，如果父元素没有设置百分比的高度，子元素设置百分比的高度是无效的
