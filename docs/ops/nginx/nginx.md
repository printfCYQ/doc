# Nginx 笔记

Nginx（发音 "engine-x"）是个高性能的 Web 服务器，但它在运维里更常干两件事：**反向代理**和**负载均衡**。你部署的 [Docker](../docker/docker.md) 容器、[K8s](../k8s/k8s.md) 服务，前面往往都挡着一层 Nginx。

打个比方：Nginx 像一栋写字楼的**前台 + 总机**。外面的人（用户）只跟前台打交道，前台根据需求把请求转给楼里具体的某家公司（后端服务），还能把活平均分给多个相同的团队（负载均衡），并且替你收发邮件（HTTPS/静态资源）。

> 前置：[Docker](../docker/docker.md) 基础有助于理解"为什么用 Nginx 挡在容器前"；本文覆盖最常用的反向代理与负载均衡。

---

## 1. 正向代理 vs 反向代理

- **正向代理**：帮**客户端**出门（你用它访问外网，如科学上网）。客户端知道自己在用代理。
- **反向代理**：帮**服务端**接客（用户访问 `example.com`，Nginx 在前面把请求转给后端）。用户无感知，以为 Nginx 就是那个服务。

运维说的"上 Nginx"几乎都是**反向代理**：隐藏真实后端、统一入口、做 HTTPS、限流、负载均衡。

---

## 2. 安装

```bash
# Ubuntu / Debian
sudo apt update && sudo apt install nginx
sudo systemctl enable --now nginx

# macOS
brew install nginx

# 验证
nginx -v
curl http://localhost        # 看到欢迎页说明起来了
```

Docker 里也能直接跑：`docker run -d -p 80:80 -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro nginx`。

---

## 3. 配置结构

Nginx 配置是"层级块"结构，主干长这样：

```
nginx.conf
└── events { ... }            # 连接相关全局设置
└── http {
      server {                # 一个虚拟主机（一个站点）
        listen 80;
        server_name example.com;
        location / { ... }    # 按 URL 路径匹配怎么处理
        location /api { ... }
      }
      server { ... }          # 可以有多个 server
    }
```

`http` 里放多个 `server`（不同域名/端口），`server` 里放多个 `location`（不同路径）。实际项目常把每个站点的 `server` 拆到 `/etc/nginx/conf.d/*.conf`，`http` 块 `include` 进来。

---

## 4. 静态资源服务

```nginx
server {
  listen 80;
  server_name example.com;
  root /var/www/html;        # 网站根目录
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;   # 单页应用(SPA)回退到 index.html
  }
}
```

`try_files` 很关键：请求 `/about` 没有对应文件时，回退到 `index.html`，让前端路由（Vue/React）接管。

---

## 5. 反向代理

把请求转给后端（如跑在 3000 端口的 Node 服务）：

```nginx
server {
  listen 80;
  server_name example.com;

  location /api/ {
    proxy_pass http://127.0.0.1:3000/;   # 注意结尾的 / ：会把 /api/ 去掉再转发
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

`proxy_set_header` 把真实客户端信息透传给后端（否则后端看到的都是 Nginx 的 IP）。`proxy_pass` 结尾带 `/` 表示"去掉匹配到的 `/api/` 前缀"，不带 `/` 则保留。

---

## 6. 负载均衡

一个后端扛不住，起多个相同实例，Nginx 把流量分摊：

```nginx
upstream backend {
  # 默认轮询：请求依次分给下面几个
  server 127.0.0.1:3000;
  server 127.0.0.1:3001;
  server 127.0.0.1:3002;
}

server {
  listen 80;
  location / {
    proxy_pass http://backend;
  }
}
```

分配策略：
- **轮询**（默认）：挨个来。
- **weight**：加权，`server x:3001 weight=3;` 分得多。
- **ip_hash**：同一客户端 IP 总打到同一后端（保持会话）。
- **least_conn**：谁最闲给谁。

某个后端挂了，Nginx 自动剔除（`max_fails` / `fail_timeout` 控制），实现高可用。

---

## 7. HTTPS（Let's Encrypt）

现在网站基本都要 HTTPS。用免费证书 Let's Encrypt + certbot：

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d example.com    # 自动申请并改写 nginx.conf 加 SSL
```

或手写：
```nginx
server {
  listen 443 ssl;
  server_name example.com;
  ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

  location / { proxy_pass http://backend; }
}

# HTTP 全跳 HTTPS
server {
  listen 80;
  server_name example.com;
  return 301 https://$host$request_uri;
}
```

证书 90 天过期，`certbot renew` 配个定时任务自动续。

---

## 8. 其他常用

```nginx
# 开启 gzip 压缩，省带宽
gzip on;
gzip_types text/css application/javascript application/json;

# 限流：防刷
limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;
location /api/ { limit_req zone=one burst=20; proxy_pass http://backend; }

# 返回文件
location /static/ { alias /var/www/static/; }
```

---

## 9. location 匹配规则

同一 `server` 里多个 `location`，优先级从高到低：
1. `location = /path`：**精确**匹配，最高优先级。
2. `location ^~ /path`：前缀匹配，命中后不再看正则。
3. `location ~ \.php$`：正则匹配（区分大小写）；`~*` 不区分。
4. `location /prefix`：普通前缀匹配，最低。

记不住就一句：**`=` 最狠，正则次之，前缀兜底**。

---

## 10. 常用命令

```bash
nginx -t                 # 测试配置文件语法（改完必跑！）
nginx -s reload          # 平滑重载配置（不中断服务）
nginx -s stop            # 立即停止
systemctl reload nginx   # 同上（用 systemd 时）
```

---

## 11. 常见坑

1. **改完没 `nginx -t`**：语法错直接 reload 失败，老配置还在；但 stop 后起不来就全站挂。改完先 `-t`。
2. **`proxy_pass` 结尾 `/` 的坑**：带 `/` 会剥掉 location 前缀，不带则保留，路径对不上后端 404。
3. **HTTPS 证书路径错**：`ssl_certificate` 要用 `fullchain.pem`（含中间证书），只给 `cert.pem` 部分客户端不认。
4. **SPA 刷新 404**：没配 `try_files ... /index.html`，直接访问 `/about` 找不到文件。加上回退。
5. **负载均衡会话丢失**：需要登录态却用默认轮询，用户请求被分到不同实例（无共享 session）。用 `ip_hash` 或把 session 存 Redis。
6. **没透传真实 IP**：后端日志全是 Nginx IP，排查无门。务必 `proxy_set_header X-Real-IP`。
7. **放行端口忘开防火墙**：Nginx 起好了但外部连不上，[Linux 防火墙](../linux/linux.md)没放行 80/443。
8. **`alias` 和 `root` 混用**：`location /static/ { alias /x/; }` 会把 `/static/a` 映射到 `/x/a`；用 `root` 则是 `/x/static/a`，路径差一层。

---

## 12. 练习

1. 装 Nginx，`curl localhost` 看到欢迎页；改 `index.html` 自定义内容。
2. 起一个本地 Node/Python 服务（3000 端口），配 Nginx 反向代理 `example.test` → 3000，hosts 绑本地验证。
3. 起两个后端实例，配 `upstream` 轮询，连续请求观察被分到不同实例（看各自日志）。
4. 给一个 SPA（Vue/React 构建产物）配 `try_files` 回退，刷新子路由不 404。
5. 配 HTTP→HTTPS 301 跳转（可用自签证书练手），确认访问 80 自动跳 443。

---

回到 [运维与部署总览](../index.md)。相关：[Docker](../docker/docker.md)、[Kubernetes](../k8s/k8s.md)、[Linux 服务器基础](../linux/linux.md)。
