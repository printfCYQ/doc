# FastAPI 框架

## 简介

本节介绍 FastAPI 现代 Python Web 框架，包括路由声明、Pydantic 数据校验、依赖注入、异步处理、自动文档生成等。

## 目录 / 章节

- FastAPI 项目初始化
- 路径参数与查询参数
- Pydantic 模型与数据校验
- 依赖注入（Depends）
- 异步 async / await
- 自动生成 OpenAPI 文档

## 笔记正文

::: details 点击展开示例代码
```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    description: Optional[str] = None

items_db = {}

@app.post("/items/{item_id}")
async def create_item(item_id: int, item: Item):
    if item_id in items_db:
        raise HTTPException(status_code=400, detail="Item already exists")
    items_db[item_id] = item
    return {"item_id": item_id, **item.dict()}

@app.get("/items/{item_id}")
async def get_item(item_id: int):
    if item_id not in items_db:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"item_id": item_id, **items_db[item_id].dict()}
```
:::
