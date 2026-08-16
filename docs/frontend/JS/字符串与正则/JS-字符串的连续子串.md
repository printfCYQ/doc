# JS-字符串的连续子串

```typescript
function getAllSubstring(str) {
  let result = [];
  for (let i = 1; i <= str.length; i++) {
    for (let j = 0; i + j <= str.length; j++) {
      result.push(str.substring(j, i + j));
    }
  }
  return result;
}
const s = "abc";
console.log(getAllSubstring(s)); //  ['a', 'b', 'c', 'ab', 'bc', 'abc']
```
