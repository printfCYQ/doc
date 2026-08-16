# 按照target内路径解析

```javascript
const target = {
    a: {
        a1: 'a.a1.a11',
        a2: 'b.b1',
    },
    b: {
        b1: 'b.b1',
        b2: 'b.b2',
    },
    c: 'c'
}

const soure = {
    a: {
        a1: {
            a11: '线下',
        },
        a2: '小心',
    },
    b: {
        b1: '小白',
        b2: '小驴',
    },
    c: '小狗'
}

const fn = (target, soure) => {

}

const result = fn(target, soure)
console.log(result);
```

## 按照target内路径解析

```javascript
{
    a: {
        a1: '线下',
        a2: '小白'
    },
    b: {
        b1: '小白',
        b2: '小驴'
    },
    c: '小狗'
}
```
```javascript
const get = (target, path) => {
    const keys = path.split('.')
    let obj = target
    for (const key of keys) {
        obj = obj[key]
    }
    return obj || undefined
}

const fn = (target, soure) => {
    const keys = Object.keys(target)
    keys.forEach(key => {
        if (typeof target[key] === 'object') {
            fn(target[key], soure)
        } else {
            // target[key] = _.get(soure, target[key]) // lodash get 可以直接用
            target[key] = get(soure, target[key])
        }
    })
    return target
}
```

## 按照字段一比一解析

```javascript
{
  a: { a1: { a11: '线下' }, a2: '小心' },
  b: { b1: '小白', b2: '小驴' },
  c: '小狗'
}
```
```javascript
const fn = (target, soure) => {
    const keys = Object.keys(target)
    keys.forEach(key => {
        if (typeof target[key] === 'object') {
            fn(target[key], soure[key])
        } else {
            target[key] = soure[key]
        }
    })
    return target
}
```
