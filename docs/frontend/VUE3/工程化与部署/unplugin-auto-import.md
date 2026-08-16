# unplugin-auto-import

`[https://github.com/antfu/unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)`

`npm i -D unplugin-auto-import`

> 配置完成之后使用`ref`​`reactive``watch` 等 无须`import` 导入 可以直接使用 。
> 
> 重新启动项目，在`src`目录下生成`auto-import.d.ts`文件。

```typescript
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),VueJsx(),AutoImport({
    imports:['vue'],
    dts:"src/auto-import.d.ts"
  })]
})
```
