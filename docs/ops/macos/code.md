```javascript
find ./ -name "*.plist"
```
```javascript
open -a Simulator
```
```html
lsof -i :端口号
```



```html
sudo lsof -i -P | grep LISTEN
```



  

> 在macOS上，您可以使用以下命令来杀死占用指定端口的进程：
> 
> `sudo lsof -i :端口号 | awk 'NR!=1 {print $2}' | xargs kill -9`
> 
> 将 "端口号" 替换为您要杀死进程的端口号。这个命令会先使用 lsof 命令找到占用该端口的进程，然后使用 awk 命令提取进程ID，最后使用 kill 命令杀死进程。
> 
> 请注意，您需要以管理员身份运行此命令。
