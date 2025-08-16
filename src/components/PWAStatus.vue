<template>
    <div class="pwa-status">
        <!-- 离线状态提示 -->
        <div v-if="isOffline" class="alert alert-warning alert-sm mb-2">
            <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z">
                        </path>
                    </svg>
                    <span class="text-xs">当前处于离线状态</span>
                </div>
                <button @click="dismissOfflineAlert" class="btn btn-xs btn-ghost text-warning/70">
                    ✕
                </button>
            </div>
        </div>



        <!-- 已安装状态 -->
        <div v-if="isInstalled" class="alert alert-success alert-sm mb-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                </path>
            </svg>
            <span class="text-xs">已安装到主屏幕</span>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
    name: 'PWAStatus',
    setup() {
        const isOffline = ref(false)
        const showInstallButton = ref(false)
        const isInstalled = ref(false)
        let deferredPrompt = null

        // 检查离线状态
        const checkOnlineStatus = () => {
            isOffline.value = !navigator.onLine
        }

        // 检查PWA安装状态
        const checkInstallStatus = () => {
            // 检查是否在独立窗口中运行
            isInstalled.value = window.matchMedia('(display-mode: standalone)').matches ||
                window.navigator.standalone === true
        }

        // 安装PWA
        const installPWA = async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt()
                const { outcome } = await deferredPrompt.userChoice
                if (outcome === 'accepted') {
                    console.log('PWA安装成功')
                    showInstallButton.value = false
                    isInstalled.value = true
                }
                deferredPrompt = null
            }
        }

        // 关闭安装提示
        const dismissInstallPrompt = () => {
            showInstallButton.value = false
            // 可以选择是否要记住用户的选择
            localStorage.setItem('pwa-install-dismissed', Date.now().toString())
        }

        // 关闭离线提示
        const dismissOfflineAlert = () => {
            isOffline.value = false
        }

        onMounted(() => {
            // 检查初始状态
            checkOnlineStatus()
            checkInstallStatus()

            // 监听在线状态变化
            window.addEventListener('online', checkOnlineStatus)
            window.addEventListener('offline', checkOnlineStatus)

            // 监听PWA安装提示
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault()
                deferredPrompt = e
                showInstallButton.value = true
            })

            // 监听PWA安装完成
            window.addEventListener('appinstalled', () => {
                showInstallButton.value = false
                isInstalled.value = true
                deferredPrompt = null
            })

            // 监听显示模式变化
            window.matchMedia('(display-mode: standalone)').addEventListener('change', checkInstallStatus)
        })

        onUnmounted(() => {
            window.removeEventListener('online', checkOnlineStatus)
            window.removeEventListener('offline', checkOnlineStatus)
            window.removeEventListener('beforeinstallprompt', () => { })
            window.removeEventListener('appinstalled', () => { })
        })

        return {
            isOffline,
            showInstallButton,
            isInstalled,
            installPWA,
            dismissInstallPrompt,
            dismissOfflineAlert
        }
    }
}
</script>

<style scoped>
.pwa-status {
    position: fixed;
    top: 4rem;
    left: 1rem;
    right: 1rem;
    z-index: 1000;
}

@media (min-width: 768px) {
    .pwa-status {
        top: 1rem;
        left: auto;
        right: 1rem;
        width: 300px;
    }
}
</style>
