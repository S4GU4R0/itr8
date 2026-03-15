# ITR8

A Progressive Web App for tracking connections between problems, solutions, and their iterations. Works offline and can be deployed to GitHub Pages.

## Features

- **Text-based input**: Use Mermaid-like syntax to quickly add items and connections
- **Visual graph**: See your connections as a horizontal tree diagram
- **Offline support**: Works without internet using IndexedDB
- **PWA**: Install as a native app on your device
- **URL sharing**: Share your data via URL parameters

## Quick Start

### Local Development

```bash
# Install dependencies
bun install

# Run development server
bun run dev
```

Open http://localhost:3000 in your browser.

### Text Input Syntax

```
# Items
P: Problem title        # Create a problem
S: Solution title       # Create a solution
I: Iteration title      # Create an iteration

# Connections
Title --solves--> Target      # Solution solves a problem
Title --iterates--> Target    # Iteration of a solution
Title --breaks-down--> Target # Problem breaks into sub-problem
Title --causes--> Target      # Problem causes another problem
Title --> Target              # Related (default)
```

## Deploy to GitHub Pages

### Option 1: Automatic Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repo on GitHub
   - Settings → Pages → Source
   - Select "GitHub Actions" (not "Deploy from a branch")
   - The workflow will automatically deploy

3. **Access your app**
   - Your app will be at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

### Option 2: Deploy to `username.github.io` (Root domain)

1. Create a repo named `YOUR_USERNAME.github.io`
2. Follow the same steps above
3. Your app will be at: `https://YOUR_USERNAME.github.io/`

### Option 3: Manual Export

```bash
# Build static files
bun run export

# The 'out' folder contains your static site
# Upload the contents to any static hosting
```

## Configuration

### Custom Domain

1. Add a `CNAME` file to the `public/` folder with your domain
2. Configure DNS with your domain provider

### Subdirectory Deployment

If deploying to a subdirectory (not root), edit `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  basePath: "/your-repo-name",  // Uncomment and set your repo name
  // ...
};
```

## Data Storage

All data is stored locally in your browser using IndexedDB. No server required.

### Export/Import

- **Export**: Use the "Export" button to generate a shareable URL
- **Import**: Open a URL with `?data=...` parameter to import data

## Development

```bash
# Lint code
bun run lint

# Build for production
bun run build
```

## Tech Stack

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS + shadcn/ui
- Dexie.js (IndexedDB wrapper)
- Zustand (state management)
