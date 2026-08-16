# ffmpeg 转码（mp4 → mp3）

```plain
brew install ffmpeg
```
```plain
pnpm init
pnpm i fluent-ffmpeg
# code ...
node index.js
```
```typescript
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const inputPath = "/Users/mac/Music/周杰伦";
const outPath = "/Users/mac/Music/周杰伦3";

function readFolder(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
}
function transform(fileName) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath + "/" + fileName)
      .noVideo() // 移除视频流
      .audioCodec("libmp3lame") // 指定音频编解码器为MP3
      .output(outPath + "/" + fileName + ".mp3")
      .on("end", (e) => {
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      })
      .run();
  });
}

async function start() {
  try {
    const mp4List = await readFolder(inputPath);
    console.log(mp4List);
    await Promise.all(
      mp4List.map(async (item) => {
        try {
          await transform(item);
          console.log(`转换完成: ${item}`);
        } catch (error) {
          console.error(`转换出错: ${item}`, error);
        }
      })
    );
  } catch (error) {
    console.error(error);
  }
}
start();
```
