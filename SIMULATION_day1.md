## 🚀 Facilitator's Dry Run Plan: Day 1

### 0\. 🧹 Initial Setup (Simulating a Student)

1.  **Create a Dry-Run Branch:**
    ```bash
    git checkout main
    git pull
    git checkout -b facilitator/day-1-dry-run
    ```
2.  **Simulate Student Repo:** Your students will clone a repo that _doesn't_ have the `vue-app` or `react-app` folders. Let's replicate that:
    ```bash
    # Run from the monorepo root
    rm -rf packages/vue-app
    rm -rf packages/react-app
    ```
3.  **Install Root Dependencies:**
    ```bash
    pnpm install
    ```
4.  **Start Your Presentation:**
    ```bash
    pnpm dev:presentation
    ```
5.  **Open Your Tools:** Have your slides open in one window and your `D1-Facilitator.md` file open on your second monitor.

---

### 1.1: Welcome & Environment Check

- **Slide:** `introduction.md`, `D1-0-StateOfJS.md`, `D1-1-Welcome.md`

- **Your Action:**
  1.  Click through the "Welcome" and "State of JS" slides.
  2.  Advance to `D1-1-Welcome.md`.
  3.  Follow the "Your Task" instructions on the slide. Open your terminal at the monorepo root.
  4.  Run: `pnpm -v && node -v && git --version` (Checks out).
  5.  Run: `pnpm install` (Checks out, already did this).
  6.  Run: `pnpm dev`

- **🚨 Potential Hiccup \#1:**
  - The `pnpm dev` command will likely **fail** or throw warnings because `turbo` is trying to run the `dev` script for `vue-app` and `react-app`, which **do not exist yet**.
  - **Your Fix:** This is expected\! Make a note in your facilitator guide to tell students: "Don't run `pnpm dev` from the root just yet. We'll do that in the _next_ step after we create our apps."

---

### 1.1A: Scaffolding

- **Slide:** `D1-1A-Scaffolding.md`

- **Your Action:** You must simulate _both_ teams. Run these commands from the root:
  1.  **Team Vue:** `pnpm create vue@latest packages/vue-app --ts --router --pinia` (Accept defaults).
  2.  **Team React:** `pnpm create vite@latest packages/react-app -- --template react-ts`
  3.  **Crucial Gate:** Run `pnpm install` from the root. This links all the new packages.
  4.  **Test the "Real" Gate:** Now run `pnpm dev` from the root.

- **Hiccup Check:**
  - Do all three apps (presentation, vue-app, react-app) start up correctly on their respective ports? This should now work.

---

### 1.2: Vite Config

- **Slide:** `D1-2-Vite.md`
- **Your Action:** (This is a demo step).
  1.  Open `packages/vue-app/vite.config.ts`.
  2.  Open `packages/react-app/vite.config.ts`.
- **Hiccup Check:**
  - Confirm both files exist and contain the expected plugins (`@vitejs/plugin-vue` and `@vitejs/plugin-react`). This should be smooth.

---

### 1.3: Folder Structure

- **Slide:** `D1-3-Folders.md`

- **Your Action:** Follow the task.
  1.  `mkdir -p packages/vue-app/src/components`
  2.  `touch packages/vue-app/src/components/Button.vue`
  3.  `mkdir -p packages/react-app/src/components`
  4.  `touch packages/react-app/src/components/Button.tsx`

- **🚨 Potential Hiccup \#2:**
  - The `create-vue` scaffolder _already_ creates `packages/vue-app/src/components`. Running `mkdir` is fine, but it's redundant.
  - The `create-vite --template react-ts` scaffolder **does not** create `packages/react-app/src/components`.
  - **Your Fix:** Make a note: "Team Vue, you'll already have a `components` folder. Team React, you'll need to create yours."

---

### 1.4: Monorepo Commands

- **Slide:** `D1-4-Monorepo.md`
- **Your Action:** Follow the task. Run from the root:
  1.  `pnpm -F vue-app add axios`
  2.  `pnpm -F react-app add axios`
- **Hiccup Check:**
  - Verify `axios` is added to the `dependencies` in both `packages/vue-app/package.json` and `packages/react-app/package.json`.

---

### 1.5: Vue SFC Basics

- **Slide:** `D1-5-VueSFC.md`
- **Your Action:**
  1.  Open `packages/vue-app/src/components/Button.vue`.
  2.  Implement the task:

      ```vue
      <script setup lang="ts">
      defineProps<{ label: string }>()
      const emit = defineEmits(['click'])
      </script>

      <template>
        <button @click="emit('click')">{{ label }}</button>
      </template>
      ```

  3.  Open `packages/vue-app/src/views/HomeView.vue`.
  4.  Use the component:

      ```vue
      <script setup lang="ts">
      import TheWelcome from '../components/TheWelcome.vue'
      import Button from '@/components/Button.vue' // <-- Add this
      </script>

      <template>
        <main>
          <TheWelcome />
          <Button
            label="My Vue Button"
            @click="() => console.log('Vue Button Clicked!')"
          />
        </main>
      </template>
      ```

- **Hiccup Check:**
  - Does the button appear on the Vue homepage?
  - Does it log "Vue Button Clicked\!" to the console when clicked?
  - Did the HMR (Hot Module Replacement) work instantly?

---

### 1.6: React FC Basics

- **Slide:** `D1-6-ReactFC.md`
- **Your Action:**
  1.  Open `packages/react-app/src/components/Button.tsx`.
  2.  Implement the task:

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

  3.  Open `packages/react-app/src/App.tsx`.
  4.  Use the component (you can clean out the scaffolded content):

      ```tsx
      import { Button } from './components/Button' // <-- Add this
      import './App.css'

      function App() {
        return (
          <>
            <h1>React App</h1>
            <Button
              label="My React Button"
              onClick={() => console.log('React Button Clicked!')}
            />
          </>
        )
      }

      export default App
      ```

- **Hiccup Check:**
  - Does the React app homepage now show "React App" and your button?
  - Does it log "React Button Clicked\!" to the console?

---

### 1.7: Slots vs. Children

- **Slide:** `D1-7-SlotsChildren.md`
- **Your Action:**
  1.  **Vue:** Edit `packages/vue-app/src/components/Button.vue`:
      ```html
      <template>
        <button @click="emit('click')"><slot /> {{ label }}</button>
      </template>
      ```
  2.  **React:** Edit `packages/react-app/src/components/Button.tsx`:

      ```tsx
      import React from 'react'

      interface ButtonProps {
        label: string
        onClick: () => void
        children?: React.ReactNode // <-- Add this
      }

      export function Button({ label, onClick, children }: ButtonProps) {
        // <-- Add children
        return (
          <button onClick={onClick}>
            {children} {/* <-- Add this */}
            {label}
          </button>
        )
      }
      ```

  3.  **Update Usage:**
      - In `HomeView.vue`: `<Button label="Vue Button"><span>ICON </span></Button>`
      - In `App.tsx`: `<Button label="React Button"><span>ICON </span></Button>`

- **Hiccup Check:**
  - Do both buttons now render with "ICON " before the label?

---

### 1.8: Routing Basics

- **Slide:** `D1-8-Routing.md`

- **🚨 Potential Hiccup \#3 (MAJOR):**
  - Your slide `D1-8-Routing.md` gives a _massive_ 6-step task for React (install router, create pages, create `router.tsx`, use `createBrowserRouter`, `lazy`, `Suspense`, replace `App.tsx`, replace `main.tsx`).
  - The Vue task is: "Add the /about route in `src/router/index.ts`."
  - This is a **severe pacing mismatch**. The Vue task will take 2 minutes. The React task, as written on the slide, will take students 30-40 minutes and introduces multiple complex concepts (lazy, Suspense) at once.

- **Recommended Action (Follow Facilitator Guide, NOT Slide):**
  Your `D1-Facilitator.md` has a much simpler (and better) task: "add a new `/about` route." Let's stick to that.
  1.  **Vue Task (Simple):**
      - Create `packages/vue-app/src/views/AboutView.vue` (just put `<h1>About Vue</h1>` in it).
      - Open `packages/vue-app/src/router/index.ts`.
      - Add the new route object (it's already scaffolded, just copy/paste the `home` route and modify).
      - Open `packages/vue-app/src/App.vue` and add `<RouterLink to="/about">About</RouterLink>` inside the `<nav>`.

  2.  **React Task (Simplified):**
      - `pnpm -F react-app add react-router-dom`
      - Create `packages/react-app/src/pages/Home.tsx` and `packages/react-app/src/pages/About.tsx`. Put H1s in them. (Move the counter logic from `App.tsx` to `Home.tsx`).
      - Create a layout component `packages/react-app/src/Layout.tsx`:

        ```tsx
        import { Link, Outlet } from 'react-router-dom'

        export function Layout() {
          return (
            <>
              <nav>
                <Link to="/">Home</Link> | <Link to="/about">About</Link>
              </nav>
              <hr />
              <main>
                <Outlet />
              </main>
            </>
          )
        }
        ```

      - Replace `packages/react-app/src/main.tsx` to set up the router:

        ```tsx
        import React from 'react'
        import ReactDOM from 'react-dom/client'
        import { createBrowserRouter, RouterProvider } from 'react-router-dom'
        import './index.css' // Your tailwind styles

        import { Layout } from './Layout'
        import { Home } from './pages/Home'
        import { About } from './pages/About'

        const router = createBrowserRouter([
          {
            path: '/',
            element: <Layout />,
            children: [
              { index: true, element: <Home /> },
              { path: 'about', element: <About /> },
            ],
          },
        ])

        ReactDOM.createRoot(document.getElementById('root')!).render(
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        )
        ```

      - Delete `App.tsx` and `App.css` (or move their contents).

- **Hiccup Check:**
  - This is _still_ a much bigger task for React. Be prepared to give Team React extra time here. This is the biggest bottleneck of Day 1.

---

### 1.9: Vue Local State

- **Slide:** `D1-9-VueState.md`
- **Your Action:**
  1.  Open `packages/vue-app/src/views/HomeView.vue`.
  2.  Implement the counter logic (you might have already done this in step 1.8):

      ```vue
      <script setup lang="ts">
      import { ref, computed } from 'vue' // <-- Add these
      import Button from '@/components/Button.vue'

      // --- Add this logic ---
      const count = ref(0)
      const double = computed(() => count.value * 2)
      const increment = () => count.value++
      const decrement = () => count.value--
      const reset = () => (count.value = 0)
      // ----------------------
      </script>
      <template>
        <main>
          <h2>Counter</h2>
          <p>Count: {{ count }}</p>
          <p>Double: {{ double }}</p>
          <Button label="Increment" @click="increment" />
          <Button label="Decrement" @click="decrement" />
          <Button label="Reset" @click="reset" />
        </main>
      </template>
      ```

- **Hiccup Check:**
  - Does the counter increment, decrement, and reset? Does the computed property update?

---

### 1.10: React Local State

- **Slide:** `D1-10-ReactState.md`
- **Your Action:**
  1.  Open `packages/react-app/src/pages/Home.tsx`.
  2.  Implement `useState` logic (already done in 1.8):

      ```tsx
      import { useState } from 'react'
      import { Button } from '../components/Button'

      export function Home() {
        const [count, setCount] = useState(0)
        const double = count * 2
        // ... functions: increment, decrement, reset ...
        return (
           // ... JSX for counter ...
        )
      }
      ```

  3.  Now, refactor it to `useReducer` as per the slide task:

      ```tsx
      import { useReducer } from 'react'
      import { Button } from '../components/Button'

      type State = { count: number }
      type Action = { type: 'INC' } | { type: 'DEC' } | { type: 'RESET' }

      const reducer = (state: State, action: Action) => {
        switch (action.type) {
          case 'INC':
            return { count: state.count + 1 }
          case 'DEC':
            return { count: state.count - 1 }
          case 'RESET':
            return { count: 0 }
          default:
            throw new Error('Unknown action')
        }
      }

      export function Home() {
        const [state, dispatch] = useReducer(reducer, { count: 0 })
        const double = state.count * 2

        return (
          <div>
            <h1>Home</h1>
            <h2>Counter (useReducer)</h2>
            <p>Count: {state.count}</p>
            <p>Double: {double}</p>
            <Button
              label="Increment"
              onClick={() => dispatch({ type: 'INC' })}
            />
            <Button
              label="Decrement"
              onClick={() => dispatch({ type: 'DEC' })}
            />
            <Button label="Reset" onClick={() => dispatch({ type: 'RESET' })} />
          </div>
        )
      }
      ```

- **Hiccup Check:**
  - Is 25 minutes enough time for students to learn and implement _both_ `useState` and `useReducer`? It's tight, but feasible. The reducer logic is the main new concept.

---

### 1.11: Shared State Teaser

- **Slide:** `D1-11-SharedState.md`

- **🚨 Potential Hiccup \#4 (Pacing):**
  - This is a full refactor to global state (Context and Pinia). 20 minutes is _extremely_ fast. This will likely be the module you have to rush or cut short.

- **Your Action (Vue):**
  1.  Open the scaffolded `packages/vue-app/src/stores/counter.ts`. It's already done\!
  2.  Create `packages/vue-app/src/components/DisplayCount.vue`:
      ```vue
      <script setup lang="ts">
      import { useCounterStore } from '@/stores/counter'
      const store = useCounterStore()
      </script>
      <template>
        <h3>Display from Store: {{ store.count }}</h3>
      </template>
      ```
  3.  Refactor `HomeView.vue` to use the store:

      ```vue
      <script setup lang="ts">
      import { useCounterStore } from '@/stores/counter' // <-- Import store
      import Button from '@/components/Button.vue'
      import DisplayCount from '@/components/DisplayCount.vue' // <-- Import display

      const store = useCounterStore() // <-- Use store
      // (delete local ref, computed, and functions)
      </script>
      <template>
        <main>
          <DisplayCount />
          <h2>Counter</h2>
          <p>Count: {{ store.count }}</p>
          <p>Double: {{ store.doubleCount }}</p>
          <Button label="Increment" @click="store.increment" />
        </main>
      </template>
      ```

- **Your Action (React):**
  1.  Create `packages/react-app/src/context/CounterContext.tsx`.
  2.  Move the `reducer` logic from `Home.tsx` into this file and create a `CounterProvider` and `useCounter` hook.
  3.  Wrap the app in `packages/react-app/src/main.tsx` with your `<CounterProvider>`.
  4.  Create `packages/react-app/src/components/DisplayCount.tsx`:
      ```tsx
      import { useCounter } from '../context/CounterContext'
      export function DisplayCount() {
        const { state } = useCounter()
        return <h3>Display from Context: {state.count}</h3>
      }
      ```
  5.  Refactor `Home.tsx` to use the `useCounter` hook instead of its local `useReducer`.
  6.  Add `<DisplayCount />` to `Home.tsx`.

- **Final Check:**
  - Do both apps now share state between the `Home` component and the `DisplayCount` component?
  - **Pacing Verdict:** The Vue task is _much_ faster (5-10 min) because Pinia was scaffolded. The React task (20-30 min) requires creating the Context, Provider, hook, and refactoring two components. **This is the second major pacing imbalance.** Be prepared to help Team React heavily.

---

# Cheatsheet:

## Code Snippets in order of lessons:

> Here are the final solution code snippets for each task in your Day 1 dry run. You can use this as a "copy/paste" reference to quickly build the solutions as you practice.

---

### 1.5: Vue SFC Basics

**File:** `packages/vue-app/src/components/Button.vue`

```vue
<script setup lang="ts">
defineProps<{ label: string }>()
const emit = defineEmits(['click'])
</script>

<template>
  <button @click="emit('click')">{{ label }}</button>
</template>
```

**File:** `packages/vue-app/src/views/HomeView.vue` (Usage)

```vue
<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import Button from '@/components/Button.vue' // <-- Add
</script>

<template>
  <main>
    <TheWelcome />

    <Button
      label="My Vue Button"
      @click="() => console.log('Vue Button Clicked!')"
    />
  </main>
</template>
```

---

### 1.6: React FC Basics

**File:** `packages/react-app/src/components/Button.tsx`

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

**File:** `packages/react-app/src/App.tsx` (Usage - simplified)

```tsx
import { Button } from './components/Button'
// Note: You can delete App.css if you want
// import './App.css'

function App() {
  return (
    <>
      <h1>React App</h1>
      <Button
        label="My React Button"
        onClick={() => console.log('React Button Clicked!')}
      />
    </>
  )
}

export default App
```

---

### 1.7: Slots vs. Children

**File:** `packages/vue-app/src/components/Button.vue` (Updated)

```vue
<script setup lang="ts">
defineProps<{ label: string }>()
const emit = defineEmits(['click'])
</script>

<template>
  <button @click="emit('click')"><slot /> {{ label }}</button>
</template>
```

**File:** `packages/react-app/src/components/Button.tsx` (Updated)

```tsx
import React from 'react'

interface ButtonProps {
  label: string
  onClick: () => void
  children?: React.ReactNode // <-- Add this
}

export function Button({ label, onClick, children }: ButtonProps) {
  // <-- Add 'children'
  return (
    <button onClick={onClick}>
      {children} {/* <-- Add this */}
      {label}
    </button>
  )
}
```

**File:** `packages/vue-app/src/views/HomeView.vue` (Updated Usage)

```vue
<Button label="Vue Button" @click="() => console.log('Vue Button Clicked!')">
  <span>ICON </span>
</Button>
```

**File:** `packages/react-app/src/App.tsx` (Updated Usage)

```tsx
<Button
  label="React Button"
  onClick={() => console.log('React Button Clicked!')}
>
  <span>ICON </span>
</Button>
```

---

### 1.8: Routing Basics

#### 🔵 Vue

**File:** `packages/vue-app/src/views/AboutView.vue` (New File)

```vue
<template>
  <div class="about">
    <h1>About Vue</h1>
  </div>
</template>
```

**File:** `packages/vue-app/src/router/index.ts` (Updated)

```ts
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'), // <-- This was already scaffolded!
    },
  ],
})

export default router
```

**File:** `packages/vue-app/src/App.vue` (Updated Nav)

```vue
<nav>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>
</nav>
```

---

#### ⚛️ React

**File:** `packages/react-app/src/pages/Home.tsx` (New File)

```tsx
import { Button } from '../components/Button'

export function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <Button
        label="React Button"
        onClick={() => console.log('React Button Clicked!')}
      >
        <span>ICON </span>
      </Button>
    </>
  )
}
```

**File:** `packages/react-app/src/pages/About.tsx` (New File)

```tsx
export function About() {
  return <h1>About React</h1>
}
```

**File:** `packages/react-app/src/Layout.tsx` (New File)

```tsx
import { Link, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <hr />
      <main>
        <Outlet />
      </main>
    </>
  )
}
```

**File:** `packages/react-app/src/main.tsx` (Full Replacement)

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import './index.css' // Your tailwind styles
// import './App.css' // You can delete this

import { Layout } from './Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
```

_(Remember to delete `App.tsx` and `App.css` after this)_

---

### 1.9: Vue Local State (Counter)

**File:** `packages/vue-app/src/views/HomeView.vue` (Updated)

```vue
<script setup lang="ts">
import { ref, computed } from 'vue' // <-- Add these
import Button from '@/components/Button.vue'

// --- Add this logic ---
const count = ref(0)
const double = computed(() => count.value * 2)
const increment = () => count.value++
const decrement = () => count.value--
const reset = () => (count.value = 0)
// ----------------------
</script>

<template>
  <main>
    <h1>Home Page</h1>

    <div style="margin-top: 2rem;">
      <h2>Counter (Local State)</h2>
      <p>Count: {{ count }}</p>
      <p>Double: {{ double }}</p>
      <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
        <Button label="Increment" @click="increment" />
        <Button label="Decrement" @click="decrement" />
        <Button label="Reset" @click="reset" />
      </div>
    </div>
  </main>
</template>
```

---

### 1.10: React Local State (Counter)

**File:** `packages/react-app/src/pages/Home.tsx` (Updated - with `useReducer`)

```tsx
import { useReducer } from 'react'
import { Button } from '../components/Button'

type State = { count: number }
type Action = { type: 'INC' } | { type: 'DEC' } | { type: 'RESET' }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INC':
      return { count: state.count + 1 }
    case 'DEC':
      return { count: state.count - 1 }
    case 'RESET':
      return { count: 0 }
    default:
      throw new Error('Unknown action')
  }
}

export function Home() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  const double = state.count * 2

  return (
    <div>
      <h1>Home</h1>
      <div style={{ marginTop: '2rem' }}>
        <h2>Counter (useReducer)</h2>
        <p>Count: {state.count}</p>
        <p>Double: {double}</p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <Button label="Increment" onClick={() => dispatch({ type: 'INC' })} />
          <Button label="Decrement" onClick={() => dispatch({ type: 'DEC' })} />
          <Button label="Reset" onClick={() => dispatch({ type: 'RESET' })} />
        </div>
      </div>
    </div>
  )
}
```

---

### 1.11: Shared State Teaser

#### 🔵 Vue (Pinia)

**File:** `packages/vue-app/src/stores/counter.ts` (This was scaffolded by `create-vue`)

```ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  function decrement() {
    count.value--
  }
  function reset() {
    count.value = 0
  }

  return { count, doubleCount, increment, decrement, reset }
})
```

**File:** `packages/vue-app/src/components/DisplayCount.vue` (New File)

```vue
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()
</script>

<template>
  <h3 style="padding: 1rem; border: 1px solid gray;">
    Display from Store: {{ store.count }}
  </h3>
</template>
```

**File:** `packages/vue-app/src/views/HomeView.vue` (Updated)

```vue
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter' // <-- Import store
import Button from '@/components/Button.vue'
import DisplayCount from '@/components/DisplayCount.vue' // <-- Import display

const store = useCounterStore() // <-- Use store
// (Local ref, computed, and functions are now deleted)
</script>

<template>
  <main>
    <h1>Home Page</h1>
    <DisplayCount /> {/* <-- Add this */}

    <div style="margin-top: 2rem;">
      <h2>Counter (Pinia Store)</h2>
      <p>Count: {{ store.count }}</p>
      <p>Double: {{ store.doubleCount }}</p>
      <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
        <Button label="Increment" @click="store.increment" />
        <Button label="Decrement" @click="store.decrement" />
        <Button label="Reset" @click="store.reset" />
      </div>
    </div>
  </main>
</template>
```

---

#### ⚛️ React (Context)

**File:** `packages/react-app/src/context/CounterContext.tsx` (New File)

```tsx
import React, {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
} from 'react'

// 1. Define State and Action types
type State = { count: number }
type Action = { type: 'INC' } | { type: 'DEC' } | { type: 'RESET' }

// 2. Define the Context shape
type CounterContextType = {
  state: State
  dispatch: Dispatch<Action>
}

// 3. Create the Context
const CounterContext = createContext<CounterContextType | undefined>(undefined)

// 4. Create the Reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INC':
      return { count: state.count + 1 }
    case 'DEC':
      return { count: state.count - 1 }
    case 'RESET':
      return { count: 0 }
    default:
      throw new Error('Unknown action')
  }
}

// 5. Create the Provider Component
type ProviderProps = { children: React.ReactNode }

export function CounterProvider({ children }: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  // Memoize the value to prevent unnecessary re-renders
  const value = React.useMemo(() => ({ state, dispatch }), [state])

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  )
}

// 6. Create the custom hook
export function useCounter() {
  const context = useContext(CounterContext)
  if (context === undefined) {
    throw new Error('useCounter must be used within a CounterProvider')
  }
  return context
}
```

**File:** `packages/react-app/src/components/DisplayCount.tsx` (New File)

```tsx
import { useCounter } from '../context/CounterContext'

export function DisplayCount() {
  const { state } = useCounter()
  return (
    <h3 style={{ padding: '1rem', border: '1px solid gray' }}>
      Display from Context: {state.count}
    </h3>
  )
}
```

**File:** `packages/react-app/src/main.tsx` (Updated - wrap with Provider)

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CounterProvider } from './context/CounterContext' // <-- Import

import { Layout } from './Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CounterProvider>
      {' '}
      {/* <-- Add Provider here */}
      <RouterProvider router={router} />
    </CounterProvider>
  </React.StrictMode>
)
```

**File:** `packages/react-app/src/pages/Home.tsx` (Updated - use Context)

```tsx
import { Button } from '../components/Button'
import { useCounter } from '../context/CounterContext' // <-- Import hook
import { DisplayCount } from '../components/DisplayCount' // <-- Import display

export function Home() {
  const { state, dispatch } = useCounter() // <-- Use hook
  // (Local useReducer is now deleted)

  const double = state.count * 2

  return (
    <div>
      <h1>Home</h1>
      <DisplayCount /> {/* <-- Add this */}
      <div style={{ marginTop: '2rem' }}>
        <h2>Counter (Context)</h2>
        <p>Count: {state.count}</p>
        <p>Double: {double}</p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <Button label="Increment" onClick={() => dispatch({ type: 'INC' })} />
          <Button label="Decrement" onClick={() => dispatch({ type: 'DEC' })} />
          <Button label="Reset" onClick={() => dispatch({ type: 'RESET' })} />
        </div>
      </div>
    </div>
  )
}
```
