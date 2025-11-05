# ⚡️ PTL Workshop 2025 – Vue & React Comparison

This monorepo contains the complete source code and presentation materials for the PTL Workshop 2025.

It features a "Task Tracker" application built with feature-parity in both **Vue 3** and **React 19**. The goal is to provide a hands-on comparison of their ecosystems, state management patterns, and testing strategies in a modern Vite-powered environment.

---

## 🚀 Live Demos

- **Vue 3 App (Netlify):** [https://ptl-workshop-vue.netlify.app/](https://ptl-workshop-vue.netlify.app/)
- **React 19 App (Vercel):** [https://vue-vs-react-react-app.vercel.app/](https://vue-vs-react-react-app.vercel.app/)

---

## 📦 What's Inside?

This repository is a monorepo managed with `pnpm workspaces`.

- **`packages/vue-app`**
  - The Vue 3 + Vite "Task Tracker" application.
  - Uses **Pinia** for state management.
  - Deployed on **Netlify**.

- **`packages/react-app`**
  - The React 19 + Vite "Task Tracker" application.
  - Uses **Redux Toolkit** for state management.
  - Deployed on **Vercel**.

- **`packages/presentation`**
  - The Reveal.js slide deck used for the workshop.

---

## ✨ Core Concepts Compared

Both applications are built with identical features to demonstrate the framework contrasts in:

- **State Management:** Pinia vs. Redux Toolkit (RTK)
- **Routing:** `vue-router` vs. `react-router-dom`
- **Styling:** A shared Tailwind CSS setup
- **Unit Testing:** Vitest
- **E2E Testing:** Playwright
- **Data Persistence:** LocalStorage integration
- **Deployment:** Continuous deployment to Netlify and Vercel

---

## 🛠 Running Locally

1.  Clone this repository to your local machine.

2.  Install all dependencies from the root directory using `pnpm`:

    ```bash
    pnpm install
    ```

> **Note**
> For specific commands to run, test, and build each individual app (e.g., `pnpm dev`), please see the `README.md` file inside its corresponding package directory (like `packages/vue-app/README.md`).
