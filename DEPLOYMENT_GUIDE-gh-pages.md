# 🚀 Deployment Guide: GitHub Pages

This guide explains how to deploy your applications to GitHub Pages, which is a fantastic free hosting service, but works differently than Netlify or Vercel.

**The Strategy:** We will create a GitHub Action that _builds_ our `vue-app` and automatically pushes the final `dist` folder to a special `gh-pages` branch. We then tell GitHub to host our site from that branch.

---

### Step 1: Ensure Your Vite Config is Ready

GitHub Pages hosts your site in a subdirectory (e.g., `.../my-repo/`). We must tell Vite to use relative paths.

Your `packages/vue-app/vite.config.ts` should be configured to accept a `base` path from an environment variable.

```ts
import { defineConfig } from 'vite'
// ...

export default defineConfig({
  // This line is the key!
  base: process.env.VITE_BASE ?? '/',
  plugins: [vue()],
  // ...
})
```

### Step 2: Create the Deployment Workflow

1.  At the root of your monorepo, create the folder path `.github/workflows/`.
2.  Inside this new folder, create a file named `deploy-gh-pages.yml`.
3.  Paste the following content into that file:

<!-- end list -->

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy-vue-app:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build vue-app for GitHub Pages
        env:
          # This sets the base path to /<your-repo-name>/
          VITE_BASE: /${{ github.event.repository.name }}/
        run: pnpm --filter vue-app build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./packages/vue-app/dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 3: Enable GitHub Pages in Your Repository

After you commit and push the new `.yml` file, you must do this **one-time setup** in your GitHub repo:

1.  Go to your GitHub repository (e.g., `Koshux/vue-vs-react`).
2.  Click on the **"Settings"** tab.
3.  In the left-hand menu, click on **"Pages"**.
4.  Under "Build and deployment", change the **"Source"** to **"GitHub Actions"**.
5.  GitHub will automatically detect your `deploy-gh-pages.yml` and use it.

**That's it\!** Now, every time you push to your `main` branch, the Action will automatically run, build your `vue-app`, and deploy it. After a minute or two, your site will be live at the URL shown on the "Pages" settings screen.
