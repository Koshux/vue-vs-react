# 📚 Facilitator's Guide & Workshop Cheatsheet

## Day 1: Fundamentals, Components & Local State

**Goal:** Get everyone set up, introduce the core syntax of Vue and React, and build standalone components that manage their own local state.

### D1.1: Welcome & Environment Check

- **Slide:** `public/slides/welcome/introduction.md` & `public/slides/day1/D1-1-Welcome.md`
- **Objective:** Welcome the attendees and ensure 100% of them have a working development environment before proceeding.

#### 🗣️ Key Talking Points

- **Intro:** Welcome\! I'm James Lanzon. This is the PTL Workshop on Vue vs. React.
- **Goals:** "My goal for you over the next 3 days is to..." (Cover the goals from the slide).
- **Poll:** Let's get a quick read of the room... (Run the poll). This helps me know where to spend more time.
- **The "Why":** Why Vue vs. React? They are the two most dominant, in-demand frameworks. Learning one makes you hirable; knowing _both_ makes you a senior-level asset.
- **Method:** This is a hands-on workshop. I'll introduce a concept ("I Do"), we'll code a bit together ("We Do"), and then you'll get a task to complete ("You Do").

#### ✅ Live Checkpoints

- [ ] **CRITICAL:** Start the "Environment Check" task.
- [ ] Ask everyone to open their terminal.
- [ ] Have them run `pnpm -v`, `node -v`, and `git --version`.
- [ ] Have _everyone_ run `pnpm install` from the root. This is essential.
- [ ] Have _everyone_ run `pnpm dev`.
- [ ] **Gate:** Do not proceed until everyone confirms they have 3 browser tabs open and running.

---

### D1.1A: Let's Build Our Apps\!

- **Slide:** _(You will need to create this new slide, see content below)_
- **Objective:** Pair up students and have them use official CLI tools to scaffold their respective apps _inside_ the monorepo.

#### 🗣️ Key Talking Points

- "Okay, let's get to work. Find a partner or a group of 3."
- "One half of the room, you will be **Team Vue**. The other half, you are **Team React**. Your mission is to build a "Task Tracker" app. We'll do this step-by-step, comparing our approaches at each stage."
- "We will use the official, modern scaffolding tools for each framework: `create-vue` for Vue and `create-vite` for React."

#### ✅ Live Checkpoints

- [ ] **Task:** "Everyone, from the **root** of the `vue-vs-react` folder, run **ONE** of these commands."
- [ ] **Team Vue:**

  ```bash
  pnpm create vue@latest packages/vue-app --ts --router --pinia
  ```

  - (This is the `pnpm` equivalent of the `npm` command you provided).

- [ ] **Team React:**
  ```bash
  pnpm create vite@latest packages/react-app -- --template react-ts
  ```
- [ ] **Gate:** "After your app is scaffolded, you need to install all the _new_ dependencies. From the **root**, run `pnpm install`."
- [ ] "This command will install all the deps for Vue, React, _and_ the presentation, and link them together in the monorepo."
- [ ] **Final Check:** "Run `pnpm dev` from the root. This should now start all three apps: your presentation, your new Vue app, and your new React app."

### D1.2: Vite in Vue & React

- **Slide:** `public/slides/day1/D1-2-Vite.md`
- **Objective:** Explain what Vite is and why it's the modern standard for building apps in _both_ ecosystems.

#### 🗣️ Key Talking Points

- **The Problem:** Why do we need a tool like Vite? Browsers don't understand `.vue` files, they don't understand JSX, and they don't understand TypeScript.
- **The Old Way (webpack):** Tools like Create React App (CRA) and Vue CLI used webpack. Webpack bundles your _entire_ application into one or more JS files _before_ it can even start the server. For a large app, this "cold start" can take minutes.
- **The New Way (Vite):** Vite uses **native ES Modules (ESM)**. When you ask for `App.vue`, it _only_ transforms and serves `App.vue`. It builds files on demand.
- **The Benefit:** This results in a near-instant server start and lightning-fast "Hot Module Replacement" (HMR), which is when your code updates in the browser without a full refresh.

#### ✅ Live Checkpoints

- [ ] **Task:** Open `packages/vue-app/vite.config.ts`.
- [ ] Point out the `@vitejs/plugin-vue` plugin. "This is all it takes to make Vite understand `.vue` files."
- [ ] **Task:** Open `packages/react-app/vite.config.ts`.
- [ ] Point out the `@vitejs/plugin-react` plugin. "Same thing for React. This is what makes JSX and Fast Refresh work."

---

### D1.3: Folder Structure

- **Slide:** `public/slides/day1/D1-3-Folders.md`
- **Objective:** Introduce a scalable, professional folder structure that works for both apps.

#### 🗣️ Key Talking Points

- "A predictable folder structure is key for maintainability. This is a common pattern you'll see in professional projects."
- **`assets/`**: Holds static files like images, fonts, and global CSS.
- **`components/`**: This is for **reusable, "dumb"** components. Think of `Button.vue` or `Modal.tsx`. They don't know about pages; they just receive props and emit events.
- **`views/` (or `pages/`)**: This is for **routed, "smart"** components. `HomePage.vue` or `ProfilePage.tsx`. These components _use_ the reusable components to build a page, and they are often responsible for fetching data or connecting to the store.
- **`router/`**: Holds the configuration for `vue-router` or `react-router-dom`.
- **`store/` (or `features/`)**: Holds your global state logic (Pinia stores or Redux slices).

#### ✅ Live Checkpoints

- [ ] **Task:** Tell students to open _both_ the `vue-app` and `react-app` in their VS Code.
- [ ] **Task:** Have them create the two empty files as specified on the slide.

---

### D1.4: Monorepo with pnpm

- **Slide:** `public/slides/day1/D1-4-Monorepo.md`
- **Objective:** Explain what a monorepo is and how to use `pnpm workspaces`.

#### 🗣️ Key Talking Points

- **What is it?** A single `git` repository that holds multiple, distinct projects (or "packages").
- **Why?** The main benefit is **code sharing**. We could create a `packages/ui-library` and share the _exact_ same Button component between Vue and React. It also simplifies dependency management—one `pnpm install` at the root.
- **How?** The "magic" file is `pnpm-workspace.yaml` at the root of our repo. It tells pnpm that any folder inside `packages/` is a separate project.
- **Commands:** "You almost never `cd` into a package to run a command. You run it from the root using filters."
  - `-r` is **recursive**: `pnpm -r build` will run `build` in _all_ packages.
  - `-F` is **filter**: `pnpm -F vue-app add axios` will add `axios` _only_ to the `vue-app` package.
  * "We are in a **monorepo**. This means we almost _never_ `cd` into a package to install things. We do it from the root."
  * `pnpm -r <cmd>`: Runs a command **r**ecursively (in all packages).
  * `pnpm -F <pkg> <cmd>`: **F**ilters to run _only_ in one package.

#### ✅ Live Checkpoints

- [ ] Show the `pnpm-workspace.yaml` file in the root.
- [ ] **"You Do":** "Your task: Let's add `axios` (for data fetching later) to _both_ apps, without leaving the root."
- [ ] `pnpm -F vue-app add axios`
- [ ] `pnpm -F react-app add axios`

---

### D1.5: Vue SFC Basics

- **Slide:** `public/slides/day1/D1-5-VueSFC.md`
- **Objective:** Introduce Vue's core building block: the Single-File Component.

#### 🗣️ Key Talking Points

- "This is the core abstraction of Vue. All your Vue code will live in `.vue` files."
- It's made of three blocks:
  1.  **`<template>`**: Your HTML. This is what the component will render.
  2.  **`<script setup>`**: Your logic. This is where you import, define state, and write functions. We use `setup` to opt into the **Composition API**, which is the modern standard. The "Options API" is the older way.
  3.  **`<style scoped>`**: Your CSS. The `scoped` keyword is a built-in feature that ensures the styles here _only_ apply to this component and don't leak out.
- **Props & Emits:** How does a component communicate?
  - **Props:** Data _in_. We use `defineProps` to declare what data a component accepts.
  - **Emits:** Events _out_. We use `defineEmits` to declare what events a component can send to its parent.

#### ✅ Live Checkpoints

- [ ] **Task:** Open `packages/vue-app/src/components/Button.vue`.
- [ ] **"We Do":** Live-code the `defineProps` and `defineEmits` part.
  ```vue
  <script setup lang="ts">
  defineProps<{ label: string }>()
  const emit = defineEmits(['click'])
  </script>
  <template>
    <button @click="emit('click')">{{ label }}</button>
  </template>
  ```
- **"You Do":** Have them finish the component and import it into `App.vue` or `HomeView.vue`.

---

### D1.6: React FC Basics

- **Slide:** `public/slides/day1/D1-6-ReactFC.md`
- **Objective:** Introduce React's core building block: the Functional Component and JSX.

#### 🗣️ Key Talking Points

- "React's approach is different. A component is 'just a JavaScript function' that returns UI."
- **Functional Component (FC):** A function that accepts `props` as its first argument.
- **JSX:** This _looks_ like HTML, but it's a syntax extension for JavaScript. You're actually writing `React.createElement()` calls in disguise. This is why you can embed JavaScript logic directly inside `{curlies}`.
- **Typing:** We use a TypeScript `interface` or `type` to define the shape of the `props` object.
- **Events:** Instead of emitting events _up_, we pass callback functions _down_ as props (like `onClick`).

#### ✅ Live Checkpoints

- [ ] **Task:** Open `packages/react-app/src/components/Button.tsx`.
- [ ] **"We Do":** Live-code the `ButtonProps` interface and the function signature.

  ```tsx
  import React from 'react'

  interface ButtonProps {
    label: string
    onClick: () => void
  }

  export function Button({ label, onClick }: ButtonProps) {
    return <button onClick={onClick}>{label}</button>
  }
  ```

- **"You Do":** Have them finish the component and import it into `App.tsx`.

---

### D1.7: Slots vs. Children

- **Slide:** `public/slides/day1/D1-7-SlotsChildren.md`
- **Objective:** Compare how Vue and React handle "content projection."

#### 🗣️ Key Talking Points

- "How do we pass _content_, like an icon or other HTML, _inside_ our button?"
- This is called "Content Projection."
- **Vue:** Uses the `<slot />` element. You can have a default slot or named slots (e.g., `<slot name="icon" />`).
- **React:** Uses a special, reserved prop called `children`. Whatever you nest inside a component in JSX becomes `props.children`.

#### ✅ Live Checkpoints

- [ ] **Task:** Update `Button.vue`:
  ```html
  <button @click="emit('click')"><slot /> {{ label }}</button>
  ```
- [ ] **Task:** Update `Button.tsx`:
  ```tsx
  export function Button({ label, onClick, children }: ButtonProps) {
    return (
      <button onClick={onClick}>
        {children} {/* This is where the content will go */}
        {label}
      </button>
    )
  }
  ```
- **"You Do":** Have them update the `ButtonProps` interface in React and then use the button in both apps with an emoji inside: `<Button><span>icon</span></Button>`.

---

### D1.8: Routing Basics

- **Slide:** `public/slides/day1/D1-8-Routing.md`
- **Objective:** Set up basic page navigation.

#### 🗣️ Key Talking Points

- "Both frameworks rely on official libraries for routing."
- **Comparison (show table):**
  - To navigate, Vue uses `<RouterLink>` and React uses `<Link>`.
  - To tell the router _where_ to render the page, Vue uses `<RouterView />` and React uses `<Outlet />`.
- They are direct conceptual parallels.

#### ✅ Live Checkpoints

- [ ] **Vue:** Show `vue-app/src/router/index.ts` and the `routes` array. Show `<RouterView />` in `App.vue`.
- [ ] **React:** Show `react-app/src/main.tsx` (or wherever routes are defined). Show `<Outlet />` in the root layout.
- [ ] **"You Do":** Task: "In both apps, add a new `/about` route that renders a simple `About` component. Add a `<RouterLink>` / `<Link>` to it from your main page."

---

### D1.9: Vue Local State

- **Slide:** `public/slides/day1/D1-9-VueState.md`
- **Objective:** Introduce Vue's core reactivity APIs.

#### 🗣️ Key Talking Points

- **Reactivity:** The "magic" that updates the UI when data changes. In Vue, this is "fine-grained." It knows _exactly_ what data changed and updates _only_ that part of the DOM.
- **`ref()`:** For simple values (primitives). `const count = ref(0)`. In your `<script>`, you MUST use `.value` to access or change it (`count.value++`). In your `<template>`, you can just write `{{ count }}`.
- **`computed()`:** For derived state. `const double = computed(() => count.value * 2)`. This is _cached_. It only re-runs if `count` changes.
- **`watch()`:** For side effects. "When `count` changes, do this _other_ thing (like log to console or save to localStorage)."

#### ✅ Live Checkpoints

- [ ] **"We Do":** In `HomeView.vue` (or `App.vue`), import `ref` and `computed`.
- [ ] Create the `count` ref and the `increment` function.
- [ ] **"You Do":** "Your task: Add the `decrement` and `reset` functions. Then, add a `computed` property that doubles the count. Display both in the template."

---

### D1.10: React Local State

- **Slide:** `public/slides/day1/D1-10-ReactState.md`
- **Objective:** Introduce React's state hooks.

#### 🗣️ Key Talking Points

- **Reactivity:** React's model is different. It is **not** fine-grained. When state changes, the _entire component function re-runs_. React then creates a "virtual DOM," compares it to the real DOM, and _then_ makes the necessary changes.
- **`useState()`:** The main hook. `const [count, setCount] = useState(0)`. It returns an array with the value and a _setter function_.
- **Immutable State:** You _never_ change state directly (like `count++`). You _must_ call the setter function (`setCount(count + 1)`). This is what tells React to re-render.
- **`useReducer()`:** For complex state. Instead of just setting a value, you `dispatch` an "action" (an object), and a "reducer" function handles the logic. This is a preview of the Redux pattern.
- **No `computed`/`watch`:** For computed properties, you just calculate it _during the render_. For `watch`, you use `useEffect`.

#### ✅ Live Checkpoints

- [ ] **"We Do":** In `App.tsx`, import `useState`. Create the `count` state and `increment` function.
- [ ] **"You Do":** "Your task: Add `decrement` and `reset`. Then, refactor the whole thing to use `useReducer` instead of `useState`."

---

### D1.11: Shared State Teaser

- **Slide:** `public/slides/day1/D1-11-SharedState.md`
- **Objective:** Set up the problem that global state solves (prop drilling) and introduce the (different) solutions.

#### 🗣️ Key Talking Points

- **The Problem:** "Okay, so we have a counter. What if we want to show that count in the Navbar? And in a component in the footer? Local state can't do that."
- **Prop Drilling:** The "bad" way is to pass the `count` prop all the way down from `App` to every child. This is messy and hard to maintain.

- **The Solution:** We need to lift the state _out_ of the components.
- **Vue (Pinia):** A global, centralized store. It's like a separate object that any component can import and use.
- **React (Context):** A "provider" system. A parent component _provides_ the state, and any child component (no matter how deep) can _consume_ it. It's still tied to the component tree, but it avoids drilling.

#### ✅ Live Checkpoints

- [ ] **Task:** "To finish Day 1, create a new `DisplayCount` component in both apps. In Vue, create a `useCounterStore` with Pinia to share the state. In React, create a `CounterContext` to share the state. Prove that changing the count in one component updates the other."

---

This guide provides a clear, step-by-step script for you to follow.

Would you like me to generate this same facilitator guide for **Day 2 and Day 3**?
