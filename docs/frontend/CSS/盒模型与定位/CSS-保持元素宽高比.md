# CSS-保持元素宽高比

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>保持元素宽高比</title>
    <style>
      .item {
        background: #f40;
        width: 50%;
        margin: 0 auto;
      }

      .inner {
        width: 100%;
        height: 0;
        padding-bottom: 75%;
        position: relative;
      }

      .container {
        position: absolute;
        inset: 0;
        background: #0f0;
      }
    </style>
  </head>

  <body>
    <div class="item">
      <div class="inner">
        <div class="container"></div>
      </div>
    </div>
  </body>

</html>
```
