# 🧩 PTL Workshop 2025 – Vue & React Comparison

**Facilitated by James Lanzon**

---

## 📝 Overview

This document outlines all setup requirements for participants attending the **PTL Workshop 2025 – Vue & React Comparison**, facilitated by **James Lanzon**.
It ensures each participant is fully prepared to run both frameworks locally, follow along during hands-on exercises, and optionally deploy to **Netlify** (Vue) and **Vercel** (React).

---

## ⚙️ 1. System Requirements

| Tool        | Minimum Version          | Description                                         |
| ----------- | ------------------------ | --------------------------------------------------- |
| **Node.js** | ≥ 20.19.0                | Required runtime for both Vue and React apps        |
| **pnpm**    | ≥ 9.x                    | Efficient package manager for monorepo setup        |
| **Git**     | Any modern version       | Source control & branching for workshop checkpoints |
| **VS Code** | Latest                   | Recommended IDE with plugin support                 |
| **Browser** | Chrome, Edge, or Firefox | Used for app testing and dev tools inspection       |

> ✅ Verify installation:
>
> ```bash
> node -v
> pnpm -v
> git --version
> ```

---

## 🧱 2. Local Environment Setup

1. **Clone the workshop repository:**

```bash
git clone https://github.com/Koshux/vue-vs-react.git
cd vue-vs-react
```

2. Install dependencies:

```bash
pnpm install
```

3. Start each app locally:

```bash
# Vue app
cd packages/vue-app
pnpm dev

# React app (after creation)
cd packages/react-app
pnpm dev
```

4. Build for production:

```bash
pnpm build
```

## 🧩 3. Recommended Editor Setup (VS Code)

For the best development experience, install the following VS Code extensions:

| **Extension**                 | **ID**                      | **Description**                                        |
| ----------------------------- | --------------------------- | ------------------------------------------------------ |
| **Vue – Official**            | `Vue.volar`                 | Language support and IntelliSense for Vue 3            |
| **ESLint**                    | `dbaeumer.vscode-eslint`    | Enforces consistent linting and style rules            |
| **Prettier**                  | `esbenp.prettier-vscode`    | Auto-formats code on save                              |
| **TypeScript Vue Plugin**     | _(included with Volar)_     | Adds full TypeScript awareness in `.vue` files         |
| **Tailwind CSS IntelliSense** | `bradlc.vscode-tailwindcss` | Autocompletion and design-token hints for Tailwind CSS |

### Optional (Highly Recommended)

| **Extension**                   | **Purpose**                                      |
| ------------------------------- | ------------------------------------------------ |
| **GitLens**                     | Enhanced Git history, blame, and commit insights |
| **REST Client**                 | Test APIs directly from `.http` files            |
| **Playwright Test for VS Code** | Run and debug E2E tests interactively            |

---

## ☁️ 4. Cloud Development Options

If installing dependencies locally isn’t possible, you can use a **cloud-based dev environment**:

### **GitHub Codespaces**

- Pre-configured Node.js + PNPM setup
- Runs VS Code directly in the browser
- Access via your GitHub account under your forked repo

### **StackBlitz (Vite Mode)**

- Visit [stackblitz.com](https://stackblitz.com/)
- Import repository via GitHub URL
- Supports both Vue and React with hot-reload out of the box

> Both options support Node 20 + and require minimal local configuration.

---

## 🚀 5. Deployment Setup

### 🟩 Deploying the Vue App to Netlify

1. Go to [Netlify](https://app.netlify.com/).
2. Click **“New Site from Git.”**
3. Connect your **GitHub** repository.
4. Select the **vue-app** directory as your root.
5. Configure the build settings:

```bash
Build command: pnpm build
Publish directory: dist
```

6. Click **Deploy Site**.

> ✅ Example Deployment: [https://ptl-workshop-vue.netlify.app](https://ptl-workshop-vue.netlify.app)

---

### ⚫ Deploying the React App to Vercel

1. Go to [Vercel](https://vercel.com/).
2. Click **“Add New Project.”**
3. Import your **GitHub** repository.
4. Select the **react-app** directory.
5. Configure the build settings:

```bash
Framework Preset: Vite
Build Command: pnpm build
Output Directory: dist
```

6. Click **Deploy**, and Vercel will automatically assign a live preview URL.

> 💡 _Tip:_ You can link your custom domain in Vercel after deployment.

---

## 🧪 6. Testing Tools

| **Framework** | **Unit Testing**             | **E2E Testing**       |
| ------------- | ---------------------------- | --------------------- |
| **Vue**       | Vitest + Vue Test Utils      | Playwright            |
| **React**     | Jest + React Testing Library | Cypress or Playwright |

### Run Tests Locally

```bash
pnpm test:unit     # Unit tests
pnpm test:e2e      # End-to-end tests
```

---

## 🧭 7. Troubleshooting & Tips

- **Clear PNPM cache:**
  ```bash
  pnpm store prune
  ```
- Restart VS Code after installing new extensions.
- Ensure Node is not using outdated global versions.
- Run pnpm dev --force if hot reload fails.
- On Windows, if Vite build errors occur:

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## ✅ 8. Final Participant Checklist

| **Status** | **Item**                              |
| :--------: | :------------------------------------ |
|     ☐      | Node.js 20+ installed                 |
|     ☐      | PNPM installed                        |
|     ☐      | Git & VS Code installed               |
|     ☐      | Repository cloned successfully        |
|     ☐      | Dev server runs for both Vue & React  |
|     ☐      | Netlify & Vercel accounts created     |
|     ☐      | Recommended extensions installed      |
|     ☐      | Tests pass locally (`pnpm test:unit`) |

---

## 📬 9. Contact

**Facilitator:**
**James Lanzon**
📧 [lanzonprojects@gmail.com](mailto:lanzonprojects@gmail.com)
💻 [github.com/Koshux](https://github.com/Koshux)

> © 2025 Slow Burn Ltd. All rights reserved.
