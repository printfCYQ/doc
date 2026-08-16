# JS-对象数组-按属性名拼接字符串

```javascript
let arr = [
	{ src: "1", title: "11", age: "111" },
	{ src: "2", title: "22", age: "222" },
	{ src: "3", title: "33", age: "333" },
];
```

变成

```javascript
{
  src: "1, 2, 3",
  title: "11, 22, 33"
}
```

解决

```javascript
/**
* 对象数组-按属性名拼接字符串
* @param arr require Array 需要转换的数组
* @param arg unRequire Array 需要转换属性的数组<["src", "title"]>,不传转换所有
* ex: formatArr(arr)
* ex: formatArr(arr, ["src", "title"])
*/
const formatArr = function (arr, arg) {
	const obj = {};
	for (let i in arr[0]) {
		if (!arg || arg.includes(i)) {
			obj[i] = "";
			for (let j = 0; j < arr.length; j++) {
				obj[i] = obj[i] + arr[j][i] + (j === arr.length - 1 ? "" : ",");
			}
		}
	}
	return obj;
};

const formatArr2 = function (arr, arg) {
	if (!arg) {
		arg = [];
		for (let i in arr[0]) {
			arg.push(i);
		}
	}
	const obj = {};
	arg.forEach((item) => {
		obj[item] = arr
			.map((row) => {
			return row[item];
		})
			.join(",");
	});
	return obj;
};
```
