# LLM 应用开发工具链（LangChain 生态与周边）

做大模型应用，光会调 API 不够——工程化要一堆配套工具：怎么把组件拼起来、怎么把 Agent 流程跑稳、怎么部署成服务、怎么监控和评估。这篇帮你把市面上最常听到的几个名字分清楚，知道各自干嘛、什么时候用、怎么选。最后补几个绕不开的工具，以及把"Harness 到底是个啥"说清楚。

---

## 0. 先理清：它们根本不是一类东西

很多人把它们混为一谈，其实分属不同阶段：

| 阶段 | 工具 | 干嘛 |
|---|---|---|
| **写应用（编排）** | LangChain、LlamaIndex、Haystack | 把模型、提示词、工具、知识库拼成应用 |
| **写复杂 Agent 流程** | LangGraph、CrewAI、AutoGen | 把多步/有循环的流程建模成图或协作 |
| **部署成服务** | LangServe | 把写好的 Chain 变成 REST API |
| **可视化搭建** | LangFlow | 拖拽式不写代码搭应用 |
| **监控 / 评估** | LangSmith、Langfuse | 追踪每次调用、调试、跑评测 |
| **通用 DevOps** | Harness | CI/CD、部署流水线（不限于 LLM） |

一句话：**LangChain 是写应用的积木，LangGraph 是写复杂 Agent 的流程图引擎，LangSmith / Langfuse 是上线后的监控台，LangServe 是把应用暴露成接口，Harness 是更通用的软件交付平台。**

---

## 1. LangChain

最底层的**应用框架**，提供一堆现成组件，让你少写重复代码。

核心抽象：
- **Model（模型）**：统一封装各种 LLM / 聊天模型 / Embedding
- **Prompt（提示词）**：模板化管理，支持变量填充
- **Chain（链）**：把"提示词 → 模型 → 解析"串成一条流水线
- **Retriever（检索器）**：接 RAG，从向量库捞相关文档
- **Tool / Agent**：让模型调外部工具
- **Memory（记忆）**：管理多轮对话历史
- **Document Loaders / Text Splitters**：加载和切分文档

最小可跑示例（LCEL 写法，把组件用 `|` 串起来）：

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

model = ChatOpenAI(model="gpt-4o-mini")
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一名助手，回答简洁"),
    ("user", "{question}"),
])
chain = prompt | model | StrOutputParser()   # 提示词→模型→解析，一条链

print(chain.invoke({"question": "你好"}))
```

**优点**：组件全、生态大、文档多，RAG/工具/Agent 都有现成封装。
**缺点**：抽象层多、版本变动快、有时"为了灵活反而复杂"。小需求手搓可能更清爽。
**什么时候用**：要做 RAG、要快速接各种模型/向量库/工具、团队想用统一范式。

---

## 2. LangGraph

在 LangChain 之上，专门解决**复杂 Agent 流程**。普通 Chain 是线性的"一步接一步"，但真聪明的 Agent 需要**循环、分支、回退、持久状态**（思考→调工具→看结果→再思考）。

LangGraph 把流程建模成一张**图（Graph）**：
- **节点（Node）**：一个步骤（调模型 / 调工具 / 判断）
- **边（Edge）**：流转条件，可以是普通边，也可以是条件分支
- **状态（State）**：在节点间传递、可累积

最简单的预置 Agent（ReAct 循环）：

```python
from langgraph.prebuilt import create_react_agent

tools = [get_weather]   # 你定义的工具函数
agent = create_react_agent("gpt-4o-mini", tools=tools)

result = agent.invoke({"messages": [("user", "北京天气如何？写一句提醒")]})
print(result["messages"][-1].content)
```

要更可控，就自己定义节点和边，支持循环、人工介入节点（Human-in-the-loop）、多 Agent 协作。

**什么时候用**：流程不是一条直线、需要多轮决策/回退、要状态持久化、要中途人工审批。纯线性链用 LangChain 就够了，别为了用而用。

---

## 3. LangSmith

LangChain 官方出的**可观测 + 评估平台**（SaaS，也有企业私有部署）。它和 LangChain 深度绑定，装上后每次调用自动记录完整链路。

能干嘛：
- **追踪（Tracing）**：每次调用的模型、prompt、中间步骤、耗时、token 一目了然
- **调试**：哪一步出错、哪句 prompt 导致坏结果，直接翻记录
- **评估（Eval）**：跑评测集、对比不同 prompt / 模型版本
- **数据集**：把测试用例攒起来反复用

```python
import os
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = "你的key"
# 之后用 LangChain 跑，自动上 trace，去 LangSmith 后台看
```

**特点**：和 LangChain 最顺滑，但闭源、走官方云（数据出网，企业版可私有）。

---

## 4. Langfuse

开源的 **LLM 可观测 / 工程平台**，和 LangSmith 同类，但两个关键区别：

1. **开源、可自托管**——数据不出内网，免费
2. **不绑定 LangChain**——手搓的应用也能接

三大块：
- **追踪（Tracing）**：记录每次调用链路
- **评估（Evaluations）**：人工标 + 自动评（更强模型当裁判）+ Dataset 数据集对比
- **Prompt 管理**：把 prompt 抽到平台，版本控制、A/B，代码里拉最新版

接入方式（两种）：

```python
# 方式一：LangChain 回调（如果用 LangChain）
from langfuse.callback import CallbackHandler
handler = CallbackHandler()
chain.invoke({"question": "你好"}, config={"callbacks": [handler]})
```

```python
# 方式二：装饰器（手搓应用也能用，不依赖 LangChain）
from langfuse.decorators import observe, langfuse_context

@observe()
def chat(question):
    return client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": question}],
    )

chat("你好")   # 自动上 trace，去 Langfuse 后台看
```

**和 LangSmith 怎么选**：想要免费、可控、不绑框架 → Langfuse；已经深度用 LangChain 全家桶、想最省事 → LangSmith。我更推 Langfuse（开源 + 框架无关）。

---

## 5. Harness（以及你大概率想问的 Haystack）

这个名字容易误会，得说清楚。

### 5.1 Harness = Harness.io，是 DevOps 平台，不是 LLM 工具

`harness.io` 是一家**软件交付（DevOps）平台**公司，产品是 CI/CD 流水线、特性开关（Feature Flags）、云成本管理、部署策略（金丝雀、蓝绿）等。它**和 LangChain 不是一家、不是一回事，也不专为 LLM 设计**。

那为什么会在 LLM 语境下出现？因为大模型应用最终也要**部署上线**，而 Harness 可以当通用的部署流水线来用——比如"代码提交 → 构建 → 部署你的 LLM 服务到 K8s → 金丝雀发布"。它是"最后一公里"的通用工具，不是"写模型应用"的工具。如果你是在"大模型应用上线"的话题里听到它，多半是这个意思。

### 5.2 如果你其实想说的是 Haystack

发音和 harness 有点像，而且它**确实是 LLM 圈的工具**——deepset 出的 **Haystack** 是另一套 LLM 应用框架，功能和 LangChain 高度重叠（也是做 RAG、Agent、文档检索那套），算 LangChain 的直接竞品。很多人把它和 LangChain 搞混。区别大致是：Haystack 偏"文档问答 / RAG 流水线"起家，组件更聚焦；LangChain 覆盖面更广、生态更大。

---

## 6. 补充：绕不开的几个

### 6.1 LangServe —— 把 Chain 部署成 API

LangChain 官方部署工具，把写好的 Chain / Agent 一键变成 REST API，自动带 `/invoke`、`/stream` 和可视化调试界面，不用自己手搓 FastAPI 路由。

```python
from fastapi import FastAPI
from langserve import add_routes

app = FastAPI()
add_routes(app, my_chain, path="/my-chain")
# 启动后: POST /my-chain/invoke 调用, POST /my-chain/stream 流式
```

### 6.2 LangFlow —— 拖拽式可视化搭建

网页上把组件连成流程图就能生成应用，不用写代码，适合快速原型或不爱写代码的人。底层还是 LangChain。

### 6.3 LlamaIndex —— RAG 专精框架

和 LangChain 类似的编排框架，但**更偏数据接入和 RAG**：加载器（几百种数据源）、索引、检索策略特别全。如果你主要做"基于私有文档问答"，LlamaIndex 往往比 LangChain 更顺手。

### 6.4 多 Agent 协作框架

当单个 Agent 不够、要多个 Agent 分工时：
- **CrewAI**：把 Agent 定义成"角色 + 任务"，像组队干活，上手简单
- **AutoGen（微软）**：多 Agent 对话协作，适合研究和复杂编排
- **LangGraph**：前面讲过，用图建模，最灵活但写起来最重

---

## 7. 怎么选（决策表）

| 你想干的事 | 选 |
|---|---|
| 快速拼 RAG / 接模型工具 | LangChain |
| 主要做文档问答 / 数据接入 | LlamaIndex |
| Agent 流程有循环、要状态/回退/人工介入 | LangGraph |
| 多 Agent 分工组队 | CrewAI / AutoGen |
| 把 Chain 暴露成 API | LangServe |
| 不想写代码、拖拽搭 | LangFlow |
| 监控 + 评估，且用 LangChain、图省事 | LangSmith |
| 监控 + 评估，要开源/自托管/不绑框架 | **Langfuse**（推荐） |
| 通用 CI/CD 部署流水线 | Harness |
| 想要另一个 LLM 框架（非 LangChain） | Haystack |

---

## 8. 一个典型技术栈组合

新手到大模型应用落地，常见搭配：

```
写应用:   LangChain / LangGraph        (编排 + Agent)
检索:     LlamaIndex 或 LangChain Retriever + Chroma / pgvector
部署:     LangServe (FastAPI) → Docker → 云/K8s
监控评估: Langfuse (开源自托管, 框架无关)
流水线:   Harness / GitHub Actions (CI/CD, 可选)
```

如果追求简单，可以全程只用 LangChain 全家桶（写 + LangServe 部署 + LangSmith 监控），代价是绑定和闭源；想灵活可控就换成 Langfuse 做监控、手搓或 LangGraph 写 Agent。

---

## 9. 快速上手（安装）

```bash
pip install langchain langchain-openai langchain-community
pip install langgraph
pip install langserve fastapi uvicorn        # 部署
pip install langfuse                          # 监控(开源自托管)
# LangSmith 不用装库, 设环境变量即可(见第 3 节)
```

Langfuse 自己部署（Docker 一行起，数据全在你自己机器）：

```bash
docker compose up -d   # 官方提供 docker-compose, 起 Web + 数据库
```

---

## 10. 常见坑 / FAQ

1. **LangChain 版本乱**：抽象和 API 变动频繁，照着老教程跑常报错。以官方当前文档为准，别盲目抄旧代码。
2. **为用而用**：小需求（就调一次 API）硬套 LangChain，反而绕。先判断复杂度。
3. **LangGraph 过度设计**：线性流程别上图，普通 Chain 更清楚。
4. **监控平台二选一就够**：LangSmith + Langfuse 功能重叠，别两个都接，增加复杂度。开源控选 Langfuse。
5. **Harness 不是 LLM 工具**：别指望它帮你写模型应用，它管的是部署交付那一段。
6. **Haystack vs LangChain 纠结**：二选一即可，都是 RAG/Agent 框架，别两个都学一遍。
7. **LangServe 别忘了鉴权**：默认起的接口是裸的，上线要加认证，否则谁都能调你的模型烧你钱。

---

**速查**：写应用 LangChain，复杂 Agent LangGraph，监控 Langfuse（开源首选），部署 LangServe，可视化 LangFlow，RAG 专精 LlamaIndex，多 Agent CrewAI/AutoGen，通用 DevOps Harness。
