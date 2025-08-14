<template>
  <div class="card bg-base-100 shadow-xl max-w-4xl mx-auto">
    <div class="card-body">
      <h2 class="card-title text-2xl justify-center text-base-content mb-4">学习模式 - 浏览所有缩写</h2>
      
      <!-- 搜索和筛选 -->
      <div class="flex gap-4 mb-6">
        <div class="form-control flex-1">
          <input 
            v-model="searchTerm" 
            type="text" 
            placeholder="搜索缩写..." 
            class="input input-bordered"
          />
        </div>
        <div class="form-control">
          <select v-model="selectedCategory" class="select select-bordered">
            <option value="">所有分类</option>
            <option value="basic">基础术语</option>
            <option value="pattern">技术形态</option>
            <option value="strategy">交易策略</option>
            <option value="risk">风险管理</option>
          </select>
        </div>
      </div>

      <!-- 缩写列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="acronym in filteredAcronyms" 
          :key="acronym.abbreviation"
          class="card bg-base-200 hover:bg-base-300 transition-colors cursor-pointer"
          @click="toggleCard(acronym.abbreviation)"
        >
          <div class="card-body p-4">
            <h3 class="card-title text-lg justify-center text-primary">
              {{ acronym.abbreviation }}
            </h3>
            
            <!-- 翻转效果 -->
            <div class="text-center">
              <div v-if="!flippedCards[acronym.abbreviation]" class="text-base-content/70">
                点击查看详情
              </div>
              <div v-else class="space-y-2">
                <div class="font-medium text-base-content">
                  {{ acronym.fullName }}
                </div>
                <div class="text-sm text-base-content/70">
                  {{ acronym.chinese }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 统计信息 -->
      <div class="mt-6 text-center text-base-content/70">
        共 {{ filteredAcronyms.length }} 个缩写
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { acronyms } from '../data/acronyms.js'

export default {
  name: 'StudyMode',
  setup() {
    const searchTerm = ref('')
    const selectedCategory = ref('')
    const flippedCards = ref({})

    // 分类映射
    const categoryMap = {
      basic: ['PA', 'TF', 'S/R', 'H', 'L', 'O', 'C', 'b', 'B', 'S'],
      pattern: ['IB', 'TRI', 'W', 'CH', 'TR', 'TTR', 'CX', 'DB', 'DT', 'HH', 'HL'],
      strategy: ['H2B', 'L2S', 'SAR', 'BOP', 'ORBO', 'FT', 'PB', 'SPB'],
      risk: ['iR', 'iStop', 'TGT', 'B/E', 'CE', 'HP', 'LP']
    }

    // 过滤缩写
    const filteredAcronyms = computed(() => {
      let filtered = acronyms

      // 按分类筛选
      if (selectedCategory.value) {
        const categoryAbbrs = categoryMap[selectedCategory.value] || []
        filtered = filtered.filter(a => categoryAbbrs.includes(a.abbreviation))
      }

      // 按搜索词筛选
      if (searchTerm.value) {
        const term = searchTerm.value.toLowerCase()
        filtered = filtered.filter(a => 
          a.abbreviation.toLowerCase().includes(term) ||
          a.fullName.toLowerCase().includes(term) ||
          a.chinese.includes(term)
        )
      }

      return filtered
    })

    // 翻转卡片
    const toggleCard = (abbreviation) => {
      flippedCards.value[abbreviation] = !flippedCards.value[abbreviation]
    }

    return {
      searchTerm,
      selectedCategory,
      flippedCards,
      filteredAcronyms,
      toggleCard
    }
  }
}
</script>
