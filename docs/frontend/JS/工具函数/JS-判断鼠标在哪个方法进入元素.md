# JS-判断鼠标在哪个方法进入元素

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>鼠标在什么方向进入/离开</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      html {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .container {
        width: 200px;
        height: 100px;
        background: #ead;
      }
    </style>
  </head>

  <body>
    <div class="container"></div>

    <script>
      const container = document.querySelector('.container');
      const rect = container.getBoundingClientRect();
      const theta = Math.atan2(rect.height, rect.width);

      container.onmouseenter = (e) => {
        const x = e.offsetX - rect.width / 2;
        const y = rect.height / 2 - e.offsetY;
        const angle = Math.atan2(y, x);
        if (angle < theta && angle >= -theta) {
          console.log('进入right');
        } else if (angle >= theta && angle < Math.PI - theta) {
          console.log('进入top');
        } else if (angle >= Math.PI - theta || angle < -Math.PI + theta) {
          console.log('进入left');
        } else {
          console.log('进入bottom');
        }
      }
      container.onmouseleave = (e) => {
        const x = e.offsetX - rect.width / 2;
        const y = rect.height / 2 - e.offsetY;
        const angle = Math.atan2(y, x);

        if (angle < theta && angle >= -theta) {
          console.log('离开right');
        } else if (angle >= theta && angle < Math.PI - theta) {
          console.log('离开top');
        } else if (angle >= Math.PI - theta || angle < -Math.PI + theta) {
          console.log('离开left');
        } else {
          console.log('离开bottom');
        }
      }
    </script>
  </body>

</html>
```
