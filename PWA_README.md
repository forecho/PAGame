# PWA 功能说明

## 🚀 什么是PWA？

PWA（Progressive Web App）是一种使用现代Web技术构建的应用程序，它结合了Web和原生应用的最佳特性。

## ✨ PWA特性

### 📱 可安装性
- 可以添加到手机主屏幕
- 像原生应用一样启动
- 支持应用快捷方式

### 🔄 离线功能
- 支持离线访问
- 智能缓存策略
- 网络恢复后自动同步

### 📲 原生体验
- 全屏显示
- 自定义启动画面
- 推送通知支持

## 🛠️ 技术实现

### 1. Web App Manifest (`manifest.json`)
```json
{
  "name": "价格行为学缩写记忆游戏",
  "short_name": "PAGame",
  "display": "standalone",
  "theme_color": "#3b82f6",
  "background_color": "#ffffff"
}
```

### 2. Service Worker (`sw.js`)
- 离线缓存策略
- 推送通知处理
- 资源预加载

### 3. 安装提示
- 自动检测安装条件
- 用户友好的安装引导
- 安装状态显示

## 📱 使用方法

### 安装到主屏幕

#### Android Chrome
1. 打开应用
2. 点击地址栏右侧的"安装"按钮
3. 选择"添加到主屏幕"

#### iOS Safari
1. 打开应用
2. 点击分享按钮
3. 选择"添加到主屏幕"

#### 桌面浏览器
1. 打开应用
2. 点击地址栏右侧的"安装"按钮
3. 确认安装

### 离线使用
- 首次访问后，应用会自动缓存
- 离线时仍可正常使用
- 网络恢复后自动更新

## 🔧 开发调试

### 检查PWA状态
1. 打开Chrome DevTools
2. 进入Application标签
3. 查看Manifest和Service Workers

### 测试离线功能
1. 打开DevTools
2. 进入Network标签
3. 勾选"Offline"
4. 刷新页面测试

### 更新Service Worker
```javascript
// 强制更新
navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for(let registration of registrations) {
    registration.unregister();
  }
});
```

## 📊 PWA评分

使用Lighthouse测试PWA功能：

```bash
# 安装Lighthouse
npm install -g lighthouse

# 运行测试
lighthouse https://your-app-url.com --view
```

## 🎯 最佳实践

### 性能优化
- 使用适当的缓存策略
- 压缩和优化资源
- 实现懒加载

### 用户体验
- 提供清晰的安装提示
- 支持离线状态提示
- 实现平滑的页面过渡

### 兼容性
- 渐进式增强
- 优雅降级
- 跨平台支持

## 🚨 注意事项

1. **HTTPS要求**：PWA必须在HTTPS环境下运行
2. **浏览器支持**：确保目标浏览器支持PWA功能
3. **缓存策略**：合理设置缓存策略，避免存储空间问题
4. **更新机制**：实现合理的更新提示机制

## 📚 相关资源

- [PWA官方文档](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [PWA Builder](https://www.pwabuilder.com/)

## 🤝 贡献

欢迎提交Issue和Pull Request来改进PWA功能！
