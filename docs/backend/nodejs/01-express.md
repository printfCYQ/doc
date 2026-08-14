# Express 框架

## 简介

本节介绍 Express.js 框架的使用，包括路由配置、中间件机制、错误处理、模板引擎、RESTful API 设计等。

## 目录 / 章节

- Express 项目初始化
- 路由（Router）配置
- 中间件（Middleware）机制
- 错误处理中间件
- RESTful API 设计
- 连接数据库与 ORM

## 笔记正文

::: details 点击展开示例代码
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello Express' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '服务器内部错误' });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```
:::
