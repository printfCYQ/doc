# 原生js-onbeforeunload

> `window.onbeforeunload` 事件在即将离开当前页面（刷新或关闭）时触发。

```javascript
window.onbeforeunload = function (e) {
  e = e || window.event;
  if (e) {
    e.returnValue = "网站可能不会保存您的修改哦~";
  }
  return "网站可能不会保存您的修改哦~";
};
```

> 如果没有更改页面内容，那么浏览器不会展示弹窗



> 自定义的消息提示并没有生效，原因是因为部分浏览器基于安全原因没有开放 returnValue 自定义消息提示，避免网站给用户的提示被误以为是浏览器的提示。

> 另外，有的浏览器不支持自定义消息提示，只能显示标准信息，比如Firefox浏览器。
