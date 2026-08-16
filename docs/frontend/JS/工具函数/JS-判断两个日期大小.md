# JS-判断两个日期大小

```javascript
      /**
			 * 判断两个日期大小
			 * @param String startTime 开始时间
			 * @param String endTime 结束时间
			 * ex: judgeTime('2022-05-31 10:00:00', '2022-05-11 10:00:00', 1)
			 * return true: 结束时间>开始时间
			 */
judgeTime(startTime, endTime) {
  const start = new Date(startTime.replace(/\-/g, '/')).getTime();
  const end = new Date(endTime.replace(/\-/g, '/')).getTime();
  return end > start
},
```
