const CACHE_NAME = 'pagame-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icon.svg'
];

// 安装事件 - 缓存资源
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// 获取事件 - 网络优先，缓存备用
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // 如果请求成功，克隆响应并缓存
                if (response && response.status === 200 && response.type === 'basic') {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                }
                return response;
            })
            .catch(() => {
                // 如果网络请求失败，尝试从缓存获取
                return caches.match(event.request);
            })
    );
});

// 推送通知事件
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : '开始新的学习挑战！',
        icon: '/icon.svg',
        badge: '/icon.svg',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: '开始游戏',
                icon: '/icon.svg'
            },
            {
                action: 'close',
                title: '关闭',
                icon: '/icon.svg'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('PAGame', options)
    );
});

// 通知点击事件
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/?mode=game')
        );
    } else if (event.action === 'close') {
        // 关闭通知，不做任何操作
    } else {
        // 默认点击行为
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
