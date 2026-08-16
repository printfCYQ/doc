# Mac 生成Android签名证书 .keystore文件

## 安装JDK

-   .......

[链接](https://www.yuque.com/docs/share/a4fb5f08-0b4e-4440-bec9-0c6fed403135?#%20《JDK》)

## 生成证书

```javascript
keytool -genkey -v -keystore 【证书名.keystore】 -alias 【证书别名】-keyalg RSA -validity 20000 -keystore 【存储路径】
```

-   例如

```javascript
keytool -genkey -v -keystore unipush.keystore -alias unipush -keyalg RSA -validity 20000 -keystore /Users/cyq/Desktop/uni.push.keystore
```



> warning 好像不用管

## **查看文件**

```javascript
keytool -list -v -keystore 【证书存储路径】
```

-   例如

```javascript
keytool -list -v -keystore /Users/cyq/Desktop/uni.push.keystore
```



  

# iOS证书(.p12)和描述文件(.mobileprovision)申请

> [https://ask.dcloud.net.cn/article/152](https://ask.dcloud.net.cn/article/152)

> 要钱😭

> 同事的文档 ： [证书制作手册(1).docx](https://www.yuque.com/attachments/yuque/0/2022/docx/12390231/1667294731238-ad082761-4d17-468e-beee-bf1ab8ba2fb0.docx)

## app Store 上架

[App Store发布手册(1).docx](https://www.yuque.com/attachments/yuque/0/2023/docx/12390231/1682210887782-00163971-a354-4eaa-a64e-7a950f98077f.docx)
