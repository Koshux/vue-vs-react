## Day 2: Advanced State, Routing & Data

**Goal:** Move from single components to a real application. Connect to APIs, manage shared global state (Pinia/RTK), and integrate pre-built component libraries.

### D2.1: Advanced Routing

- **Slide:** `public/slides/day2/D2-1-Routing.md`
- **Objective:** Explain "middleware" (guards) in Vue and "data loading" in React.

#### 🗣️ Key Talking Points

- "Yesterday we set up basic routes. Today, let's look at the advanced features that make these routers powerful for real apps."
- **Vue - Navigation Guards:**
  - "Vue Router's power comes from **Navigation Guards**. These are 'middleware' functions that run before, during, or after a route change."
  - `router.beforeEach`: This is the most common. It's a **global** guard that runs before _every_ route change. This is the perfect place to check: "Is the user logged in? If not, redirect them to `/login`."
  - `beforeRouteLeave`: This is a guard you put _inside_ a component. It's used to prevent a user from leaving a page, like an unsaved form. "Are you sure you want to discard your changes?"
- **React - Data Routers:**
  - "The modern React Router (`v6+`) has a new way of working called 'Data Routers,' which we set up using `createBrowserRouter`."
  - "Its big feature is the `loader` function. A `loader` is a function you attach to a route that fetches data _before_ the component even renders.
  - "This completely changes how we fetch data. Instead of `useEffect` + `useState` + `setLoading(true)`, the data is just _there_. React handles the loading state for us."
  - `useLoaderData`: This is the hook you use inside your component to get the data returned from your `loader`.

#### ✅ Live Checkpoints

- [ ] **Vue Task:**
  - [ ] Open `vue-app/src/router/index.ts`.
  - [ ] Add `router.beforeEach((to, from) => { ... })` after the `createRouter` call.
  - [ ] Inside the guard, add `console.log('Navigating from:', from.path, 'to:', to.path)`.
  - [ ] Navigate in the browser and show the console log.
- [ ] **React Task:**
  - [ ] Open `react-app/src/main.tsx`.
  - [ ] **"We Do":** Refactor the `<BrowserRouter>` to use `createBrowserRouter` and `<RouterProvider>`.
  - [ ] Add a `loader` property to the `/about` route: `loader: async () => { return { message: 'Hello from the loader!' } }`.
  - [ ] **"You Do":** "Now, open `About.tsx`, import `useLoaderData`, call it, and display the `message` on the page."

---

### D2.2: Basic Data Fetching

- **Slide:** `public/slides/day2/D2-2-DataFetching.md`
- **Objective:** Teach the _fundamental_ manual data fetching pattern in both frameworks.

#### 🗣️ Key Talking Points

- "Before we use fancy loaders or data-fetching libraries, you _must_ know the manual, hook-based pattern. This is the foundation."
- "The goal is to fetch data _once_ when the component first appears, or 'mounts'."
- **Vue:**
  - "In Vue's Composition API, we use the `onMounted` lifecycle hook. This function will run _after_ the component has been rendered to the DOM for the first time."
  - "We create two `ref`s: one for the `data` (defaulting to `null`) and one for `loading` (defaulting to `true`)."
  - "Inside `onMounted`, we make our `async` call, set the data, and set `loading` to `false`."
- **React:**
  - "In React, we use the `useEffect` hook. This hook is for _all_ side effects."
  - "The magic is the **dependency array**—the `[]` at the end. An empty array tells React: 'Only run this function _once_, after the first render'."
  - "If you forget the `[]`, you will create an **infinite loop**. The `fetch` will update the state, which causes a re-render, which runs `useEffect` again, which fetches again... and so on."
  - "Like Vue, we use `useState` for both `data` and `loading`."

#### ✅ Live Checkpoints

- [ ] **Task:** "In both apps, go to your `About` page/component."
- [ ] **Task:** "Add `onMounted` / `useEffect`."
- [ ] **Task:** "Add `loading` state."
- [ ] **Task:** "Inside the hook, `fetch` from `https://pokeapi.co/api/v2/pokemon/pikachu`."
- [ ] **Task:** "Show a 'Loading...' message if `loading` is true."
- [ ] **Task:** "When the data arrives, show the Pokémon's name (`data.name`)."

---

### D2.3: Global State Management

- **Slide:** `public/slides/day2/D2-3-AdvancedState.md`
- **Objective:** Compare Pinia and Redux Toolkit (RTK) as solutions to global state.

#### 🗣️ Key Talking Points

- "Yesterday, we saw the problem: sharing state between components. Prop drilling is bad. Context (React) and Pinia (Vue) are the solutions. Let's go deeper."
- "We need a **global state manager**—a single source of truth that lives _outside_ our component tree."
- **Vue - Pinia:**
  - "Pinia is the new official store for Vue, replacing Vuex. It's _much_ simpler."
  - "A 'store' is just a 'slice' of your state, created with `defineStore`."
  - "It has a powerful plugin system. The most popular is `pinia-plugin-persistedstate`. You add it once, and then any store can save itself to `localStorage` just by adding one line: `persist: true`."
- **React - Redux Toolkit (RTK):**
  - "Redux is the most battle-tested state library for React. 'RTK' is the modern, official way to use Redux that removes all the old boilerplate."
  - "`createSlice` is the core. It's one function that generates your _state_, your _reducers_ (functions that change state), and your _actions_ (events) all at once."
  - **RTK Query:** "This is its killer feature. It's a full data-fetching library _inside_ Redux. It handles all the `loading` and `error` states for you, caches data, and invalidates that cache. For complex apps, this often replaces 90% of your manual `useEffect` fetches."
  - **Zustand:** "If RTK seems too heavy, the most popular lightweight alternative is `Zustand`. It feels like `useState` but is global. It's very simple and effective."

#### ✅ Live Checkpoints

- [ ] **Vue Task:**
  - [ ] `pnpm -F vue-app add pinia-plugin-persistedstate`
  - [ ] Open `main.ts`, import the plugin, and pass it to Pinia: `pinia.use(createPersistPlugin(...))` (using your file structure).
  - [ ] Open your `tasks` store (`stores/tasks.ts`).
  - [ ] In `defineStore`, add `{ persist: true }` as the third argument.
  - [ ] Run the app, add tasks, refresh the page, and show that they are still there.
- [ ] **React Task:**
  - [ ] **"We Do":** Create a new `features/counter/counterSlice.ts` file.
  - [ ] Live-code the `createSlice` call together.
  - [ ] **"You Do":** "Your task: Import this slice into `store/index.ts` and add it to the `reducer` map. Then, go into your `Counter` component, remove `useContext`, and replace it with `useSelector` (to read) and `useDispatch` (to write)."

---

### D2.4: Theming & UI Libraries

- **Slide:** `public/slides/day2/D2-4-Theming.md`
- **Objective:** Compare component libraries (Vuetify/MUI) vs. utility-first (Tailwind).

#### 🗣️ Key Talking Points

- "Why not just write CSS? Speed, Consistency, and **Accessibility**."
- "Good UI libraries give you keyboard navigation, color contrast, and ARIA roles for free."
- **Approach 1: Component Libraries (Vuetify, MUI)**
  - "These are 'batteries-included' frameworks. You get 80+ components (buttons, forms, data tables) that all look and feel the same."
  - "Pros: Incredibly fast. You can build a complex admin dashboard in a day."
  - "Cons: Your app can look generic, and deep customization is harder."
- **Approach 2: Utility-First / Headless (Tailwind)**
  - "This is what we're using. Tailwind gives you _utility classes_ (`flex`, `p-4`, `text-blue-500`) to build your _own_ components."
  - "Pros: Full control over your design. It's fast once you learn it."
  - "Cons: 'Class soup' in your HTML. You still have to build your own components."
  - **Headless UI:** "This is the best of both worlds. It gives you the _logic_ and _accessibility_ for components (like a Dropdown or Modal) but _no styles_. You then style it yourself with Tailwind. The _same_ Headless UI library works for both Vue and React."

#### ✅ Live Checkpoints

- [ ] **Task:** "We're going to quickly add a component library just to see how it works."
- [ ] **Vue Task:** `pnpm -F vue-app add vuetify`. Follow the setup in `main.ts`. Go to `App.vue` and change a button to `<v-btn>`.
- [ ] **React Task:** `pnpm -F react-app add @mui/material @emotion/react @emotion/styled`. Go to `App.tsx` and change a button to `<Button>`.

---
