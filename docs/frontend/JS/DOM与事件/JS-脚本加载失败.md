# JS-脚本加载失败

> 在脚本加载失败时，通过替换脚本的 CDN 域名来进行重试加载。
> 
> 具体实现是通过监听全局错误事件，判断错误的目标元素是否为 &lt;script> 标签，并且排除 ErrorEvent 类型的错误。
> 
> 然后根据脚本的 URL 进行重试逻辑，并使用 document.write 方法动态替换脚本的 URL。
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>脚本加载失败</title>
  <script>
    const domains = ['can.bootcdn.net', 'cbn.bootcdn.net', 'cdn.bootcdn.net'];
    const retry = {}; // 用于记录重试次数的对象

    // 监听全局错误事件
    window.addEventListener('error', (e) => {
      console.log(e.target.src);
      if (e.target.tagName !== 'SCRIPT' || e instanceof ErrorEvent) return;
      const url = new URL(e.target.src);
      const name = url.pathname;
      console.log(name);
      if (!(name in retry)) {
        retry[name] = 0;
      }
      const index = retry[name];
      if (index >= domains.length) return;

      const newDomain = domains[index];
      url.host = newDomain;

      // 使用 document.write 方法动态替换脚本 URL
      document.write(`\<script src="${url.href}">\<\/script>`); // 阻塞 JS 加载
      retry[name]++;
    }, true);
  </script>
</head>

<body>
  <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.js"></script>
  <script src="https://cn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.js"></script>
  <script src="https://cdn.bootcdn.net/ajax/libs/echarts/5.4.2/echarts.common.js"></script>
</body>

</html>
```
