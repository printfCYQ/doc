import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
// 🔧 Mermaid 支持：使用 vitepress-plugin-mermaid 提供的 withMermaid() 包装 defineConfig
export default withMermaid(
  defineConfig({
    title: "我的学习文档",
    description: "一个记录学习笔记与技术知识的文档站",
    // GitHub Pages 项目站点：仓库名作为子路径。仓库名为 doc → base 为 /doc/
    base: "/doc/",
    lang: 'zh-CN',

    // 浏览器标签图标 (可选, 后续可以放 public/favicon.ico)
    // head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

    // ---------------------------------------------------------------------------
    // Markdown 扩展配置
    // ---------------------------------------------------------------------------
    markdown: {
      // ✅ Mermaid 已通过 withMermaid 插件启用，无需再写 mermaid: true
      // 启用 KaTeX 数学公式 ($...$ 行内, $$...$$ 块级)
      math: true,
      // 代码块显示行号
      lineNumbers: true,
      // 代码高亮配置 (Shiki)
      theme: {
        light: 'github-light',
        dark:  'github-dark-dimmed',
      },
    },

    // Mermaid 配置 (vitepress-plugin-mermaid 扩展的顶层字段)
    // theme 可选: 'default' | 'base' | 'dark' | 'forest' | 'neutral' | ...
    // 插件会根据 VitePress 深/浅色模式自动切换 'default' <-> 'dark'
    mermaid: {
      startOnLoad: true,
      theme: 'default',
    },

    // ---------------------------------------------------------------------------
    // Vite 配置 - 修复 pnpm 下 dayjs/mermaid ESM 默认导出丢失的问题
    // ---------------------------------------------------------------------------
    vite: {
      optimizeDeps: {
        // 强制 Vite 预构建这些 CJS/ESM 混合包，用 esbuild 生成 default 导出
        include: [
          'dayjs',
          'dayjs/plugin/advancedFormat',
          'dayjs/plugin/customParseFormat',
          'dayjs/plugin/isoWeek',
          'dayjs/plugin/weekday',
          'mermaid',
        ],
      },
      ssr: {
        // SSR 阶段不要用 ESM 静态分析，让 mermaid 及其子依赖走 commonjs 兼容
        noExternal: ['mermaid', 'vitepress-plugin-mermaid'],
      },
    },

    // ---------------------------------------------------------------------------
    // 主题配置
    // ---------------------------------------------------------------------------
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config

      // 浏览器标签 + 导航栏左侧 Logo 文字
      siteTitle: '📚 我的学习文档',

      // 顶部导航栏 (按大分类组织下拉菜单)
      // 注：有 items 子菜单的 nav 项在 VitePress 2.x 类型中不能带 link，
      //     所以把"总览"入口放到下拉第一项，满足类型要求。
      nav: [
        { text: '🏠 首页', link: '/' },
        {
          text: '🎨 前端',
          items: [
            { text: '📂 前端总览',      link: '/frontend/' },
            { text: 'HTML / CSS',        link: '/frontend/html-css/html-css' },
            { text: 'JavaScript',        link: '/frontend/javascript/javascript' },
            { text: 'TypeScript',        link: '/frontend/typescript/typescript' },
            { text: 'Vue 3',             link: '/frontend/vue/vue' },
            { text: 'React',             link: '/frontend/react/react' },
            { text: 'Vite',              link: '/frontend/engineering/vite' },
          ]
        },
        {
          text: '🧑‍💻 后端',
          items: [
            { text: '📂 后端总览',      link: '/backend/' },
            { text: 'Node.js',           link: '/backend/nodejs/nodejs' },
            { text: 'Java',              link: '/backend/java/java' },
            { text: 'Python',            link: '/backend/python/python' },
            { text: '数据库',            link: '/backend/database/mysql' },
          ]
        },
        {
          text: '📱 客户端',
          items: [
            { text: '📂 客户端总览',    link: '/client/' },
            { text: '⚡ Electron',      link: '/client/electron/electron' },
            { text: '🦀 Tauri',         link: '/client/tauri/tauri' },
          ]
        },
        {
          text: '💡 基础',
          items: [
            { text: '📂 基础总览',      link: '/basic/' },
            { text: '操作系统',          link: '/basic/os/os' },
            { text: '计算机网络',        link: '/basic/network/network' },
            { text: '编译原理',          link: '/basic/principle/principle' },
            { text: '设计模式',          link: '/basic/design-pattern/design-pattern' },
          ]
        },
        {
          text: '🔧 算法',
          items: [
            { text: '📂 算法总览',      link: '/algorithm/' },
            { text: '数据结构基础',      link: '/algorithm/basics/basics' },
            { text: 'LeetCode 题解',    link: '/algorithm/leetcode/leetcode' },
            { text: '进阶算法',          link: '/algorithm/advance/advance' },
          ]
        },
        {
          text: '🤖 AI',
          items: [
            { text: '📂 AI 总览',        link: '/ai/' },
            { text: 'AI 学习路线',       link: '/ai/ai' },
            { text: '大模型应用',        link: '/ai/llm-app' },
            { text: '开发工具链',        link: '/ai/tooling' },
          ]
        },
        {
          text: '🐳 运维与部署',
          items: [
            { text: '📂 运维与部署总览',  link: '/ops/' },
            { text: 'Docker',            link: '/ops/docker/docker' },
            { text: 'Docker Compose',    link: '/ops/docker-compose/docker-compose' },
            { text: 'Kubernetes',        link: '/ops/k8s/k8s' },
            { text: 'CI/CD',             link: '/ops/cicd/cicd' },
            { text: 'Nginx',             link: '/ops/nginx/nginx' },
            { text: 'Linux 服务器',      link: '/ops/linux/linux' },
            { text: '监控与日志',        link: '/ops/monitoring/monitoring' },
          ]
        },
        {
          text: '📖 示例',
          items: [
            { text: 'Markdown 扩展示例',  link: '/markdown-examples' },
            { text: 'Runtime API 示例',   link: '/api-examples' },
          ]
        },
      ],

      // -------------------------------------------------------------------------
      // 侧边栏 - 按路径前缀配置，每个大分类下单独渲染对应的多级侧边栏
      // -------------------------------------------------------------------------
      sidebar: {
        // ── 🎨 前端 ──────────────────────────────────────────────
        '/frontend/': [
          {
            text: '🎨 前端',
            collapsed: false,
            items: [
              { text: '前端总览', link: '/frontend/' },
            ]
          },
          {
            text: 'HTML / CSS',
            items: [
              { text: 'HTML / CSS 笔记',   link: '/frontend/html-css/html-css' },
            ]
          },
          {
            text: 'JavaScript',
            items: [
              { text: 'JavaScript 笔记',   link: '/frontend/javascript/javascript' },
            ]
          },
          {
            text: 'TypeScript',
            items: [
              { text: 'TypeScript 笔记',   link: '/frontend/typescript/typescript' },
            ]
          },
          {
            text: 'Vue 3',
            items: [
              { text: 'Vue 3 笔记',        link: '/frontend/vue/vue' },
            ]
          },
          {
            text: 'React',
            items: [
              { text: 'React 笔记',         link: '/frontend/react/react' },
            ]
          },
          {
            text: '构建工具',
            items: [
              { text: 'Vite 笔记',          link: '/frontend/engineering/vite' },
            ]
          },
        ],

        // ── 🧑‍💻 后端 ──────────────────────────────────────────────
        '/backend/': [
          {
            text: '🧑‍💻 后端',
            collapsed: false,
            items: [
              { text: '后端总览', link: '/backend/' },
            ]
          },
          {
            text: 'Node.js',
            items: [
              { text: 'Node 原生',          link: '/backend/nodejs/nodejs' },
              { text: 'Express',            link: '/backend/nodejs/express' },
              { text: 'NestJS',             link: '/backend/nodejs/nestjs' },
            ]
          },
          {
            text: 'Java',
            items: [
              { text: 'Java 学习笔记',    link: '/backend/java/java' },
            ]
          },
          {
            text: 'Python',
            items: [
              { text: 'Python 笔记',        link: '/backend/python/python' },
              { text: 'Python Web',         link: '/backend/python/python-web' },
            ]
          },
          {
            text: '数据库',
            items: [
              { text: '📘 MySQL 笔记',  link: '/backend/database/mysql' },
            ]
          },
        ],

        // ── 📱 客户端 (Electron / Tauri) ──────────────────────
        '/client/': [
          {
            text: '📱 客户端',
            collapsed: false,
            items: [
              { text: '客户端总览', link: '/client/' },
            ]
          },
          {
            text: '⚡ Electron',
            collapsed: false,
            items: [
              { text: 'Electron 笔记', link: '/client/electron/electron' },
            ]
          },
          {
            text: '🦀 Tauri',
            items: [
              { text: 'Tauri 笔记',    link: '/client/tauri/tauri' },
            ]
          },
        ],

        // ── 💡 计算机基础 ──────────────────────────────────────
        '/basic/': [
          {
            text: '💡 计算机基础',
            collapsed: false,
            items: [
              { text: '基础总览', link: '/basic/' },
            ]
          },
          {
            text: '操作系统',
            items: [
              { text: '操作系统 笔记',      link: '/basic/os/os' },
            ]
          },
          {
            text: '计算机网络',
            items: [
              { text: '计算机网络 笔记',    link: '/basic/network/network' },
            ]
          },
          {
            text: '编译原理',
            items: [
              { text: '编译原理 笔记',      link: '/basic/principle/principle' },
            ]
          },
          {
            text: '设计模式',
            items: [
              { text: '设计模式 笔记',      link: '/basic/design-pattern/design-pattern' },
            ]
          },
        ],

        // ── 🔧 算法 & 数据结构 ──────────────────────────────────
        '/algorithm/': [
          {
            text: '🔧 算法 & 数据结构',
            collapsed: false,
            items: [
              { text: '算法总览', link: '/algorithm/' },
            ]
          },
          {
            text: '数据结构基础',
            items: [
              { text: '数据结构 笔记',     link: '/algorithm/basics/basics' },
            ]
          },
          {
            text: 'LeetCode 题解',
            items: [
              { text: 'LeetCode 笔记',     link: '/algorithm/leetcode/leetcode' },
            ]
          },
          {
            text: '进阶算法',
            items: [
              { text: '进阶算法 笔记',      link: '/algorithm/advance/advance' },
            ]
          },
        ],

        // ── 🤖 AI ──────────────────────────────────────────
        '/ai/': [
          {
            text: '🤖 AI',
            collapsed: false,
            items: [
              { text: 'AI 总览', link: '/ai/' },
              { text: 'AI 学习路线', link: '/ai/ai' },
              { text: '大模型应用', link: '/ai/llm-app' },
              { text: '开发工具链', link: '/ai/tooling' },
            ]
          },
        ],

        // ── 🐳 运维与部署 ──────────────────────────────────────
        '/ops/': [
          {
            text: '🐳 运维与部署',
            collapsed: false,
            items: [
              { text: '运维与部署总览',   link: '/ops/' },
              { text: 'Docker 笔记',      link: '/ops/docker/docker' },
              { text: 'Docker Compose',   link: '/ops/docker-compose/docker-compose' },
              { text: 'Kubernetes',       link: '/ops/k8s/k8s' },
              { text: 'CI/CD',            link: '/ops/cicd/cicd' },
              { text: 'Nginx',            link: '/ops/nginx/nginx' },
              { text: 'Linux 服务器基础', link: '/ops/linux/linux' },
              { text: '监控与日志',       link: '/ops/monitoring/monitoring' },
            ]
          },
        ],

        // ── 📖 其他页面（首页、示例页等）兜底侧边栏 ───────────
        '/': [
          {
            text: '📖 导航（快速跳转）',
            collapsed: false,
            items: [
              { text: '🏠 首页',          link: '/' },
              { text: '🎨 前端总览',      link: '/frontend/' },
              { text: '🧑‍💻 后端总览',    link: '/backend/' },
              { text: '📱 客户端总览',    link: '/client/' },
              { text: '💡 计算机基础',    link: '/basic/' },
              { text: '🔧 算法总览',      link: '/algorithm/' },
              { text: '🤖 AI 总览',       link: '/ai/' },
              { text: '🐳 运维与部署',    link: '/ops/' },
              { text: '📖 Markdown 示例', link: '/markdown-examples' },
              { text: '📖 Runtime API',   link: '/api-examples' },
            ]
          },
        ],
      },

      // 社交链接 (右上角小图标)
      socialLinks: [
        { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      ],

      // 页脚
      footer: {
        message: 'Made with ❤️ using VitePress',
        copyright: 'Copyright © 2026 我的学习文档',
      },

      // 大纲 (右侧目录) 显示层级
      outline: {
        level: [2, 4],
        label: '本页目录',
      },

      // 文档更新时间
      lastUpdated: {
        text: '最后更新于',
        formatOptions: {
          dateStyle: 'medium',
          timeStyle: 'short',
        },
      },

      // 搜索框占位文字 (VitePress 内置本地搜索)
      search: {
        provider: 'local',
        options: {
          translations: {
            button: {
              buttonText:    '搜索文档',
              buttonAriaLabel: '搜索文档',
            },
            modal: {
              displayDetails: '显示详细列表',
              resetButtonTitle: '重置搜索',
              backButtonTitle:  '关闭搜索',
              noResultsText:    '没有找到相关结果',
              footer: {
                selectText: '选择',
                selectKeyAriaLabel: '回车',
                navigateText: '切换',
                navigateUpKeyAriaLabel: '向上',
                navigateDownKeyAriaLabel: '向下',
                closeText: '关闭',
                closeKeyAriaLabel: 'esc',
              },
            },
          },
        },
      },

      // 暗色模式切换按钮文字
      darkModeSwitchLabel: '主题',
      lightModeSwitchTitle: '切换到浅色模式',
      darkModeSwitchTitle:  '切换到深色模式',

      // 返回顶部按钮
      returnToTopLabel: '回到顶部',

      // 侧边栏菜单文字 (移动端)
      sidebarMenuLabel: '菜单',
    },
  })
)
