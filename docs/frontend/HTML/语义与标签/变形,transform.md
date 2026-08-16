# 变形,transform

```mermaid
mindmap
  root((transform))
    matrix a, b, c, d, tx, ty
    matrix3d a, b, 0, 0, c, d, 0, 0, 0, 0, 1, 0, tx, ty, 0, 1
    translate x,y
    translate3d x,y,z
    translateX x
    translateY y
    translateZ z
    scale x ,y ?
    scale3d x,y,z
    scaleX x
    scaleY y
    scaleZ z
    rotate angle
    rotate3d x,y,z,angle
    rotateX angle
    rotateY angle
    rotateZ angle
    skew x-angle,y-angle
    skewX angle
    skewY angle
    perspective n
```



## none

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 100px;
        height: 100px;
        background: red;
        transform: none;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
  </body>
</html>

```



## matrix

```html
matrix( scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY() )
```
