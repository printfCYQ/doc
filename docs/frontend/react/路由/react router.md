# react router

> -   [https://reactrouter.com/](https://reactrouter.com/)
> 1.  **单页面应用（SPA）**
> 
> -   **​**只有一个 HTML 页面，通过 JavaScript 动态更新内容。优点是用户体验好、前后端分离彻底、开发效率较高；缺点是首屏加载可能慢、不利于 SEO、状态管理复杂。
> 
> 2.  **多页面应用（MPA）**
> 
> -   **​**由多个 HTML 页面组成，页面切换时获取新 HTML。优点是利于 SEO、首屏加载有时快、技术简单（小型应用）；缺点是页面切换体验差、前后端耦合度可能高、开发效率低（大型应用）。
> **react-router-dom 和 react-router 什么区别**
> 
> 1.  **核心与扩展**：
> 
> -   `react-router`是核心库，提供路由基本逻辑与功能，如基础的`Router`组件、`Route`匹配机制等。
> -   `react-router-dom`基于`react-router`构建，针对浏览器环境扩展，提供`BrowserRouter`、`Link`等组件及`useNavigate`等钩子。
> 
> 2.  **使用场景**：
> 
> -   非浏览器环境或仅需基础路由功能用`react-router`。
> -   浏览器端 React 应用开发常用`react-router-dom`，它依赖`react-router`并提供完整浏览器路由方案。
