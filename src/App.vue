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
        <div class="dropdown dropdown-end md:hidden">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </div>
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><button @click="switchMode('game')" class="flex items-center gap-2">
                🎮 游戏模式
              </button></li>
            <li><button @click="switchMode('study')" class="flex items-center gap-2">
                📚 学习模式
              </button></li>
            <li><button @click="switchMode('stats')" class="flex items-center gap-2">
                📊 统计
              </button></li>
            <li>
              <div class="divider"></div>
            </li>
            <li><button @click="setTheme('light')" class="flex items-center gap-2">
                ☀️ 浅色主题
              </button></li>
            <li><button @click="setTheme('dark')" class="flex items-center gap-2">
                🌙 深色主题
              </button></li>
            <li><button @click="setTheme('cupcake')" class="flex items-center gap-2">
                🧁 可爱主题
              </button></li>
            <li><button @click="setTheme('cyberpunk')" class="flex items-center gap-2">
                🤖 赛博朋克
              </button></li>
          </ul>
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
        </div>

        <!-- 桌面端主题切换 -->
        <div class="dropdown dropdown-end hidden md:block">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </div>
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><button @click="setTheme('light')" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z">
                  </path>
                </svg>
                浅色主题
              </button></li>
            <li><button @click="setTheme('dark')" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
                深色主题
              </button></li>
            <li><button @click="setTheme('cupcake')" class="flex items-center gap-2">
                🧁
                可爱主题
              </button></li>
            <li><button @click="setTheme('cyberpunk')" class="flex items-center gap-2">
                🤖
                赛博朋克
              </button></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 移动端标题 -->
    <div class="md:hidden text-center py-4 bg-base-100 border-b">
      <h1 class="text-xl font-bold">价格行为学游戏</h1>
    </div>

    <!-- 主要内容 -->
    <div class="container mx-auto px-2 md:px-4 py-4 md:py-8">
      <GameCard v-if="currentMode === 'game'" />
      <StudyMode v-else-if="currentMode === 'study'" />
      <Stats v-else-if="currentMode === 'stats'" />
    </div>

    <!-- 页脚 -->
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>价格行为学缩写记忆游戏 - 让学习变得有趣！</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import GameCard from './components/GameCard.vue'
import StudyMode from './components/StudyMode.vue'
import Stats from './components/Stats.vue'

export default {
  name: 'App',
  components: {
    GameCard,
    StudyMode,
    Stats
  },
  setup() {
    const currentMode = ref('game') // 'game', 'study', 或 'stats'

    const setTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    }

    const switchMode = (mode) => {
      currentMode.value = mode
    }

    onMounted(() => {
      // 从本地存储恢复主题设置
      const savedTheme = localStorage.getItem('theme') || 'light'
      setTheme(savedTheme)
    })

    return {
      currentMode,
      setTheme,
      switchMode
    }
  }
}
</script>
