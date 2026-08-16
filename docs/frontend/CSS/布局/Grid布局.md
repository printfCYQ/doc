# 基本概念

## 定义grid容器

```typescript
ele {
	display:grid;
}
```

## 定义gird轨道

```typescript
ele {
	display:grid;
  grid-template-rows: 100px 200px 300px;
  grid-template-columns: 100px 200px;
}
```

> 将`ele`元素内的子元素，两列、三行 排列。每行列的宽高按写的大小。

## fr 单位

```typescript
ele {
	display:grid;
  grid-template-rows: 1fr 2fr 3fr;
  grid-template-columns: 1fr 2fr;
}
```

> 单位大小，按比例分配。有些类似`flex:1`

## repeat 函数

```typescript
ele {
	display:grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: 1fr 2fr;
}

grid-template-rows: repeat(3, 1fr, 200px); // 生成6个元素
grid-template-rows: 200px, repeat(3, 1fr); // 生成4个元素
```

> 重复定义 比例

## 隐式、显式grid

> 我们使用 `**grid-template-columns**` 和 `**grid-template-rows**` 来构建我们的网格。根据我们对这俩个属性的设置所划分出来的区域就是 `**显式网格**`。

> 当网格元素的数量多于由我们自己设置的列轨道和行轨道划分出的网格单元数量时，网格容器就会 自动生成 具有 一定宽度或者高度（宽高值通常是根据放置其中的元素的宽高决定的） 的行轨道和列轨道（这些行轨道和列轨道会综合 已经设置好的网格来进行分行或者分列）来容纳这些多出来的网格元素，这些由网格容器自动生成的部分就是`**隐式网格**`。

-   显式网格属性：

-   `grid-template-rows`、 几行，高度
-   `grid-template-columns` 、 几列，宽度
-   `grid-template-areas`。

-   隐式网格属性：

-   `grid-auto-rows`、
-   `grid-auto-columns` 、
-   `grid-auto-flow`。

-   间距属性：

-   `grid-column-gap` 、
-   `grid-row-gap`。

## minmax函数

> 创建灵活的网格轨道
> 
> -   让网格轨道 **既有一个最小的宽度或者高度** 用来容纳当中的内容。当其中内容 **变多** 的时候，又可以 **变宽或者变高**。

```typescript
ele{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(100px, auto);
}
```

## grid单元、grid区域

> 每一项是一个单元----最小单位
> 
> 多个单元组成----区域

## grid间隙

> 两个单元的缝隙(不包含边缘)

```typescript
ele {
	display:grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: 1fr 2fr;
  grid-row-gap: 10px; //top bottom
  grid-column-gap: 20px; //left right
}

// 缩写
grid-gap: 10px 20px;
grid-gap: 10px;
```

# 定位

## 根据基线定位

> 每个区域都有线，从1开始

```typescript
ele {
  grid-row-start: 1;
  grid-row-end: 4;
  grid-column-start: 1;
  grid-column-end: 2;
}
// 占用了三行一列的区域
```

## start、end 缩写

> 当只占用一个单元格时，可以不设置`end`

```typescript
ele {
  grid-row-start: 1;
  grid-row-end: 4;
  grid-column-start: 1;
  grid-column-end: 2;
}
// ----------
ele {
  gird-row: 1 / 4;
  grid-column: 1 / 2;
}
```

## grid-area

`grid-area:``grid-row-start` / `grid-column-start` / `grid-row-end` / `grid-column-end`;

```typescript
ele {
  grid-area: 1 / 2 / 1 / 3;
}
```

## 反向计数

`-1`代表最后一条线。

```typescript
ele {
  grid-column: 1 / -1; // 铺满整行
}
```

## span 关键字

> 占用多少个轨道（单元格）

```typescript
ele {
  grid-area: 1 / span 2 / 1 / span 3;
}
```

# 模板区域

## 命名grid区域

```typescript
<div class="grid-container">
  <div class="item1">头部</div>
  <div class="item2">菜单</div>
  <div class="item3">主要内容区域</div>  
  <div class="item4">右侧</div>
  <div class="item5">底部</div>
</div>
<style>
.item1 { grid-area: header; }
.item2 { grid-area: menu; }
.item3 { grid-area: main; }
.item4 { grid-area: right; }
.item5 { grid-area: footer; }

.grid-container {
  display: grid;
  grid-template-areas:
  'header header header header header header'
  'menu main main main right right'
  'menu footer footer footer footer footer';
}
</style>
```



## 留白grid单元

> 只能在区域边缘使用 `.`

```typescript
.grid-container {
  display: grid;
  grid:
  'header header header header header header'
  'menu main main main right right'
  'menu footer footer footer . .';
}
```

## grid-template(...)

> grid-template: grid-template-rows / grid-template-columns;
> 
> grid-template: grid-template-areas

# 盒子模式对齐

## 块轴（y轴）对齐

> 父元素
> 
> -   ​`align-items`:

-   `end` 结束位置
-   `start` 开始位置
-   `stretch`填充满，默认
-   `center`中间
-   `baseline`基线

> 子元素
> 
> -   `align-self`:
> 
> -   `center`
> -   `end`
> -   `start`

## 文本轴（x轴）对齐

> 父元素
> 
> -   `justify-items`:
> 
> -   `stretch`默认
> -   `center`
> -   `start`
> -   `end`
> -   `baseline`

> 子元素
> 
> -   `justify-self`:
> 
> -   `center`
> -   `end`
> -   `start`

## 中心对齐

```typescript
// 父元素
justify-items: center;
align-items: center;

// 子元素
align-self: center;
justify-self: center;
```

## 块轴（y轴）分布

> 类似flex

`align-content`:

## 文本轴（x轴）分布

> 类似flex

`justify-content`:

## ​
