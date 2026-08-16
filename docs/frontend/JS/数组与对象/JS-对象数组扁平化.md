# JS-对象数组扁平化

```javascript
const data = [
  {
    "a": "1",
    "b": "2",
    "c": null,
    "d": "234",
    "children": [
      {
        "a": "11",
        "b": "2",
        "c": "3"
      },
      {
        "a": "12",
        "b": "23",
        "c": null
      }
    ]
  },
  {
    "a": null,
    "b": "1",
    "c": "3",
    "d": "7777",
    "children": [
      {
        "a": "11",
        "b": "2",
        "c": null
      },
      {
        "a": "12",
        "b": null,
        "c": "34"
      }
    ]
  }
]

// const data2 = [
//     {
//         "index": 1,
//         "childrenIndex": 1,
//         "a": "11",
//         "b": "2",
//         "c": "3",
//         "d": "234"
//     },
//     {
//         "index": 1,
//         "childrenIndex": 2,
//         "a": "12",
//         "b": "23",
//         "c": null,
//         "d": "234"
//     },
//     {
//         "index": 2,
//         "childrenIndex": 1,
//         "a": "11",
//         "b": "2",
//         "c": "3",
//         "d": "7777"
//     },
//     {
//         "index": 2,
//         "childrenIndex": 2,
//         "a": "12",
//         "b": "1",
//         "c": "34",
//         "d": "7777"
//     }
// ]

// 将数据扁平化
// 字段优先使用 children 里的
// 如果 children 里的数据是 null,则使用父级的

const data2 = data.flatMap((item, index) => {
  return item.children.map((child, i) => {
    const obj = {
      index: index + 1,
      childrenIndex: i + 1,
      ...item,
      ...child
    };

    for (const key in obj) {
      if (obj[key] === null) {
        obj[key] = item[key];
      }
    }

    delete obj.children;

    return obj;
  });
});
console.log(data2);
```
