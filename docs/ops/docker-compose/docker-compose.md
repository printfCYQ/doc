# Docker Compose 笔记

上一篇 [Docker](../docker/docker.md) 里，起一个容器用一条 `docker run`。但实际项目很少只有一个容器：一个 Web 服务往往还要配数据库、缓存（Redis）、消息队列。一个个 `docker run`、记端口、管网络，又乱又容易出错。

`docker-compose` 用一份 YAML 把"要起哪些服务、怎么连、挂什么卷、开什么端口"全写清楚，一条命令全部拉起、全部停下。

> 前置：先把 [Docker](../docker/docker.md) 基础看完，尤其镜像、卷、网络三章——Compose 只是把这些命令"声明式"地写进文件。

---

## 1. 为什么用 Compose

| 手动 `docker run` | Compose |
|---|---|
| 记住一长串参数 | 写在文件里，可版本控制 |
| 多个容器要手动建网络互联 | 自动建一个网络，服务名直接互访 |
| 起停要敲 N 条命令 | `up` / `down` 一条搞定 |
| 配置散落各处 | 集中在一个 `docker-compose.yml` |

Compose 适合**单机**跑多容器（开发环境、小项目生产）。再多、要跨机器编排，就上 [Kubernetes](../k8s/k8s.md)。

---

## 2. 文件结构

一个最小 `docker-compose.yml`：

```yaml
services:            # 顶层：要起的服务（容器）列表
  web:               # 服务名（也是网络里的主机名）
    image: nginx:alpine
    ports:
      - "8080:80"
  db:
    image: postgres:15
```

顶层通常有三块：`services`（必写）、`volumes`（命名卷）、`networks`（自定义网络）。版本号 `version` 在新版 Compose 已废弃，不写也行。

---

## 3. 常用字段速查

| 字段 | 作用 | 示例 |
|------|------|------|
| `image` | 用现成镜像 | `nginx:alpine` |
| `build` | 用 Dockerfile 构建 | `build: .` 或 `build: { context: ., dockerfile: Dockerfile }` |
| `ports` | 端口映射 | `- "8080:80"` |
| `environment` | 环境变量 | `- DB_HOST=postgres` |
| `env_file` | 从文件读环境变量 | `- .env` |
| `volumes` | 挂卷/目录 | `- pgdata:/var/lib/postgresql/data` |
| `depends_on` | 启动顺序依赖 | `- db` |
| `restart` | 退出重启策略 | `unless-stopped` |
| `command` | 覆盖容器启动命令 | `command: npm run dev` |
| `healthcheck` | 健康检查 | 见下 |
| `networks` | 加入自定义网络 | `- mynet` |
| `profiles` | 按需启用服务 | `- debug` |

`restart` 策略：
- `no`：不重启（默认）
- `always`：总是重启（包括手动 stop 后 daemon 重启也会拉起）
- `unless-stopped`：除非手动 stop，否则一直重启（生产常用）
- `on-failure`：非正常退出才重启

---

## 4. 环境变量与多环境

把敏感/可变的值抽到 `.env`，compose 自动读取：

```yaml
services:
  web:
    image: myapp:${TAG:-latest}     # 没设 TAG 就用 latest
    environment:
      - DB_PASSWORD=${DB_PASSWORD}
```

`.env` 文件（别提交真实密码到 git，加进 `.gitignore`）：
```
TAG=1.0
DB_PASSWORD=secret
```

多环境：用 `-f` 叠加文件，后面的覆盖前面的：
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```
或者本地开发放 `docker-compose.override.yml`（默认会自动加载），生产用 `docker-compose.prod.yml` 覆盖端口、关掉挂载代码等。

---

## 5. 网络互联

Compose 默认给项目建一个桥接网络，服务之间**直接用服务名当域名**互访：

```yaml
services:
  web:
    image: myapp
    environment:
      - REDIS_HOST=redis      # 直接写服务名
  redis:
    image: redis:7
```

`web` 容器里 `redis:6379` 就能连上，不用管 IP。要隔离可自定义网络：
```yaml
networks:
  frontend:
  backend:
services:
  web:
    networks: [frontend, backend]
  db:
    networks: [backend]        # db 只在 backend，web 能访问，外部进不来
```

---

## 6. 健康检查

`depends_on` 只保证"先启动 db 容器"，不保证"db 已就绪接受连接"。用 `healthcheck` 让 web 等 db 健康再起：

```yaml
services:
  db:
    image: postgres:15
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 5
  web:
    image: myapp
    depends_on:
      db:
        condition: service_healthy    # 等 db 健康
```

应用里加重试逻辑（连不上睡 1 秒再试）依然是最稳的兜底。

---

## 7. 常用命令

```bash
docker compose up -d            # 后台启动全部（首次会自动 build）
docker compose up --build       # 强制重新构建镜像再起
docker compose down             # 停并删容器、网络
docker compose down -v          # 连命名卷一起删（数据清空！谨慎）
docker compose ps               # 看状态
docker compose logs -f web      # 跟踪 web 服务日志
docker compose exec web bash    # 进 web 容器
docker compose restart web      # 重启某服务
docker compose pull             # 拉最新镜像
docker compose config           # 校验并展开最终配置（排错利器）
```

> 新版本命令是 `docker compose`（插件式，无横线）；老版本是 `docker-compose`（独立二进制）。二选一，别混。

---

## 8. 实战：Web + Postgres + Redis

```yaml
# docker-compose.yml
services:
  web:
    build: .
    ports: ["8080:3000"]
    environment:
      - DB_HOST=postgres
      - REDIS_HOST=redis
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_started
    volumes: ["./:/app"]
    restart: unless-stopped

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=secret
    volumes: ["pgdata:/var/lib/postgresql/data"]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      retries: 5

  redis:
    image: redis:7
    volumes: ["redisdata:/data"]

volumes:
  pgdata:
  redisdata:
```

`docker compose up -d` 后，浏览器开 `localhost:8080`，web 通过服务名连上 postgres 和 redis。数据都在命名卷里，删容器不丢。

---

## 9. 与 Kubernetes 的区别

| 维度 | Compose | Kubernetes |
|------|---------|-----------|
| 定位 | 单机多容器编排 | 跨机器集群编排 |
| 配置 | 一份 YAML | 多种资源 YAML（Deployment/Service...） |
| 扩缩容 | 改 `replicas` 重启 | 自动 HPA，秒级 |
| 自愈 | 无（靠 `restart`） | 探针自动重启/调度 |
| 学习成本 | 低 | 高 |

小项目、开发环境用 Compose 足够；要高可用、多节点、自动扩缩，迁到 [Kubernetes](../k8s/k8s.md)。

---

## 10. 常见坑

1. **`version` 报错**：新版 Compose 不需要 `version` 字段，写上反而可能警告，直接删。
2. **环境变量没生效**：`.env` 要和 `docker-compose.yml` 同目录；`${VAR}` 在 YAML 里才能展开，`$VAR` shell 风格也行但别混。
3. **`depends_on` 不等于就绪**：见第 6 节，必须配合 healthcheck 或应用重试。
4. **`down -v` 误删数据**：加 `-v` 会把命名卷一起删，生产数据说没就没。
5. **端口冲突**：宿主机端口被占用 `up` 会失败，改 `ports` 左边宿主机端口。
6. **挂载代码后不热更新**：确认 `volumes` 映射的是源码目录且容器内路径正确，Node 用 `npm run dev`、Python 用 `--reload` 才能热加载。
7. **服务名当域名连不上**：确认在同个默认网络（没自定义 `networks` 隔离），服务名大小写敏感。
8. **`build` 与 `image` 同时存在**：Compose 会用 `image` 给构建出的镜像打标签，没问题；但改了 Dockerfile 记得 `--build`。

---

## 11. 练习

1. 把上一篇的单个容器应用改成 Compose：web + 一个数据库，用服务名互联。
2. 给数据库加 `healthcheck`，让 web `depends_on` 等它健康。
3. 用 `.env` 抽出数据库密码和镜像 tag，验证 `docker compose config` 展开正确。
4. 加一个 redis 服务，写个小脚本从 web 连 redis 读写一个值，确认通。
5. 故意 `docker compose down -v` 再 `up`，观察命名卷数据是否还在（先确认你不在乎那数据）。

---

回到 [运维与部署总览](../index.md)。相关：[Docker](../docker/docker.md)、[Kubernetes](../k8s/k8s.md)、[CI/CD](../cicd/cicd.md)。
