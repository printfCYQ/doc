# CSS-文字视差背景

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    body {
      background: #eeece5;
      padding: 50vh 0;
      text-align: center;
      font-size: 3rem;
    }

    h1 {
      background: linear-gradient(to bottom, #fe4e00 50%, transparent 50%) center center / 100vw 100vh fixed;
      color: transparent;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-stroke: 2px #fe4e00;
    }
  </style>
</head>

<body>
  <h1>Hello World</h1>
</body>

</html>
```
