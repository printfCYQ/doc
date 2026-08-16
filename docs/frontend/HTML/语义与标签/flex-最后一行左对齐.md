# flex-最后一行左对齐

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        height: 600px;
      }
      
      .container {
        float: left;
        border: 1px solid #000;
        display: flex;
        width: 290px;
        flex-wrap: wrap;
        justify-content: space-between;
        resize: both;
        padding: 10px;
      }
      
      .list {
        width: 65px;
        height: 65px;
        margin-bottom: 10px;
        background-color: rgb(148, 148, 131);
        margin-right: 10px;
      }
      
      .list:nth-child(4n) {
        margin-right: 0px;
      }
      
      .container::after {
        content: "";
        display: block;
        flex: 1 1 auto;
      }
    </style>
  </head>
  
  <body>
    <div class="container">
      <div class="list"></div>
      <div class="list"></div>
      <div class="list"></div>
      <div class="list"></div>
    </div>
    <div>
      <button id="btn">add</button>
      <button id="remove">remove</button>
    </div>
  </body>
  <script>
    let container = document.querySelector(".container");
    let btn = document.querySelector("#btn");
    let remove = document.querySelector("#remove");
    
    btn.addEventListener("click", () => {
      let divEle = document.createElement("div");
      divEle.className = "list";
      container.appendChild(divEle);
    });
    remove.addEventListener("click", () => {
      let list = document.querySelectorAll(".list");
      container.removeChild(list[0]);
    });
  </script>
</html>
```
