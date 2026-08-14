// https://vitepress.dev/guide/custom-theme
import { h, onMounted, watch, nextTick, defineComponent, ref } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { Icon } from '@iconify/vue'
import mediumZoom from 'medium-zoom'
import { useData, useRoute } from 'vitepress'
import './style.css'

// 阅读进度条组件
const ReadingProgress = defineComponent({
  name: 'ReadingProgress',
  setup() {
    const progress = ref(0)
    const { isDark } = useData()

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      progress.value = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0
    }

    onMounted(() => {
      window.addEventListener('scroll', updateProgress, { passive: true })
      updateProgress()
    })

    return () => h('div', {
      class: 'reading-progress-bar',
      style: { width: progress.value + '%' }
    })
  }
})

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 顶部布局槽：插入阅读进度条
      'layout-top': () => h(ReadingProgress),

      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 全局注册 Icon 组件，在任何 md 文件中都能用 <Icon icon="..." />
    app.component('Icon', Icon)
  },
  setup() {
    const route = useRoute()

    // 路由变化后，初始化 medium-zoom 图片缩放
    const initZoom = () => {
      nextTick(() => {
        const images = document.querySelectorAll(
          '.vp-doc img:not(.medium-zoom-image):not([data-no-zoom])'
        )
        if (images.length > 0) {
          mediumZoom(images as NodeListOf<HTMLImageElement>, {
            margin: 24,
            background: 'rgba(0, 0, 0, 0.75)',
          })
        }
      })
    }

    onMounted(() => initZoom())
    watch(() => route.path, () => initZoom())
  }
} satisfies Theme
