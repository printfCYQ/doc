# Expires

> 使网页打开速度更快，使服务器压力减小。

## Expires

> 即过期时间
> 
> Expires: Tue, 28 Feb 2022 22:22:22 GMT



> Expires是服务器时间，可能与客户端时间不一致。导致缓存出现问题

## Cache-Control

> HTTP 1.1 引入
> 
> 设置过期时长
> 
> Cache-Control:max-age=3600 【单位：秒】

| max-age | 单位是秒 |
| --- | --- |
| no-cache | 不使用强缓存 |
| no-store​ | 禁止缓存 |
| private | 只有浏览器可以缓存 |
| public | 浏览器、服务器、代理服务器都可以缓存 |



> 为了更高效：分为
> 
> 强缓存：浏览器可以直接决定使用缓存
> 
> 协商缓存：当缓存过期后，会咨询服务器，服务器告知是否可以使用缓存。
> 
> 304 Not Modified

## Last-Modified

> 服务器资源的最后修改时间
> 
> `If-Modified-Since`



> Last-Modified的以秒级别记录的，资源如果在一秒内发生改变是捕获不到的。所以有了`ETag`

## ETag

> 生成文件唯一标识
> 
> `If-None-Match`



## 缓存读取过程
