<!-- GitHub Metadata for better SEO and search results -->
<div style="display: none;">
  <meta name="description" content="ITR8 is a Progressive Web App for tracking connections between problems, solutions, and their iterations using a simple text-based input system and visual graph visualization.">
  <meta name="keywords" content="ITR8, problem-solving, solution tracking, iteration management, PWA, Progressive Web App, text-based input, visual graph, connection tracking">
  <meta name="author" content="ITR8 Team">
  <meta name="robots" content="index, follow">
</div>

# ITR8 🎯

<span style="font-size: 1.2rem; color: #666;">A Progressive Web App for tracking connections between problems, solutions, and their iterations.</span>

<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; align-items: center; flex-wrap: wrap;">
  <!-- GitHub workflow badges -->
  <div style="display: flex; gap: 8px;">
    <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" alt="Next.js" style="border-radius: 6px;">
    <img src="https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript&logoColor=white" alt="TypeScript" style="border-radius: 6px;">
    <img src="https://img.shields.io/badge/Tailwind-4-black?logo=tailwind-css&logoColor=white" alt="Tailwind" style="border-radius: 6px;">
  </div>

  <div style="display: flex; gap: 8px;">
    <img src="https://img.shields.io/badge/License-MIT-green?logo=github" alt="License" style="border-radius: 6px;">
    <img src="https://img.shields.io/badge/Version-1.0.0-brightgreen?style=flat-square" alt="Version" style="border-radius: 6px;">
    <img src="https://img.shields.io/badge/Status-Building-blue" alt="Build Status" style="border-radius: 6px;">
  </div>

  <!-- Feature badges -->
  <div style="display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap;">
    <img src="https://img.shields.io/badge/Features-PWA%20Ready-7C3AED" alt="PWA" style="border-radius: 6px;">
    <img src="https://img.shields.io/badge/Features-Offline%20Ready-10B981" alt="Offline" style="border-radius: 6px;">
    <img src="https://img.shields.io/badge/Features-IndexedDB-3B82F6" alt="IndexedDB" style="border-radius: 6px;">
    <img src="https://img.shields.io/badge/Features-Visual%20Graph-EC4899" alt="Visual Graph" style="border-radius: 6px;">
    <img src="https://img.shields.io/badge/Features-URL%20Sharing-F59E0B" alt="URL Sharing" style="border-radius: 6px;">
  </div>
</div>

---

## 📖 Table of Contents

- [Features](#-features)
- [📦 Prerequisites](#-📦-prerequisites)
- [🚀 Quick Start](#-quick-start)
- [📝 Changelog](#-📝-changelog)
- [📝 Text Input Syntax](#-text-input-syntax)
- [📤 Deploy to GitHub Pages](#-deploy-to-github-pages)
- [⚙️ Configuration](#-configuration)
- [💾 Data Storage](#-data-storage)
- [💻 Development](#-development)
- [🛠️ Tech Stack](#-tech-stack)
- [🐛 Issues](#-issues)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## ✨ Features

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 24px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 12px; color: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="font-size: 2rem;">📝</div>
    <h3 style="margin-top: 12px; margin-bottom: 8px;">Text-based Input</h3>
    <p style="font-size: 0.95rem; opacity: 0.95;">Use Mermaid-like syntax to quickly add items and connections</p>
  </div>

  <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 20px; border-radius: 12px; color: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="font-size: 2rem;">📊</div>
    <h3 style="margin-top: 12px; margin-bottom: 8px;">Visual Graph</h3>
    <p style="font-size: 0.95rem; opacity: 0.95;">See your connections as a beautiful horizontal tree diagram</p>
  </div>

  <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 20px; border-radius: 12px; color: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="font-size: 2rem;">📶</div>
    <h3 style="margin-top: 12px; margin-bottom: 8px;">Offline Support</h3>
    <p style="font-size: 0.95rem; opacity: 0.95;">Works without internet using IndexedDB</p>
  </div>

  <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); padding: 20px; border-radius: 12px; color: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="font-size: 2rem;">📱</div>
    <h3 style="margin-top: 12px; margin-bottom: 8px;">PWA Install</h3>
    <p style="font-size: 0.95rem; opacity: 0.95;">Install as a native app on your device</p>
  </div>

  <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 20px; border-radius: 12px; color: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="font-size: 2rem;">🔗</div>
    <h3 style="margin-top: 12px; margin-bottom: 8px;">URL Sharing</h3>
    <p style="font-size: 0.95rem; opacity: 0.95;">Share your data via URL parameters</p>
  </div>
</div>

---

## 📦 Prerequisites

<div style="display: flex; align-items: flex-start; gap: 12px; margin-top: 16px;">
  <div style="background: #e0f2fe; border: 1px solid #7dd3fc; border-radius: 6px; padding: 8px; font-size: 1.5rem;">📦</div>
  <div style="flex: 1;">
    <h4 style="margin: 0 0 12px 0; color: #0369a1;">Required Software</h4>
    <ol style="padding-left: 20px; color: #555; margin-bottom: 12px;">
      <li><strong style="color: #0369a1;">Node.js 18.0+</strong><br>Download from [nodejs.org](https://nodejs.org/)</li>
      <li style="margin-top: 8px;"><strong style="color: #0369a1;">Bun 1.0+</strong><br>Install with: <code style="background: #f3f4f6; padding: 2px 6px; border-radius: 3px;">curl -fsSL https://bun.sh/install | bash</code></li>
      <li style="margin-top: 8px;"><strong style="color: #0369a1;">Git 2.0+</strong><br>Download from [git-scm.com](https://git-scm.com/)</li>
    </ol>
  </div>
</div>

---

## 🚀 Quick Start

<div style="background: #1e1e1e; border-radius: 12px; padding: 24px; margin-top: 24px; font-family: 'Courier New', monospace; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 1px solid #333;">
  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 2px solid #333;">
    <div style="width: 12px; height: 12px; background: #ff5f56; border-radius: 50%;"></div>
    <div style="width: 12px; height: 12px; background: #ffbd2e; border-radius: 50%;"></div>
    <div style="width: 12px; height: 12px; background: #27ca40; border-radius: 50%;"></div>
    <span style="color: #888; font-size: 0.9rem; margin-left: auto;">Terminal — bash</span>
  </div>

  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
    <span style="color: #61dafb;">➜</span>
    <span style="color: #aaa;">📁</span>
    <span style="color: #f8f8f2;">itr8</span>
  </div>

  <div style="display: flex; align-items: center; gap: 12px;">
    <span style="color: #61dafb;">➜</span>
    <span style="color: #f8f8f2;">📦</span>
    <span style="color: #f8f8f2;">bun install</span>
  </div>

  <div style="display: flex; align-items: center; gap: 12px; margin-top: 12px;">
    <span style="color: #61dafb;">➜</span>
    <span style="color: #f8f8f2;">🚀</span>
    <span style="color: #f8f8f2;">bun run dev</span>
  </div>
</div>

<div style="margin-top: 16px; padding: 16px; background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%); border-left: 4px solid #667eea; border-radius: 4px;">
  <span style="color: #667eea; font-weight: bold;">💡</span> <strong style="color: #333;">Open</strong> http://localhost:3000 in your browser
</div>

---

## 📝 Text Input Syntax

### 🎯 Create Items

```
# Create items with prefixes

P: Problem title        # Creates a problem node
S: Solution title       # Creates a solution node
I: Iteration title      # Creates an iteration node
```

### 🔗 Create Connections

```
# Connect items with arrows

Title --solves--> Target      # Solution solves a problem
Title --iterates--> Target    # Iteration of a solution
Title --breaks-down--> Target # Problem breaks into sub-problem
Title --causes--> Target      # Problem causes another problem
Title --> Target              # Related items (default)
```

<div style="margin-top: 24px; background: #f8f9fa; border: 2px dashed #dee2e6; border-radius: 8px; padding: 20px;">
  <div style="text-align: center; color: #6c757d;">
    <div style="font-size: 3rem; margin-bottom: 8px;">🔮</div>
    <p><strong>Visual Connection Graph</strong></p>
    <p style="font-size: 0.9rem; margin-top: 4px;">See your problem-solution iterations as a beautiful tree diagram</p>
  </div>
</div>

---

## 📤 Deploy to GitHub Pages

### 🎯 Option 1: Automatic Deployment (Recommended)

#### GitHub Actions Deployment
*Easiest & Automatic*

1. **Push to GitHub**
   ```bash
   git init && git add . && git commit -m "Initial commit" && git branch -M main && git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git && git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repo on GitHub
   - Settings → Pages → Source → Select "GitHub Actions"
   - The workflow will automatically deploy

3. **Access your app**
   - Your app will be at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

#### Root Domain Deployment
*username.github.io*

1. Create a repo named `YOUR_USERNAME.github.io`
2. Follow Option 1 steps above
3. Your app will be at: `https://YOUR_USERNAME.github.io/`

### 📦 Option 2: Manual Export

#### Build Static Files
```bash
bun run export
```

The `out` folder contains your static site. Upload the contents to any static hosting.

---

## ⚙️ Configuration

### 🌐 Custom Domain

🔧 **Add CNAME File**
1. Create a `CNAME` file in `public/` folder
2. Enter your domain (e.g., `example.com`)

🔧 **Configure DNS**
Configure DNS with your domain provider.

### 📂 Subdirectory Deployment

📂 **Edit next.config.ts**

```typescript
const nextConfig: NextConfig = {
  basePath: "/your-repo-name", // Uncomment and set your repo name
};
```

---


## 💡 Usage Examples

<div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; padding: 24px; margin-top: 24px;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">💡</div>
    <div>
      <h3 style="margin: 0; color: #1f2937;">Common Use Cases</h3>
      <p style="margin: 0; color: #6b7280;">See how to use ITR8 for different scenarios</p>
    </div>
  </div>

  <div style="margin-top: 20px; display: grid; gap: 16px;">
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <h4 style="margin: 0 0 8px 0; color: #1f2937;">💡 Product Development</h4>
      <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 0.9rem;">Track problems, solutions, and iterations throughout the product development lifecycle.</p>
      <div style="background: #1e1e1e; border-radius: 6px; padding: 12px; font-family: 'Courier New', monospace; font-size: 0.85rem;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="color: #61dafb;">P:</span> <span style="color: #f8f8f2;">Memory leaks in production</span>
          <span style="color: #61dafb;">--solves--></span> <span style="color: #f8f8f2;">Implement garbage collection</span>
        </div>
      </div>
    </div>

    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981;">
      <h4 style="margin: 0 0 8px 0; color: #1f2937;">🛠️ Bug Fixing</h4>
      <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 0.9rem;">Document the process of fixing bugs and the iterations made to improve the solution.</p>
      <div style="background: #1e1e1e; border-radius: 6px; padding: 12px; font-family: 'Courier New', monospace; font-size: 0.85rem;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="color: #61dafb;">P:</span> <span style="color: #f8f8f2;">Login fails on Safari</span>
          <span style="color: #61dafb;">--solves--></span> <span style="color: #f8f8f2;">Fix cookie handling</span>
        </div>
      </div>
    </div>

    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <h4 style="margin: 0 0 8px 0; color: #1f2937;">📚 Learning Resources</h4>
      <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 0.9rem;">Keep track of learning paths, tutorials, and the problems you're solving.</p>
      <div style="background: #1e1e1e; border-radius: 6px; padding: 12px; font-family: 'Courier New', monospace; font-size: 0.85rem;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="color: #61dafb;">P:</span> <span style="color: #f8f8f2;">Learn React hooks</span>
          <span style="color: #61dafb;">--solves--></span> <span style="color: #f8f8f2;">Watch advanced tutorials</span>
        </div>
      </div>
    </div>

    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #ec4899;">
      <h4 style="margin: 0 0 8px 0; color: #1f2937;">🎯 Research & Innovation</h4>
      <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 0.9rem;">Track research questions, experiments, and their iterations.</p>
      <div style="background: #1e1e1e; border-radius: 6px; padding: 12px; font-family: 'Courier New', monospace; font-size: 0.85rem;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="color: #61dafb;">P:</span> <span style="color: #f8f8f2;">Improve image compression</span>
          <span style="color: #61dafb;">--iterates--></span> <span style="color: #f8f8f2;">Try new algorithms</span>
        </div>
      </div>
    </div>
  </div>
</div>

---

## ❓ FAQ

<div style="display: flex; flex-direction: column; gap: 16px; margin-top: 24px;">
  <details style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #e5e7eb; cursor: pointer; transition: all 0.3s;">
    <summary style="font-weight: bold; color: #1f2937; font-size: 1.1rem; margin: 0; list-style: none; display: flex; align-items: center; gap: 8px;">
      <span>🎯</span> What is ITR8?
    </summary>
    <p style="margin: 16px 0 0 0; color: #6b7280; line-height: 1.6;">ITR8 is a Progressive Web App (PWA) that helps you track connections between problems, solutions, and their iterations using a simple text-based input system. It provides a visual graph to see how problems relate to solutions and how iterations improve your work.</p>
  </details>

  <details style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #e5e7eb; cursor: pointer; transition: all 0.3s;">
    <summary style="font-weight: bold; color: #1f2937; font-size: 1.1rem; margin: 0; list-style: none; display: flex; align-items: center; gap: 8px;">
      <span>📱</span> Can I use ITR8 offline?
    </summary>
    <p style="margin: 16px 0 0 0; color: #6b7280; line-height: 1.6;">Yes! ITR8 is designed as an offline-first PWA. All your data is stored locally in your browser using IndexedDB, so you can access it even without an internet connection. Your data will persist between sessions.</p>
  </details>

  <details style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #e5e7eb; cursor: pointer; transition: all 0.3s;">
    <summary style="font-weight: bold; color: #1f2937; font-size: 1.1rem; margin: 0; list-style: none; display: flex; align-items: center; gap: 8px;">
      <span>🔗</span> How does URL sharing work?
    </summary>
    <p style="margin: 16px 0 0 0; color: #6b7280; line-height: 1.6;">ITR8 generates shareable URLs containing your data encoded in the URL parameters. You can share these links with others, and they'll be able to view and edit your data. The data is stored locally on their device, so no backend is required.</p>
  </details>

  <details style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #e5e7eb; cursor: pointer; transition: all 0.3s;">
    <summary style="font-weight: bold; color: #1f2937; font-size: 1.1rem; margin: 0; list-style: none; display: flex; align-items: center; gap: 8px;">
      <span>💾</span> Is my data secure?
    </summary>
    <p style="margin: 16px 0 0 0; color: #6b7280; line-height: 1.6;">Your data is stored locally in your browser's IndexedDB database. It's not sent to any server, so your information remains private and secure. You have full control over your data and can export it at any time.</p>
  </details>

  <details style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #e5e7eb; cursor: pointer; transition: all 0.3s;">
    <summary style="font-weight: bold; color: #1f2937; font-size: 1.1rem; margin: 0; list-style: none; display: flex; align-items: center; gap: 8px;">
      <span>🔧</span> Can I install ITR8 on my device?
    </summary>
    <p style="margin: 16px 0 0 0; color: #6b7280; line-height: 1.6;">Yes! ITR8 supports PWA installation. You can install it as a native app on your device through your browser's menu. This gives you a standalone app experience with its own icon and no browser chrome.</p>
  </details>

  <details style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #e5e7eb; cursor: pointer; transition: all 0.3s;">
    <summary style="font-weight: bold; color: #1f2937; font-size: 1.1rem; margin: 0; list-style: none; display: flex; align-items: center; gap: 8px;">
      <span>🔄</span> Can I import data from other sources?
    </summary>
    <p style="margin: 16px 0 0 0; color: #6b7280; line-height: 1.6;">Currently, ITR8 supports importing data via URL sharing. You can open any ITR8 URL that contains your data in the format <code style="background: #f3f4f6; padding: 2px 6px; border-radius: 3px;">?data=...</code> to import that data into your local browser storage.</p>
  </details>
</div>

---

## 💾 Data Storage

<div style="background: linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%); border-radius: 12px; padding: 24px; margin-top: 24px;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🔐</div>
    <div>
      <h3 style="margin: 0; color: #1f2937;">Local-First Storage</h3>
      <p style="margin: 0; color: #6b7280;">All data stored in your browser using IndexedDB</p>
    </div>
  </div>

  <div style="margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
    <div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 8px;">📤</div>
      <h4 style="margin: 0 0 8px 0; color: #1f2937;">Export</h4>
      <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">Generate shareable URLs via "Export" button</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 8px;">📥</div>
      <h4 style="margin: 0 0 8px 0; color: #1f2937;">Import</h4>
      <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">Open URLs with <code style="background: #f3f4f6; padding: 2px 6px; border-radius: 3px;">?data=...</code> to import data</p>
    </div>
  </div>
</div>

---

## 💻 Development

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-top: 24px;">
  <div style="background: #1e1e1e; border-radius: 12px; padding: 20px; color: white;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <div style="width: 40px; height: 40px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center;">🔍</div>
      <h3 style="margin: 0;">Lint Code</h3>
    </div>
    <div style="background: #333; border-radius: 6px; padding: 12px; font-family: 'Courier New', monospace; font-size: 0.85rem;">
      bun run lint
    </div>
  </div>

  <div style="background: #1e1e1e; border-radius: 12px; padding: 20px; color: white;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
      <div style="width: 40px; height: 40px; background: #28a745; border-radius: 8px; display: flex; align-items: center; justify-content: center;">🏗️</div>
      <h3 style="margin: 0;">Build for Production</h3>
    </div>
    <div style="background: #333; border-radius: 6px; padding: 12px; font-family: 'Courier New', monospace; font-size: 0.85rem;">
      bun run build
    </div>
  </div>
</div>

---

## 🛠️ Tech Stack

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 24px;">
  <!-- Framework -->
  <div style="background: linear-gradient(135deg, #333 0%, #1a1a1a 100%); border-radius: 12px; padding: 20px; color: white;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
      <div style="background: #61dafb; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">⚛️</div>
      <div>
        <h3 style="margin: 0; font-size: 1.1rem;">Framework</h3>
        <span style="font-size: 0.8rem; color: #888;">Next.js 16</span>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" alt="Next.js" style="border-radius: 4px;">
    </div>
  </div>

  <!-- UI Components -->
  <div style="background: linear-gradient(135deg, #333 0%, #1a1a1a 100%); border-radius: 12px; padding: 20px; color: white;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
      <div style="background: #3b82f6; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">🎨</div>
      <div>
        <h3 style="margin: 0; font-size: 1.1rem;">UI Components</h3>
        <span style="font-size: 0.8rem; color: #888;">Tailwind + shadcn/ui</span>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <img src="https://img.shields.io/badge/Tailwind-4-black?logo=tailwind-css&logoColor=white" alt="Tailwind" style="border-radius: 4px;">
      <img src="https://img.shields.io/badge/shadcn/ui-Ready-blue" alt="shadcn/ui" style="border-radius: 4px;">
    </div>
  </div>

  <!-- Database -->
  <div style="background: linear-gradient(135deg, #333 0%, #1a1a1a 100%); border-radius: 12px; padding: 20px; color: white;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
      <div style="background: #10b981; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">🗄️</div>
      <div>
        <h3 style="margin: 0; font-size: 1.1rem;">Database</h3>
        <span style="font-size: 0.8rem; color: #888;">IndexedDB + Dexie.js</span>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <img src="https://img.shields.io/badge/Dexie.js-Ready-green" alt="Dexie.js" style="border-radius: 4px;">
      <img src="https://img.shields.io/badge/IndexedDB-Built-blue" alt="IndexedDB" style="border-radius: 4px;">
    </div>
  </div>

  <!-- State Management -->
  <div style="background: linear-gradient(135deg, #333 0%, #1a1a1a 100%); border-radius: 12px; padding: 20px; color: white;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
      <div style="background: #8b5cf6; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">⚡</div>
      <div>
        <h3 style="margin: 0; font-size: 1.1rem;">State Management</h3>
        <span style="font-size: 0.8rem; color: #888;">Zustand</span>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <img src="https://img.shields.io/badge/Zustand-Ready-purple" alt="Zustand" style="border-radius: 4px;">
    </div>
  </div>

  <!-- Language -->
  <div style="background: linear-gradient(135deg, #333 0%, #1a1a1a 100%); border-radius: 12px; padding: 20px; color: white;">
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
      <div style="background: #3178c6; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">🟦</div>
      <div>
        <h3 style="margin: 0; font-size: 1.1rem;">TypeScript</h3>
        <span style="font-size: 0.8rem; color: #888;">5.3+</span>
      </div>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <img src="https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript&logoColor=white" alt="TypeScript" style="border-radius: 4px;">
    </div>
  </div>
</div>

---

## 🐛 Issues

<div style="display: flex; align-items: flex-start; gap: 12px; margin-top: 16px;">
  <div style="background: #fee2e2; border: 1px solid #fca5a5; border-radius: 6px; padding: 8px; font-size: 1.5rem;">🐛</div>
  <div style="flex: 1;">
    <h4 style="margin: 0 0 8px 0; color: #991b1b;">Found a bug or have a feature request?</h4>
    <p style="margin: 0 0 16px 0; color: #555;">Please open an issue on GitHub to help us improve the project.</p>
    <a href="https://github.com/YOUR_USERNAME/YOUR_REPO/issues" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; margin-top: 8px;">
      <span style="display: flex; align-items: center; gap: 8px;">
        🐛 Open an Issue
      </span>
    </a>
  </div>
</div>

<div style="margin-top: 32px; display: flex; align-items: center; gap: 16px; padding: 16px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px; flex-wrap: wrap;">
  <span style="font-size: 1.5rem;">💡</span>
  <div style="flex: 1;">
    <strong style="color: #92400e;">Tips for better bug reports:</strong>
    <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #78350f;">
      <li>Include steps to reproduce the issue</li>
      <li>Attach screenshots if applicable</li>
      <li>Check if the issue already exists before submitting</li>
    </ul>
  </div>
</div>

---

## 📝 Changelog

<div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; padding: 24px; margin-top: 24px;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">📝</div>
    <div>
      <h3 style="margin: 0; color: #1f2937;">Recent Updates</h3>
      <p style="margin: 0; color: #6b7280;">Check out what's new and what's coming next!</p>
    </div>
  </div>

  <div style="margin-top: 16px; display: grid; gap: 16px;">
    <div style="background: white; padding: 16px; border-radius: 8px; border-left: 4px solid #22c55e;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
        <span style="background: #22c55e; color: white; padding: 4px 12px; border-radius: 12px; font-size: 0.85rem; font-weight: bold;">v1.0.0</span>
        <span style="color: #6b7280; font-size: 0.9rem;">2024-03-25</span>
      </div>
      <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
        <li>🎉 Initial release of ITR8</li>
        <li>✨ Add text-based input for problems and solutions</li>
        <li>🔗 Visual connection graph for data visualization</li>
        <li>📱 PWA support for offline-first experience</li>
        <li>📤 URL sharing functionality</li>
        <li>🎨 Beautiful UI with gradient backgrounds</li>
      </ul>
    </div>
  </div>

  <div style="margin-top: 24px; text-align: center;">
    <p style="margin: 0; color: #6b7280;">Want to see upcoming features? <a href="https://github.com/YOUR_USERNAME/YOUR_REPO/issues?q=is%3Aissue+is%3Aopen" style="color: #16a34a; text-decoration: none; font-weight: bold;">Check the issue tracker</a></p>
  </div>
</div>

---

## 🤝 Contributing

<div style="background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); border-radius: 12px; padding: 24px; margin-top: 24px;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">🤝</div>
    <div>
      <h3 style="margin: 0; color: #1f2937;">We ❤️ Contributions!</h3>
      <p style="margin: 0; color: #6b7280;">Contributions are welcome! Whether you want to fix a bug, add a feature, or improve the documentation.</p>
    </div>
  </div>

  <div style="margin-top: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
    <div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 8px;">📋</div>
      <h4 style="margin: 0 0 8px 0; color: #1f2937;">1. Fork the Project</h4>
      <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">Create your own fork on GitHub</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 8px;">🔨</div>
      <h4 style="margin: 0 0 8px 0; color: #1f2937;">2. Create Your Branch</h4>
      <p style="margin: 0; color: #6b7280; font-size: 0.9rem;"><code style="background: #f3f4f6; padding: 2px 6px; border-radius: 3px;">git checkout -b feature/AmazingFeature</code></p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 8px;">📝</div>
      <h4 style="margin: 0 0 8px 0; color: #1f2937;">3. Commit Your Changes</h4>
      <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">Make your changes with clear commit messages</p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 8px;">📤</div>
      <h4 style="margin: 0 0 8px 0; color: #1f2937;">4. Push to the Branch</h4>
      <p style="margin: 0; color: #6b7280; font-size: 0.9rem;"><code style="background: #f3f4f6; padding: 2px 6px; border-radius: 3px;">git push origin feature/AmazingFeature</code></p>
    </div>
    <div style="background: white; padding: 16px; border-radius: 8px; text-align: center;">
      <div style="font-size: 2rem; margin-bottom: 8px;">🔀</div>
      <h4 style="margin: 0 0 8px 0; color: #1f2937;">5. Open a Pull Request</h4>
      <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">Submit your changes for review</p>
    </div>
  </div>

  <div style="margin-top: 24px; background: #f3f4f6; border-radius: 8px; padding: 16px;">
    <h4 style="margin: 0 0 12px 0; color: #374151;">💡 Development Guidelines</h4>
    <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
      <li>Follow the existing code style and conventions</li>
      <li>Write clear, descriptive commit messages</li>
      <li>Test your changes thoroughly before submitting</li>
      <li>Keep your pull requests focused and small</li>
    </ul>
  </div>
</div>

---

## 📄 License

<div style="background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%); border-radius: 12px; padding: 24px; margin-top: 24px;">
  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">📜</div>
    <div>
      <h3 style="margin: 0; color: #1f2937;">MIT License</h3>
      <p style="margin: 0; color: #6b7280;">This project is licensed under the MIT License - see the LICENSE file for details.</p>
    </div>
  </div>

  <div style="margin-top: 16px; background: white; border-radius: 8px; padding: 16px; font-family: 'Courier New', monospace; font-size: 0.85rem; overflow-x: auto;">
    <pre style="margin: 0; color: #374151;">MIT License

Copyright (c) 2024 ITR8

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.</pre>
  </div>

  <a href="./LICENSE" style="display: inline-block; margin-top: 16px; background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%); color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
    <span style="display: flex; align-items: center; gap: 8px;">
      📄 View LICENSE File
    </span>
  </a>
</div>

---

<div style="margin-top: 48px; padding: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; color: white; text-align: center;">
  <div style="font-size: 3rem; margin-bottom: 16px;">🌟</div>
  <h2 style="margin: 0 0 12px 0; font-size: 2rem;">Start Building Today</h2>
  <p style="margin: 0 0 24px 0; opacity: 0.9; font-size: 1.1rem;">Track your problems, solutions, and iterations with ITR8</p>
  <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
    <a href="https://github.com/YOUR_USERNAME/YOUR_REPO" style="background: white; color: #667eea; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; transition: transform 0.2s; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <span style="display: flex; align-items: center; gap: 8px;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="background: white; border-radius: 4px; padding: 2px;">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        Star on GitHub
      </span>
    </a>
    <a href="#" style="background: rgba(255,255,255,0.2); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; transition: transform 0.2s; border: 2px solid rgba(255,255,255,0.3);">
      📦 View Live Demo
    </a>
  </div>
</div>

<div style="margin-top: 32px; display: flex; justify-content: space-between; align-items: center; padding-top: 32px; border-top: 2px solid #e5e7eb; flex-wrap: wrap; gap: 16px;">
  <div style="display: flex; align-items: center; gap: 8px; color: #6b7280; flex-wrap: wrap;">
    <span>🛠️ Built with</span>
    <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" alt="Next.js" style="border-radius: 4px;">
    <img src="https://img.shields.io/badge/Tailwind-4-black?logo=tailwind-css&logoColor=white" alt="Tailwind" style="border-radius: 4px;">
    <img src="https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript&logoColor=white" alt="TypeScript" style="border-radius: 4px;">
  </div>
  <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
    <a href="https://github.com/YOUR_USERNAME/YOUR_REPO" style="color: #6b7280; text-decoration: none; display: flex; align-items: center; gap: 6px; font-size: 0.9rem; transition: color 0.2s;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
      GitHub
    </a>
    <a href="https://github.com/YOUR_USERNAME/YOUR_REPO/issues" style="color: #6b7280; text-decoration: none; display: flex; align-items: center; gap: 6px; font-size: 0.9rem; transition: color 0.2s;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      Issues
    </a>
    <a href="https://github.com/YOUR_USERNAME/YOUR_REPO/releases" style="color: #6b7280; text-decoration: none; display: flex; align-items: center; gap: 6px; font-size: 0.9rem; transition: color 0.2s;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
      Releases
    </a>
    <span style="margin-left: 8px; color: #6b7280; font-size: 0.9rem;">
      <span>License:</span>
      <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT" style="vertical-align: middle;">
      <span style="margin-left: 8px;">© 2024 ITR8</span>
    </span>
  </div>
</div>
