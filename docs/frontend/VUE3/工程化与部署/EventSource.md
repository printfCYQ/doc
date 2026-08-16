# EventSource

-   [https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource](https://developer.mozilla.org/zh-CN/docs/Web/API/EventSource)
-   ​[https://github.com/printfCYQ/vue3-express-sse](https://github.com/printfCYQ/vue3-express-sse)

​  

```vue
<template>
  <div>
    {{ chatText }}
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  const chatText = ref('')

  onMounted(() => {
    getRes();
  })

  const getRes = async () => {
    try {
      const res = await fetch("http://localhost:3000/sse", {
        method: "get",
      });
      const reader = res.body?.getReader();
      let text = "";
      while (reader) {
        const { value, done } = await reader.read();
        const chars = new TextDecoder().decode(value);
        if (done) {
          break;
        }
        const dataArray = chars.trim().split("\n\n");
        const jsonObjects = dataArray.map((data) => {
          const jsonString = data.substring("data: ".length);
          return JSON.parse(jsonString);
        });
        jsonObjects.forEach((item) => {
          text += item.content;
        });
        chatText.value = text;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
</script>
```
```javascript
import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())

const port = 3000

app.get('/sse', (req, res) => {
  const str = `此开卷第一回也。作者自云：因曾历过一番梦幻之后，故将真事隐去，而借“通灵”之说，撰此《石头记》一书也。故曰“甄士隐”云云。但书中所记何事何人？自又云：“今风尘碌碌，一事无成，忽念及当日所有之女子，一一细考较去，觉其行止见识皆出于我之上。何我堂堂须眉，诚不若彼裙钗哉？实愧则有馀，悔又无益之大无可如何之日也！当此，则自欲将已往所赖天恩祖德，锦衣纨袴之时，饫甘餍肥之日，背父兄教育之恩，负师友规训之德，以至今日一技无成，半生潦倒之罪，编述一集，以告天下人：我之罪固不免，然闺阁中本自历历有人，万不可因我之不肖，自护己短，一并使其泯灭也。虽今日之茅椽蓬牖，瓦灶绳床，其晨夕风露，阶柳庭花，亦未有妨我之襟怀笔墨者。虽我未学，下笔无文，又何妨用假语村言，敷演出一段故事来，亦可使闺阁昭传，复可悦世之目，破人愁闷，不亦宜乎？”故曰“贾雨村云云。
    　　此回中凡用“梦”用“幻”等字，是提醒阅者眼目，亦是此书立意本旨。
    　　列位看官：你道此书从何而来？说起根由虽近荒唐，细按则深有趣味。待在下将此来历注明，方使阅者了然不惑。
    　　原来女娲氏炼石补天之时，于大荒山无稽崖炼成高经十二丈，方经二十四丈顽石三万六千五百零一块。娲皇氏只用了三万六千五百块，只单单剩了一块未用，便弃在此山青埂峰下。谁知此石自经煅炼之后，灵性已通，因见众石俱得补天，独自己无材不堪入选，遂自怨自叹，日夜悲号惭愧。`
  // 设置 SSE 相关的响应头
  res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  let index = 0
  const timer = setInterval(() => {
    if (index < str.length) {
      res.write("data: " + JSON.stringify({ content: str[index] }));
      index++
    } else {
      // 当所有数据都发送完毕时，结束响应
      clearInterval(timer); // 停止定时器
      res.end();
    }
  }, 100);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```
