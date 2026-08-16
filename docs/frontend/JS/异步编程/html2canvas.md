# html2canvas

-   [https://github.com/niklasvh/html2canvas](https://github.com/niklasvh/html2canvas)
-   [https://html2canvas.hertzen.com](https://html2canvas.hertzen.com)

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>html2canvas</title>
    <style>
      #dialog {
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #eee;
      }

      .enjoy-css {
        display: inline-block;
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
        padding: 10px 20px;
        border: 1px solid #b7b7b7;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        font: normal 16px/normal "Times New Roman", Times, serif;
        color: rgba(0, 142, 198, 1);
        -o-text-overflow: clip;
        text-overflow: clip;
        background: rgba(252, 252, 252, 1);
        -webkit-box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2) inset;
        box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.2) inset;
        text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.66);
        -webkit-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
        -moz-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
        -o-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
        transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
      }
    </style>
  </head>

  <body>
    <div id="dialog">
      <input class="enjoy-css" placeholder="Enjoy" />
    </div>
    <button onclick="saveDOMAsImage()">saveDOMAsImage</button>
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    <script>
      async function saveDOMAsImage() {
        html2canvas(document.querySelector("#dialog")).then(canvas => {
          console.log(canvas);
          const dataURL = canvas.toDataURL("image/png");

          const link = document.createElement("a");
          link.download = "screenshot.png";
          link.href = dataURL;
          document.body.appendChild(link);
          link.click();
        });
      }
    </script>
  </body>

</html>
```
