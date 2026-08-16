# TS-防抖函数类型标注

```typescript
const handler = (a: number, b: number) => {
    console.log(a, b);
}

// declare function debounce<A extends any[], R>(
//     fn: (...args: A) => R,
//     delay: number
// ): (...args: A) => void;

const debounce = <A extends any[], R>(
  func: (...args: A) => R, 
  delay: number
) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    return (...args: A) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

const fn = debounce(handler, 1000);
fn(1, 2);
```
