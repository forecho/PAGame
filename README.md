# 价格行为学缩写记忆游戏 (PAGame)

一个帮助交易者记忆价格行为学专业缩写的互动游戏项目。

## 🎯 项目目标

通过游戏化的方式，帮助用户快速记忆和掌握价格行为学中的专业缩写，包括：
- 技术分析术语缩写
- 交易策略相关缩写  
- 市场形态缩写
- 风险管理缩写

## 🚀 技术栈

- **前端框架**: Vue 3 (Composition API)
- **UI组件库**: daisyUI 5.0.50
- **CSS框架**: Tailwind CSS
- **构建工具**: Vite
- **语言**: JavaScript

## ✨ 主要功能

### 🎮 游戏模式
- **选择题模式**: 显示缩写，选择对应的英文全称和中文释义
- **随机出题**: 每次游戏随机选择20个缩写进行测试
- **即时反馈**: 答题后立即显示正确答案和解释
- **进度跟踪**: 实时显示答题进度和得分情况

### 🎨 界面特性
- **响应式设计**: 支持各种设备尺寸
- **主题切换**: 内置多种主题（浅色、深色、可爱、赛博朋克）
- **现代化UI**: 使用 daisyUI 组件库，界面美观易用
- **本地存储**: 记住用户的主题偏好设置

### 📊 学习内容
包含100+个价格行为学专业缩写，涵盖：
- 基础术语 (如: PA, TF, S/R)
- 技术形态 (如: IB, TRI, W)
- 交易策略 (如: H2B, L2S, SAR)
- 风险管理 (如: iR, iStop, TGT)

## 🛠️ 安装和运行

### 环境要求
- Node.js 16+ 
- npm 或 yarn 或 pnpm

### 安装依赖
```bash
npm install
```

### 开发模式运行
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📁 项目结构

```
PAGame/
├── src/
│   ├── components/
│   │   └── GameCard.vue          # 游戏主组件
│   ├── data/
│   │   └── acronyms.js           # 缩写数据
│   ├── App.vue                   # 主应用组件
│   ├── main.js                   # 应用入口
│   └── style.css                 # 全局样式
├── index.html                    # HTML入口
├── package.json                  # 项目配置
├── vite.config.js               # Vite配置
├── tailwind.config.js           # Tailwind配置
├── postcss.config.js            # PostCSS配置
└── README.md                    # 项目说明
```

## 🎨 主题系统

项目使用 daisyUI 的内置主题系统，支持：

- **light**: 浅色主题（默认）
- **dark**: 深色主题

用户可以通过导航栏的主题切换按钮自由选择，选择会被保存到本地存储中。

## 🔧 自定义配置

### 添加新的缩写
在 `src/data/acronyms.js` 文件中添加新的缩写条目：

```javascript
{ abbreviation: 'NEW', fullName: 'New Term', chinese: '新术语' }
```

### 修改游戏设置
在 `GameCard.vue` 组件中修改：
- 题目数量（默认20题）
- 选项数量（默认4个选项）
- 游戏逻辑

### 自定义主题
在 `tailwind.config.js` 中配置 daisyUI 主题：

```javascript
daisyui: {
  themes: ["light", "dark", "cupcake", "cyberpunk"],
}
```

## 🌟 特色亮点

1. **游戏化学习**: 将枯燥的记忆过程转化为有趣的游戏体验
2. **即时反馈**: 答题后立即显示正确答案，加深记忆
3. **多主题支持**: 多种视觉风格，满足不同用户偏好
4. **响应式设计**: 完美适配各种设备，移动端友好
5. **本地存储**: 记住用户设置，提升用户体验

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

### 贡献方式
1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [daisyUI](https://daisyui.com/) - Tailwind CSS组件库
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具

---

**让学习价格行为学变得有趣！** 🎯📈
