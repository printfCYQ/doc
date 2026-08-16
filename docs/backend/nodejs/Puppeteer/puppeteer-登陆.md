# Puppeteer 登录

```javascript
const puppeteer = require("puppeteer");

const userName = `username`;
const password = `password`;

(async () => {
  const browser = await puppeteer.launch(); // 创建浏览器
  const page = await browser.newPage(); // 新建页面
  
  await page.goto("http://localhost:1024/#/login"); //浏览器页面路径
  
  await page.setViewport({ // 设置浏览器窗口大小
    width: 1920,
    height: 1080,
  });
  
  const userNameElement = await page.$("input[placeholder='请输入用户名/手机号码'"); //获取用户名输入框
  const passwordElement = await page.$("input[placeholder='请输入验证码'"); // 获取密码输入框
  await passwordElement.type(password); // 输入密码
  await userNameElement.type(userName); // 输入用户名
  
  await page.evaluate(() => {
    document.querySelector(".zvu-btn-long").click(); // 点击登陆按钮
  });
  
  await page.waitForNavigation({ // 等待页面跳转
    waitUntil: "load",
  });
  
  await page.screenshot({ path: "example.png" }); //截个图
  
  const logo = await page.$eval(".logo-text", (node) => node.innerText); // 获取元素内文字
  console.log(logo);
  
  await browser.close(); // 关掉浏览器
})();
```
