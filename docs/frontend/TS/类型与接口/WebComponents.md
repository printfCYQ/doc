# WebComponents

> Web Components 是一组 Web 标准和技术的集合，它的目标是让开发者能够更方便地构建可重用、模块化和可组合的 Web 组件。
> 
> 具体来说，Web Components 由以下几个主要部分组成：
> 
> -   **自定义元素（Custom Elements）**：允许开发者创建自己定义的 HTML 元素，并为其添加自定义的行为和样式。
> -   **影子 DOM（Shadow DOM）**：提供了一种隔离组件内部 DOM 结构的方式，防止样式和脚本的冲突。
> -   **HTML 模板（HTML Templates）**：用于定义自定义元素的内容，使得内容可以在需要时动态地插入到 DOM 中。
> -   **组件接口（Component Interfaces）**：通过定义属性、方法和事件，提供了组件与外部世界进行通信和交互的方式。
> 
> 通过使用 Web Components，开发者可以更好地组织和封装代码，提高代码的复用性和可维护性。它还促进了组件化的开发模式，使得构建复杂的 Web 应用更加容
```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!-- 在 HTML 中使用自定义元素 -->
    <my-custom-element></my-custom-element>

    <script>
        // 定义自定义元素
        class MyCustomElement extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' }); // 创建影子 DOM
            }

            connectedCallback() {
                // 在组件连接到文档时执行的逻辑
                const template = `<h2>Hello, World!</h2>`;
                this.shadowRoot.innerHTML = template; // 将模板内容插入影子 DOM
            }
        }

        // 注册自定义元素
        customElements.define('my-custom-element', MyCustomElement);

    </script>
</body>

</html>
```
---
```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!-- 在 HTML 中使用自定义元素 -->
    <my-custom-element param1="Value 1" param2="Value 2"></my-custom-element>

    <script>
        // 定义自定义元素
        class MyCustomElement extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' }); // 创建影子 DOM
                this.params = {}; // 用于存储传入的参数
            }

            static get observedAttributes() { // 定义观察的属性
                return ['param1', 'param2'];
            }

            // 属性变更时的回调 // 跟vue 的watch 类似 有属性发生变化自动触发
            attributeChangedCallback(name, oldValue, newValue) {
                this.params[name] = newValue;
            }

            // 在组件连接到文档时执行的逻辑 // 类似于vue 的mounted
            connectedCallback() {

                const template = `
                    <style>
                    .custom-element {
                        color: red;
                        }
                    </style>
                    <h2>参数: <span class="custom-element">${this.params.param1}</span>, <span>${this.params.param2}</span></h2>
                `;
                this.shadowRoot.innerHTML = template; // 将模板内容插入影子 DOM
            }
        }

        // 注册自定义元素
        customElements.define('my-custom-element', MyCustomElement);
    </script>
</body>

</html>
```



---
```javascript
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <span> 外面的元素 </span>

    <!-- 在 HTML 中使用自定义元素 -->
    <my-custom-element param1="Value 1" param2="Value 2"></my-custom-element>

    <template id="myCustom">
        <style>
            span {
                background: red;
            }
        </style>
        <div>
            <span>里面的元素</span>
        </div>
    </template>

    <script>
        // 定义自定义元素
        class MyCustomElement extends HTMLElement {
            constructor() {
                super();
                this.params = {}; // 定义 params 对象
                this.init();
            }

            static get observedAttributes() { // 定义观察的属性
                return ['param1', 'param2'];
            }

            init() {
                const shadow = this.attachShadow({ mode: 'open' }); // 创建影子 DOM
                const template = document.querySelector('#myCustom');
                shadow.appendChild(template.content.cloneNode(true));
            }

            attributeChangedCallback(name, oldValue, newValue) { // 属性变更时的回调
                this.params[name] = newValue;
            }

            connectedCallback() {
                console.log('connectedCallback');
                console.log(this.params.param1);  // 在这里可以使用 this.params.param1 来获取参数值
            }
        }

        // 注册自定义元素
        customElements.define('my-custom-element', MyCustomElement);
    </script>
</body>

</html>
```
