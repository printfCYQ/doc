# JS-数字字典列表接口

```typescript
const list = [
  {
    paramValue: "color",
    paramList: [
      {
        paramTypeValue: "1",
        paramTypeName: "red",
      },
      {
        paramTypeValue: "2",
        paramTypeName: "blue",
      },
      {
        paramTypeValue: "3",
        paramTypeName: "green",
      },
    ],
  },
  {
    paramValue: "direction",
    paramList: [
      {
        paramTypeValue: "1",
        paramTypeName: "东",
      },
      {
        paramTypeValue: "2",
        paramTypeName: "西",
      },
      {
        paramTypeValue: "3",
        paramTypeName: "南",
      },
      {
        paramTypeValue: "4",
        paramTypeName: "北",
      },
    ],
  },
];
```
```typescript
const GET_CODE_LIST = (code) => {
  const codeList = list;
  const result = [];
  codeList
    .filter((item) => item.paramValue === code)[0]
    .paramList.map((item) => {
      result.push({
        value: item.paramTypeValue,
        label: item.paramTypeName,
      });
    });
  return result;
};
```
```typescript
const GET_CODE = (code01, code02) => {
  const codeList = list;
  if (code02 === null || code02 === undefined || code02 === "") {
    return "";
  }
  code02 = code02.toString();
  return codeList
    .filter((item) => item.paramValue === code01)[0]
    .paramList.filter((item) => item.paramTypeValue === code02)[0]
    .paramTypeName;
};
```
```typescript
console.log(GET_CODE_LIST("color"));
// [
//   { value: "1", label: "red" },
//   { value: "2", label: "blue" },
//   { value: "3", label: "green" },
// ];
console.log(GET_CODE("color", "1")); // red
```
