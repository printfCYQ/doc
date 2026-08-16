# TS-对柯里化进行类型标注

```javascript
/**
 * 表示柯里化函数类型。
 * 
 * @template A - 参数的元组
 * @template R - 返回类型
 */
type Curried<A, R> =
	A extends [] ? () => R : // 如果参数的元组为空，则返回一个没有参数且返回类型为 `R` 的函数
	A extends [infer ARG] ? (param: ARG) => R : // 如果参数的元组只有一个参数，则返回一个接受该参数并返回类型为 `R` 的函数
	A extends [infer ARG, ...infer REST] ? (param: ARG) => Curried<REST, R> : // 如果参数的元组有多个参数，则返回一个接受第一个参数并返回剩余参数柯里化后的函数
	never; // 如果参数的元组不匹配上述情况，则返回 `never`

/**
 * 将普通函数转换为柯里化函数。
 * 
 * @template A - 参数的元组
 * @template R - 返回类型
 * @param {(...args: A) => R} fn - 要转换的普通函数
 * @returns {Curried<A, R>} - 转换后的柯里化函数
 */
declare function curry<A extends any[], R>(fn: (...args: A) => R): Curried<A, R>;

function sum(a: string, b: number, c: object) {
	return a + b + c
}

// 将 `sum` 函数转换为柯里化函数
const currySum = curry(sum)

// 调用柯里化函数，依次传入参数
currySum('aaa')(1)({}) // 返回 'aaa1[object Object]'
```
