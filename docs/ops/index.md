# 运维与部署

把写好的程序稳定、可重复地跑在服务器上，并且环境一致、出问题能排查——这门手艺就叫运维与部署。这个分类专门收这一类"让代码真正跑起来并活下去"的工具和实践。

## 目前收录

- [Docker](./docker/docker.md)：容器化，把应用和它依赖的运行环境打包成可移植的镜像，本地和服务器跑得一模一样。
- [Docker Compose](./docker-compose/docker-compose.md)：一条命令起多个互联容器（应用 + 数据库 + 缓存），单机多服务编排。
- [Kubernetes](./k8s/k8s.md)：容器编排，管理成百上千容器，自动扩缩容、自愈、滚动发布。
- [CI/CD](./cicd/cicd.md)：GitHub Actions / GitLab CI，推代码自动测试、构建镜像、部署。
- [Nginx](./nginx/nginx.md)：反向代理、负载均衡、静态资源服务、HTTPS。
- [Linux 服务器基础](./linux/linux.md)：SSH、防火墙、systemd、日志排查、进程与磁盘。
- [监控与日志](./monitoring/monitoring.md)：Prometheus / Grafana 指标、ELK 日志、可观测性三支柱。

## 学习路线建议

1. 先 [Docker](./docker/docker.md) 打底，理解镜像/容器/卷/网络。
2. 用 [Compose](./docker-compose/docker-compose.md) 把"应用 + 数据库 + 缓存"一条命令拉起。
3. 补 [Linux](./linux/linux.md) 和 [Nginx](./nginx/nginx.md)，把服务稳稳跑在真实服务器上并对外暴露。
4. 想"推代码自动上线"就上 [CI/CD](./cicd/cicd.md)。
5. 规模变大、要多节点高可用，迁到 [Kubernetes](./k8s/k8s.md)。
6. 最后用 [监控与日志](./monitoring/monitoring.md) 盯住它活得好不好。

> 这个分类是"工具容器"，以后还会陆续补（如 Helm、Terraform、服务网格、Vault）。先掌握 Docker，上面这些才接得住——它是一切现代部署的地基。
