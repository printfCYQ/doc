# eggjs

## eggjs

-   
-   启动`npm run start`

## vue

-   
-   打包`npm run build`打包文件上传到服务器

## nginx 配置

```plain
server {
  listen       7041;
  server_name  localhost:7041;

  #charset koi8-r;

  #access_log  logs/host.access.log  main;

  location / {
      root   /www/wwwroot/cyq-vue-admin/vue2-tdesign-admin;
      index  index.html;
  }

  location /api/ {
        proxy_pass http://127.0.0.1:7001/;
        proxy_set_header Host $host:$server_port;
  }

  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
      root   html;
  }
}
```
