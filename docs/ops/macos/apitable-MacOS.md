> [https://github.com/apitable/apitable/blob/develop/docs/readme/zh-CN/docs/contribute/developer-guide.md](https://github.com/apitable/apitable/blob/develop/docs/readme/zh-CN/docs/contribute/developer-guide.md)
```javascript
brew install git
brew install --cask docker
brew install make
brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
```
```javascript
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
```javascript
brew -v
```
```javascript
git clone https://github.com/apitable/apitable.git
```
```javascript
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash

nvm install 16.15.0 && nvm use 16.15.0 && corepack enable
```
```javascript
node -v
// v16.15.0
```
```javascript
curl -s "https://get.sdkman.io" | bash

source "$HOME/.sdkman/bin/sdkman-init.sh"

// cd apitable
sdk env install
```
```javascript
javac -version 
// javac 1.8.0_362
```
```javascript
curl -sSf https://sh.rustup.rs | sh -s -- --default-toolchain nightly --profile minimal -y && source "$HOME/.cargo/env"
```
```javascript
 // 在 Docker 中启动数据库
make dataenv 
 // 安装依赖关系
make install 
 // 启动 backend-server
make run # enter 1  
 // 然后切换到新的终端
 // 启动 room-server
make run # enter 2
 // 然后切换到新的终端
 // 启动 web-server
make run # enter 3
```

## make dataenv

-   
-   ......
-   

## make install

-   
-   ......
-   

## make run



-   1

-   

-   2

-   

-   3

-
