# border-image【边界图片】

> **在元素的边框上绘制图像。**

> `border-image`: `source` `slice` `width` `outset` `repeat;`

```javascript
border-image-source: none; // 用于声明元素的边框图片（border-image）的资源
border-image-slice: 100%; // 将使用 border-image-source 引用的图像划分为多个区域
border-image-width: 1; // 指定边界图像 (border-image) 的宽度
border-image-outset: 0; // 定义边框图像可超出边框盒的大小。
border-image-repeat: stretch; // 定义图片如何填充边框。或为单个值，设置所有的边框；或为两个值，分别设置水平与垂直的边框。
```
```javascript
border-image: url("/images/border.png") 30 30 repeat;
```
```javascript
border-image: linear-gradient(red, yellow) 10;
```
