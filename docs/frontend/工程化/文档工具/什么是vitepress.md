# 什么是vitepress

## 什么是vitepress

-   官网：[https://vitepress.vuejs.org](https://vitepress.vuejs.org)
-   中文：[https://vitejs.cn/vitepress/](https://vitejs.cn/vitepress/)

> -   使用以Markdown为中心的内容，它旨在帮助您专注于编写和以最低配置部署。
> -   在真正的SSG + SPA架构中尽情狂欢。静态页面加载，但从那里以100%的交互性吸引用户。
> -   在Markdown中使用Vue的所有功能增强您的内容，同时可以使用Vue自定义您的网站。

## 开始搭建-创建github代码仓库



## 本地运行

-   1.clone项目，初始化

```plain
git clone <url>

cd <项目名>

yarn init -y
```

  

-   2.安装 VitePress

```plain
yarn add --dev vitepress
```

  

-   3.创建第一篇文档

```plain
mkdir docs && echo '# Hello VitePress' > docs/index.md
```

  

-   4.在 `package.json`添加一些`script`

```json
{
    "scripts": {
        "docs:dev": "vitepress dev docs",
        "docs:build": "vitepress build docs",
        "docs:serve": "vitepress serve docs"
    }
}
```



-   5.运行

```plain
yarn docs:dev
```

  

open `http://localhost:5173`  




## 创建 workflows

> 根目录创建 `.github/workflows/jekyll-gh-pages.yml`
> 
> `VITEPRESS` 是变量



  

```plain
name: Deploy
on:
    push:
        branches:
            - main
jobs:
    deploy:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
                with:
                    fetch-depth: 0
            - uses: actions/setup-node@v3
                with:
                    node-version: 16
                    cache: yarn
            - run: yarn install --frozen-lockfile
            
            - name: Build
                run: yarn docs:build
                
            - name: Deploy
                uses: peaceiris/actions-gh-pages@v3
                with:
                    github_token: ${{ secrets.VITEPRESS }}
                    publish_dir: docs/.vitepress/dist
                    # cname: example.com # if wanna deploy to custom domain
```

  

## 生成 github\_token(secrets)

> github 个人主页 Settings Developer settings
> 
> 填好信息，保存后。会给一串字符，复制，下一步使用。



  

> 代码仓库-settings-secret

将刚才的字符填入`Secret`，`Name`是之前提到的`VITEPRESS`,可自定义（输入小写字母，会自动转换大写



## 配置 config.js

> 创建`/docs/.vitepress/config.js`
> 
> 中间填写仓库名称，必须以`/`开始结束

  

```javascript
export default {
    base: "/test-vitepress/",
};
```

## 提交代码

```plain
git commot -m 'commit'
git push
```

## 查看 actions

> 可以查看是否部署成功，绿色为成功，红色为失败。可以点进去看报错信息



## 查看 pages

> actions 成功后，进入 settings/pages（最上面有一个地址，可能会延迟出现）点击直接访问，查看是否成功。



## 结束

> 至此，已完成搭建
> 
> -   github : [代码](https://github.com/printfCYQ/vitepress-website)
> -   vtepress : [blog](https://printfcyq.github.io/vitepress-website/)
