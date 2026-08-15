# AI 总览

人工智能是大方向，下面这张图帮你建立整体认知，再决定从哪条线切入。

## 领域地图

```
AI（人工智能）
├── 机器学习 ML
│   ├── 经典算法：回归 / 分类 / 聚类 / 降维（scikit-learn）
│   └── 深度学习 DL
│       ├── CNN（图像）
│       ├── RNN/LSTM（序列，已逐渐被 Transformer 替代）
│       └── Transformer（注意力机制）
└── 大模型 LLM（Transformer 在语言上的极致应用）
    ├── 预训练 / 微调（LoRA / PEFT）
    ├── 提示工程 Prompt
    ├── RAG（检索增强生成）
    └── Agent（智能体）
```

关系是 **AI ⊃ 机器学习 ⊃ 深度学习 ⊃ 大模型**。先读 [AI 学习路线与推荐内容](./ai.md) 搞清楚该学什么、按什么顺序学。

## 这份分类里有什么

- [AI 学习路线与推荐内容](./ai.md) —— 从环境搭建、机器学习、深度学习，到大模型应用（RAG / Agent）的完整路线图，含可运行代码、练习、资源推荐
- [AI 大模型应用（实战指南）](./llm-app.md) —— 直接讲怎么动手做应用：调 API / 本地模型、提示工程、RAG、Agent、工具调用、部署与评估
- [LLM 开发工具链](./tooling.md) —— LangChain / LangGraph / LangSmith / Langfuse / Harness 等周边工具详解，以及怎么选、怎么组合

## 学习建议

时间有限就直奔大模型应用（RAG + Agent）；想打牢底子就按顺序走：Python → 经典机器学习 → 深度学习 → Transformer → 大模型。数学不用先啃完，用到哪补到哪。
