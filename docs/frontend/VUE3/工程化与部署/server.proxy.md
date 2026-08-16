# server.proxy

## server.proxy

### 跨域



```vue
onMounted(async () => {
  const res = await axios.get('http://localhost:3300/list')
  console.log(res);
})
```

### 解决

```javascript
server: {
  proxy: {
    "/dev": {
      target: "http://localhost:3300",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/dev/, ""),
    },
  },
},
```
```vue
onMounted(async () => {
  const res = await axios.get('dev/list')
  console.log(res);
})
```
