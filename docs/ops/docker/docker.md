# Docker 笔记

Docker 解决一个老问题："在我机器上能跑，到你机器上怎么就挂了？" 它把**应用 + 它依赖的一切（系统库、运行时、配置）** 打包成一个叫"镜像"的东西，到任何装了 Docker 的地方都能原样跑起来。

打个比方：传统部署像寄一台"配好的电脑"给别人；Docker 像寄一份"装箱清单 + 一键还原脚本"，对方照着原样复刻一份一模一样的环境。这个"复刻出来的运行实例"叫**容器**。

> 学本篇前不需要前置太多，但懂一点 [Linux 基础](../../basic/os/os.md) 和至少一门后端语言（如 [Node.js](../../backend/nodejs/nodejs.md) 或 [Python](../../backend/python/python.md)）会更容易懂实操。Docker 也是 [Python Web 部署](../../backend/python/python-web.md) 里推荐的方式。

---

## 1. 容器 vs 虚拟机

| 维度 | 虚拟机（VM） | 容器（Docker） |
|------|-------------|---------------|
| 隔离级别 | 虚拟整套硬件 + 完整操作系统 | 共享宿主机内核，隔离用户空间 |
| 体积 | 几个 GB 起 | 几 MB ~ 几百 MB |
| 启动速度 | 分钟级（要开机） | 秒级 |
| 密度 | 一台机几台 VM | 一台机几十上百容器 |

关键区别：**容器不虚拟硬件、不自带操作系统内核**，它和宿主机共用内核，只是用 Linux 的 namespace/cgroup 把进程"关"在自己的小房间里。所以又轻又快。

---

## 2. 核心概念

- **镜像（Image）**：只读的模板，相当于"装机光盘"。由一层层只读层叠加而成（每一层是一个 Dockerfile 指令）。
- **容器（Container）**：镜像运行起来的实例，相当于"用光盘装好并开机的电脑"。容器可读写，镜像是它的只读底层。
- **仓库（Registry）**：存镜像的地方。Docker Hub 是公共仓库；公司里常用私有仓库（阿里云、Harbor）。`pull` 拉下来，`push` 传上去。
- **Dockerfile**：一份文本"配方"，告诉 Docker 怎么一步步构建镜像。
- **卷（Volume）**：容器里的文件默认随容器删除而消失，卷用来把数据持久化到宿主机。
- **网络（Network）**：容器之间、容器与宿主机的通信方式。

---

## 3. 安装

- **Windows / macOS**：装 [Docker Desktop](https://www.docker.com/products/docker-desktop/)，图形界面带命令行。
- **Linux（Ubuntu 示例）**：
  ```bash
  curl -fsSL https://get.docker.com | sh
  sudo systemctl enable --now docker
  sudo usermod -aG docker $USER   # 免 sudo 跑 docker（退出重登生效）
  ```
- 验证：
  ```bash
  docker version
  docker run hello-world     # 拉取测试镜像并运行
  ```

---

## 4. 镜像相关命令

```bash
docker pull nginx:alpine          # 从仓库拉镜像（:tag 指定版本，不写默认 latest）
docker images                     # 列出本地镜像
docker build -t myapp:1.0 .       # 用当前目录的 Dockerfile 构建，打标签
docker tag myapp:1.0 myrepo/myapp:1.0   # 改标签（准备 push）
docker push myrepo/myapp:1.0      # 推到仓库
docker rmi myapp:1.0              # 删本地镜像（有容器在用会报错）
docker image prune                # 清掉没有被用的悬空镜像
```

---

## 5. 容器相关命令

```bash
# 跑一个容器（最常用）
docker run -d --name web -p 8080:80 nginx
#   -d        后台运行（detached）
#   --name    起个名字，方便后续操作
#   -p 8080:80 把宿主 8080 映射到容器 80（对外访问用宿主端口）
#   nginx     镜像名

docker ps                         # 看正在跑的容器
docker ps -a                      # 看所有（包括已退出的）
docker stop web                   # 停止
docker start web                  # 启动已停止的
docker restart web                # 重启
docker rm web                     # 删除容器（-f 强制删运行中的）
docker logs web                   # 看容器日志（-f 持续跟踪，排查利器）
docker exec -it web bash          # 进到运行中的容器里敲命令（-it 交互终端）
docker inspect web                # 看容器详细配置（IP、挂载、环境变量）
docker run --rm alpine echo hi   # --rm：退出后自动删除容器，临时用完即弃
```

几个高频组合：
- 临时调试：`docker run --rm -it node:18 bash`（进一个 Node 环境玩完即删）。
- 看资源占用：`docker stats`。
- 一键清理所有停止的容器：`docker container prune`。

---

## 6. Dockerfile 核心指令

一个最小示例（Node 应用）：

```dockerfile
# 1. 基础镜像：从哪个"底"开始
FROM node:18-alpine

# 2. 设置工作目录（容器内的路径）
WORKDIR /app

# 3. 先拷依赖清单，利用缓存层（这层不常变，放前面）
COPY package*.json ./
RUN npm ci

# 4. 再拷源码
COPY . .

# 5. 容器启动时执行的命令
EXPOSE 3000
CMD ["npm", "start"]
```

常用指令速查：

| 指令 | 作用 |
|------|------|
| `FROM <镜像>` | 指定基础镜像（必写第一行） |
| `WORKDIR <路径>` | 设置后续命令的工作目录 |
| `COPY <源> <目标>` | 从宿主机拷文件进镜像 |
| `ADD` | 类似 COPY，还能自动解压 tar、拉 URL（能用 COPY 就别用 ADD） |
| `RUN <命令>` | 构建时执行，每一条生成一个镜像层 |
| `ENV <k>=<v>` | 设置环境变量 |
| `EXPOSE <端口>` | 声明容器监听的端口（只是文档作用，真正映射靠 `-p`） |
| `CMD` | 容器启动时默认命令（可被 `docker run` 后面的命令覆盖） |
| `ENTRYPOINT` | 容器入口，和 CMD 配合：`ENTRYPOINT` 定死程序，`CMD` 当参数 |
| `USER` | 切换运行用户（别都用 root，安全） |
| `.dockerignore` | 类似 `.gitignore`，排除不需要拷进镜像的文件（node_modules、.git 等） |

---

## 7. 多阶段构建（瘦身关键）

构建时要用编译器/依赖，运行时却不需要。多阶段构建把"构建环境"和"运行环境"分开，最终镜像只留运行必需的东西：

```dockerfile
# 阶段一：build（装全部依赖，编译）
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 阶段二：runtime（只拿构建产物 + 运行时不多的东西）
FROM node:18-alpine AS runtime
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]
```

这样最终镜像不含源码和 devDependencies，体积能小好几倍。

---

## 8. 数据持久化：卷与挂载

容器文件系统是临时的，删容器数据就没了。要持久化用两种方式：

```bash
# 命名卷（Docker 管理，推荐存数据库数据）
docker run -d --name db -v pgdata:/var/lib/postgresql/data postgres
#   -v 卷名:容器路径

# 绑定挂载（直接挂宿主机目录，方便看文件/改配置）
docker run -d -v /home/me/app:/app nginx
```

- **卷（volume）**：Docker 在宿主机专门管的一块存储，备份迁移方便，适合数据库。
- **绑定挂载（bind mount）**：直接映射宿主机某个目录，开发时改代码容器立刻生效，适合挂载代码/配置。

---

## 9. 网络：容器互联

默认容器在一个 `bridge` 网络里，可以互相按**容器名**访问（Docker 内置 DNS）：

```bash
docker network create mynet
docker run -d --name redis --network mynet redis
docker run -d --name web --network mynet myapp   # web 里用 redis:6379 就能连上
```

常用网络模式：
- `bridge`（默认）：容器间通过桥互通，对外靠 `-p` 映射。
- `host`：容器直接用宿主机网络（无隔离，性能高，少端口转换）。
- `none`：无网络。

---

## 10. docker-compose：一条命令起多服务

写多个容器（如 应用 + 数据库 + 缓存）一个个 `docker run` 太累。`docker-compose.yml` 一份配置描述全部服务、网络、卷，一条 `docker compose up -d` 全起。

完整讲法（YAML 字段速查、`.env` 多环境、健康检查、与 K8s 区别、实战）我单独成篇了，见 [Docker Compose](../docker-compose/docker-compose.md)。这里只给个最小示例感受一下：

```yaml
# docker-compose.yml
services:
  web:
    build: .
    ports: ["8080:3000"]
    environment: [DB_HOST=postgres]
    depends_on: [postgres]
  postgres:
    image: postgres:15
    environment: [POSTGRES_PASSWORD=secret]
    volumes: ["pgdata:/var/lib/postgresql/data"]
volumes:
  pgdata:
```

常用命令：`docker compose up -d`（后台起全部）、`docker compose down`（停并删，加 `-v` 连卷删）、`docker compose logs -f web`（看某服务日志）、`docker compose ps`（看状态）。

`depends_on` 只管启动顺序，不管"ready"；真要等数据库就绪，应用里加重试逻辑（连接失败睡一秒再试），更稳妥是用 `healthcheck`。

---

## 11. 部署到服务器

本地构建好镜像，推到仓库，服务器拉下来跑：

```bash
# 本地
docker build -t myrepo/myapp:1.0 .
docker push myrepo/myapp:1.0

# 服务器
docker pull myrepo/myapp:1.0
docker run -d -p 80:3000 --name myapp myrepo/myapp:1.0
```

也可以直接把 `docker-compose.yml` 传到服务器，`docker compose up -d` 一键起。前面 [Python Web 部署](../../backend/python/python-web.md) 用的就是这套思路。生产环境一般会再套一层 Nginx（反向代理 + HTTPS）和 K8s（多实例编排），本分类后续会补。

---

## 12. 常见坑

1. **镜像太大**：用 `alpine` 基础镜像、多阶段构建、`.dockerignore` 排除 `node_modules`，三层一起能砍掉 90% 体积。
2. **容器一启动就退出**：`CMD` 跑完前台进程就退了。确保主进程在前台跑（如 `npm start` 不是 `npm start &`），别让 CMD 是 `echo` 这种一闪而过。
3. **数据没持久化**：忘了挂卷，容器一删数据库数据全没。数据库务必挂 volume。
4. **不要用 `latest` 标签上生产**：版本飘忽，回滚困难，固定版本号。
5. **别把密钥写进镜像**：密码写 `ENV` 或硬编码会进镜像层，用 `-e` 运行时传或挂 secret。
6. **`CMD` vs `ENTRYPOINT` 混淆**：想可被 `docker run` 覆盖用 CMD；想锁死入口（如固定跑某程序、只收参数）用 ENTRYPOINT。
7. **时区不对**：alpine 默认 UTC，应用日志时间错位，可在 Dockerfile 装 `tzdata` 设 `TZ=Asia/Shanghai`。
8. **缓存层顺序**：把不变的东西（依赖安装）放前面、常变的（源码）放后面，能大幅加速重建。

---

## 13. 练习

1. 给一个你写过的 Node 或 Python 应用写 Dockerfile，本地 `docker build` + `docker run -p` 跑起来，浏览器能访问。
2. 用多阶段构建改造上面的 Dockerfile，对比前后镜像体积（`docker images`）。
3. 写一个 `docker-compose.yml`：起一个 `redis` + 一个用 redis 的简易应用（或随便哪个官方镜像），实现 `up -d` 后应用能连上 redis。
4. 用命名卷跑一个 postgres，进容器 `docker exec` 建张表，删容器再 `docker run` 同名卷重新挂上，确认数据还在。
5. 把镜像推到 Docker Hub（注册账号），然后在另一台机器 `docker pull` 跑起来，验证"一次构建到处运行"。

---

## 14. 下一步（本分类其他文档）

- 多容器编排 → [Docker Compose](../docker-compose/docker-compose.md)（从本文第 10 章拆出的独立文档）
- 多实例集群编排 → [Kubernetes](../k8s/k8s.md)
- 推代码自动构建部署 → [CI/CD](../cicd/cicd.md)
- 反向代理与 HTTPS → [Nginx](../nginx/nginx.md)
- 服务器与排障 → [Linux 服务器基础](../linux/linux.md)、[监控与日志](../monitoring/monitoring.md)

回到 [运维与部署总览](../index.md) 看路线图。
