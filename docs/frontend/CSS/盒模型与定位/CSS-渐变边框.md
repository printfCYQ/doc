# CSS-渐变边框

```javascript
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .card {
      width: 500px;
      margin: 0 auto;
      font-family: 'Courier New', Courier, monospace;
      color: #333;
      font-style: italic;
      line-height: 1.8;
      border-radius: 10px;
      background: repeating-linear-gradient(-45deg,
          #e8544d 0px 10px,
          #fff 10px 20px,
          #75adf8 20px 30px,
          #fff 30px 40px);
      background-position: -20px -20px;
      background-size: 150% 150%;
      padding: 5px;
    }

    .container {
      padding: 10px;
      background: #fff;
    }

    .card:hover {
      background-position: 0 0;
      /* animation: move 1s linear forwards infinite; */
    }

    /* @keyframes move {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: -20px -20px;
      }
    } */
  </style>
</head>

<body>
  <div class="card">
    <div class="container">
      小时候觉得忘带作业是天大的事,高中的时候觉得考不上大学是天大的事，
    	恋爱的时候觉得和喜欢的人分开是天大的事;
      但现在回头看看，那些难以跨过的山，其实都已经跨过了。
      以为不能接受的，也都接受了。生活充满了选择,遗憾也不过是常态。
      其实人通常就是无论做什么选择都会后悔，大家总是习惯去美化自己当时没有选择的那条路。
      可是大家都心知肚明,就算时间重来一次，以当时的心智和阅历还是会做出同样的选择。
      那么故事的结局还重要吗?我想人生就是一场享受过程的修行。
      "失之东隅,收之桑榆"
      回头看，轻舟已过万重山;
      向前看，前路漫漫亦灿灿。
    </div>
  </div>
</body>

</html>
```
