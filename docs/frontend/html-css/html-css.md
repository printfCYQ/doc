# HTML 与 CSS 学习笔记（新手版）

这份笔记写给第一次写网页的人。很多人一上来就被一堆标签和样式劝退，其实 HTML 和 CSS 是前端里最直观的两块——你写的每一行，浏览器里都能立刻看到变化。

怎么理解它们的关系：把网页想成一套房子。**HTML 是毛坯房的结构**（哪面是墙、哪间是卧室），**CSS 是装修**（刷什么漆、家具怎么摆），JavaScript 是电器开关（点击、交互）。先搞定结构和装修，交互以后再说。

建议边写边看：每写一段，就在浏览器里打开看效果，比看十遍都记得住。

---

## 0. 先准备工具

不用装复杂的开发环境：

- **浏览器**：Chrome 或 Edge，用来预览页面、按 F12 打开开发者工具。
- **编辑器**：VS Code（免费），装个插件 Live Server，改完保存自动刷新预览。
- **零安装方案**：去 CodePen 或掘金在线编辑器，浏览器里直接写，适合先找手感。

一个网页本质就是若干个 `.html` 文件（结构）+ `.css` 文件（样式）。哪怕你只新建一个 `index.html`，用浏览器双击打开，就是一个网页。

---

## 1. 第一个网页

新建一个文件 `index.html`，把下面这段粘进去，用浏览器打开：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>我的第一个网页</title>
</head>
<body>
  <h1>你好，世界</h1>
  <p>这是我的第一个网页。</p>
</body>
</html>
```

能看到标题和一行字，就说明跑通了。逐行看这段代码在干嘛：

- `<!DOCTYPE html>`：告诉浏览器"这是 HTML5"。
- `<html lang="zh-CN">`：整个页面的最外层，`lang` 标注语言，对无障碍和搜索引擎有用。
- `<head>`：放"给浏览器看"的信息，用户看不到，比如编码、标题。
- `<meta charset="UTF-8">`：用 UTF-8 编码，中文才不会乱码。
- `<meta name="viewport" ...>`：让页面在手机上按设备宽度显示，做响应式必备。
- `<title>`：浏览器标签页上显示的标题。
- `<body>`：放"用户能看到"的内容。

> 注：HTML 标签通常成对出现，如 `<body>...</body>`，开头叫开始标签，结尾带斜杠的叫结束标签。少数标签是自闭合的，比如 `<img>`、`<br>`、`<meta>`。

---

## 2. 常用标签：把内容排进页面

### 2.1 文字相关

```html
<h1>一级标题</h1>      <!-- 一个页面通常只有一个 h1，最重要 -->
<h2>二级标题</h2>      <!-- h1~h6 字号递减 -->
<p>这是一个段落，文字会在这里换行排版。</p>
<br>                  <!-- 强制换行 -->
<hr>                  <!-- 一条水平分隔线 -->
<strong>加粗</strong>
<em>斜体</em>
<del>删除线</del>
<mark>高亮</mark>
<code>一行代码</code>
```

### 2.2 链接和图片

```html
<!-- 链接：href 是目标地址，target="_blank" 新标签页打开 -->
<a href="https://www.baidu.com" target="_blank">去百度</a>

<!-- 图片：src 是路径，alt 是图片加载失败时的替代文字（也利于无障碍） -->
<img src="cat.jpg" alt="一只猫" width="200">
```

### 2.3 列表

```html
<!-- 无序列表 -->
<ul>
  <li>苹果</li>
  <li>香蕉</li>
</ul>

<!-- 有序列表 -->
<ol>
  <li>第一步</li>
  <li>第二步</li>
</ol>
```

### 2.4 表格

```html
<table border="1">
  <thead>
    <tr><th>姓名</th><th>年龄</th></tr>
  </thead>
  <tbody>
    <tr><td>小明</td><td>18</td></tr>
    <tr><td>小红</td><td>20</td></tr>
  </tbody>
</table>
```

`thead` 是表头、`tbody` 是表体、`tr` 是一行、`th`/`td` 是单元格（`th` 默认加粗居中）。

### 2.5 块级元素和行内元素

这是理解布局的前提：

- **块级元素**（如 `<div>`、`<p>`、`<h1>`、`<ul>`）：独占一行，前后会换行，能设宽高。
- **行内元素**（如 `<span>`、`<a>`、`<img>`、`<strong>`）：在一行里并排，宽高由内容决定，设宽高通常无效。

`<div>` 是最常用的"容器"，用来把一堆内容打包；`<span>` 用来给行内文字局部加样式。

练一把：新建页面，写一个 `<h1>` 标题、两段 `<p>`、一个无序列表、一张图片，浏览器里看排版。

---

## 3. 语义化标签：别只用 div

新手最容易把所有结构都用 `<div>` 堆出来，像这样：

```html
<div class="header">...</div>
<div class="nav">...</div>
<div class="main">...</div>
<div class="footer">...</div>
```

这样能跑，但 HTML5 提供了一批"有名字"的标签，让结构自己会说话：

```html
<header>页眉</header>
<nav>导航</nav>
<main>主要内容</main>
<section>一个内容区块</section>
<article>一篇独立文章</article>
<aside>侧边栏</aside>
<footer>页脚</footer>
```

用它们的好处：代码好读、搜索引擎更懂页面、屏幕阅读器对残障用户更友好。能用语义标签的地方就别用 div。

---

## 4. 表单：让网页能"收东西"

表单是网页和用户打交道的入口（登录、注册、搜索都靠它）。

```html
<form action="/submit" method="post">
  <label for="user">用户名：</label>
  <input type="text" id="user" name="user" placeholder="请输入用户名" required>

  <label for="pwd">密码：</label>
  <input type="password" id="pwd" name="pwd" required>

  <label>性别：</label>
  <input type="radio" name="gender" value="male" checked> 男
  <input type="radio" name="gender" value="female"> 女

  <label>爱好：</label>
  <input type="checkbox" name="hobby" value="code"> 代码
  <input type="checkbox" name="hobby" value="music"> 音乐

  <label for="city">城市：</label>
  <select id="city" name="city">
    <option value="bj">北京</option>
    <option value="sh">上海</option>
  </select>

  <label for="bio">简介：</label>
  <textarea id="bio" name="bio" rows="3"></textarea>

  <input type="file" name="avatar">
  <button type="submit">提交</button>
</form>
```

`input` 的 `type` 决定它是哪种输入框：`text` / `password` / `email` / `number` / `radio`（单选）/ `checkbox`（多选）/ `date` / `file` / `submit`。常用属性：`name`（提交时的字段名）、`placeholder`（占位提示）、`required`（必填）、`value`（默认值）、`disabled`（禁用）。

`<label for="user">` 的 `for` 要和 `input` 的 `id` 对应，点了文字就能聚焦输入框，体验更好。

练一把：写一个登录表单，含用户名、密码、一个"记住我"复选框、提交按钮。

---

## 5. 全局属性

所有标签都能用的属性：

- `class`：给元素起个类名，CSS 和 JS 靠它选中元素（可重复）。
- `id`：唯一标识，一个页面里不能重复，常用来做锚点跳转或 JS 定位。
- `style`：内联写样式（应急用，一般不推荐，样式应放 CSS）。
- `title`：鼠标悬停显示的提示文字。
- `data-*`：自定义数据，比如 `data-id="123"`，JS 方便读取。

---

## 6. CSS 入门：样式写在哪里

CSS 负责"长什么样"。有三种写法，从差到好：

```html
<!-- 1. 内联：直接写在标签上，最不推荐，难维护 -->
<p style="color: red;">红字</p>

<!-- 2. 内部样式表：写在 <head> 的 <style> 里 -->
<style>
  p { color: blue; }
</style>

<!-- 3. 外部样式表：单独建 style.css，用 <link> 引入（推荐） -->
<link rel="stylesheet" href="style.css">
```

实际项目一律用第 3 种：结构和样式分离，改样式不用动 HTML。

---

## 7. 选择器：CSS 怎么找到要修饰的元素

选择器就是"你要给谁加样式"。常用的：

```css
p { }                 /* 元素选择器：所有 <p> */
.box { }              /* 类选择器：class="box" 的元素 */
#header { }           /* ID 选择器：id="header" 的元素 */
div p { }             /* 后代选择器：div 里所有 p（不论几层） */
div > p { }           /* 子选择器：div 的直接子级 p */
a:hover { }           /* 伪类：鼠标悬停时的 a */
li:first-child { }    /* 伪类：第一个 li */
p::before { }         /* 伪元素：在 p 前面插入内容 */
input[type="text"] { }/* 属性选择器：type 为 text 的 input */
* { }                 /* 通用选择器：所有元素（慎用） */
```

**优先级**（谁说了算）：`!important` > 内联 style > ID > 类/属性/伪类 > 元素 > 通用。同级别时，后写的覆盖先写的。新手常被"样式不生效"搞崩，多半是优先级被更高权重的规则盖住了——可以用开发者工具看哪条样式被划了删除线。

练一把：写一个 `<ul>`，让奇数项红色、偶数项蓝色（提示：`li:nth-child(odd)` / `nth-child(even)`）。

---

## 8. 盒模型：理解布局的基石

CSS 里每个元素都是一个"盒子"，从内到外分四层：

```
内容 content（文字/图片）
 padding 内边距（内容和边框之间的空隙）
 border 边框
 margin 外边距（盒子和其他盒子的距离）
```

默认情况下，`width` 只算 content，加 padding 和 border 后盒子实际更宽，排版容易算错。解决办法是全局设：

```css
* { box-sizing: border-box; }
```

设了 `border-box` 之后，`width` 就包含 content + padding + border，盒子总宽就是你写的 width，好算太多。这行几乎是所有项目的标配，建议每个 CSS 文件开头都写。

```css
.box {
  width: 200px;
  padding: 20px;
  border: 2px solid #333;
  margin: 10px;
}
```

练一把：画两个并排的盒子，给不同背景色，调 padding/margin 观察间距变化。

---

## 9. 布局（核心实战）

### 9.1 正常文档流

不加任何布局属性时，块级元素从上往下竖着排，行内元素从左到右横着排，排满换行。这就是"文档流"。大部分布局是在这个基础上调整。

### 9.2 Flex 布局（最常用）

Flex 用来做"一维"布局（一排或一列）。给容器加 `display: flex`，它的直接子元素就变成 flex 项，可以灵活排列：

```css
.container {
  display: flex;
  flex-direction: row;          /* 主轴方向：row 横排 / column 竖排 */
  justify-content: center;      /* 主轴对齐：flex-start/center/space-between/space-around */
  align-items: center;          /* 交叉轴对齐：stretch/flex-start/center */
  flex-wrap: wrap;              /* 放不下时换行 */
  gap: 16px;                    /* 子项之间的间距（推荐，替代 margin） */
}
```

子项也能单独控制：

```css
.item {
  flex: 1;            /* 按比例占满剩余空间，比如三个 item 都 flex:1 就三等分 */
  align-self: flex-end; /* 自己单独在交叉轴底部对齐 */
}
```

经典例子——水平垂直居中：

```css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
```

### 9.3 Grid 布局（二维，做网格）

Flex 适合"一排"，Grid 适合"表格一样的行列"。

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;  /* 三列等宽，fr 是剩余空间比例 */
  gap: 16px;
}
/* 也可以混：第一列固定 200px，后面自适应 */
.grid2 {
  display: grid;
  grid-template-columns: 200px 1fr;
}
```

`1fr` 表示"占一份剩余空间"，`200px 1fr` 就是左边固定 200、右边填满。做两栏/三栏页面很方便。

### 9.4 position 定位

```css
.position-relative { position: relative; }  /* 相对自己原位置偏移，不脱离文档流 */
.position-absolute { position: absolute; }  /* 相对最近的定位祖先偏移，脱离文档流 */
.position-fixed { position: fixed; }         /* 相对视口，滚动也不动（如返回顶部按钮） */
.position-sticky { position: sticky; }       /* 滚到某位置后"粘"住（如吸顶导航） */
```

`absolute` 常用来做遮罩层、下拉菜单，记得给它一个 `relative` 的父元素当参照。

### 9.5 float（了解即可）

早年用 `float` 做布局，现在基本被 flex/grid 取代。看到老代码里的 `float: left` 知道它是"让元素靠左浮动、文字环绕"即可，新项目不建议用。

---

## 10. 常用样式速查

```css
/* 颜色：颜色名 / 十六进制 / rgb / hsl */
color: red;
color: #ff0000;
color: rgb(255, 0, 0);
color: hsl(0, 100%, 50%);

/* 字体 */
font-family: "Microsoft YaHei", sans-serif;
font-size: 16px;
font-weight: bold;        /* normal / bold */
line-height: 1.5;         /* 行高，1.5 倍字号，正文易读 */

/* 文本 */
text-align: center;       /* 左右居中 */
text-decoration: none;    /* 去掉链接下划线 */
text-indent: 2em;         /* 首行缩进 */

/* 单位：px 绝对；em 相对父字体；rem 相对根字体(html)；% 相对父；vw/vh 相对视口 */
width: 50%;               /* 父元素的一半宽 */
height: 100vh;            /* 一屏高 */

/* 背景 */
background-color: #f5f5f5;
background-image: linear-gradient(to right, red, blue);  /* 渐变 */

/* 圆角、阴影、边框 */
border-radius: 8px;       /* 圆角，50% 变圆 */
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
border: 1px solid #ddd;
```

`rem` 比 `em` 好控：都相对字体大小，但 `em` 会层层叠加，`rem` 永远相对根元素，做响应式字号更稳。

---

## 11. 响应式：让页面在手机上也好看

手机屏窄，直接套用电脑布局会挤成一团。响应式就是"根据屏幕宽度用不同样式"。

第一步，HTML 里必须有（前面提过）：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

第二步，用媒体查询：

```css
/* 屏幕宽度小于 600px 时，生效 */
@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;  /* 三列变单列 */
  }
  .sidebar { display: none; }    /* 窄屏隐藏侧边栏 */
}
```

习惯叫"移动优先"：先写手机样式，再用 `min-width` 往大屏加。Flex 和 Grid 本身也很擅长自适应（比如 `flex-wrap` 让项目自动换行），很多时候不用写媒体查询就能凑合。

---

## 12. 过渡与动画

让交互更顺滑：

```css
/* 过渡：属性变化时有动画过程 */
.btn {
  background: blue;
  transition: background 0.3s;
}
.btn:hover {
  background: red;   /* 鼠标移上去，0.3 秒内从蓝变红 */
}

/* 动画：用关键帧定义一段过程 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.loader {
  animation: spin 1s linear infinite;  /* 一直转 */
}
```

`transform` 还能做位移、缩放、倾斜，性能好（不走重排），做动效优先用它。

---

## 13. CSS 变量：统一管理重复值

颜色、间距这种重复使用的值，写成变量，改一处全生效：

```css
:root {
  --primary: #409eff;     /* 主题色 */
  --space: 16px;
}
.btn {
  background: var(--primary);
  padding: var(--space);
}
```

做"换主题"就靠这个：把 `--primary` 换成别的色，全站跟着变。

---

## 14. 新手最常踩的坑

- **图片底部有缝隙**：`<img>` 是行内元素，底部会留一点空隙。给它 `display: block` 或父级 `line-height: 0` 解决。
- **margin 合并**：上下相邻的两个块级元素，margin 会"取大的那个"而不是相加。用 padding 或隔一个父容器解决。
- **子元素 float 后父容器高度塌陷**：现代布局用 flex/grid 就不踩这个坑了。
- **`height: 100%` 不生效**：父元素没给定高度时，百分比高度算不出来。用 `100vh` 或给父级明确高度。
- **`margin: 0 auto` 不居中**：只对"有固定宽度的块级元素"生效，行内元素或没设宽度的块级元素用不了。
- **文本不换行撑破容器**：长单词/链接用 `word-break: break-all`；溢出省略号用 `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`（三件套）。

**居中大全**：
- 水平居中文字：`text-align: center`
- 水平居中块级：`margin: 0 auto` + 定宽
- 水平垂直居中：`display: flex; justify-content: center; align-items: center`

---

## 15. 实战：写一个个人主页

把前面知识串起来，做一个简单主页：

1. `<header>` 放站点名，`<nav>` 放几个导航链接。
2. `<main>` 里用 Grid 做"侧边栏 + 内容区"两栏，内容区里用 Flex 排几张卡片。
3. `<footer>` 放版权信息。
4. 给链接加 `:hover` 变色过渡，卡片加圆角和阴影。
5. 加媒体查询：屏宽小于 600px 时两栏变单列。
6. 用 CSS 变量统一主题色。

写出来大概是这样（节选）：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>我的主页</title>
  <style>
    :root { --primary: #409eff; --space: 16px; }
    * { box-sizing: border-box; margin: 0; }
    body { font-family: sans-serif; }
    header { background: var(--primary); color: #fff; padding: var(--space); }
    nav a { color: #fff; margin-right: var(--space); text-decoration: none; }
    .layout { display: grid; grid-template-columns: 200px 1fr; gap: var(--space); padding: var(--space); }
    .card { border: 1px solid #ddd; border-radius: 8px; padding: var(--space); }
    @media (max-width: 600px) {
      .layout { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <header>
    <h1>我的主页</h1>
    <nav><a href="#">首页</a><a href="#">文章</a><a href="#">关于</a></nav>
  </header>
  <div class="layout">
    <aside>侧边栏</aside>
    <main>
      <div class="card">文章卡片 1</div>
      <div class="card">文章卡片 2</div>
    </main>
  </div>
</body>
</html>
```

---

## 16. 新手最常问的 10 个问题

**Q1：HTML、CSS、JavaScript 有什么区别？**
HTML 管结构（有什么），CSS 管样式（长什么样），JavaScript 管行为（能干什么，比如点击、动态改内容）。

**Q2：class 和 id 有什么区别？**
class 可以多处复用，id 全页面唯一。样式一般用语义化的 class，id 留给 JS 定位或锚点。

**Q3：px、em、rem 怎么选？**
px 是绝对像素，简单直接；em 相对父字体（会叠加，易乱）；rem 相对根字体，做整体字号缩放最稳。正文建议用 rem。

**Q4：为什么用了 flex 还是不居中？**
只设 `justify-content: center` 只能水平居中，垂直还要 `align-items: center`，而且容器得有高度（比如 `height: 200px` 或 `100vh`）。

**Q5：margin: 0 auto 为什么没居中？**
它只对"设置了固定宽度的块级元素"有效。行内元素（如 `<span>`）或没设宽度的块级元素用不了。

**Q6：怎么让 div 占满整个屏幕高度？**
用 `height: 100vh`（视口高度），比 `height: 100%` 省心，因为后者要求父级有明确高度。

**Q7：为什么图片会变形？**
同时设了 width 和 height 且比例和原图不一致就会拉伸。只设一边、另一边 `auto`，或用 `object-fit: cover` 裁剪填充。

**Q8：CSS 写在哪最好？**
单独建 `.css` 文件用 `<link>` 引入，结构和样式分离，最好维护。

**Q9：学了 HTML/CSS，还要学 Vue/React 吗？**
要。Vue/React 是"用组件和 JS 来生成 HTML/CSS"的框架，底层还是 HTML/CSS。先把这套基础打牢，学框架会轻松很多。

**Q10：学完这个能做什么？**
能写静态页面（个人主页、活动页、后台界面雏形）。要真正"能交互、能存数据"，接着学 JavaScript，再学框架。

---

## 17. 学习路线图（先看什么，后看什么）

```
第 1 步：第 0~1 章     工具和第一个网页（半天）
第 2 步：第 2~5 章     标签、语义化、表单、属性（1~2 天）   多写多预览
第 3 步：第 6~8 章     CSS 引入、选择器、盒模型（1~2 天）   盒模型是重点
第 4 步：第 9 章       布局 flex / grid / position（2~3 天） 最难也最常用
第 5 步：第 10~13 章   常用样式、响应式、动画、变量（2 天）
--------- 以上能写静态页面 ---------
第 6 步：第 15 章      实战个人主页（1~2 天）
第 7 步：接着学 JavaScript，再学框架
```

---

## 18. 速查口诀

- 每个 CSS 文件开头先写 `* { box-sizing: border-box; }`，省无数排版坑。
- 一维排列用 Flex，二维网格用 Grid，别再死磕 float。
- 水平垂直居中记牢：`display: flex; justify-content: center; align-items: center;`。
- 样式不生效，先开 F12 看哪条被划了删除线——多半是优先级被盖了。
- 做响应式别忘了 `<meta viewport>`。
- 能用 class 就别用 id 写样式；能用 rem 就别用 px 控字号。
- 新手别急着上框架，HTML/CSS 这关过了，后面才顺。
