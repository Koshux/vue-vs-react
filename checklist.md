That's a fantastic adjustment. Having them scaffold their own apps is _much_ more impactful.

You're correct. The `FACILITATOR_GUIDE.md` files I created are your "cheat sheets" with the detailed explanations. What you need now is a high-level **Facilitator Checklist** to keep you on track each day, listing all the assets you need.

Here is that day-by-day checklist.

---

## 📋 Pre-Workshop Checklist (Your Prep)

- [ ] **Hardware/Software:**
  - [ ] Primary presentation machine (laptop).
  - [ ] Second monitor (essential for seeing your speaker notes/cheatsheet on one screen and your presentation on the other).
  - [ ] Stable internet connection.
  - [ ] All prerequisite software installed (`pnpm`, `node`, `git`, VS Code).
- [ ] **Student Materials:**
  - [ ] `prerequisites.md` file emailed to all attendees at least 3 days in advance.
  - [ ] `debug-pnpm.md` file ready to share if anyone has pnpm/corepack issues.
  - [ ] The GitHub repo (`vue-vs-react`) pushed and public.
- [ ] **Code Setup:**
  - [ ] **Create Solution Branches:** Create git branches for _every single task_ (e.g., `solution/day-1/05-vue-sfc`). This is your most important backup. If a student group gets stuck, they can `git checkout` the solution and stay with the class.
- [ ] **Dry Run:**
  - [ ] Run `pnpm dev:presentation` and click through _all_ slides to ensure Markdown links and separators are working.

---

## ☀️ Day 1 Checklist: Setup & Core Concepts

**Goal:** Get everyone scaffolding and building their first components.
**Facilitator Guide:** `packages/presentation/public/slides/day1/D1-Facilitator.md`

- [ ] **Presentation Assets:**
  - [ ] `WelcomeDeck.vue` (for `introduction.md`).
  - [ ] `SlidesDay1.vue` (loads all Day 1 slides).
- [ ] **Cheatsheets (Facilitator Guide):**
  - [ ] Have `D1-Facilitator.md` open on your second monitor.
- [ ] **Key Checkpoints & Tasks:**
  - [ ] **(Module 1.1)** Run the intro, poll, and goals slides.
  - [ ] **(Module 1.1)** **Live Gate:** Perform the "Prerequisite Check" (`pnpm -v`, etc.).
  - [ ] **(Module 1.1A)** **Live Task:** Pair up students. Walk Team Vue through `pnpm create vue...` and Team React through `pnpm create vite...`.
  - [ ] **(Module 1.1A)** **Live Gate:** Ensure _everyone_ runs `pnpm install` from the root.
  - [ ] **(Module 1.2)** Discuss Vite vs. Webpack. Show both `vite.config.ts` files.
  - [ ] **(Module 1.3)** Discuss folder structure. **Task:** Students create empty `Button.vue` / `Button.tsx`.
  - [ ] **(Module 1.4)** Explain monorepo commands (`-F`, `-r`). **Task:** Students install `axios`.
  - [ ] **(Module 1.5)** Explain Vue SFC (`<template>`, `<script setup>`). **Task:** Build `Button.vue`.
  - [ ] **(Module 1.6)** Explain React FC/JSX. **Task:** Build `Button.tsx`.
  - [ ] **(Module 1.7)** Compare `<slot>` vs. `props.children`. **Task:** Update Button components.
  - [ ] **(Module 1.8)** Explain basic routing (`<RouterLink>`, `<RouterView>`). **Task:** Add `/about` route.
  - [ ] **(Module 1.9)** Explain Vue local state (`ref`, `computed`). **Task:** Build Vue counter.
  - [ ] **(Module 1.10)** Explain React local state (`useState`, `useReducer`). **Task:** Build React counter.
  - [ ] **(Module 1.11)** Tease global state (Pinia vs. Context). **Task:** Share state between components.

---

## ☀️ Day 2 Checklist: Advanced State & Ecosystem

**Goal:** Build "real" app features: API data, global state, and 3rd-party UI.
**Facilitator Guide:** `packages/presentation/public/slides/day2/D2-Facilitator.md`

- [ ] **Presentation Assets:**
  - [ ] `SlidesDay2.vue` (loads all Day 2 slides).
- [ ] **Cheatsheets (Facilitator Guide):**
  - [ ] Have `D2-Facilitator.md` open.
- [ ] **Key Checkpoints & Tasks:**
  - [ ] **Recap:** Briefly review Day 1 (SFC/FC, local state).
  - [ ] **(Module 2.1)** Explain advanced routing. **Task:** Vue `beforeEach` guard, React `createBrowserRouter` + `loader`.
  - [ ] **(Module 2.2)** Explain manual data fetching. **Task:** Fetch from PokéAPI in `onMounted` / `useEffect`.
  - [ ] **(Module 2.3)** Explain global state. **Task:** Vue `pinia-plugin-persistedstate`, React refactor Context to RTK `createSlice`.
  - [ ] **(Module 2.4)** Discuss UI library trade-offs. **Task:** Add Vuetify (`<v-btn>`) and MUI (`<Button>`).

---

## ☀️ Day 3 Checklist: Tooling, Testing & Deployment

**Goal:** Professionalize the apps with team tooling, write tests, and deploy.
**Facilitator Guide:** `packages/presentation/public/slides/day3/D3-Facilitator.md`

- [ ] **Presentation Assets:**
  - [ ] `SlidesDay3.vue` (loads all Day 3 slides).
- [ ] **Cheatsheets (Facilitator Guide):**
  - [ ] Have `D3-Facilitator.md` open.
- [ ] **Key Checkpoints & Tasks:**
  - [ ] **Recap:** Briefly review Day 2 (global state, UI libs).
  - [ ] **(Module 3.1)** Explain professional tooling. **Task:** Set up `husky` and `lint-staged`. Make a commit fail.
  - [ ] **(Module 3.2)** Explain Unit Testing (Testing Pyramid). **Task:** Write unit tests for the `Button` component using Vitest + VTU/RTL.
  - [ ] **(Module 3.3)** Explain E2E Testing. **Task:** Write a Playwright test to check navigation to the `/about` page.
  - [ ] **(Module 3.4)** Explain production builds & deployment. **Task:** Deploy the `vue-app` to Netlify and the `react-app` to Vercel.
  - [ ] **(Module 3.4)** **Live Gate:** Have students share their live URLs. This is the final "win" for the workshop.
- [ ] **Wrap-up:**
  - [ ] Run the final "Questions" and "Thank You" slides.
  - [ ] Collect feedback.

---

## 📬 Post-Workshop Checklist

- [ ] **Share Materials (as promised in `entire-plan.md`):**
  - [ ] Email attendees a link to the final GitHub repository (with your solution branches).
  - [ ] Include the `prerequisites.md` and `debug-pnpm.md` as "setup guides."
  - [ ] Include your new `FACILITATOR_GUIDE` files as "cheat sheets" or "extended notes" for them.
  - [ ] Include the links to the Netlify and Vercel deployment guides from `prerequisites.md`.
