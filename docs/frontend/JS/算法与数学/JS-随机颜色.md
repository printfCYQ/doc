# JS-随机颜色

```javascript
let color = Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")
```
```javascript
randomHexColo() {
  let textColor = Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")
  let bgColor = ''
  let obj = {
    '0': 'f',
    '1': 'e',
    '2': 'd',
    '3': 'c',
    '4': 'b',
    '5': 'a',
    '6': '9',
    '7': '8',
    '8': '7',
    '9': '6',
    'a': '5',
    'b': '4',
    'c': '3',
    'd': '2',
    'e': '1',
    'f': '0',
  }
  for (let item of textColor) {
    bgColor += obj[item]
  }
  return {
    color: '#' + textColor,
    backgroundColor: '#' + bgColor
  }
}
```
