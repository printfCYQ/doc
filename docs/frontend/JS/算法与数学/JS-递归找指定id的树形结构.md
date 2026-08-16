# JS-递归找指定id的树形结构

```javascript
function findParentSubjectIds(data, subjectId, parentSubjectIds = []) {
  for (const item of data) {
    if (item.subjectId === subjectId) {
      return parentSubjectIds;
    }

    if (item.children) {
      const foundParentSubjectIds = findParentSubjectIds(item.children, subjectId, [...parentSubjectIds, item.subjectId]);
      if (foundParentSubjectIds) {
        return foundParentSubjectIds;
      }
    }
  }

  return null;
}

const data = [
  {
    "subjectId": "1",
    "parentSubjectId": "-1",
    "children": [
      {
        "subjectId": "2",
        "parentSubjectId": "1",
        "children": [
          {
            "subjectId": "3",
            "parentSubjectId": "2",
            "children": [
              {
                "subjectId": "4",
                "parentSubjectId": "3",
                "children": null
              },
              {
                "subjectId": "5",
                "parentSubjectId": "3",
                "children": null
              }
            ]
          },
          {
            "subjectId": "6",
            "parentSubjectId": "2",
            "children": [
              {
                "subjectId": "7",
                "parentSubjectId": "6",
                "children": null
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "subjectId": "8",
    "parentSubjectId": "-1",
    "children": [
      {
        "subjectId": "9",
        "parentSubjectId": "8",
        "children": [
          {
            "subjectId": "10",
            "parentSubjectId": "9",
            "children": [
              {
                "subjectId": "11",
                "parentSubjectId": "10",
                "children": null
              },
              {
                "subjectId": "12",
                "parentSubjectId": "10",
                "children": null
              }
            ]
          },
          {
            "subjectId": "13",
            "parentSubjectId": "9",
            "children": [
              {
                "subjectId": "14",
                "parentSubjectId": "13",
                "children": null
              }
            ]
          }
        ]
      }
    ]
  }
];
console.log(findParentSubjectIds(data, '3')); //  ['1', '2']
console.log(findParentSubjectIds(data, '7')); //  ['1', '2', '6']
console.log(findParentSubjectIds(data, '13')); //  ['8', '9']
```
