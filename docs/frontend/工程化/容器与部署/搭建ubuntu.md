# 搭建ubuntu

> [https://www.docker.com/](https://www.docker.com/)
```javascript
docker images
```
```javascript
docker pull node:8.14.0
```
```javascript
docker run -it --name 【container】 【12345】 /bin/bash

// container  容器名称
// 12345 镜像ID
```

现在就进入了`容器`内，可以执行`linux`命令

```javascript
exit
```
---
```javascript
docker ps // 正在运行的容器

docker ps -a // 显示所有容器，包括未运行的

```
```javascript
docker start 【12345678】 // 容器ID
```
---

## 搭建ubuntu

```javascript
// 不指定版本，默认最新
docker pull ubuntu
```

  

## 镜像与容器

> 容器和镜像是 Docker 中的两个重要概念，它们之间存在着关系。
> 
> -   镜像（Image）：镜像是一个只读的模板，它包含了运行容器所需的文件系统、应用程序、库以及运行时配置等。镜像是构建容器的基础，可以从镜像创建多个容器。镜像是不可更改的，如果想要修改镜像，需要基于原有镜像创建新的镜像。镜像可以通过 Dockerfile 来定义和构建。
> -   容器（Container）：容器是基于镜像创建的运行实例。它可以被启动、停止、重启、删除等操作。容器是可读写的，可以在容器内部进行文件操作、运行应用程序等。每个容器都是相互隔离的，拥有自己的文件系统、进程空间和网络配置。容器之间可以相互通信，并与外部世界进行交互。
> 
> 关于容器和镜像的关系，可以理解为：
> 
> -   镜像是容器的基础，容器是由镜像创建而来。镜像是静态的，容器是动态的。
> -   通过一个镜像可以创建多个相同的容器，每个容器都是独立的运行实例。
> -   容器可以在启动时指定不同的配置，例如端口映射、环境变量、数据卷等。
> 
> 当你创建一个容器时，Docker 会根据指定的镜像来启动容器，并为容器分配唯一的标识符。容器的状态和文件系统都是可变的，当容器停止后，可以重启、删除或重新创建一个新的容器。
> 
> 总结起来，镜像是用于构建容器的模板，而容器是基于镜像创建的运行实例。

## 镜像

### 查看镜像

```javascript
docker images
```
```javascript
docker images ubuntu
```

### 删除镜像

```javascript
// 注意，只能删除没有被任何容器使用的镜像。
docker rmi <镜像ID>
```

## 其他

```javascript
docker pull <镜像名称>
```
```javascript
docker run <镜像名称>
```
```javascript
// 可以用来重命名镜像或为镜像添加版本号。
docker tag <旧镜像名称> <新镜像名称>
```
```javascript
// 基于 Dockerfile 构建一个镜像，使用 -t 参数指定镜像的名称。
docker build -t <镜像名称> <上下文路径>
```
```javascript
docker push <镜像名称>
```

## 容器

### 查看容器

```javascript
docker ps
```
```javascript
docker ps -a
```
```javascript
// 请将 my_container 替换为你要查看的具体容器的 ID 或名称。
docker ps -a | grep my_container
```

### 删除容器

```javascript
docker rm <容器ID> 或 <容器名称>
```

如果容器正在运行，你需要先停止它，然后再删除。

如果你想要同时删除多个容器，可以在 `docker rm` 命令后面指定多个容器的 ID 或名称，使用空格分隔。

### 停止容器

```javascript
docker stop <容器ID> 或 <容器名称>
```

### 启动容器

```javascript
docker start <容器ID> 或 <容器名称>
```

如果你想要在启动容器时将容器的标准输入连接到你的终端，可以使用 `-i`参数，这样可以在启动容器后直接与容器进行交互。

```javascript
docker start -i <容器ID> 或 <容器名称>
```

  

> -   `docker ps`：列出正在运行的容器列表。
> -   `docker ps -a`：列出所有容器，包括正在运行的和已停止的容器。
> -   `docker create &lt;镜像名称>`：基于指定的镜像创建一个容器，但不启动它。
> -   `docker start &lt;容器ID>`：启动一个已创建的容器。
> -   `docker stop &lt;容器ID>`：停止一个正在运行的容器。
> -   `docker restart &lt;容器ID>`：重启一个正在运行的容器。
> -   `docker rm &lt;容器ID>`：删除一个已停止的容器。注意，只能删除已停止的容器。
> -   `docker exec &lt;容器ID> &lt;命令>`：在一个正在运行的容器中执行指定的命令。
> -   `docker logs &lt;容器ID>`：查看一个容器的日志。
> -   `docker inspect &lt;容器ID>`：查看一个容器的详细信息，包括网络配置、挂载的卷等。
> -   `docker cp &lt;本地文件路径> &lt;容器ID>:&lt;容器内文件路径>`：将本地文件复制到容器内部。
> -   `docker cp &lt;容器ID>:&lt;容器内文件路径> &lt;本地文件路径>`：将容器内部的文件复制到本地。
