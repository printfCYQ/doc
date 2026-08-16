## 购买服务器

-   阿里云
-   腾讯云
-   百度云
-   华为云
-   ......

## 安装宝塔

-   [https://www.henghost.com/help/article/581/](https://www.henghost.com/help/article/581/)

## 安装 git

```javascript
yum install git
```

-   问题

-1.png)

-   原因  
    在2022年1月31日，CentOS团队终于从官方镜像中移除CentOS 8的所有包。  
    CentOS 8已于2021年12月31日寿终正非，但软件包仍在官方镜像上保留了一段时间。现在他们被转移到https://vault.centos.org

-   解决

```javascript
sudo sed -i -e "s|mirrorlist=|#mirrorlist=|g" /etc/yum.repos.d/CentOS-*
sudo sed -i -e "s|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g" /etc/yum.repos.d/CentOS-*
```

-   再次安装，成功。

## 安装 nodejs

### 下载

下载地址 [http://nodejs.cn/download/](http://nodejs.cn/download/)

-2.png)

```javascript
cd /usr/local/src

wget https://nodejs.org/dist/v16.15.1/node-v16.15.1-linux-x64.tar.xz
```

-3.png)

### 解压

```javascript
tar xvf node-v16.15.1-linux-x64.tar.xz 
```

-4.png)

### 移动

```javascript
mv node-v16.15.1-linux-x64 /usr/local/nodejs
```

### 环境变量

```javascript
vi /etc/profile.d/node.sh
export NODE_HOME=/usr/local/nodejs
export PATH=${NODE_HOME}/bin:$PATH
```

### 刷新

```javascript
source /etc/profile
```

### 检验

-5.png)

### 安装yarn

```javascript
 curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
 sudo yum install yarn
```

-6.png)

## 安装 nignx

### 下载

```javascript
cd /usr/local/src

wget http://nginx.org/download/nginx-1.20.2.tar.gz
```

### 解压

```javascript
tar -zxvf nginx-1.20.2.tar.gz
```

### 编译

-   指定安装路径

```javascript
cd nginx-1.20.2

./configure --prefix=/usr/local/nignx
```

-   编译

```javascript
make

make install
```

### 启动

```javascript
cd /usr/local/nignx/sbin

./nignx
```

### 检验

```javascript
curl http://localhost:80
```

-7.png)

-8.png)

### 命令

```javascript
1、启动nginx
    ./nginx
2、关闭nginx
	./nginx -s stop
3、重新加载nginx (nginx.conf)
	./nginx -s reload
4、查看版本号
	./nginx -v
```

### 配置

```javascript
https://blog.csdn.net/qq_46312987/article/details/118895520
```

### \*.conf

```bash
server {
  # 监听端口
  listen:80;
  # 域名可以有多个用空格隔开
  # server_name www.w3cschool.cn w3cschool.cn;
  server_name cyq.test.com
  # 对 / 启用反向代理
  location / {
    proxy_set_header X-Real_IP $remote_addr;
  
    # 后端的web服务器可以痛过 X-Forwarded-For 获取用户真实IP
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    
    # 获取真实的请求主机名
    proxy_set_header Host $http_host
    
    # 标识该请求由 nginx 转发
    proxy_set_header X-Nginx-Proxy true;
    
    # 代理到本地的 XXXX 端口服务
    proxy_pass http://127.0.0.1:7001
  }
}
```

​  

## 安装pm2

### 安装

```javascript
npm i pm2 -g
```

### 安装位置

```javascript
find / -name "pm2"
```

-9.png)

### 软链接

```javascript
ln -s /www/server/nodejs/v14.17.6/bin/pm2 /usr/local/bin/pm2
```

### 命令

```javascript
1. 启动

    # pm2 start app.js
    # pm2 start app.js --name my-api   #my-api为PM2进程名称
    # pm2 start app.js -i 0           #根据CPU核数启动进程个数
    # pm2 start app.js --watch   #实时监控app.js的方式启动，当app.js文件有变动时，pm2会自动reload

2. 查看进程

    # pm2 list
    # pm2 show 0 或者 # pm2 info 0  #查看进程详细信息，0为PM2进程id

3. 监控

    # pm2 monit

4. 停止

    # pm2 stop all  #停止PM2列表中所有的进程
    # pm2 stop 0    #停止PM2列表中进程为0的进程

5. 重载

    # pm2 reload all    #重载PM2列表中所有的进程
    # pm2 reload 0     #重载PM2列表中进程为0的进程

6. 重启

    # pm2 restart all     #重启PM2列表中所有的进程
    # pm2 restart 0      #重启PM2列表中进程为0的进程

7. 删除PM2进程

    # pm2 delete 0     #删除PM2列表中进程为0的进程
    # pm2 delete all   #删除PM2列表中所有的进程

8. 日志操作

    # pm2 logs [--raw]   #Display all processes logs in streaming
    # pm2 flush              #Empty all log file
    # pm2 reloadLogs    #Reload all logs

9. 升级PM2

    # npm install pm2@lastest -g   #安装最新的PM2版本
    # pm2 updatePM2                    #升级pm2

10. 更多命令参数请查看帮助

    # pm2 --help
```
