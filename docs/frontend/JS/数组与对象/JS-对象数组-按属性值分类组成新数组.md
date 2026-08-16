# JS-对象数组-按属性值分类组成新数组

```javascript
var a = [{ name: 1 }, { name: 2 }, { name: 2 }, { name: 3 }, { name: 3 }];
```

|--->

```javascript
[
  [{ name: 1 }], 
  [{ name: 2 }, { name: 2 }], 
  [{ name: 3 }, { name: 3 }]
];
```
```javascript
var a = [{ name: 1 }, { name: 2 }, { name: 2 }, { name: 3 }, { name: 3 }];
let map = new Map();
for (let item of a) {
  map.set(item.name, [...(map.get(item.name) || []), item]);
}
console.log([...map.values()]);
```
