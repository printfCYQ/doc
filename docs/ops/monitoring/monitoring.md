# 监控与日志笔记

应用上线不是终点。你得知道：它活着吗？CPU 飙了吗？用户报错了吗？哪次发布引入了 bug？——这些靠"监控与日志"。

业界总结为**可观测性三大支柱**：

- **Metrics（指标）**：数值时间序列，如 CPU%、QPS、错误率。回答"系统整体怎么样"。
- **Logs（日志）**：离散的事件记录，如"用户 X 登录失败"。回答"具体发生了什么"。
- **Traces（链路追踪）**：一次请求跨多个服务的完整路径。回答"这次慢请求卡在哪"。

这篇聚焦最常用、也最该先上的两块：**Metrics（Prometheus + Grafana）** 和 **Logs（ELK）**。

> 前置：[Linux 服务器基础](../linux/linux.md) 看日志的命令、`[Docker](../docker/docker.md)` 跑这些组件很方便。

---

## 1. 为什么需要

没有监控时，用户先发现网站挂了，你才知道；没有日志，你只能猜"是不是数据库问题"。有了它们：
- 服务挂了**告警**自动通知你（而不是用户投诉）。
- 性能问题**有图有数据**，不用拍脑袋。
- 出事后**翻日志**定位，而不是盲改。

---

## 2. Prometheus：指标收集

Prometheus 是当前最主流的 metrics 系统，核心特点是**拉模型（pull）**：它定时主动去各个目标抓指标，而不是目标推给它。

组件：
- **Prometheus Server**：定时 scrape（抓）指标、存时序数据库、提供查询。
- **Exporter**：把各种系统/应用的指标暴露成 HTTP 接口给 Prometheus 抓。常见：node_exporter（机器 CPU/内存/磁盘）、mysqld_exporter（数据库）、应用自己暴露 `/metrics`。
- **Alertmanager**：告警分发（发到钉钉/邮件/Slack）。

应用暴露指标（以 Node 为例）：
```js
// 用 prom-client 暴露 /metrics
const client = require('prom-client');
const http = require('http');
http.createServer((req, res) => {
  if (req.url === '/metrics') {
    res.end(await client.register.metrics());
  }
}).listen(3000);
```

Prometheus 配置要抓谁：
```yaml
scrape_configs:
  - job_name: 'myapp'
    static_configs:
      - targets: ['myapp:3000']     # 暴露 /metrics 的地址
```

---

## 3. PromQL：查询语言

```promql
# 过去 5 分钟平均 CPU 使用率
avg(rate(node_cpu_seconds_total[5m])) by (instance)

# 每秒请求数
rate(http_requests_total[1m])

# 错误率（5xx 占比）
sum(rate(http_requests_total{status=~"5.."}[5m]))
  / sum(rate(http_requests_total[5m]))
```

`rate()` 算增长率，`sum()`/`avg()` 聚合，`by (instance)` 分组。学会这几个就能画大部分图。

---

## 4. Grafana：可视化仪表盘

Prometheus 存数据，Grafana 负责**画图**。它连上 Prometheus 当数据源，拖拽出 CPU、QPS、错误率、延迟的实时仪表盘。

- 社区有海量现成 dashboard（搜 "Node Exporter Full" 直接导入）。
- 支持告警规则（如"错误率 > 5% 持续 5 分钟就告警"），联动 Alertmanager。

---

## 5. ELK：日志集中

日志散落在每台服务器、每个容器里（`docker logs`、[journalctl](../linux/linux.md)），出了问题要挨台翻。ELK 把日志**集中收集 + 检索 + 可视化**：

- **Elasticsearch**：搜索引擎，存日志、提供全文检索。
- **Logstash / Filebeat**：采集器。Filebeat 轻量，装在每台机器上把日志推给 ES（Logstash 做过滤转换）。
- **Kibana**：Web 界面，搜日志、画日志趋势图。

典型链路：`应用写日志 → Filebeat 采集 → Elasticsearch 存储 → Kibana 检索`。[Docker](../docker/docker.md) 一键 `docker compose up` 就能起一套 ELK。

---

## 6. 结构化日志（最佳实践）

别只打 `"用户登录失败"` 这种纯文本。打**结构化日志**（JSON），方便检索和统计：

```json
{ "level": "error", "ts": "2026-08-15T10:00:00Z",
  "event": "login_failed", "user_id": 12345, "ip": "1.2.3.4" }
```

好处：能按 `level=error`、`event=login_failed` 精确过滤，能统计"今天失败登录多少次"。Node 用 `pino`、Python 用 `structlog` 都很顺手。

几条规矩：
- 分级：`debug / info / warn / error`，生产开 `info` 以上。
- 别打敏感信息（密码、token）进日志。
- 加 `request_id` / `trace_id`，串联一次请求的所有日志。

---

## 7. 告警

监控不产生行动就只是好看的图。告警原则：
- **有用**：错报警（狼来了）会让人无视，漏报警会出事。阈值要调。
- **可行动**：告警里说清"什么、哪里、可能原因"，别只甩一句"CPU 高"。
- **分级**：钉钉/邮件日常，电话/短信留给真·宕机。

---

## 8. 轻量起步建议

全上 ELK + Prometheus 对个人项目偏重。务实路线：
1. 先会 [Linux 看日志](../linux/linux.md)（`journalctl`、`tail -f`、`grep`）——零成本。
2. 容器化后 `docker logs -f` / `docker compose logs` 已够小项目。
3. 真需要多机/长期留存，再上 Prometheus + Grafana（Docker 起一套很快）。
4. 日志量大便检索，再上 ELK 或云厂商日志服务。

---

## 9. 常见坑

1. **只监控不告警**：天天看仪表盘不现实，告警没配等于没监控。
2. **指标维度爆炸**：Prometheus 按 label 组合存时序，label 基数太大（如每个 user_id 一个）会撑爆内存。
3. **日志不打 `request_id`**：出问题时无法串联一次请求的多条日志，只能瞎猜。
4. **敏感信息进日志**：把用户密码、token 打进日志，等于明文泄露。
5. **ELK 资源吃紧**：ES 很吃内存，小机器硬上会 OOM；先用 Filebeat + 轻量方案。
6. **retention 不设**：指标/日志无限存，磁盘写满拖垮整机（参见 [Linux 磁盘](../linux/linux.md)）。
7. **Prometheus 单点**：它自己挂了监控盲区，生产要搞高可用或远程写。
8. **告警阈值拍脑袋**：太严天天叫、太松不叫，根据历史数据调。

---

## 10. 练习

1. 用 [Docker](../docker/docker.md) 起一个 node_exporter + Prometheus + Grafana，浏览器打开 Grafana 看到机器 CPU 图。
2. 给自己的应用加 `/metrics`（prom-client / prometheus_client），Prometheus 配 scrape，Grafana 画一个 QPS 面板。
3. 把应用日志改成结构化 JSON（pino / structlog），`grep level=error` 能过滤。
4. 配一条 Prometheus 告警规则（如错误率 > 5%），触发后能在 Alertmanager 看到。
5. 用 `docker logs` / `journalctl` 定位一个人为制造的错误，确认排查链路走通。

---

回到 [运维与部署总览](../index.md)。相关：[Linux 服务器基础](../linux/linux.md)、[Docker](../docker/docker.md)、[Nginx](../nginx/nginx.md)。
