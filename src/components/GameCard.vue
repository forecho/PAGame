<template>
  <div class="card bg-base-100 shadow-xl max-w-md mx-auto">
    <div class="card-body text-center">
      <h2 class="card-title text-xl md:text-2xl justify-center text-base-content mb-2">价格行为学缩写记忆</h2>
      <p class="text-sm md:text-base text-base-content/70">记住这些重要的缩写！</p>
    </div>

    <!-- 游戏状态显示 -->
    <div class="px-4 md:px-6 mb-4 md:mb-6">
      <div class="flex justify-between items-center mb-3 md:mb-4">
        <div class="text-xs md:text-sm text-base-content/70">
          进度: {{ currentIndex + 1 }} / {{ totalQuestions }}
        </div>
        <div class="text-xs md:text-sm text-base-content/70">
          得分: {{ score }} / {{ totalQuestions }}
        </div>
      </div>

      <!-- 难度选择 -->
      <div class="flex items-center gap-2 mb-2">
        <span class="text-xs text-base-content/50">难度:</span>
        <div class="flex gap-1">
          <button @click="changeDifficulty('easy')" 
            class="btn btn-xs" 
            :class="difficulty === 'easy' ? 'btn-success' : 'btn-outline btn-success'">
            简单
          </button>
          <button @click="changeDifficulty('medium')" 
            class="btn btn-xs" 
            :class="difficulty === 'medium' ? 'btn-warning' : 'btn-outline btn-warning'">
            中等
          </button>
          <button @click="changeDifficulty('hard')" 
            class="btn btn-xs" 
            :class="difficulty === 'hard' ? 'btn-error' : 'btn-outline btn-error'">
            困难
          </button>
        </div>
      </div>

      <!-- 进度条 -->
      <progress class="progress progress-primary w-full" :value="((currentIndex + 1) / totalQuestions) * 100"
        max="100"></progress>
    </div>

    <!-- 问题卡片 -->
    <div v-if="!gameFinished && currentQuestion" class="px-4 md:px-6 mb-4 md:mb-6">
      <div class="bg-base-200 rounded-box p-3 md:p-4 mb-3 md:mb-4">
        <h3 class="text-xl md:text-2xl font-semibold text-center mb-2">
          {{ currentQuestion.abbreviation }}
        </h3>
        <p class="text-xs md:text-sm text-base-content/70 text-center">这个缩写代表什么？</p>
      </div>

      <!-- 选项按钮 -->
      <div class="space-y-2 md:space-y-3">
        <button v-for="(option, index) in currentOptions" :key="option.fullName" @click="checkAnswer(option)"
          :disabled="answered" :class="[
            'btn w-full justify-start text-left h-auto p-2 md:p-3 text-sm md:text-base',
            answered
              ? option.fullName === currentQuestion?.fullName
                ? 'btn-success'
                : option.fullName === selectedAnswer?.fullName
                  ? 'btn-error'
                  : 'btn-ghost'
              : 'btn-outline hover:btn-primary'
          ]">
          <div class="flex items-center justify-between w-full">
            <div class="flex flex-col items-start">
              <div class="font-medium">{{ option.chinese }}</div>
            </div>
            <div class="text-xs opacity-50 bg-base-300 px-2 py-1 rounded">
              {{ index + 1 }}
            </div>
          </div>
        </button>
      </div>

      <!-- 键盘快捷键提示 -->
      <div class="mt-3 md:mt-4 text-xs text-base-content/50 text-center">
        <span class="hidden md:inline">提示：按数字键 1-4 选择答案，按 Enter 键进入下一题</span>
        <span class="md:hidden">点击选项选择答案</span>
      </div>


    </div>

    <!-- 游戏结束 -->
    <div v-else class="px-4 md:px-6 pb-4 md:pb-6 text-center">
      <div class="text-4xl md:text-6xl mb-3 md:mb-4">🎉</div>
      <h3 class="text-xl md:text-2xl font-bold text-base-content mb-2">
        {{ isReviewMode ? '复习完成！' : '游戏完成！' }}
      </h3>
      <p class="text-sm md:text-base text-base-content/70 mb-4 md:mb-6">
        你的最终得分：<span class="font-bold text-primary">{{ score }}</span> / {{ totalQuestions }}
      </p>
      <div class="text-xs md:text-sm text-base-content/50 mb-4 md:mb-6">
        正确率：{{ Math.round((score / totalQuestions) * 100) }}%
      </div>

      <!-- 错题统计 -->
      <div v-if="!isReviewMode && wrongAnswers.length > 0" class="mb-4 md:mb-6 p-3 md:p-4 bg-warning/10 rounded-box">
        <p class="text-warning font-medium mb-2 text-sm md:text-base">你有 {{ wrongAnswers.length }} 道错题需要复习</p>
        <button @click="reviewWrongAnswers" class="btn btn-warning btn-sm text-xs md:text-sm">
          复习错题
        </button>
      </div>

      <div class="flex flex-col gap-2 justify-center">
        <div class="flex gap-2 justify-center">
          <button @click="restartGame" class="btn btn-primary text-sm md:text-base">
            {{ isReviewMode ? '重新开始' : '再来一轮' }}
          </button>
          <button v-if="!isReviewMode && wrongAnswers.length > 0" @click="reviewWrongAnswers"
            class="btn btn-outline text-sm md:text-base">
            复习错题
          </button>
        </div>

        <!-- 难度选择 -->
        <div class="mt-3 md:mt-4 p-3 md:p-4 bg-base-200 rounded-box">
          <p class="text-xs md:text-sm text-base-content/70 mb-2">选择难度:</p>
          <div class="flex flex-col md:flex-row gap-2 justify-center">
            <button @click="changeDifficulty('easy')"
              :class="['btn btn-sm text-xs md:text-sm', difficulty === 'easy' ? 'btn-success' : 'btn-outline']">
              简单 (10题)
            </button>
            <button @click="changeDifficulty('medium')"
              :class="['btn btn-sm text-xs md:text-sm', difficulty === 'medium' ? 'btn-warning' : 'btn-outline']">
              中等 (20题)
            </button>
            <button @click="changeDifficulty('hard')"
              :class="['btn btn-sm text-xs md:text-sm', difficulty === 'hard' ? 'btn-error' : 'btn-outline']">
              困难 (30题)
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 答案反馈弹窗 - 固定位置显示 -->
    <div v-if="answered" class="fixed inset-x-4 bottom-4 z-50 max-w-md mx-auto">
      <div class="bg-base-100 shadow-2xl rounded-box p-4 border-2"
        :class="isCorrect ? 'border-success' : 'border-error'">
        <!-- 答案结果 -->
        <div :class="isCorrect ? 'alert alert-success' : 'alert alert-error'" class="mb-3">
          <div class="flex items-center">
            <div class="font-medium text-sm md:text-base">
              {{ isCorrect ? '✓ 正确！' : '✗ 错误！' }}
            </div>
          </div>
        </div>

        <!-- 答案详情 -->
        <div class="p-3 bg-base-200 rounded-box mb-3">
          <div class="text-xs md:text-sm">
            <div class="mb-1"><strong>英文全称：</strong>{{ currentQuestion?.fullName }}</div>
            <div><strong>中文释义：</strong>{{ currentQuestion?.chinese }}</div>
          </div>
        </div>

        <!-- 下一题按钮 -->
        <button @click="nextQuestion" class="btn btn-primary w-full text-sm md:text-base">
          下一题
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { acronyms } from '../data/acronyms.js'

export default {
  name: 'GameCard',
  setup() {
    const currentIndex = ref(0)
    const score = ref(0)
    const answered = ref(false)
    const selectedAnswer = ref(null)
    const gameFinished = ref(false)
    const questions = ref([])
    const totalQuestions = ref(0)
    const wrongAnswers = ref([]) // 记录错题
    const isReviewMode = ref(false) // 是否为复习模式
    const difficulty = ref('medium') // 难度：easy(10题), medium(20题), hard(30题)
    const gameStartTime = ref(0) // 游戏开始时间

    // 获取当前问题
    const currentQuestion = computed(() => questions.value[currentIndex.value])

    // 生成选项（包含正确答案和3个干扰项）
    const currentOptions = computed(() => {
      if (!currentQuestion.value) return []

      const correctAnswer = currentQuestion.value
      const otherAcronyms = acronyms.filter(a => a.abbreviation !== correctAnswer.abbreviation)

      // 随机选择3个干扰项
      const shuffled = otherAcronyms.sort(() => 0.5 - Math.random())
      const distractors = shuffled.slice(0, 3)

      // 合并选项并打乱顺序
      const allOptions = [correctAnswer, ...distractors]
      return allOptions.sort(() => 0.5 - Math.random())
    })

    // 检查答案
    const checkAnswer = (selectedOption) => {
      if (answered.value || !currentQuestion.value) return

      answered.value = true
      selectedAnswer.value = selectedOption

      if (selectedOption.fullName === currentQuestion.value.fullName) {
        score.value++
      } else {
        // 记录错题
        wrongAnswers.value.push(currentQuestion.value)
      }

      // 保存进度
      saveToStorage()
    }

    // 下一题
    const nextQuestion = () => {
      if (currentIndex.value < totalQuestions.value - 1) {
        currentIndex.value++
        answered.value = false
        selectedAnswer.value = null
      } else {
        gameFinished.value = true
        answered.value = false // 重置答案状态，确保答案窗口可以关闭
        selectedAnswer.value = null
        saveGameRecord() // 保存游戏记录
      }
    }

    // 重新开始游戏
    const restartGame = () => {
      currentIndex.value = 0
      score.value = 0
      answered.value = false
      selectedAnswer.value = null
      gameFinished.value = false
      wrongAnswers.value = []
      isReviewMode.value = false
      generateQuestions()
    }

    // 复习错题
    const reviewWrongAnswers = () => {
      if (wrongAnswers.value.length === 0) return

      questions.value = [...wrongAnswers.value]
      totalQuestions.value = questions.value.length
      currentIndex.value = 0
      score.value = 0
      answered.value = false
      selectedAnswer.value = null
      gameFinished.value = false
      isReviewMode.value = true
    }

    // 改变难度
    const changeDifficulty = (newDifficulty) => {
      // 如果难度没有变化，不做任何操作
      if (difficulty.value === newDifficulty) return
      
      // 如果游戏正在进行中，询问用户是否确定切换难度
      if (!gameFinished.value && currentIndex.value > 0) {
        if (confirm(`确定要切换到${newDifficulty === 'easy' ? '简单' : newDifficulty === 'medium' ? '中等' : '困难'}难度吗？当前进度将会丢失。`)) {
          difficulty.value = newDifficulty
          restartGame()
        }
      } else {
        // 游戏未开始或已结束，直接切换难度
        difficulty.value = newDifficulty
        restartGame()
      }
    }

    // 生成问题（根据难度选择题目数量）
    const generateQuestions = () => {
      const shuffled = [...acronyms].sort(() => 0.5 - Math.random())
      let questionCount = 20 // 默认中等难度

      switch (difficulty.value) {
        case 'easy':
          questionCount = 10
          break
        case 'hard':
          questionCount = 30
          break
        default:
          questionCount = 20
      }

      questions.value = shuffled.slice(0, questionCount)
      totalQuestions.value = questions.value.length
      gameStartTime.value = Date.now() // 记录游戏开始时间
    }

    // 计算是否正确
    const isCorrect = computed(() => {
      return selectedAnswer.value?.fullName === currentQuestion.value?.fullName
    })

    onMounted(() => {
      // 从本地存储恢复数据
      loadFromStorage()
      generateQuestions()

      // 添加键盘快捷键支持
      const handleKeyPress = (event) => {
        // 如果游戏结束，不处理键盘事件
        if (gameFinished.value) return

        const key = event.key

        // 数字键 1-4 选择答案
        if (key >= '1' && key <= '4' && !answered.value) {
          const optionIndex = parseInt(key) - 1
          if (currentOptions.value[optionIndex]) {
            checkAnswer(currentOptions.value[optionIndex])
          }
        }

        // Enter 键进入下一题（只有在已回答后才能使用）
        if (key === 'Enter' && answered.value) {
          nextQuestion()
        }
      }

      window.addEventListener('keydown', handleKeyPress)

      // 保存事件监听器引用以便清理
      window._paGameKeyHandler = handleKeyPress
    })

    onUnmounted(() => {
      // 清理键盘事件监听器
      if (window._paGameKeyHandler) {
        window.removeEventListener('keydown', window._paGameKeyHandler)
        delete window._paGameKeyHandler
      }
    })

    // 保存到本地存储
    const saveToStorage = () => {
      const data = {
        score: score.value,
        wrongAnswers: wrongAnswers.value,
        isReviewMode: isReviewMode.value,
        timestamp: Date.now()
      }
      localStorage.setItem('paGameProgress', JSON.stringify(data))
    }

    // 保存游戏记录
    const saveGameRecord = () => {
      if (gameFinished.value && !isReviewMode.value) {
        try {
          const existingRecords = JSON.parse(localStorage.getItem('paGameRecords') || '[]')
          const newRecord = {
            timestamp: Date.now(),
            difficulty: difficulty.value,
            totalQuestions: totalQuestions.value,
            correctAnswers: score.value,
            wrongAnswers: wrongAnswers.value.length,
            accuracy: Math.round((score.value / totalQuestions.value) * 100),
            duration: Math.floor((Date.now() - gameStartTime.value) / 1000) // 秒
          }
          existingRecords.push(newRecord)
          localStorage.setItem('paGameRecords', JSON.stringify(existingRecords))
        } catch (error) {
          console.log('保存游戏记录失败:', error)
        }
      }
    }

    // 从本地存储加载
    const loadFromStorage = () => {
      try {
        const saved = localStorage.getItem('paGameProgress')
        if (saved) {
          const data = JSON.parse(saved)
          // 只恢复错题记录，不恢复分数
          wrongAnswers.value = data.wrongAnswers || []
          isReviewMode.value = data.isReviewMode || false
        }
      } catch (error) {
        console.log('无法加载保存的数据:', error)
      }
    }

    return {
      currentIndex,
      score,
      answered,
      selectedAnswer,
      gameFinished,
      currentQuestion,
      currentOptions,
      totalQuestions,
      isCorrect,
      wrongAnswers,
      isReviewMode,
      difficulty,
      checkAnswer,
      nextQuestion,
      restartGame,
      reviewWrongAnswers,
      changeDifficulty
    }
  }
}
</script>
