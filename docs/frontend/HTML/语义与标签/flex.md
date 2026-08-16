# flex

## flex

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  body {
    width: 100vw;
    height: 100vh;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box {
    width: 200px;
    height: 200px;
    background-color: rgb(0, 255, 213);
  }
</style>
</head>
<body>
  <div class="box"></div>
</body>
```

## grid

### content

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  body {
    width: 100vw;
    height: 100vh;
    background-color: #000;
    display: grid;
    justify-content: center;
    align-content: center;
  }
  .box {
    width: 200px;
    height: 200px;
    background-color: rgb(0, 255, 213);
  }
</style>
</head>
<body>
  <div class="box"></div>
</body>
```

### items

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  body {
    width: 100vw;
    height: 100vh;
    background-color: #000;
    display: grid;
    justify-items: center;
    align-items: center;
  }
  .box {
    width: 200px;
    height: 200px;
    background-color: rgb(0, 255, 213);
  }
</style>
</head>
<body>
  <div class="box"></div>
</body>
```

## position+transform

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  body {
    width: 100vw;
    height: 100vh;
    background-color: #000;
    position: relative;
  }
  .box {
    width: 200px;
    height: 200px;
    background-color: rgb(0, 255, 213);
    position: absolute;
    top: 50%;  /*依据父元素*/
    left: 50%;
    transform: translate(-50%, -50%);  /*依据自身元素*/
  }
</style>
</head>
<body>
  <div class="box"></div>
</body>
```
