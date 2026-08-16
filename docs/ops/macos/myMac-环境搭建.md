##   

## python3

```plain
macOS 默认自带
```
```plain
python3 -V
```

## sdkman

```javascript
curl -s "https://get.sdkman.io" | bash
```
```javascript
source "$HOME/.sdkman/bin/sdkman-init.sh"
```
```javascript
sdk install java
```
```javascript
 export JAVA_HOME=~/.sdkman/candidates/java/current
```
```javascript
echo "export JAVA_HOME=~/.sdkman/candidates/java/current" >> ~/.bashrc
```

## node

### nvm

```javascript
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```
```javascript
cd ~/
  
touch .bashrc

// 重新执行上面的文件
```
```javascript
// 安装成功后，nvm not found.重新加载环境变量
source ~/.bashrc
```
```javascript
nvm install 16.15.0 && nvm use 16.15.0 && corepack enable
```

## git

```plain
Xcode自带
```
```javascript
brew install git
```

## rust

```javascript
curl -sSf https://sh.rustup.rs | sh -s -- --default-toolchain nightly --profile minimal -y && source "$HOME/.cargo/env"
```

## brew

```javascript
https://brew.sh
```
```javascript
(echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> /Users/mac/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```



```javascript
brew install nginx --build-from-source
```

  

  

```basic
brew services list
```



## Maven

```html
brew install maven
```
```html
mvn -version
```



> Apache Maven 3.9.6 (bc0240f3c744dd6b6ec2920b3cd08dcc295161ae)
> 
> Maven home: /opt/homebrew/Cellar/maven/3.9.6/libexec
> 
> Java version: 21.0.1, vendor: Homebrew, runtime: /opt/homebrew/Cellar/openjdk/21.0.1/libexec/openjdk.jdk/Contents/Home
> 
> Default locale: zh\_AL\_#Hans, platform encoding: UTF-8
> 
> OS name: "mac os x", version: "13.3.1", arch: "aarch64", family: "mac"
```html
/opt/homebrew/Cellar/maven/3.9.6/libexec/conf/settings.xml
```

## gradle

```html
brew install gradle
```
```html
gradle --version
```



> \> brew install gradle
> 
> Running \`brew update --auto-update\`...
> 
> \==> Auto-updated Homebrew!
> 
> Updated 2 taps (homebrew/services and homebrew/cask).
> 
> \==> New Casks
> 
> garmin-basecamp
> 
> You have 20 outdated formulae installed.
> 
> \==> Downloading [https://ghcr.io/v2/homebrew/core/gradle/manifests/8.5](https://ghcr.io/v2/homebrew/core/gradle/manifests/8.5)
> 
> ######################################################################### 100.0%
> 
> \==> Fetching gradle
> 
> \==> Downloading [https://ghcr.io/v2/homebrew/core/gradle/blobs/sha256:df09397c2e9](https://ghcr.io/v2/homebrew/core/gradle/blobs/sha256:df09397c2e9)
> 
> ######################################################################### 100.0%
> 
> \==> Pouring gradle--8.5.arm64\_ventura.bottle.tar.gz
> 
> 🍺 /opt/homebrew/Cellar/gradle/8.5: 21,012 files, 433.4MB
> 
> \==> Running \`brew cleanup gradle\`...
> 
> Disable this behaviour by setting HOMEBREW\_NO\_INSTALL\_CLEANUP.
> 
> Hide these hints with HOMEBREW\_NO\_ENV\_HINTS (see \`man brew\`).
> 
> \> gradle --version
> 
> Welcome to Gradle 8.5!
> 
> Here are the highlights of this release:
> 
> \- Support for running on Java 21
> 
> \- Faster first use with Kotlin DSL
> 
> \- Improved error and warning messages
> 
> For more details see [https://docs.gradle.org/8.5/release-notes.html](https://docs.gradle.org/8.5/release-notes.html)
> 
> \------------------------------------------------------------
> 
> Gradle 8.5
> 
> \------------------------------------------------------------
> 
> Build time: 2023-11-29 14:08:57 UTC
> 
> Revision: 28aca86a7180baa17117e0e5ba01d8ea9feca598
> 
> Kotlin: 1.9.20
> 
> Groovy: 3.0.17
> 
> Ant: Apache Ant(TM) version 1.10.13 compiled on January 4 2023
> 
> JVM: 21.0.1 (Homebrew 21.0.1)
> 
> OS: Mac OS X 13.3.1 aarch64

## nginx

```javascript
brew install nginx --build-from-source
```



## docker

```javascript
brew install --cask docker
```



## jenkins

```javascript
brew install jenkins
```
```javascript
 /opt/homebrew/opt/jenkins/bin/jenkins --httpListenAddress=127.0.0.1 --httpPort=8080
```
```javascript
/Users/mac/.jenkins/secrets/initialAdminPassword
```

## database

### mysql

```javascript
brew install mysql@5.7
```
```javascript
==> mysql@5.7
We've installed your MySQL database without a root password. To secure it run:
    mysql_secure_installation

MySQL is configured to only allow connections from localhost by default

To connect run:
    mysql -uroot

mysql@5.7 is keg-only, which means it was not symlinked into /opt/homebrew,
because this is an alternate version of another formula.

If you need to have mysql@5.7 first in your PATH, run:
  echo 'export PATH="/opt/homebrew/opt/mysql@5.7/bin:$PATH"' >> ~/.zshrc

For compilers to find mysql@5.7 you may need to set:
  export LDFLAGS="-L/opt/homebrew/opt/mysql@5.7/lib"
  export CPPFLAGS="-I/opt/homebrew/opt/mysql@5.7/include"

To restart mysql@5.7 after an upgrade:
  brew services restart mysql@5.7
Or, if you don't want/need a background service you can just run:
  /opt/homebrew/opt/mysql@5.7/bin/mysqld_safe --datadir=/opt/homebrew/var/mysql
```
```javascript
brew services start mysql@5.7
```
```javascript
brew services stop mysql@5.7
```
```javascript
// 要设置 MySQL 密码，可以按照以下步骤进行：
// 在终端中运行以下命令以连接到 MySQL 服务器：
mysql -u root -p

// 如果提示您输入密码，请键入 MySQL root 用户的密码或直接回车。
// 输入以下命令以更改 root 用户的密码（假设您要设置新密码为 mynewpassword）: 

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'mynewpassword';

// 重新加载权限表以使更改生效：
FLUSH PRIVILEGES;

// 退出 MySQL 命令行界面：exit;
// 现在，MySQL root 用户的密码已更改为 mynewpassword。请确保将其替换为您选择的强密码。
```



```html
brew info mysql@5.7
```

### mongodb

```basic
brew tap mongodb/brew
brew install mongodb-community
```
```basic
brew services start mongodb/brew/mongodb-community
```
```basic
brew services stop mongodb/brew/mongodb-community
```



### redis

```javascript
brew install redis
```
```javascript
brew services start redis

```
```javascript
brew services restart redis
```
```javascript
brew services restart redis
```
