<template>
  <div class="min-h-screen bg-base-200">
    <!-- 导航栏 -->
    <div class="navbar bg-base-100 shadow-lg">
      <div class="navbar-start">
        <div class="text-lg md:text-xl font-bold text-primary">PAGame</div>
      </div>
      <div class="navbar-center hidden md:block">
        <h1 class="text-xl md:text-2xl font-bold">价格行为学游戏</h1>
      </div>
      <div class="navbar-end">
        <!-- 移动端菜单 -->
        <div class="relative md:hidden">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle" @click="toggleMobileMenu">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </div>

          <!-- 菜单背景遮罩 -->
          <div v-if="mobileMenuOpen" class="fixed inset-0 z-40 bg-black bg-opacity-25" @click="closeMobileMenu"></div>

          <!-- 菜单内容 -->
          <div v-if="mobileMenuOpen"
            class="absolute right-0 top-full mt-2 z-50 menu p-2 shadow bg-base-100 rounded-box w-52">
            <ul>
              <li><button @click="handleMobileMenuClick('game')" class="flex items-center gap-2 w-full">
                  🎮 游戏模式
                </button></li>
              <li><button @click="handleMobileMenuClick('study')" class="flex items-center gap-2 w-full">
                  📚 学习模式
                </button></li>
              <li><button @click="handleMobileMenuClick('stats')" class="flex items-center gap-2 w-full">
                  📊 统计
                </button></li>
              <li><button @click="handleMobileMenuClick('donation')" class="flex items-center gap-2 w-full">
                  ☕ 打赏支持
                </button></li>
              <li>
                <div class="divider"></div>
              </li>
              <li><button @click="handleMobileMenuClick('theme-toggle')" class="flex items-center gap-2 w-full">
                  {{ currentTheme === 'light' ? '🌙 切换到深色主题' : '☀️ 切换到浅色主题' }}
                </button></li>
            </ul>
          </div>
        </div>

        <!-- 桌面端模式切换 -->
        <div class="hidden md:flex gap-2 mr-4">
          <button @click="switchMode('game')"
            :class="['btn btn-sm', currentMode === 'game' ? 'btn-primary' : 'btn-outline']">
            🎮 游戏模式
          </button>
          <button @click="switchMode('study')"
            :class="['btn btn-sm', currentMode === 'study' ? 'btn-primary' : 'btn-outline']">
            📚 学习模式
          </button>
          <button @click="switchMode('stats')"
            :class="['btn btn-sm', currentMode === 'stats' ? 'btn-primary' : 'btn-outline']">
            📊 统计
          </button>
          <button @click="switchMode('donation')"
            :class="['btn btn-sm', currentMode === 'donation' ? 'btn-primary' : 'btn-outline']">
            ☕ 打赏支持
          </button>
        </div>

        <!-- 桌面端主题切换 -->
        <div class="hidden md:block">
          <button @click="toggleTheme" class="btn btn-ghost btn-circle" aria-label="切换主题">
            <!-- 根据当前主题显示不同图标 -->
            <svg v-if="currentTheme === 'dark'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <!-- 太阳图标 (浅色模式) -->
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z">
              </path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <!-- 月亮图标 (深色模式) -->
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端标题已移除 -->

    <!-- PWA状态显示 -->
    <PWAStatus />

    <!-- 主要内容 -->
    <div class="container mx-auto px-2 md:px-4 py-4 md:py-8">
      <GameCard v-if="currentMode === 'game'" />
      <StudyMode v-else-if="currentMode === 'study'" />
      <Stats v-else-if="currentMode === 'stats'" />
      <Donation v-else-if="currentMode === 'donation'" />
    </div>

    <!-- 页脚 -->
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
      <div class="grid grid-flow-col gap-4">
        <a href="https://github.com/forecho/PAGame" target="_blank" rel="noopener noreferrer"
          class="link link-hover flex items-center gap-1">
          ⭐ GitHub
        </a>
        <span class="text-base-content/60">|</span>
        <span>价格行为学缩写记忆游戏</span>
        <span class="text-base-content/60">|</span>
        <span>让学习变得有趣！</span>
      </div>
    </footer>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import GameCard from './components/GameCard.vue'
import StudyMode from './components/StudyMode.vue'
import Stats from './components/Stats.vue'
import Donation from './components/Donation.vue'
import PWAStatus from './components/PWAStatus.vue'

export default {
  name: 'App',
  components: {
    GameCard,
    StudyMode,
    Stats,
    Donation,
    PWAStatus
  },
  setup() {
    const currentMode = ref('game') // 'game', 'study', 'stats', 或 'donation'
    const mobileMenuOpen = ref(false) // 移动端菜单状态
    const currentTheme = ref('light') // 当前主题

    const setTheme = (theme) => {
      console.log('Setting theme to:', theme)
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
      currentTheme.value = theme

      // 调试信息：检查主题是否正确应用
      setTimeout(() => {
        const docTheme = document.documentElement.getAttribute('data-theme')
        console.log('Current theme attribute:', docTheme)
        console.log('CSS variables:', getComputedStyle(document.documentElement).getPropertyValue('--color-primary'))
      }, 100)
    }

    // 切换主题（直接在明暗主题间切换）
    const toggleTheme = () => {
      const newTheme = currentTheme.value === 'light' ? 'dark' : 'light'
      setTheme(newTheme)
    }

    const switchMode = (mode) => {
      currentMode.value = mode
    }

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    const closeMobileMenu = () => {
      mobileMenuOpen.value = false
    }

    const handleMobileMenuClick = (action) => {
      if (action === 'theme-toggle') {
        // 直接切换主题
        toggleTheme()
      } else if (action.startsWith('theme-')) {
        // 兼容旧代码
        const theme = action.replace('theme-', '')
        setTheme(theme)
      } else {
        switchMode(action)
      }
      // 点击后关闭菜单
      mobileMenuOpen.value = false
    }

    onMounted(() => {
      // 从本地存储恢复主题设置
      const savedTheme = localStorage.getItem('theme') || 'light'
      currentTheme.value = savedTheme // 确保 currentTheme 与实际主题一致
      setTheme(savedTheme)
    })

    return {
      currentMode,
      currentTheme,
      setTheme,
      toggleTheme,
      switchMode,
      mobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu,
      handleMobileMenuClick
    }
  }
}
</script>
