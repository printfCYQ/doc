# JS-格式化时间

```javascript
/**
* 格式化时间
* @param String timestamp 时间戳
* @param String format 格式化格式
* ex: timeFormat(1637647206723, "yyyy-mm-dd hh:MM:ss")
* console.log(timeFormat(1637647206723, "yyyy-mm-dd hh:MM:ss"));
*/
Vue.prototype.timeFormat = function(dateTime = null, fmt = "yyyy-mm-dd") {
	// 如果为null,则格式化当前时间
	if (!dateTime) dateTime = Number(new Date());
	// 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
	if (dateTime.toString().length == 10) dateTime *= 1000;
	let date = new Date(dateTime);
	let ret;
	let opt = {
	  "y+": date.getFullYear().toString(), // 年
	  "m+": (date.getMonth() + 1).toString(), // 月
	  "d+": date.getDate().toString(), // 日
	  "h+": date.getHours().toString(), // 时
	  "M+": date.getMinutes().toString(), // 分
	  "s+": date.getSeconds().toString(), // 秒
	  // 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
	  ret = new RegExp("(" + k + ")").exec(fmt);
	  if (ret) {
		fmt = fmt.replace(
		  ret[1],
		  ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
		);
	  }
	}
	return fmt;
}
```
