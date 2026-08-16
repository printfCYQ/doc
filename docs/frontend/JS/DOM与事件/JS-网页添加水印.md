# JS-网页添加水印

```javascript
!(function () {
  // 一个配置
  const options = {
    id: 'globalWaterMark',
    fontSize: 10,
    color: 'rgba(128,128,128,.6)',
    rotate: '-30',
    userName: "我是水印"
  };

  /**
   * 创建水印图片url
   */
  function createWaterMark() {
    const { fontSize, color, id } = options;
    const user = /user_name=([^;]+)/.exec(document.cookie);
    const name = Array.isArray(user) && user.length === 2 && user[1] ? user[1] : options.userName;
    const canvasObj = document.createElement('canvas');
    const canvas2d = canvasObj.getContext('2d');
    canvasObj.width = 200;
    canvasObj.height = 100;
    canvas2d.font = fontSize + 'px Arial';
    canvas2d.fillStyle = color;
    canvas2d.translate(canvasObj.width / 4, canvasObj.height / 2);
    canvas2d.rotate((-30 / 180) * Math.PI);
    canvas2d.fillText(name, 0, canvasObj.height / 2);
    // 将canvas 转为 dataURL
    const base64Url = canvasObj.toDataURL('image/png');
    return base64Url;
  }

  function setWaterMark() {
    const { fontSize, color, id } = options;
    const url = createWaterMark();
    const target = document.getElementById(id);
    if(target){
      document.body.removeChild(target)
    }
    const divObj = document.createElement('div');
    divObj.id = options.id;
    const styleStr = `
                  position:fixed;
                  top:0;
                  left:0;
                  bottom:0;
                  right:0;
                  z-index:999999;
                  background-repeat:repeat;
                  pointer-events:none;
                  background-image:url('${url}')`;
    divObj.setAttribute('style', styleStr);
    document.body.appendChild(divObj);
    // 监听DOM变动
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    if (MutationObserver) {
      let waterMarkOb = new MutationObserver(function () {
        const _globalWatermark = document.querySelector(`#${id}`);
        // 当样式或者水印元素dom节点有改动时会重新绘制
        if (
          (_globalWatermark && _globalWatermark.getAttribute('style') !== styleStr) ||
          !_globalWatermark
        ) {
          waterMarkOb.disconnect();
          waterMarkOb = null;
          setWaterMark();
        }
      });
      // 指定观察对象
      waterMarkOb.observe(document.body, {
        attributes: true,
        subtree: true,
        childList: true,
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    setWaterMark();
  });
})();
```
