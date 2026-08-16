```javascript
nvm install 16 // 模糊安装

nvm install 16.14.1 // 安装指定版本
  
nvm uninstall 16.14.1 // 删除已安装的指定版本
  
nvm use 16.14.1 // 切换使用指定的版本node

nvm ls  // 列出所有安装的版本 

nvm current //显示当前的版本
```

# 安装

## MacOS

1.  在终端中安装 Homebrew：

```javascript
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2.  使用 Homebrew 安装 nvm：

```javascript
brew install nvm
```

3.  安装完成后，将以下内容添加到您的 `~/.bash_profile`、`~/.zshrc` 或 `~/.profile` 文件中：

```javascript
export NVM_DIR="$HOME/.nvm" 
[ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"# This loads nvm 
[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && . "/usr/local/opt/nvm/etc/bash_completion.d/nvm"# This loads nvm bash_completion
```

4.  重新打开终端或运行 `source ~/.bash_profile`、`source ~/.zshrc` 或 `source ~/.profile` 使更改生效。
