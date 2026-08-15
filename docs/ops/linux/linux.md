# Linux 服务器基础笔记

你的应用最终大多跑在 Linux 服务器上。你不一定当运维，但至少得会：连上服务器、部署文件、看日志、排查"为什么挂了"。这篇就是够用的"服务器生存技能"。

> 前置：会一点命令行基础最好；本文偏实用，遇到不懂的概念（进程、权限位）可回看 [操作系统](../../basic/os/os.md)。

---

## 1. 发行版

- **Ubuntu / Debian**：用 `apt`，社区大、教程多，新手首选。
- **CentOS / Rocky / Alma**：原 CentOS 停更，衍生版接棒，用 `yum`/`dnf`，企业常见。
- **Alpine**：极小（几 MB），[Docker](../docker/docker.md) 基础镜像常用，包管理 `apk`。

云厂商（阿里云/腾讯云/AWS）镜像随便选，个人学习 Ubuntu 最省心。

---

## 2. SSH 连服务器

```bash
ssh user@1.2.3.4                 # 密码登录
ssh -p 2222 user@host             # 指定端口

# 密钥登录（推荐，免密码还更安全）
ssh-keygen -t ed25519             # 生成本地密钥对
ssh-copy-id user@host             # 把公钥传到服务器
```

安全加固（改 `/etc/ssh/sshd_config` 后 `sudo systemctl restart sshd`）：
- 禁密码登录：`PasswordAuthentication no`
- 禁 root 直接登：`PermitRootLogin no`
- 改默认端口：减少被扫

---

## 3. 用户与权限

```bash
sudo useradd -m deploy            # 建用户
sudo passwd deploy                # 设密码
sudo usermod -aG sudo deploy      # 加 sudo 组
sudo su - deploy                  # 切换用户
```

权限是 Linux 的核心，文件有"读 r / 写 w / 执行 x"三种，分给"所有者 / 组 / 其他人"：

```bash
ls -l file.txt
# -rw-r--r--  1 alice staff  1024 Aug 1 10:00 file.txt
#  ↑所有者rw  组r   其他人r

chmod 644 file.txt     # 数字法：所有者rw，组和其他r
chmod +x script.sh     # 加执行权限
chmod u+x file         # 只给所有者加执行
chown deploy:deploy file   # 改所有者和组
```

数字法速记：`r=4 w=2 x=1`，三位数分别是 所有者/组/其他。

---

## 4. 包管理

```bash
# Ubuntu / Debian
sudo apt update && sudo apt upgrade -y
sudo apt install nginx curl htop

# CentOS / Rocky
sudo dnf install nginx
```

装软件、更新系统全靠它。部署前先 `update`。

---

## 5. 防火墙

```bash
# Ubuntu 用 ufw
sudo ufw allow 22            # 放行 SSH
sudo ufw allow 80,443/tcp    # 放行 Web
sudo ufw enable              # 开启（小心别把自己挡外面）
sudo ufw status

# CentOS 用 firewalld
sudo firewall-cmd --add-port=80/tcp --permanent
sudo firewall-cmd --reload
```

之前配的 [Nginx](../nginx/nginx.md) 起好了外部连不上？十有八九是防火墙没放行端口。

---

## 6. systemd：服务管理

现代 Linux 用 systemd 管后台服务。把你的应用注册成 service，开机自启、崩溃可查：

```bash
# /etc/systemd/system/myapp.service
[Unit]
Description=My App
After=network.target

[Service]
ExecStart=/usr/bin/node /opt/myapp/app.js
WorkingDirectory=/opt/myapp
User=deploy
Restart=always              # 崩了自动重启
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now myapp     # 开机自启并立即启动
sudo systemctl status myapp           # 看状态
sudo systemctl restart myapp
sudo journalctl -u myapp -f           # 看这个服务的日志（排查利器）
```

`journalctl -u <服务>` 替代了翻 `/var/log` 的老办法，按服务聚合。

---

## 7. 进程管理

```bash
ps aux | grep node          # 看进程
top                          # 实时看 CPU/内存占用（htop 更友好）
kill 1234                   # 正常结束 PID 1234
kill -9 1234                # 强制杀（救命用，可能丢数据）
nohup node app.js &         # 后台跑（关终端不中断）
```

---

## 8. 磁盘与文件

```bash
df -h                        # 看磁盘剩余
du -sh /var/log/*            # 看某目录占用
find /opt -name "*.log"      # 找文件
tar -czf app.tar.gz /opt/app # 打包
tar -xzf app.tar.gz          # 解包
ln -s /opt/app /app          # 软链接
```

---

## 9. 网络排查

服务起好了外部访问不了？按顺序查：

```bash
curl http://localhost:3000          # 本机能不能通（排除应用问题）
ss -tlnp | grep 3000                # 端口有没有在监听
ping 8.8.8.8                        # 网络通不通
curl -I https://example.com         # 外部 HTTP 头
nc -zv host 443                     # 测端口连通性
```

经典链路：`应用监听 → 防火墙放行 → [Nginx](../nginx/nginx.md) 转发 → 域名解析 → 外部网络`，哪环断了一查便知。

---

## 10. 文本与编辑

```bash
cat file | less                 # 翻页看
grep "ERROR" app.log            # 搜日志
tail -f app.log                 # 实时跟踪日志尾部（排错常驻）
vim file                        # 编辑（i 进入编辑，Esc :wq 保存退出）
```

`tail -f` 看实时日志，`grep` 过滤 ERROR，是排查问题的组合拳。

---

## 11. 常见坑

1. **改 sshd 配置把自己锁外面**：禁密码前先确认密钥能登；改完另开一个会话试连，再关旧的。
2. **`chmod 777` 滥权**：图省事给所有权限，等于谁都能改，安全隐患大。按需给最小权限。
3. **防火墙 enable 前没放行 22**：一开 ufw 就连不上 SSH，云服务器得进控制台救。
4. **systemd 的 `Restart` 忘设**：应用崩了不自动拉起，半夜挂了没人知道。
5. **`kill -9` 滥用**：强制杀可能留脏数据/锁文件，能正常 `kill` 就别 `-9`。
6. **磁盘写满**：日志/镜像不清理，`df -h` 100% 后服务全挂。定期清或挂大盘。
7. **装软件前没 `apt update`**：装的可能是旧版本或索引失效报错。
8. **root 直接跑应用**：权限过大，被入侵就是整机沦陷。建专用用户跑。

---

## 12. 练习

1. 搞一台云服务器或本地虚拟机（Ubuntu），用密钥 SSH 登录，并关掉密码登录。
2. 建一个 `deploy` 用户加 sudo，用它登录部署一个小应用。
3. 把你的 Node/Python 应用写成 systemd service，`enable --now` 后重启服务器确认自启。
4. 用 `journalctl -u 你的服务 -f` 看实时日志，故意让应用报错，确认能看到。
5. 配置 ufw 只放行 22/80/443，用 `ss -tlnp` 确认端口监听，从外部 `curl` 验证访问。

---

回到 [运维与部署总览](../index.md)。相关：[Nginx](../nginx/nginx.md)、[监控与日志](../monitoring/monitoring.md)、[Docker](../docker/docker.md)。
