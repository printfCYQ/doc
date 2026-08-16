# @keyframes

```mermaid
mindmap
  root((animation))
    @keyframes
      规定动画。
    animation
      所有动画属性的简写属性。
    animation-name
      规定 @keyframes 动画的名称。
    animation-duration
      规定动画完成一个周期所花费的秒或毫秒。默认是 0。
    animation-timing-function
      规定动画的速度曲线。默认是 "ease"。
    animation-fill-mode
      规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。
    animation-delay
      规定动画何时开始。默认是 0。
    animation-iteration-count
      规定动画被播放的次数。默认是 1。
        n
          一个数字，定义应该播放多少次动画
        infinite
          指定动画应该播放无限次（永远）
    animation-direction
      规定动画是否在下一周期逆向地播放。默认是 "normal"。
    animation-play-state
      规定动画是否正在运行或暂停。默认是 "running"。
        paused
          指定暂停动画
        running
          指定正在运行的动画
```



## @keyframes

```css
@keyframes mymove
{
from {top:0px;}
to {top:200px;}
}
```

或

```css
@keyframes mymove
{
0% {top:0px;}
100% {top:200px;}
}
```

## animation

```css
animation-name: myfirst;
animation-duration: 5s;
animation-timing-function: linear;
animation-delay: 2s;
animation-iteration-count: infinite;
animation-direction: alternate;
animation-play-state: running;
```

等效

```css
animation: myfirst 5s linear 2s infinite alternate;
```

## animation-timing-function

```mermaid
mindmap
  root((animation-timing-function))
    linear
      动画从头到尾的速度是相同的。
    ease
      默认。动画以低速开始，然后加快，在结束前变慢。
    ease-in
      动画以低速开始。
    ease-out
      动画以低速结束。
    ease-in-out
      动画以低速开始和结束。
    steps int,start|end
      指定了时间函数中的间隔数量（步长）。有两个参数，第一个参数指定函数的间隔数，该参数是一个正整数（大于 0）。 第二个参数是可选的，表示动画是从时间段的开头连续还是末尾连续。含义分别如下： start：表示直接开始。 end：默认值，表示戛然而止。
    cubic-bezier n,n,n,n
      在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。
```



## animation-fill-mode

```mermaid
mindmap
  root((animation-fill-mode))
    none
      默认值。动画在动画执行之前和之后不会应用任何样式到目标元素。
    forwards
      在动画结束后（由 animation-iteration-count 决定），动画将应用该属性值。
    backwards
      动画将应用在 animation-delay 定义期间启动动画的第一次迭代的关键帧中定义的属性值。这些都是 from 关键帧中的值（当 animation-direction 为 "normal" 或 "alternate" 时）或 to 关键帧中的值（当 animation-direction 为 "reverse" 或 "alternate-reverse" 时）。
    both
      动画遵循 forwards 和 backwards 的规则。也就是说，动画会在两个方向上扩展动画属性。
    initial
      设置该属性为它的默认值
    inherit
      从父元素继承该属性。
```



## animation-direction

```mermaid
mindmap
  root((animation-direction))
    normal
      默认值。动画按正常播放。
    reverse
      动画反向播放
    alternate
      动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。
    alternate-reverse
      动画在奇数次（1、3、5...）反向播放，在偶数次（2、4、6...）正向播放。
    initial
      设置该属性为它的默认值
    inherit
      从父元素继承该属性
```
