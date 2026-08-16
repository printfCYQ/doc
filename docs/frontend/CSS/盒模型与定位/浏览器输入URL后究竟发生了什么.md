# 浏览器输入URL后究竟发生了什么

-   [https://juejin.cn/post/7124553120859815967](https://juejin.cn/post/7124553120859815967)
-   ①用户在地址栏输入内容，浏览器判断后生成相应的`**URL**`并传给网络进程。
-   ②网络进程先查询本地缓存，没有则解析`**URL**`并向`**DNS**`发送请求，得到`**IP**`。
-   ③网络进程先与目标服务器进行`**TCP**`、`**TLS**`多次握手，建立`**TCP**`、`**TLS**`安全连接。
-   ④紧接着组装请求报文，并由各个分层对数据进行封装，最终转为`**0、1**`格式。
-   ⑤基于建立好的连接，利用物理介质传输数据，通过路由器控制数据的传输方向。
-   ⑥请求会先去到`**CDN**`查询是否有缓存的内容，如果没有则继续向下请求。
-   ⑦请求来到LVS后被转发到`**Nginx**`，再由`**Nginx**`转发到`**Gateway**`网关。
-   ⑧`**Gateway**`网关根据配置好的`**API**`分发规则，将请求分发到具体服务。
-   ⑨紧接着再从`**Nacos**`注册中心内，查询出该服务的具体服务实例`**IP**`。
-   ⑩请求来到具体的服务器后，先通过端口号找到具体的`**WEB**`服务进程`**Tomcat**`。
-   ⑪`**Tomcat**`基于`**SpringMVC**`的工作流程为请求定位到具体的`**Java**`后端方法。
-   ⑫线程执行`**Java**`方法时，先去`**Redis**`中查询是否有数据，没有则查询`**MySQL**`。
-   ⑬查询`**DB**`前先通过`**MyBatis**`生成`**SQL**`语句，然后再通过`**DB**`连接执行`**SQL**`。
-   ⑭请求根据已配置的数据源地址，来到`**MySQL**`并执行`**SQL**`语句，从而获得数据。
-   ⑮经过报文组装、数据封装、请求转发等操作，向客户端响应数据(原路返回)。
-   ⑯应答报文经物理介质传输后，最终抵达客户端网络进程(可能会将数据加入缓存)。
-   ⑰网络进程将数据交给浏览器之后，根据情况准备做`**TCP**`四次挥手，断开连接。
-   ⑱浏览器创建渲染子进程，然后根据数据生成渲染树，最后绘制并显示页面。

---
> -   输入网址，解析URL信息，准备发送HTTP请求
> -   判断`协商缓存`和`强缓存`
> 
> -   【[https://www.yuque.com/caiyongqing/sy0ogo/dglus6u1n8tug3if](https://www.yuque.com/caiyongqing/sy0ogo/dglus6u1n8tug3if)】
> 
> -   DNS域名解析【[https://www.yuque.com/caiyongqing/sy0ogo/szrenvei9o1aqtbz](https://www.yuque.com/caiyongqing/sy0ogo/szrenvei9o1aqtbz)】
> -   拿到IP地址后，TCP三次握手【[https://www.yuque.com/caiyongqing/sy0ogo/lmg70ot787syb4dp](https://www.yuque.com/caiyongqing/sy0ogo/lmg70ot787syb4dp)】
> -   发送HTTP请求，【HTTPS加解密】【[https://www.yuque.com/caiyongqing/sy0ogo/on5b09ue402ussbd](https://www.yuque.com/caiyongqing/sy0ogo/on5b09ue402ussbd)】
> -   服务器处理请求并返回HTTP资源
> -   TCP四次挥手，断开连接【[https://www.yuque.com/caiyongqing/sy0ogo/sb43uqt3cz5f1qpc](https://www.yuque.com/caiyongqing/sy0ogo/sb43uqt3cz5f1qpc)】
> -   浏览器渲染【[https://www.yuque.com/caiyongqing/sy0ogo/rqh85w3kwqnimvsn](https://www.yuque.com/caiyongqing/sy0ogo/rqh85w3kwqnimvsn)】
> -   浏览器-事件循环【JS加载机制】【[https://www.yuque.com/caiyongqing/sy0ogo/ea5au4buqw22pqxp](https://www.yuque.com/caiyongqing/sy0ogo/ea5au4buqw22pqxp)】
