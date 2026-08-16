# JS-判断是否是数组

-   `Object.prototype.toString.call()`
-   `instanceof`
-   `Array.isArray`

```javascript
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
}

const arr = [1, 2, 3]
const obj = {
    a: 1,
    [Symbol.toStringTag]: 'Array'
}

console.log(isArray(arr)); // true
console.log(isArray(obj)); // true
```
```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>

  <body>
    <iframe src="./2.html" frameborder="0"></iframe>
    <script>
      function isArray(arr) {
        return arr instanceof Array
      }

      const arr = [1, 2, 3]
      const obj = {
        a: 1,
        [Symbol.toStringTag]: 'Array'
      }

      console.log(isArray(arr)); // true
      console.log(isArray(obj)); // false

      Object.setPrototypeOf(obj, Array.prototype)
      console.log(isArray(obj)); // true

      const iframe = document.querySelector('iframe')
      const Array2 = iframe.contentWindow.Array
      const arr2 = new Array2()
      console.log(isArray(arr2)); // false
    </script>

  </body>

</html>
```
```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>

  <body>
    <iframe src="./2.html" frameborder="0"></iframe>
    <script>
      function isArray(arr) {
        return Array.isArray(arr)
      }

      const arr = [1, 2, 3]
      const obj = {
        a: 1,
        [Symbol.toStringTag]: 'Array'
      }

      console.log(isArray(arr)); // true
      console.log(isArray(obj)); // false

      Object.setPrototypeOf(obj, Array.prototype)
      console.log(isArray(obj)); // false

      const iframe = document.querySelector('iframe')
      const Array2 = iframe.contentWindow.Array
      const arr2 = new Array2()
      console.log(isArray(arr2)); // true
    </script>

  </body>

</html>
```
