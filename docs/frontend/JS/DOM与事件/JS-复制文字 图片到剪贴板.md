# JS-复制文字 图片到剪贴板

```html
<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
	</head>

	<body>

		<img src="https://p3-passport.byteimg.com/img/user-avatar/8b29c46c806762d72e9cb19a43b490dd~100x100.image" alt="">
		<button class="copyImg">copyImg</button>
		<button class="copyText">copyText</button>

		<script>
			const img = document.querySelector("img");
			const copyImg = document.querySelector(".copyImg");
			const copyText = document.querySelector(".copyText");

			copyImg.addEventListener('click', () => clipboardImg(img));
			copyText.addEventListener('click', () => clipboardText('测试测试测试'));

			function clipboardText(text) {
				navigator.clipboard.writeText(text)
					.then(() => {
						console.log('Text copied to clipboard');
					})
					.catch((error) => {
						console.error('Failed to copy text: ', error);
					});
			}

			function clipboardImg(html) {
				const testImg = html;
				// 可以使用 document.querySelector(), document.getElementById() 等来获取需要复制的 img 标签
				const canvas = document.createElement("canvas");
				const ctx = canvas.getContext("2d");
				const img = new Image();
				// 创建一个画布，赋予画布宽高为图片的原始宽高
				canvas.width = testImg.naturalWidth;
				canvas.height = testImg.naturalHeight;
				// 浏览器在加载图像时要使用匿名身份验证，以允许跨域资源共享（CORS）。
				img.crossOrigin = "Anonymous";
				img.src = testImg.src;
				img.onload = () => {
					if (ctx) {
						// 防止有缓存，绘制之前先清除画布
						ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
						ctx.drawImage(img, 0, 0);
						// 将 canvas 转为 blob
						canvas.toBlob(async (blob) => {
							if (blob) {
								const data = [
									new ClipboardItem({
										[blob.type]: blob,
									}),
								];
								await navigator.clipboard.write(data).then(
									() => {
										console.log("Copied to clipboard successfully!");
									},
									() => {
										console.error("Unable to write to clipboard.");
									}
								);
							}
						});
					}
				};
			}
		</script>
	</body>

</html>
```
