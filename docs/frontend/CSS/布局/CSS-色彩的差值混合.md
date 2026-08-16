# CSS-色彩的差值混合

> [https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode)
```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>色彩的差值混合</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      body {
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to right, #fffbd5, #b20a2c);
      }

      h1 {
        font-size: 60px;
        color: white;
        text-transform: uppercase;
        mix-blend-mode: difference;
      }
    </style>
  </head>

  <body>
    <h1>hello world</h1>
  </body>

</html>
```
