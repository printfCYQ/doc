# JS-export,module,import,require

-   moduleFun.js

```javascript
module.exports.bb = 5
module.exports.bbb = function () {
  console.log('333')
}
```

-   exportFun.js

```javascript
var moduleFun = require('./moduleFun')

const aaa = () => {
  console.log('111')
}
const aaaa = () => {
  console.log('222')
}

const bbb = moduleFun.bbb

console.log(bbb)

export { aaa, bbb }
export default aaaa
```

-   index.vue

```vue
import aaaa, { aaa, bbb } from './exportFun'

 //...
 created () {
    aaa()
    aaaa()
    bbb()
 },
```

-   log

```vue
// console.log()
function bbb() exportFun.js

aaa exportFun.js
aaaa exportFun.js
bbb moduleFun.js

```
