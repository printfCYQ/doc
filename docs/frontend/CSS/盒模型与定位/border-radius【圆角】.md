# border-radius【圆角】

> 一般使用

-   `border-radius: 15px 50px 30px 5px;` `左上角，右上角，右下角，左下角`
-   `border-radius: 15px 50px 30px;` `左上角，右上角和左下角，右下角`
-   `border-radius: 15px 50px;` `左上角和右下角，右上角和左下角`
-   `border-radius: 15px;` `所有四个角`

> `border-radius:` `length` `percentage;`

-   `length`：定义圆形半径或椭圆的半长轴，半短轴。负值无效。
-   `percentage`：使用百分数定义圆形半径或椭圆的半长轴，半短轴。水平半轴相对于盒模型的宽度；垂直半轴相对于盒模型的高度。负值无效。

```javascript
border-radius: 1em/5em;

/* 等价于： */

border-top-left-radius:     1em 5em;
border-top-right-radius:    1em 5em;
border-bottom-right-radius: 1em 5em;
border-bottom-left-radius:  1em 5em;

// ---------------------------------

border-radius: 4px 3px 6px / 2px 4px;

/* 等价于： */

border-top-left-radius:     4px 2px;
border-top-right-radius:    3px 4px;
border-bottom-right-radius: 6px 2px;
border-bottom-left-radius:  3px 4px;
```
