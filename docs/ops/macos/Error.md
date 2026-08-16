## sudo: /etc/sudoers is world writable

```javascript
// 无法使用chmod修改权限
demo:Desktop piaoyu.qiu$ ls -la /etc/sudoers
    -rwxrwxrwx  1 root  wheel  1371  8  9 11:28 /etc/sudoers
demo:Desktop piaoyu.qiu$ chmod 440 /etc/sudoers
chmod: Unable to change file mode on /etc/sudoers: Operation not permitted

#切换到root用户
  demo:Desktop piaoyu.qiu$ su
Password:你自己设置的密码
sh-3.2# ls -l /etc/sudoers
  -rwxrwxrwx  1 root  wheel  1371  8  9 11:28 /etc/sudoers
sh-3.2# chmod 0440 /etc/sudoers
sh-3.2# ls -l /etc/sudoers
  -r--r-----  1 root  wheel  1371  8  9 11:28 /etc/sudoers
sh-3.2# exit
```
