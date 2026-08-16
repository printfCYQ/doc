-1.png)

## git

  

```javascript
sudo yum install git
```
```javascript
git --version
```

-2.png)

更新

## nvm

```javascript
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

-   第一步：失败-连接不上

> 在浏览器中打开 `https://github.com/nvm-sh/nvm/blob/v0.38.0/install.sh` 链接，并点击 "Raw" 按钮来获取原始的脚本内容。然后将该脚本内容保存到本地文件，并使用本地文件进行安装。

-3.png)

-4.png)

-5.png)

```javascript
source ~/.bashrc
```

-6.png)

```javascript
node -v
npm -v
```

-7.png)

## docker

```javascript
sudo yum remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-engine
```
```javascript
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

-8.png)

```javascript
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```
```javascript
sudo yum install -y docker-ce docker-ce-cli containerd.io
```
```javascript
sudo systemctl start docker
```
```javascript
sudo systemctl enable docker
```
```javascript
docker --version
```

-9.png)

  

## Docker Compose

```javascript
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
```javascript
sudo chmod +x /usr/local/bin/docker-compose
```
```javascript
docker-compose --version
```

-10.png)

## nginx

```javascript
sudo yum update
```
```javascript
sudo yum install nginx
```
```javascript
sudo systemctl start nginx
```
```javascript
sudo systemctl status nginx
```
```javascript
sudo systemctl enable nginx
```

-11.png)

> 默认情况下，Nginx 的默认网站文件位于 `/usr/share/nginx/html` 目录下。
> 
> 配置文件在`/etc/nginx/nginx.conf`
```javascript
sudo systemctl reload nginx
```

-12.png)

-13.png)
