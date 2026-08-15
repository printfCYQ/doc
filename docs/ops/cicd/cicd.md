# CI/CD 笔记

你写完代码，手动 `ssh` 上服务器、`git pull`、`docker build`、`docker run`……一次两次还行，天天这样：容易漏步骤、容易配错、还占你时间。更糟的是多人协作，每个人提交都可能把别人的环境搞坏。

**CI/CD** 把"拉代码→测试→构建→部署"这条流水线自动化：你只管 `git push`，剩下的机器全包了。

> 前置：[Docker](../docker/docker.md) 和 [Compose](../docker-compose/docker-compose.md) 基础；本文以 GitHub Actions 为主，它免费、和 GitHub 集成最好。

---

## 1. 概念

- **CI（Continuous Integration，持续集成）**：频繁把代码合并到主干，每次合并**自动跑测试和构建**，尽早发现冲突和错误。核心："合并即验证"。
- **CD（Continuous Delivery / Deployment，持续交付/部署）**：CI 通过后，自动把产物**准备好**（Delivery，手动点一下部署）或**直接部署上线**（Deployment，全自动）。

一句话区分：CI 是"自动测 + 自动打包"，CD 是"自动发"。

---

## 2. 为什么值得

| 手动部署 | CI/CD |
|---|---|
| 容易忘步骤、配错 | 流程写死在文件里，每次一致 |
| 测试靠人记着跑 | 每次 push 自动跑，拦住坏代码 |
| 上线慢、怕出错 | 一键或自动，几分钟内 |
| 新人无从下手 | 看 workflow 文件就懂全套流程 |

---

## 3. GitHub Actions 实战

配置文件放在仓库 `.github/workflows/` 目录，YAML 格式。一个最基础的 Node 项目 CI：

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4        # 拉代码
      - uses: actions/setup-node@v4       # 装 Node
        with:
          node-version: 18
          cache: npm                      # 缓存依赖，加速
      - run: npm ci
      - run: npm test
```

几个关键概念：
- `on`：触发条件（`push` / `pull_request` / 定时 `schedule` / 手动 `workflow_dispatch`）。
- `jobs`：一组**并行**的任务，每个跑在独立干净的环境（虚拟机/容器）。
- `steps`：job 里的步骤，按顺序执行；`uses` 调现成动作，`run` 执行 shell 命令。
- `needs`：声明 job 依赖，如 `deploy` 需要 `needs: [build]`。

---

## 4. 矩阵：多版本一起测

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node: [16, 18, 20]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: ${{ matrix.node }} }
      - run: npm ci && npm test
```

一次性在 Node 16/18/20 上各跑一遍测试，省事且覆盖全。

---

## 5. 缓存与产物

```yaml
      - name: 缓存依赖
        uses: actions/cache@v4
        with:
          path: ~/.npm
          key: npm-${{ hashFiles('package-lock.json') }}

      - name: 上传构建产物
        uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/
```

`cache` 避免每次重装依赖；`upload-artifact` 把构建结果（如打包好的 `dist/`）留给后面的 job 或手动下载。

---

## 6. 完整流水线：测 → 构建镜像 → 部署

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push: { branches: [main] }

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USER }}
          password: ${{ secrets.DOCKER_TOKEN }}
      - uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: myrepo/myapp:${{ github.sha }}    # 用 commit 号当标签，可追溯

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: 部署到服务器
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            docker pull myrepo/myapp:${{ github.sha }}
            docker stop myapp || true
            docker rm myapp || true
            docker run -d -p 80:3000 --name myapp myrepo/myapp:${{ github.sha }}
```

要点：
- 密钥放 **Repository Settings → Secrets**，用 <code v-pre>${{ secrets.XXX }}</code> 引用，绝不写进代码。
- 镜像标签用 `github.sha`（commit 哈希），每次唯一、可回滚。
- `deploy` 用 `needs` 等构建完，SSH 上服务器拉新镜像重启。

想更优雅可配合 [Docker Compose](../docker-compose/docker-compose.md)（服务器上 `docker compose pull && up -d`）或 [Kubernetes](../k8s/k8s.md)（`kubectl set image`）。

---

## 7. GitLab CI 对比

GitLab 用仓库根目录的 `.gitlab-ci.yml`，概念类似但写法不同：

```yaml
stages: [test, build, deploy]

test:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm test

build:
  stage: build
  script:
    - docker build -t myapp:$CI_COMMIT_SHA .
    - docker push myapp:$CI_COMMIT_SHA

deploy:
  stage: deploy
  script:
    - ssh user@host "docker pull myapp:$CI_COMMIT_SHA && docker restart myapp"
  only: [main]
```

区别：GitLab 用 `stages` + `stage` 声明顺序，每个 job 自带 `script`；GitHub Actions 用 `jobs` + `needs`。本质一样：定义"哪些阶段、每阶段跑什么"。

---

## 8. 常见坑

1. **密钥泄露**：把 token/密码写进 workflow 或打进镜像层，等于公开。一律用 Secrets。
2. **`npm ci` 不是 `npm install`**：CI 环境用 `npm ci`（严格按 lock 文件、更快、可复现），别用 `install` 飘版本。
3. **缓存键没含 lock 文件**：<code v-pre>key: npm-${{ hashFiles('package-lock.json') }}</code>，依赖变了缓存才失效，否则装的是旧包。
4. **测试依赖外部服务**：CI 没有你的数据库。用 **服务容器**（`services: postgres`）或 mock。
5. **部署步骤没做幂等**：重复跑应安全，`docker stop || true` 避免第一次没有容器而报错中断。
6. **标签用 latest**：回滚时找不到上一版。用 commit sha 或语义化版本。
7. **忘记 `needs`**：job 默认并行，部署在构建前跑会拉不到镜像。
8. **Windows 换行符**：Windows 提交的 shell 脚本带 CRLF，Linux runner 执行报 "no such file"，加 `.gitattributes` 统一。

---

## 9. 练习

1. 给一个自己的仓库加 `.github/workflows/ci.yml`，push 后确认 Actions 面板自动跑了测试。
2. 加矩阵，在 Node 16 和 18 上各测一遍。
3. 用 `docker/build-push-action` 把项目打包成镜像推到 Docker Hub（先建 Secrets）。
4. 配一个 SSH 部署 job，push 到 main 自动上服务器拉镜像重启（可用一台测试机或本地虚拟机）。
5. 故意让测试失败一次，确认流水线变红、拦住了"坏提交"。

---

回到 [运维与部署总览](../index.md)。相关：[Docker](../docker/docker.md)、[Compose](../docker-compose/docker-compose.md)、[Kubernetes](../k8s/k8s.md)。
