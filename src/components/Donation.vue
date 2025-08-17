<template>
    <div class="hero min-h-96 bg-base-100">
        <div class="hero-content text-center">
            <div class="max-w-md">
                <h1 class="text-3xl md:text-5xl font-bold mb-6">☕ 打赏支持</h1>
                <p class="text-lg md:text-xl mb-8 text-base-content/80">
                    如果这个应用对您有帮助，您可以通过微信扫码打赏来支持开发者继续改进和维护这个项目。
                </p>

                <!-- 二维码容器 -->
                <div class="card bg-base-200 shadow-xl p-6 mb-6">
                    <div class="card-body items-center text-center">
                        <h2 class="card-title text-xl mb-4">💰 微信打赏</h2>

                        <!-- 二维码图片 -->
                        <div class="mb-4">
                            <img src="https://img.forecho.com/14umTN.jpg" alt="微信打赏二维码"
                                class="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-lg shadow-lg" @error="onImageError"
                                @load="onImageLoad" />
                        </div>

                        <!-- 加载状态 -->
                        <div v-if="imageLoading" class="flex flex-col items-center gap-2">
                            <span class="loading loading-spinner loading-md"></span>
                            <p class="text-sm text-base-content/60">正在加载二维码...</p>
                        </div>

                        <!-- 错误状态 -->
                        <div v-if="imageError" class="alert alert-warning">
                            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.98-.833-2.75 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            <span>二维码加载失败，请稍后再试</span>
                        </div>

                        <p class="text-sm text-base-content/60">
                            使用微信扫描上方二维码即可打赏
                        </p>
                    </div>
                </div>

                <!-- 感谢文字 -->
                <div class="bg-base-200 rounded-lg p-4">
                    <p class="text-base text-base-content/70">
                        🙏 感谢您的支持！您的每一份打赏都是对开发者最大的鼓励，
                        让我们能够持续改进这个价格行为学学习工具。
                    </p>
                </div>

                <!-- 其他支持方式 -->
                <div class="mt-6">
                    <h3 class="text-lg font-semibold mb-3">🌟 其他支持方式</h3>
                    <div class="flex flex-col gap-3 text-sm">
                        <div class="flex items-center justify-center">
                            <a href="https://github.com/forecho/PAGame" target="_blank" rel="noopener noreferrer"
                                class="btn btn-outline btn-sm gap-2 hover:btn-primary transition-colors">
                                ⭐ 给项目点个Star
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </div>
                        <p class="text-center">📝 提供反馈和建议</p>
                        <p class="text-center">🔗 分享给更多需要的人</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
    name: 'Donation',
    setup() {
        const imageLoading = ref(true)
        const imageError = ref(false)

        const onImageLoad = () => {
            imageLoading.value = false
            imageError.value = false
        }

        const onImageError = () => {
            imageLoading.value = false
            imageError.value = true
        }

        onMounted(() => {
            // 预加载图片
            const img = new Image()
            img.onload = onImageLoad
            img.onerror = onImageError
            img.src = 'https://img.forecho.com/14umTN.jpg'
        })

        return {
            imageLoading,
            imageError,
            onImageLoad,
            onImageError
        }
    }
}
</script>

<style scoped>
/* 为二维码图片添加一些额外的样式 */
img {
    transition: transform 0.3s ease;
}

img:hover {
    transform: scale(1.05);
}

/* 确保图片在不同设备上的适配 */
@media (max-width: 768px) {
    img {
        max-width: 200px;
        max-height: 200px;
    }
}
</style>
