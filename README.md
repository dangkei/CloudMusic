# CloudMusic

[![Deploy to GitHub Pages](https://github.com/dangkei/CloudMusic/actions/workflows/deploy.yml/badge.svg)](https://github.com/dangkei/CloudMusic/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-CloudMusic-blue?style=flat&logo=github)](https://dangkei.github.io/CloudMusic)

# 🎵 CloudMusic

一个基于 **React + TypeScript + Vite + TailwindCSS** 构建的在线音乐播放器应用。  
支持 **歌单管理、播放控制、用户登录、本地存储/IndexedDB、歌词展示** 等功能，并已部署到 **GitHub Pages**。

👉 在线预览地址：[CloudMusic on GitHub Pages](https://dangkei.github.io/CloudMusic/)

---

## 🚀 功能特性

- 🎶 **播放功能**

  - 播放 / 暂停 / 上一首 / 下一首
  - 单曲循环、随机播放、顺序循环
  - 音量调节 / 静音切换
  - 播放进度条控制

- 📂 **歌单管理**

  - 创建歌单、重命名、删除
  - 将歌曲添加到指定歌单
  - 歌单持久化保存（IndexedDB，本地刷新不丢失）

- 👤 **用户功能**

  - 登录 / 登出
  - 用户个性化设置（预留）

- 🎨 **UI 体验**
  - 响应式布局，适配桌面和移动端
  - 滚动歌词展示（待扩展）
  - TailwindCSS + Framer Motion 动画优化

---

## 🛠️ 技术栈

- **前端框架**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **样式**: [TailwindCSS](https://tailwindcss.com/)
- **动画**: [Framer Motion](https://www.framer.com/motion/)
- **路由**: [React Router v7](https://reactrouter.com/)
- **数据存储**: IndexedDB (通过 [Dexie.js](https://dexie.org/)) + localStorage
- **部署**: GitHub Actions + GitHub Pages

---

## 📂 项目结构

CloudMusic/
├── public/
│ ├── images/ # 静态图片资源
│ └── audio/ # 音频文件
├── src/
│ ├── components/ # UI 组件
│ ├── contexts/ # React Context（Player, User, Playlist）
│ ├── data/ # 歌曲数据
│ ├── db/ # IndexedDB 管理
│ ├── pages/ # 页面组件 (Home, Search, Playlist, SongDetails, Login, Settings)
│ ├── App.tsx # 根组件
│ └── main.tsx # 入口文件
└── vite.config.ts

## 🚀 在线体验

点击这里直接访问 👉 **[CloudMusic 在线版](https://dangkei.github.io/CloudMusic)**

---

## 📦 本地运行

---

## ⚡ 本地运行

```bash
# 克隆项目
git clone https://github.com/dangkei/CloudMusic.git

cd CloudMusic

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 打包构建
npm run build

# 本地预览生产环境
npm run preview
```

🌐 部署到 GitHub Pages

本项目已经配置好 GitHub Actions 自动部署，只需将代码推送到仓库即可。

vite.config.ts
export default defineConfig({
base: '/CloudMusic/',
plugins: [react()],
});

package.json
"scripts": {
"dev": "vite",
"build": "vite build",
"preview": "vite preview",
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
}

部署成功后，访问 👉
https://<你的 GitHub 用户名>.github.io/CloudMusic/

🔮 TODO（计划中）

✅ 歌曲时长显示

✅ 歌单歌曲列表优化（歌名 / 演唱者 / 时长）

🔄 歌词滚动显示

💾 歌单云端同步（未来可接入 Firebase / Supabase）

🎤 用户个性化推荐系统

📜 License

MIT © dangkei

---
