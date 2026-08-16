# JS-两个日期相差的天数

```javascript
      /**
			 * 计算两个日期之间的相差的天数
			 * @param String startTime 开始时间
			 * @param String endTime 结束时间
			 * @param String type 计算方式，0:包含前或后，1:包含前后，-1:不包含前后
			 * ex: getDiffDay('2022-05-31 10:00:00', '2022-05-11 10:00:00', 1)
			 */
getDiffDay(startTime, endTime, type = 1) {
  let totalDays, diffDate;
  const start = Date.parse(startTime) // 将两个日期都转换为毫秒格式，然后做差
  const end = Date.parse(endTime)
  diffDate = Math.abs(start - end) // 取相差毫秒数的绝对值
  totalDays = Math.floor(diffDate / (1000 * 3600 * 24)) // 向下取整
  return totalDays + type // 相差的天数
}
```
