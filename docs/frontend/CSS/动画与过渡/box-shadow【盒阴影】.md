# box-shadow【盒阴影】

> `box-shadow` 属性用于在元素的框架上添加阴影效果。可以在同一个元素上设置多个阴影效果，并用逗号将他们分隔开。该属性可设置的值包括阴影的 X 轴偏移量、Y 轴偏移量、模糊半径、扩散半径和颜色。

```javascript
/* x 偏移量 | y 偏移量 | 阴影颜色 */
box-shadow: 60px -16px teal;

/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影颜色 */
box-shadow: 10px 5px 5px black;

/* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

/* 插页 (阴影向内) | x 偏移量 | y 偏移量 | 阴影颜色 */
box-shadow: inset 5em 1em gold;

/* 任意数量的阴影，以逗号分隔 */
box-shadow: 3px 3px red, -1em 0 0.4em olive;

/* 全局关键字 */
box-shadow: inherit;
box-shadow: initial;
box-shadow: unset;

```

-   当给出两个、三个或四个 &lt;length>值时。

-   如果只给出两个值，那么这两个值将会被当作 &lt;x 偏移量>&lt;y 偏移量> 来解释。
-   如果给出了第三个值，那么第三个值将会被当作&lt;阴影模糊半径>解释。
-   如果给出了第四个值，那么第四个值将会被当作&lt;阴影扩散半径>来解释。

-   可选，inset关键字。
-   可选，&lt;color>值。
