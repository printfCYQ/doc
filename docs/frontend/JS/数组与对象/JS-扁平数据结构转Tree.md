# JS-扁平数据结构转Tree

```javascript
const arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
];
```

变成

```javascript
[
  {
    "id": 1,
    "name": "部门1",
    "pid": 0,
    "children": [
      {
        "id": 2,
        "name": "部门2",
        "pid": 1,
        "children": []
      },
      {
        "id": 3,
        "name": "部门3",
        "pid": 1,
        "children": [
          // ,,,
        ]
      }
    ]
  }
]

```
---

1.

```javascript
const arrToTree = (arr) => {
  return arr
    .map((item) => {
    item.children = arr.filter((v) => v.pid === item.id);
    return item;
  })
    .filter((item) => !item.pid);
};
```
---

2.

```javascript
function formatDataTree(data) {
  let parents = data.filter((p) => p.pid === 0),
    children = data.filter((c) => c.pid !== 0);
  dataToTree(parents, children);
  return parents;
  function dataToTree(parents, children) {
    parents.map((p) => {
      children.map((c, i) => {
        if (c.pid === p.id) {
          let _children = JSON.parse(JSON.stringify(children));
          _children.splice(i, 1);
          dataToTree([c], _children);
          if (p.children) {
            p.children.push(c);
          } else {
            p.children = [c];
          }
        }
      });
    });
  }
}
```
---

3.

```javascript
function formatDataTree(data) {
  let _data = JSON.parse(JSON.stringify(data));
  return _data.filter((p) => {
    const _arr = _data.filter((c) => c.pid === p.id);
    _arr.length && (p.children = _arr);
    return p.pid === 0;
  });
}
```
