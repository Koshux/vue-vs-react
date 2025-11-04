# PTL Workshop 2025 – Vue & React Comparison

This repo contains the two sibling apps we use in the workshop to show like-for-like Vue vs React implementations (routing, state, theming, API fetch, tests, and deploys).

- **Vue app (Netlify):** https://ptl-workshop-vue.netlify.app/
- **React app (Vercel):** https://vue-vs-react-react-app.vercel.app/

The repo is set up as a PNPM workspace.

---

## 1. Structure

```text
.
├─ packages/
│  ├─ vue-app/     # Vue 3 + Vite + Pinia + Vue Router + Vuetify + Tailwind
│  └─ react-app/   # React 19 + Vite + Redux Toolkit + React Router + Tailwind
└─ ...
```

Each app is self-contained and has its own `package.json` with scripts. Run commands **from the app folder** when working on just one framework.

---

## 2. Prerequisites

- Node.js **20+**
- **pnpm** installed globally (or `corepack enable` if your Node supports it)
- Git

Install workspace deps from the repo root:

```bash
pnpm install
```

---

## 3. Running the apps

### Vue app

```bash
cd packages/vue-app
pnpm dev
```

- Vue Router routes: `/`, `/about`, `/assignees`, `/tasks`
- State: Pinia store for tasks + persisted subset
- UI: Vuetify + Tailwind
- E2E: Playwright config present

### React app

```bash
cd packages/react-app
pnpm dev
```

- React Router routes: `/`, `/tasks` (and whatever you’ve mirrored from Vue)
- State: Redux Toolkit slices (`tasks`, `users`) + small localStorage persistor
- E2E: Playwright tests under `tests/e2e`

---

## 4. Features implemented in both

- ✅ **Task tracker**: add → list → toggle → filter (all / active / done)
- ✅ **Remote assignees**: fetch users from `https://jsonplaceholder.typicode.com/users` and bind to tasks
- ✅ **Routing**: top-level pages (Home, Tasks, About/Assignees)
- ✅ **Light/Dark**: Tailwind `dark` class, persisted choice
- ✅ **Local persistence**: saved tasks survive reload
- ✅ **Unit tests**: Vitest + (React) Testing Library / (Vue) Vue Test Utils equivalent
- ✅ **Playwright E2E**: simple task flow coverage
- ✅ **Deployed**: Vue → Netlify, React → Vercel

---

## 5. Deploy notes

- **Netlify** is configured to build **only** `packages/vue-app`
- **Vercel** is configured to build **only** `packages/react-app`
- Push to `main` → only the app that changed is rebuilt

(Those ignore rules live in the platform config, not here.)

---

## 6. Where to find scripts

To keep the root clean, **use the scripts inside each package**:

- `packages/vue-app/package.json` → `dev`, `build`, `test:unit`, `test:e2e`
- `packages/react-app/package.json` → `dev`, `build`, `test`, `test:e2e`

Run them like:

```bash
cd packages/react-app
pnpm test
```

or

```bash
cd packages/vue-app
pnpm test:e2e
```

---

## 7. Contact

Facilitated by **James Lanzon**
📧 [lanzonprojects@gmail.com](mailto:lanzonprojects@gmail.com)
GitHub: [https://github.com/Koshux/](https://github.com/Koshux/)
