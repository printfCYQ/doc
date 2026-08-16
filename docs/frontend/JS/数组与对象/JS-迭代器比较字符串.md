# JS-迭代器比较字符串

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <script>
    /**
     * 比较两个字符串的大小,
     * 两个字符串都是用-连接的数字，比如1-2-33-41-5。
     * 比较方式是从左到右，依次比较每个数字的大小，遇到相等的数字继续往后比较，遇到不同的数字直接得到比较结果
     * s1 > s2 return 1
     * s1 < s2 return -1
     * s1 == s2 return 0
     */

    function compare(s1, s2) {
      // 创建两个迭代器用于遍历字符串
      const iter1 = walk(s1);
      const iter2 = walk(s2);

      while (true) {
        // 获取迭代器的下一个值
        const n1 = iter1.next();
        const n2 = iter2.next();

        // 判断迭代器是否都已经完成遍历
        if (n1.done && n2.done) {
          return 0; // 两个字符串相等
        } else if (n1.done) {
          return -1; // s1 较短，s2 较长
        } else if (n2.done) {
          return 1; // s2 较短，s1 较长
        } else if (n1.value > n2.value) {
          return 1; // 当前部分的值在 s1 中较大
        } else if (n1.value < n2.value) {
          return -1; // 当前部分的值在 s2 中较大
        }
      }
    }

    function* walk(str) {
      let part = '';
      for (let i = 0; i < str.length; i++) {
        if (str[i] !== '-') {
          part += str[i]; // 将非 '-' 字符添加到部分中
        } else {
          yield +part; // 使用 yield 返回部分的数值形式
          part = ''; // 重置部分
        }
      }
      if (part) {
        yield +part; // 返回最后一个部分的数值形式
      }
    }

    const s1 = '1-2-33-41-5';
    const s2 = '1-2-33-42-5';
    console.log(compare(s1, s2));

  </script>
</body>

</html>
```

> 正常思路

```javascript
function compare(s1, s2) {
  const parts1 = s1.split('-');
  const parts2 = s2.split('-');

  const minLength = Math.min(parts1.length, parts2.length);
  for (let i = 0; i < minLength; i++) {
    const num1 = Number(parts1[i]);
    const num2 = Number(parts2[i]);
    debugger
    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  if (parts1.length > parts2.length) {
    return 1;
  } else if (parts1.length < parts2.length) {
    return -1;
  } else {
    return 0;
  }
}
```
