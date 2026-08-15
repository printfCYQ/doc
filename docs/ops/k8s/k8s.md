# Kubernetes（K8s）笔记

[Docker](../docker/docker.md) 和 [Compose](../docker-compose/docker-compose.md) 解决了"单机跑容器"。但真实生产要的是：几十上百个容器分布在多台机器上、挂了自动重启、流量大了自动加实例、发版不中断服务。这些 Docker 本身不管，交给 **Kubernetes（简称 K8s）**。

打个比方：Docker 是"造集装箱"，Compose 是"一个小码头的吊车排班表"，Kubernetes 是"全球港口调度系统"——它决定每个集装箱放哪艘船、哪艘船坏了立刻换、货多了加船、全程无人值守。

> 前置：[Docker](../docker/docker.md) 基础必看；[Compose](../docker-compose/docker-compose.md) 有助于理解"为什么需要编排"。

---

## 1. 核心概念

K8s 把"运行什么、怎么暴露、配置从哪来"拆成一组**资源对象**，用 YAML 描述，交给集群去落实。

| 概念 | 是什么 | 类比 |
|------|--------|------|
| **Pod** | 最小调度单位，一个/多个紧密耦合的容器 | 一个"装箱单元" |
| **Deployment** | 管理 Pod 的副本数、版本、滚动更新 | "保证始终有 N 个 Pod 在跑"的管家 |
| **Service** | 给一组 Pod 一个稳定访问入口（VIP） | 固定的"前台电话号" |
| **Ingress** | 把外部 HTTP 流量按域名/路径路由到 Service | 园区门口的"导览牌" |
| **ConfigMap** | 存非机密配置（环境变量、配置文件） | 配置抽屉 |
| **Secret** | 存机密（密码、token），base64 编码 | 保险柜 |
| **Namespace** | 逻辑隔离（dev/test/prod） | 大楼里的不同楼层 |
| **PV / PVC** | 持久卷 / 持久卷申请（存储） | 租的仓库 / 租约 |
| **Node** | 一台工作机器（物理机或虚拟机） | 一艘船 |

Pod 里的容器**共享网络命名空间和存储卷**，所以同一个 Pod 内容器可用 `localhost` 互访。但一般一个 Pod 只放一个主容器 + 偶尔一个"边车"（sidecar，如日志收集器）。

---

## 2. 架构

一个 K8s 集群分两大部分：

**控制平面（Control Plane，大脑）**：
- `kube-apiserver`：所有操作的入口（kubectl 都打它）
- `etcd`：集群状态的分布式数据库（唯一真相源）
- `kube-scheduler`：决定 Pod 调度到哪个 Node
- `kube-controller-manager`：一堆控制器，保证"实际状态=期望状态"（如副本数不足就新建）

**工作节点（Node，干活的）**：
- `kubelet`：节点上的代理，按 apiserver 指令管本机 Pod
- `kube-proxy`：维护网络规则，实现 Service 的负载均衡
- 容器运行时：真正跑容器的（containerd / CRI-O，不再用 Docker 本身）

关键思想：**声明式**——你告诉 K8s"我要 3 个副本"，它自己想办法达到并维持，挂一个立刻补一个（自愈）。

---

## 3. 本地玩起来

不用真买服务器，本地起个单节点集群：

```bash
# 方案 A：minikube（最经典）
brew install minikube
minikube start

# 方案 B：kind（用 Docker 跑 K8s 节点，更轻）
brew install kind
kind create cluster

# 装命令行工具
brew install kubectl
kubectl get nodes          # 看节点
kubectl cluster-info       # 看集群信息
```

`kubectl` 是和 K8s 对话的唯一主力工具，下面全是它。

---

## 4. 实战：部署一个 Web 服务

一个典型 Deployment + Service：

```yaml
# app.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3                 # 要 3 个副本
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: myrepo/myapp:1.0
          ports:
            - containerPort: 3000
          resources:
            requests: { cpu: "100m", memory: "128Mi" }
            limits:   { cpu: "500m", memory: "256Mi" }
---
apiVersion: v1
kind: Service
metadata:
  name: web-svc
spec:
  selector:
    app: web                  # 把请求转发给带这个 label 的 Pod
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP             # 集群内部访问
```

应用并查看：
```bash
kubectl apply -f app.yaml
kubectl get pods
kubectl get svc
kubectl describe pod web-xxxxx     # 排错看事件
kubectl logs web-xxxxx             # 看日志
```

---

## 5. kubectl 常用命令

```bash
kubectl apply -f xxx.yaml     # 创建/更新资源
kubectl get pods -n default   # 看 Pod（-n 指定命名空间）
kubectl get all               # 看所有资源
kubectl describe pod <名>     # 详情（事件、为何未就绪）
kubectl logs <pod> -f         # 跟踪日志
kubectl exec -it <pod> -- bash   # 进容器
kubectl delete -f xxx.yaml    # 删除资源
kubectl scale deploy/web --replicas=5   # 手动扩到 5 副本
kubectl rollout status deploy/web       # 看滚动更新进度
kubectl rollout undo deploy/web         # 回滚到上一版
kubectl port-forward svc/web-svc 8080:80  # 本地访问集群内 Service
```

---

## 6. 滚动更新与回滚

改镜像版本再 `apply`，K8s 默认**滚动更新**：先起新 Pod，就绪了再删旧 Pod，全程不中断：

```bash
kubectl set image deploy/web web=myrepo/myapp:2.0
kubectl rollout status deploy/web
# 出问题？一键回滚
kubectl rollout undo deploy/web
```

零停机发布的基石就在这。

---

## 7. 自愈：探针

K8s 靠**探针**判断容器是否该被重启或摘流量：

- **livenessProbe（存活）**：失败就重启容器。比如健康检查接口 `/healthz` 返回 500 连续几次 → 重启。
- **readinessProbe（就绪）**：失败就从 Service 摘掉流量（不重启）。比如应用启动中要连数据库，没连上就别接流量。

```yaml
livenessProbe:
  httpGet: { path: /healthz, port: 3000 }
  initialDelaySeconds: 10
  periodSeconds: 5
readinessProbe:
  httpGet: { path: /ready, port: 3000 }
  periodSeconds: 5
```

---

## 8. 自动扩缩容（HPA）

流量高峰手动 `scale` 太被动。HPA（Horizontal Pod Autoscaler）按 CPU/内存自动加减副本：

```bash
kubectl autoscale deploy/web --min=3 --max=10 --cpu-percent=70
```

CPU 超 70% 自动加到最多 10 个，回落自动减。前提是 Pod 配了 `resources.requests`（否则 HPA 不知道基准）。

---

## 9. 配置与机密

别把配置和密码写进镜像。

```yaml
# ConfigMap：普通配置
apiVersion: v1
kind: ConfigMap
metadata: { name: web-config }
data:
  LOG_LEVEL: info
  FEATURE_FLAG: "true"
---
# Secret：机密（值是 base64，不是加密！）
apiVersion: v1
kind: Secret
metadata: { name: web-secret }
type: Opaque
data:
  DB_PASSWORD: c2VjcmV0       # echo -n secret | base64
```

Pod 里引用：
```yaml
env:
  - name: LOG_LEVEL
    valueFrom: { configMapKeyRef: { name: web-config, key: LOG_LEVEL } }
  - name: DB_PASSWORD
    valueFrom: { secretKeyRef: { name: web-secret, key: DB_PASSWORD } }
```

---

## 10. 对外暴露：Ingress

Service 的 `ClusterIP` 只能在集群内访问。要对外用 **Ingress**（配合 [Nginx](../nginx/nginx.md) 等控制器）：

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-ingress
spec:
  rules:
    - host: example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service: { name: web-svc, port: { number: 80 } }
```

访问 `example.com` 就路由到 web-svc。HTTPS 证书用 cert-manager 自动签发。

---

## 11. 包管理：Helm（一句话）

手写一堆 YAML 很烦。Helm 是 K8s 的"apt/yum"，用 **Chart**（模板化的 YAML 包）一键部署复杂应用（如 Prometheus、数据库）。`helm install my-redis bitnami/redis` 一条装好。

---

## 12. 常见坑

1. **镜像拉不下来**：集群节点也要能访问镜像仓库；私有仓库要配 `imagePullSecret`。
2. **Pod 一直 Pending**：节点资源不够（CPU/内存 request 超了），或没有满足 nodeSelector/污点容忍。
3. **Service 连不上 Pod**：`selector` 的 label 必须和 Pod 的 `labels` 完全一致，大小写敏感。
4. **Secret 不是加密**：base64 可逆，真机密要上 sealed-secrets / vault / KMS。
5. **探针配错导致反复重启**：`initialDelaySeconds` 太短，应用没起来就被判死，调到合理值。
6. **没设 resources 导致节点被挤爆**：一个 Pod 吃光节点资源，把别的 Pod 挤走。
7. **`kubectl apply` 改了 immutable 字段**：如 `selector`、`PV` 某些字段不可变，得删了重建。
8. **本地用 Docker 跑镜像，K8s 用 containerd**：行为基本一致，但注意镜像格式/架构匹配。

---

## 13. 练习

1. 用 minikube/kind 起本地集群，`kubectl get nodes` 确认 Ready。
2. 把第 4 节的 `app.yaml` apply 上去，确认 3 个 Pod 都 Running，`kubectl logs` 看到启动日志。
3. 用 `kubectl port-forward` 在本地访问 web-svc，验证服务通。
4. `kubectl set image` 改版本做滚动更新，再用 `rollout undo` 回滚，观察 Pod 变化。
5. 加一个 livenessProbe，故意让 `/healthz` 返回 500，看 Pod 是否被重启（describe 看 RestartCount）。

---

回到 [运维与部署总览](../index.md)。相关：[Docker](../docker/docker.md)、[Compose](../docker-compose/docker-compose.md)、[Nginx](../nginx/nginx.md)、[CI/CD](../cicd/cicd.md)。
