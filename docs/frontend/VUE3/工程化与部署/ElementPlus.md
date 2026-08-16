# ElementPlus

## ElementPlus

```typescript
# NPM
$ npm install element-plus --save
 
# Yarn
$ yarn add element-plus
 
# pnpm
$ pnpm install element-plus

```
```typescript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
 
const app = createApp(App)
 
app.use(ElementPlus)
app.mount('#app')
```
```typescript
{
  "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
```
