# JS-四舍五入

```javascript
function keepSecondDecimalPlace(num, dec, fill = true) {
    if (typeof num !== "number" || Number.isNaN(num)) return 0;

    let str = String(num);

    if (str.includes('.')) {
        let [a, b] = str.split('.');
        b = b.split('');

        if (b.length < dec) {
            return str + (fill ? '0'.repeat(dec - b.length) : ''); // 填充小数位数不足的部分
        } else if (b.length > dec) {
            let flag = 1;
            if (Number(b[dec]) >= 5) {
                for (let i = dec - 1; i >= 0; i--) {
                    if (b[i] == 9) {
                        b[i] = 0; // 当前位是9，则进位并将当前位设为0
                    } else {
                        b[i] = Number(b[i]) + 1; // 当前位不是9，直接加1
                        flag = 0; // 标记进位操作已经完成
                        break;
                    }
                }
            }
            return `${+a + flag}.${b.slice(0, dec).join('')}`; // 返回加上进位标记的结果
        } else {
            return num; // 小数位数与指定位数相等，返回原始数字
        }
    } else {
        return str + (fill ? '.' + '0'.repeat(dec) : ''); // 原始数字为整数，填充指定位数的小数部分
    }
}

console.log(keepSecondDecimalPlace(1, 2));
console.log(keepSecondDecimalPlace(1.5, 2));
console.log(keepSecondDecimalPlace(1.54, 2));
console.log(keepSecondDecimalPlace(1.554, 2));
console.log(keepSecondDecimalPlace(1.555, 2));
console.log(keepSecondDecimalPlace(1.999, 2));
```
