<template>
    <div class="card bg-base-100 shadow-xl max-w-2xl mx-auto">
        <div class="card-body">
            <h2 class="card-title text-2xl justify-center text-base-content mb-4">学习统计</h2>

            <!-- 今日统计 -->
            <div class="stats stats-vertical lg:stats-horizontal shadow">
                <div class="stat">
                    <div class="stat-title">今日答题</div>
                    <div class="stat-value text-primary">{{ todayStats.totalQuestions }}</div>
                    <div class="stat-desc">总题目数</div>
                </div>

                <div class="stat">
                    <div class="stat-title">正确率</div>
                    <div class="stat-value text-success">{{ todayStats.accuracy }}%</div>
                    <div class="stat-desc">今日正确率</div>
                </div>

                <div class="stat">
                    <div class="stat-title">错题数</div>
                    <div class="stat-value text-error">{{ todayStats.wrongAnswers }}</div>
                    <div class="stat-desc">需要复习</div>
                </div>
            </div>

            <!-- 历史记录 -->
            <div class="mt-6">
                <h3 class="text-lg font-semibold mb-3">最近学习记录</h3>
                <div class="overflow-x-auto">
                    <table class="table table-zebra">
                        <thead>
                            <tr>
                                <th>日期</th>
                                <th>难度</th>
                                <th>题目数</th>
                                <th>正确率</th>
                                <th>用时</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="record in recentRecords" :key="record.timestamp">
                                <td>{{ formatDate(record.timestamp) }}</td>
                                <td>
                                    <div class="badge" :class="{
                                        'badge-success': record.difficulty === 'easy',
                                        'badge-warning': record.difficulty === 'medium',
                                        'badge-error': record.difficulty === 'hard'
                                    }">
                                        {{ getDifficultyText(record.difficulty) }}
                                    </div>
                                </td>
                                <td>{{ record.totalQuestions }}</td>
                                <td>{{ record.accuracy }}%</td>
                                <td>{{ record.duration }}秒</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 清空数据按钮 -->
            <div class="mt-6 text-center">
                <button @click="clearAllData" class="btn btn-outline btn-error">
                    清空所有数据
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
    name: 'Stats',
    setup() {
        const gameRecords = ref([])

        // 今日统计
        const todayStats = computed(() => {
            const today = new Date().toDateString()
            const todayRecords = gameRecords.value.filter(record =>
                new Date(record.timestamp).toDateString() === today
            )

            const totalQuestions = todayRecords.reduce((sum, record) => sum + record.totalQuestions, 0)
            const totalCorrect = todayRecords.reduce((sum, record) => sum + record.correctAnswers, 0)
            const totalWrong = todayRecords.reduce((sum, record) => sum + record.wrongAnswers, 0)

            return {
                totalQuestions,
                correctAnswers: totalCorrect,
                wrongAnswers: totalWrong,
                accuracy: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
            }
        })

        // 最近记录
        const recentRecords = computed(() => {
            return gameRecords.value
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(0, 10)
        })

        // 格式化日期
        const formatDate = (timestamp) => {
            const date = new Date(timestamp)
            return date.toLocaleDateString('zh-CN', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        }

        // 获取难度文本
        const getDifficultyText = (difficulty) => {
            const map = {
                easy: '简单',
                medium: '中等',
                hard: '困难'
            }
            return map[difficulty] || '未知'
        }

        // 加载数据
        const loadData = () => {
            try {
                const saved = localStorage.getItem('paGameRecords')
                if (saved) {
                    gameRecords.value = JSON.parse(saved)
                }
            } catch (error) {
                console.log('无法加载统计数据:', error)
            }
        }

        // 清空所有数据
        const clearAllData = () => {
            if (confirm('确定要清空所有学习数据吗？此操作不可恢复。')) {
                localStorage.removeItem('paGameRecords')
                localStorage.removeItem('paGameProgress')
                gameRecords.value = []
                alert('数据已清空')
            }
        }

        onMounted(() => {
            loadData()
        })

        return {
            todayStats,
            recentRecords,
            formatDate,
            getDifficultyText,
            clearAllData
        }
    }
}
</script>
