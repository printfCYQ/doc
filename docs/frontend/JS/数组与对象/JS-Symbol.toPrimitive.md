# JS-Symbol.toPrimitive

```rust
function createProxy(value = 0) {
    return new Proxy({}, {
        get(_, prop) {
            if (prop === Symbol.toPrimitive) {
                return () => value
            }
            return createProxy(value + +prop)
        }
    })
}

const add = createProxy();

const a = add[10][20][30] + 40;
console.log(a); //100
```
