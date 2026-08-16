# 部署Nuxt3

```dockerfile

# 设置基础镜像
FROM node:16.15.1

# 设置工作目录
WORKDIR /app

# 复制项目文件到容器中
COPY . /app

# 安装 pnpm
RUN npm install -g pnpm

# 使用 pnpm 安装项目依赖
RUN pnpm install

# 构建 Vue 3 项目
RUN pnpm run build

#5、容器内创建目录/nuxt3
RUN mkdir -p /nuxt3

#6、复制当前的内容到容器内容部目录/nuxt3
RUN cp -r .output/. /nuxt3

#7、切换工作目录到/nuxt3
WORKDIR /nuxt3

#8、暴露端口3000，默认端口
EXPOSE 3000

#12、start
CMD ["node","./server/index.mjs"]

```



```dockerfile
docker build -t printfme .
```
```dockerfile
docker run -p 3030:3000 printfme
```
