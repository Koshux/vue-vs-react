# Vue vs React Workshop – Vue App

This folder contains the **Vue 3** app used in the PTL workshop.
Deployed at **https://ptl-workshop-vue.netlify.app**.

> Monorepo path: `packages/vue-app`

---

## Tech Stack

- **Vite 7**, **TypeScript**, **Vue 3**
- **Vue Router** (history mode)
- **Pinia** (with a small custom **persist plugin**)
- **Vuetify 3** + **Tailwind CSS** (Tailwind tokens mapped to Vuetify theme)
- **Vitest + Vue Test Utils** (unit), **Playwright** (e2e)

---

## Features in this app

- **Pages**
  - `/` Home
  - `/about` About
  - `/assignees` Lazy-loaded, fetches users from `jsonplaceholder.typicode.com`
  - `/tasks` Task tracker with filter (all/active/done), checkbox toggle, and assignees
- **State**
  - `stores/tasks.ts`: tasks CRUD + filter + computed selectors
  - `stores/users.ts`: API fetch with loading/error/loaded flags and `byId` helper
  - Persisted state (selected keys) via `src/plugins/persist.ts`
- **UI**
  - Light/Dark toggle (syncs Vuetify + Tailwind via CSS variables)
  - SPA routing works on Netlify via `public/_redirects`

---

## Requirements

- **Node**: `^20.19.0 || >=22.12.0`
- **pnpm** recommended (Corepack-enabled environments work well)

---

## Scripts

From the monorepo **root**:

```bash
pnpm -C packages/vue-app dev       # Start dev server
pnpm -C packages/vue-app build     # Type-check + build
pnpm -C packages/vue-app preview   # Preview the production build
pnpm -C packages/vue-app test:unit # Run unit tests (Vitest)
pnpm -C packages/vue-app test:e2e  # Run e2e tests (Playwright)
pnpm -C packages/vue-app lint      # ESLint (with cache + fix)
pnpm -C packages/vue-app format    # Prettier (src/ only)
```
