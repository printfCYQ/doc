# VUE3-tailwindCSS

> [https://www.tailwindcss.cn](https://www.tailwindcss.cn)
> 
> [https://github.com/tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)
> 
> Tailwind CSS 是一个由js编写的CSS [框架](https://so.csdn.net/so/search?q=%E6%A1%86%E6%9E%B6&spm=1001.2101.3001.7020) 他是基于postCss 去解析的
> 
> [https://www.postcss.com.cn](https://www.postcss.com.cn)
> 
> [https://github.com/postcss/postcss](https://github.com/postcss/postcss)

```vue
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```
```vue
npx tailwindcss init -p
```
```vue
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
```vue
@tailwind base;
@tailwind components;
@tailwind utilities;
```
```vue
import './index.css';
```
```vue
<template>
  <figure class="md:flex bg-gray-100 rounded-xl p-8 md:p-0">
    <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
      <blockquote>
        <p class="text-lg font-semibold text-red-500">
          “Tailwind CSS is the only framework that I've seen scale
          on large teams. It’s easy to customize, adapts to any design,
          and the build size is tiny.”
        </p>
      </blockquote>
      <figcaption class="font-medium">
        <div class="text-cyan-600">
          Sarah Dayan
        </div>
        <div class="text-gray-500">
          Staff Engineer, Algolia
        </div>
      </figcaption>
    </div>
  </figure>
</template>
```
