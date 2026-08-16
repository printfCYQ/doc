# Puppeteer 安装

## 安装

```shell
npm i puppeteer
```

或

```shell
yarn add puppeteer
```

  

## 网站

-   [npm（https://www.npmjs.com/package/puppeteer）](https://www.npmjs.com/package/puppeteer)
-   [github（https://github.com/puppeteer/puppeteer）](https://github.com/puppeteer/puppeteer)
-   [中文文档（http://www.puppeteerjs.com/）](http://www.puppeteerjs.com/)​

  

## demo

```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
```
