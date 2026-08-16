# CSS-卡片翻转效果

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      body {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: black;
      }

      .card {
        width: 300px;
        height: 500px;
        position: relative;
        perspective: 1000px;
      }

      .card:hover .face {
        transform: rotateY(-180deg);
      }

      .card:hover .back {
        transform: rotateY(0deg);
      }

      .face,
      .back {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        backface-visibility: hidden;
        transform-style: preserve-3d;
        transition: transform 0.5s;
      }

      .face {
        transform: rotateY(0deg);
      }

      .back {
        transform: rotateY(180deg);
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        color: black;
      }
    </style>
  </head>

  <body>
    <div class="card">
      <img class="face" src="./2.jpg" alt="">
      <div class="back">
        <span>DA LIAN</span>
      </div>
    </div>
  </body>

</html>
```
