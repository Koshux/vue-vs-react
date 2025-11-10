## 🚀 Facilitator's Dry Run Plan: Day 2

### 0\. 🧹 Initial Setup (Simulating Your "Tomorrow")

1.  **Get Day 1 Solution:** Check out your branch from the Day 1 dry-run.

    ```bash
    # Get the code you just finished
    git checkout facilitator/day-1-dry-run

    # Create the new branch for this session
    git checkout -b facilitator/day-2-dry-run
    ```

2.  **Verify Setup:**

    ```bash
    # Install any missed deps (good practice)
    pnpm install

    # Run all 3 apps
    pnpm dev
    ```

3.  **Open Your Tools:** Get your presentation, `D2-Facilitator.md`, and this guide open.

### 🗣️ The "Big Pivot" (Your New Intro)

- **Hiccup:** Your students are haven't touched global state.
- **Your Action:** You _must_ address this.
  - **"We Do" Recap:** Start Day 2 with a 15-minute "I Do / We Do" session.
  - **Your Script:** "Yesterday was fantastic\! We got our apps built, created components, and got basic routing working. Because we spent so much time on those fundamentals, we're moving the 'Shared State' module to today. We will do it together, quickly, so we can get to the main event: building our Task Tracker app."
  - **Action:** Rapid-fire implement **Task 1.11 (Shared State)** from the Day 1 plan. Have the students follow along, but don't stop for small bugs. This gets Pinia and Context into their heads. (5 mins for Vue, 10 for React).
  - **Then, immediately pivot:** "Great\! Now you've seen the _concept_. Let's delete that 'counter' and build our _real_ app state."

---

### 2.1: Advanced Routing

- **Slide:** `D2-1-Routing.md`
- **Your Action (Vue):**
  1.  Open `packages/vue-app/src/router/index.ts`.
  2.  Add the `router.beforeEach` guard _after_ the `createRouter` call.
- **Your Action (React):**
  1.  Open `packages/react-app/src/main.tsx`.
  2.  Add the `loader` property to your `/about` route.
  3.  Open `packages/react-app/src/pages/About.tsx`.
  4.  Replace the static `<h1>` with `useLoaderData()`.
- **🚨 Potential Hiccup:**
  - This is the first time students will see a `loader`. They will be confused about where the data comes from.
  - **Your Fix:** Emphasize: "The 'loader' is a function that runs _before_ your component even renders. React Router handles the `fetch` and _gives_ you the data. Notice: no `useState`, no `useEffect`, no `setLoading`\!"

---

#### 💻 Code Snippets: 2.1

**File:** `packages/vue-app/src/router/index.ts` (Add at the bottom)

```ts
// ... after createRouter({...})

router.beforeEach((to, from) => {
  console.log('Vue Router Guard: Navigating from', from.path, 'to', to.path)
  // This is where you would check for auth
  // if (to.name !== 'login' && !isAuthenticated) return '/login'
})

export default router
```

**File:** `packages/react-app/src/main.tsx` (Updated route)

```tsx
// ... imports
import { About } from './pages/About'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'about',
        element: <About />,
        loader: async () => {
          // <-- Add this loader
          console.log('React Router Loader: Fetching data...')
          return { message: 'Hello from the loader!' }
        },
      },
    ],
  },
])
// ... rest of file
```

**File:** `packages/react-app/src/pages/About.tsx` (Updated)

```tsx
import { useLoaderData } from 'react-router-dom'

// Define the type of data we expect from the loader
type LoaderData = {
  message: string
}

export function About() {
  const data = useLoaderData() as LoaderData // <-- Get data from loader

  return (
    <div>
      <h1>About React</h1>
      <p>
        Data from loader: <strong>{data.message}</strong>
      </p>
    </div>
  )
}
```

---

### 2.2: Basic Data Fetching

- **Slide:** `D2-2-DataFetching.md`
- **Your Action (Vue):**
  1.  Open `packages/vue-app/src/views/AboutView.vue`.
  2.  Add the `<script setup>`, import `ref` and `onMounted`, and write the local fetch logic.
  3.  Add template logic to show "Loading...", the error, or the Pokémon name.
- **Your Action (React):**
  1.  **Crucial:** Do _not_ use `About.tsx` (it has a loader). Use `packages/react-app/src/pages/Home.tsx` as your "sandbox" for this task, just as your facilitator guide suggests.
  2.  Open `Home.tsx` and add the `useState`, `useEffect` fetch logic.
  3.  Add template logic to show "Loading...", the error, or the Pokémon name.
- **🚨 Potential Hiccup:**
  - **React:** Students will _definitely_ forget the `useEffect` dependency array (`[]`) and create an infinite loop.
  - **Your Fix:** Let them. Wait for someone's fan to spin up, then make it a teaching moment. "Who just created an infinite loop? You forgot the empty array\! `useEffect` runs _after every render_. By setting state, you cause a re-render, which runs `useEffect`... forever. The `[]` tells React: 'Only run this once on mount'."

---

#### 💻 Code Snippets: 2.2

**File:** `packages/vue-app/src/views/AboutView.vue` (Updated)

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const data = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    loading.value = true
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
    if (!res.ok) throw new Error('Network error')
    data.value = await res.json()
  } catch (e: any) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="about">
    <h1>About Vue</h1>

    <div style="margin-top: 2rem; border: 1px solid gray; padding: 1rem;">
      <h2>Local Fetch (onMounted)</h2>
      <p v-if="loading">Loading Pokémon...</p>
      <p v-else-if="error" style="color: red;">{{ error }}</p>
      <p v-else-if="data">
        Fetched: <strong>{{ data.name }}</strong>
      </p>
    </div>
  </div>
</template>
```

**File:** `packages/react-app/src/pages/Home.tsx` (Updated)

```tsx
// ... (keep useCounter, DisplayCount, etc. from Day 1)
import { useState, useEffect } from 'react' // <-- Add imports

export function Home() {
  const { state, dispatch } = useCounter()
  const double = state.count * 2

  // --- Add this logic ---
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
        if (!res.ok) throw new Error('Network error')
        setData(await res.json())
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, []) // <-- CRUCIAL empty dependency array
  // ----------------------

  return (
    <div>
      <h1>Home</h1>
      <DisplayCount />
      {/* ... counter JSX ... */}

      <div
        style={{ marginTop: '2rem', border: '1px solid gray', padding: '1rem' }}
      >
        <h2>Local Fetch (useEffect)</h2>
        {loading && <p>Loading Pokémon...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {data && (
          <p>
            Fetched: <strong>{data.name}</strong>
          </p>
        )}
      </div>
    </div>
  )
}
```

---

### 2.3: Global State Management

- **Slide:** `D2-3-AdvancedState.md`
- **This is the REAL workshop.** You must now build the _entire_ Task Tracker state. This is a 75+ minute "We Do" session.
- **Your Action (Both Teams):**
  1.  **Cleanup:** Delete the "counter" files:
      - Vue: `stores/counter.ts`, `components/DisplayCount.vue`. Remove counter from `HomeView.vue`.
      - React: `context/CounterContext.tsx`, `components/DisplayCount.tsx`. Remove counter from `Home.tsx`. Remove `<CounterProvider>` from `main.tsx`.
  2.  **Install:** `pnpm -F vue-app add axios` and `pnpm -F react-app add axios`. (You already did this, but double-check).
  3.  **Build Tasks State:** Create `stores/tasks.ts` (Vue) and `features/tasks/tasksSlice.ts` (React).
  4.  **Build Users State:** Create `stores/users.ts` (Vue) and `features/users/usersSlice.ts` (React). This includes the `fetchUsers` / `createAsyncThunk` logic.
  5.  **Build Views:** Create the `Assignees` and `Tasks` views for both apps.
  6.  **Wire Up State:**
      - Vue: `app.use(createPinia())` in `main.ts`.
      - React: `configureStore` in `store/index.ts` and wrap `main.tsx` in `<Provider>`.
  7.  **Add Persistence:**
      - Vue: Create `plugins/persist.ts` and use it in `main.ts`.
      - React: Create `store/persist.ts` and use it in `store/index.ts`.
- **🚨 Potential Hiccup:**
  - This is an _enormous_ amount of code. You cannot have students type this.
  - **Your Fix:** Have this code ready in snippets. Use a "we-do" approach: "First, let's create our tasks store. Here's the code, paste it in, and let's walk through what `defineStore` is doing." Then: "Now for React. Here's the `createSlice` version. Let's compare the `reducers` object to Pinia's `functions`."
  - **The `createAsyncThunk` vs. `async function` is the KEY comparison.** Spend time here.

---

#### 💻 Code Snippets: 2.3 (This is the full app state)

#### 🔵 Vue: New Files

**File:** `packages/vue-app/src/stores/tasks.ts`

```ts
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type Task = {
  id: string
  title: string
  done: boolean
  assigneeId?: number | null
}
export type Filter = 'all' | 'active' | 'done'

export const useTasks = defineStore('tasks', () => {
  const items = ref<Task[]>([])
  const currentFilter = ref<Filter>('all')

  function add(title: string) {
    items.value.push({
      id: crypto.randomUUID(),
      title,
      done: false,
      assigneeId: null,
    })
  }

  function assign(id: string, userId: number | null) {
    const task = items.value.find((x) => x.id === id)
    if (task) task.assigneeId = userId
  }

  function toggle(id: string | undefined) {
    const task = items.value.find((item) => item.id === id)
    if (task) task.done = !task.done
  }

  function setFilter(filter: Filter) {
    currentFilter.value = filter
  }

  const filteredItems = computed<Task[]>(() => {
    return currentFilter.value === 'all'
      ? items.value
      : items.value.filter((item) => {
          return currentFilter.value === 'done' ? item.done : !item.done
        })
  })

  const isAll = computed(() => currentFilter.value === 'all')
  const isActive = computed(() => currentFilter.value === 'active')
  const isDone = computed(() => currentFilter.value === 'done')

  return {
    items,
    currentFilter,
    add,
    toggle,
    assign,
    setFilter,
    filteredItems,
    isAll,
    isActive,
    isDone,
  }
})
```

**File:** `packages/vue-app/src/stores/users.ts`

```ts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export type User = {
  id: number
  name: string
}

export const useUsers = defineStore('users', () => {
  const list = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>('')
  const loaded = ref<boolean>(false)

  async function fetchUsers(force = false) {
    if (loaded.value && !force) return
    loading.value = true
    error.value = null

    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users')
      if (res.status !== 200) throw new Error(`HTTP ${res.status}`)
      const data = res.data as User[]
      list.value = data.map((user) => ({ id: user.id, name: user.name }))
      loaded.value = true
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to load users'
    } finally {
      loading.value = false
    }
  }

  function byId(id?: number | null) {
    return id == null ? undefined : list.value.find((user) => user.id === id)
  }

  return { list, loading, error, loaded, fetchUsers, byId }
})
```

**File:** `packages/vue-app/src/plugins/persist.ts` (For Persistence)

```ts
import type { PiniaPluginContext } from 'pinia'

type PersistOptions = {
  key?: string
  paths?: string[]
  version?: number
}

export function createPersistPlugin(opts: PersistOptions = {}) {
  const version = opts?.version ?? 1

  return ({ store }: PiniaPluginContext) => {
    const persistKey = (opts?.key ?? `pinia-${store.$id}`) + `@v${version}`

    try {
      const raw = localStorage.getItem(persistKey)
      if (raw) {
        const saved = JSON.parse(raw)
        const patch: Partial<typeof store.$state> = {}
        const keys = (opts.paths ?? []) as (keyof typeof store.$state)[]

        for (const k of keys) {
          if (k in saved) {
            patch[k] = (saved as Partial<typeof store.$state>)[k]
          }
        }
        store.$patch(patch)
      }
    } catch (e) {
      console.warn('[persist] restore failed:', e)
    }

    store.$subscribe((_mutation, state) => {
      try {
        const toSave = (opts.paths ?? []).reduce<Record<string, unknown>>(
          (acc, k) => {
            acc[k] = state[k]
            return acc
          },
          {}
        )
        localStorage.setItem(persistKey, JSON.stringify(toSave))
      } catch (e) {
        console.warn('[persist] save failed', e)
      }
    })
  }
}
```

**File:** `packages/vue-app/src/main.ts` (Updated)

```ts
import './assets/main.css' // <-- Keep this
// import './assets/tailwind.css' // <-- You will add this in 2.4

import { createApp } from 'vue'
import { createPinia } from 'pinia' // <-- Import
import App from './App.vue'
import router from './router'
import { createPersistPlugin } from './plugins/persist' // <-- Import

const app = createApp(App)
const pinia = createPinia() // <-- Create

pinia.use(
  // <-- Use plugin
  createPersistPlugin({
    paths: ['items', 'currentFilter'], // Persist only these keys from tasks store
    version: 2,
  })
)

app.use(pinia) // <-- Use Pinia
app.use(router)
app.mount('#app')
```

---

#### ⚛️ React: New Files

**File:** `packages/react-app/src/features/tasks/tasksSlice.ts`

```ts
import {
  createSlice,
  type PayloadAction,
  createSelector,
} from '@reduxjs/toolkit'
import type { RootState } from '../../store'

export type Task = {
  id: string
  title: string
  done: boolean
  assigneeId?: number | null
}
export type Filter = 'all' | 'active' | 'done'
type TasksState = {
  items: Task[]
  currentFilter: Filter
}
const initialState: TasksState = {
  items: [],
  currentFilter: 'all',
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    add(state, action: PayloadAction<string>) {
      state.items.push({
        id: crypto.randomUUID(),
        title: action.payload,
        done: false,
        assigneeId: null,
      })
    },
    toggle(state, action: PayloadAction<string | undefined>) {
      const t = state.items.find((i) => i.id === action.payload)
      if (t) t.done = !t.done
    },
    assign(
      state,
      action: PayloadAction<{ id: string; userId: number | null }>
    ) {
      const t = state.items.find((i) => i.id === action.payload.id)
      if (t) t.assigneeId = action.payload.userId
    },
    setFilter(state, action: PayloadAction<Filter>) {
      state.currentFilter = action.payload
    },
  },
})

export const { add, toggle, assign, setFilter } = tasksSlice.actions
export default tasksSlice.reducer

// Selectors
export const selectTasks = (s: RootState) => s.tasks.items
export const selectFilter = (s: RootState) => s.tasks.currentFilter
export const selectFiltered = createSelector(
  [selectTasks, selectFilter],
  (items, filter) => {
    if (filter === 'all') return items
    return items.filter((t) => (filter === 'done' ? t.done : !t.done))
  }
)
export const selectIsAll = (s: RootState) => s.tasks.currentFilter === 'all'
export const selectIsActive = (s: RootState) =>
  s.tasks.currentFilter === 'active'
export const selectIsDone = (s: RootState) => s.tasks.currentFilter === 'done'
```

**File:** `packages/react-app/src/features/users/usersSlice.ts`

```ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from 'axios'

export type User = { id: number; name: string }
type UsersState = {
  list: User[]
  loading: boolean
  error: string | null
  loaded: boolean
}
const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
  loaded: false,
}

export const fetchUsers = createAsyncThunk<
  User[],
  { force?: boolean },
  { state: RootState }
>(
  'users/fetch',
  async (_, { getState }) => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`)
    const data = res.data as User[]
    return data.map((u) => ({ id: u.id, name: u.name }))
  },
  {
    condition: (arg, { getState }) => {
      const { loaded, loading } = getState().users
      if (loading) return false
      if (loaded && !arg?.force) return false
      return true
    },
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.list = payload
        state.loaded = true
        state.loading = false
      })
      .addCase(fetchUsers.rejected, (state, { error }) => {
        state.error = error.message || 'Failed to load users'
        state.loading = false
      })
  },
})

export default usersSlice.reducer
export const selectUsers = (s: RootState) => s.users.list
export const selectUsersLoading = (s: RootState) => s.users.loading
export const selectUsersLoaded = (s: RootState) => s.users.loaded
export const selectUsersError = (s: RootState) => s.users.error
export const userById = (id?: number | null) => (s: RootState) => {
  return id == null ? undefined : s?.users?.list.find((u) => u.id === id)
}
```

**File:** `packages/react-app/src/store/hooks.ts`

```ts
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'
import type { RootState, AppDispatch } from './index'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

**File:** `packages/react-app/src/store/persist.ts` (For Persistence)

```ts
type PersistCfg = { key?: string; version?: number; paths?: string[] }

export function createPersistor<T extends object>(cfg: PersistCfg = {}) {
  const version = cfg.version ?? 1
  const key = (cfg.key ?? 'redux-root') + `@v${version}`

  function load(): Partial<T> | undefined {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return
      const parsed = JSON.parse(raw) as Record<string, unknown>
      if (cfg.paths?.length) {
        const subset: Record<string, unknown> = {}
        for (const k of cfg.paths) if (k in parsed) subset[k] = parsed[k]
        return subset as Partial<T>
      }
      return parsed as Partial<T>
    } catch {
      return
    }
  }

  function save(state: T) {
    try {
      const toSave = cfg.paths?.length
        ? cfg.paths.reduce<Record<string, unknown>>((acc, k) => {
            acc[k] = (state as any)[k]
            return acc
          }, {})
        : state
      localStorage.setItem(key, JSON.stringify(toSave))
    } catch {}
  }
  return { load, save }
}
```

**File:** `packages/react-app/src/store/index.ts`

```ts
import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../features/tasks/tasksSlice'
import usersReducer from '../features/users/usersSlice'
import { createPersistor } from './persist'

const persistor = createPersistor<{
  tasks: { items: unknown; currentFilter: unknown }
}>({
  key: 'redux-react-app',
  version: 2,
  paths: ['tasks'],
})

const preloaded = persistor.load()

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
  },
  preloadedState: preloaded as any,
})

store.subscribe(() => {
  const s = store.getState()
  const minimal = {
    tasks: {
      items: s.tasks.items,
      currentFilter: s.tasks.currentFilter,
    },
  }
  persistor.save(minimal as any)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

**File:** `packages/react-app/src/main.tsx` (Updated to use Provider)

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux' // <-- Import
import { store } from './store' // <-- Import

import { Layout } from './Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
// Add these new pages
import AssigneesView from './views/AssigneesView'
import TasksView from './views/TasksView'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <h1>Error!</h1>, // <-- Good to add an ErrorBoundary
    children: [
      { index: true, element: <Home /> },
      {
        path: 'about',
        element: <About />,
        loader: async () => ({ message: 'Hello!' }),
      },
      { path: 'assignees', element: <AssigneesView /> }, // <-- Add
      { path: 'tasks', element: <TasksView /> }, // <-- Add
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {' '}
      {/* <-- Wrap app in Provider */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
```

**File:** `packages/react-app/src/Layout.tsx` (Updated Nav)

```tsx
// ...
<nav style={{ display: 'flex', gap: '1rem' }}>
  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
  <Link to="/assignees">Assignees</Link> {/* <-- Add */}
  <Link to="/tasks">Tasks</Link> {/* <-- Add */}
</nav>
// ...
```

---

### 2.4: Theming & UI Libraries

- **Slide:** `D2-4-Theming.md`
- **Your Action (Vue):**
  1.  `pnpm -F vue-app add vuetify`
  2.  `pnpm -F vue-app add -D tailwindcss postcss autoprefixer` (if not already added)
  3.  Run `pnpm -F vue-app dlx tailwindcss init -p` to create `tailwind.config.js` and `postcss.config.js`.
  4.  Create `packages/vue-app/src/assets/tailwind.css` and import it in `main.ts`.
  5.  Create `plugins/vuetify.ts`.
  6.  Update `main.ts` to `app.use(vuetify)`.
  7.  Configure `tailwind.config.js` to read Vuetify theme colors.
- **Your Action (React):**
  1.  `pnpm -F react-app add @mui/material @emotion/react @emotion/styled`
  2.  `pnpm -F react-app add -D tailwindcss postcss autoprefixer` (if not already added)
  3.  Run `pnpm -F react-app dlx tailwindcss init -p`.
  4.  Create `packages/react-app/src/assets/tailwind.css` and import it in `main.tsx`.
  5.  Create `theme.tsx` and `components/ThemeToggle.tsx`.
  6.  Update `main.tsx` to wrap the app in your new `<AppThemeProvider>`.
  7.  Configure `tailwind.config.js` to read MUI theme colors (via CSS variables).
- **🚨 Potential Hiccup:**
  - This is the _other_ giant hurdle. The setup for Tailwind + UI lib is complex.
  - **The React Theme Bug:** You already fixed this, but make sure your `theme.tsx` snippet _includes_ the fix (`useMemo` with `[mode]` dependency).
  - **Styling:** Students will be confused about _when_ to use `<VBtn>` vs. `<button class="...">`.
  - **Your Fix:** Explain the "Hybrid" approach: "We use the UI library for _complex components_ (like buttons, menus, and data tables) to get accessibility and logic for free. We use Tailwind for _layout and spacing_ (like `flex`, `p-4`, `max-w-xl`)."

---

#### 💻 Code Snippets: 2.4

#### 🔵 Vue: Config Files

**File:** `packages/vue-app/src/assets/tailwind.css` (New File)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Add a simple 'card' utility class */
@layer components {
  .card {
    @apply rounded-xl border bg-surface p-4 shadow-soft dark:border-gray-700;
  }
}
```

**File:** `packages/vue-app/src/plugins/vuetify.ts` (New File)

```ts
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

// This setup configures Vuetify's theme to use the *exact*
// color values we will also give to Tailwind.
export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light', // Set in <html> by ThemeToggle.vue
    themes: {
      light: {
        colors: {
          primary: '#4f46e5',
          surface: '#ffffff',
          'on-surface': '#0b1220',
        },
      },
      dark: {
        colors: {
          primary: '#818cf8',
          surface: '#0f172a',
          'on-surface': '#e5e7eb',
        },
      },
    },
  },
})
```

**File:** `packages/vue-app/tailwind.config.js` (New File)

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <-- Required
  content: ['./index.html', './src/**/*.{vue,ts,js,tsx,jsx}'],
  theme: {
    extend: {
      colors: {
        // Teach Tailwind to read Vuetify's CSS variables
        primary: 'rgb(var(--v-theme-primary))',
        surface: 'rgb(var(--v-theme-surface))',
        'on-surface': 'rgb(var(--v-theme-on-surface))',
      },
      borderRadius: {
        xl: '0.75rem', // Custom token
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0, 0, 0, 0.12)', // Custom token
      },
    },
  },
  plugins: [],
}
```

**File:** `packages/vue-app/src/main.ts` (Updated)

```ts
import './assets/tailwind.css' // <-- Add this
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createPersistPlugin } from './plugins/persist'
import { vuetify } from './plugins/vuetify' // <-- Import

const app = createApp(App)
const pinia = createPinia()
pinia.use(
  createPersistPlugin({
    paths: ['items', 'currentFilter'],
    version: 2,
  })
)

app.use(pinia)
app.use(router)
app.use(vuetify) // <-- Use Vuetify
app.mount('#app')
```

---

#### ⚛️ React: Config Files

**File:** `packages/react-app/src/assets/tailwind.css` (New File)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Define CSS variables for our theme */
:root {
  --color-primary: 79 70 229; /* #4f46e5 */
  --color-surface: 255 255 255; /* #ffffff */
  --color-on-surface: 11 18 32; /* #0b1220 */
  --radius-xl: 0.75rem;
  --shadow-soft: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.dark {
  --color-primary: 129 140 248; /* #818cf8 */
  --color-surface: 15 23 42; /* #0f172a */
  --color-on-surface: 229 231 235; /* #e5e7eb */
}

/* Add a simple 'card' utility class */
@layer components {
  .card {
    @apply rounded-xl border bg-surface p-4 shadow-soft dark:border-gray-700;
  }
}
```

**File:** `packages/react-app/tailwind.config.js` (New File)

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <-- Required
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Teach Tailwind to read our CSS variables
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'on-surface': 'rgb(var(--color-on-surface) / <alpha-value>)',
      },
      borderRadius: {
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
      },
    },
  },
  plugins: [],
}
```

**File:** `packages/react-app/src/theme.tsx` (New File - **This is the fixed version**)

```tsx
import React, { createContext, useMemo, useState, useContext } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

type Mode = 'light' | 'dark'
type ThemeContextType = {
  mode: Mode
  toggleMode: () => void
}

// 1. Create the Context
const ThemeToggleContext = createContext<ThemeContextType | undefined>(
  undefined
)

// 2. Create the Provider
export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>('light')

  // This is the function we'll pass down to toggle
  const toggleMode = React.useCallback(() => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light'
      document.documentElement.classList.toggle('dark', next === 'dark')
      return next
    })
  }, [])

  // Create the MUI theme based on the current mode
  // THIS IS THE BUG FIX: [mode] is in the dependency array
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode, // <-- This tells MUI to use light or dark
        ...(mode === 'light'
          ? {
              primary: { main: 'rgb(var(--color-primary))' },
              background: { default: 'rgb(var(--color-surface))' },
            }
          : {
              primary: { main: 'rgb(var(--color-primary))' },
              background: { default: 'rgb(var(--color-surface))' },
            }),
      },
    })
  }, [mode]) // <-- [mode] dependency is CRITICAL

  // THIS IS THE BUG FIX: { mode, toggleMode } is passed in the value
  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode])

  return (
    <ThemeToggleContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Normalizes styles */}
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  )
}

// 3. Create the custom hook
export const useThemeToggle = () => {
  const context = useContext(ThemeToggleContext)
  if (!context) {
    throw new Error('useThemeToggle must be used within an AppThemeProvider')
  }
  return context
}
```

**File:** `packages/react-app/src/main.tsx` (Updated - wrap in Theme Provider)

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { router } from './router' // <-- We will create this
import { AppThemeProvider } from './theme' // <-- Import
import './assets/tailwind.css' // <-- Import

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppThemeProvider>
        {' '}
        {/* <-- Wrap app */}
        <RouterProvider router={router} />
      </AppThemeProvider>
    </Provider>
  </React.StrictMode>
)
```

_(Note: I moved the `router` definition to its own file, `router.tsx`, to clean up `main.tsx`. You should do the same.)_

**File:** `packages/react-app/src/router.tsx` (New File - refactored from `main.tsx`)

```tsx
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './Layout'
import { Home } from './pages/Home'
import { About } from './pages/About'
import AssigneesView from './views/AssigneesView'
import TasksView from './views/TasksView'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <h1>Error!</h1>,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'about',
        element: <About />,
        loader: async () => ({ message: 'Hello!' }),
      },
      { path: 'assignees', element: <AssigneesView /> },
      { path: 'tasks', element: <TasksView /> },
    ],
  },
])
```

**File:** `packages/react-app/src/Layout.tsx` (Updated - Add ThemeToggle)

```tsx
import { Link, Outlet } from 'react-router-dom'
import { ThemeToggle } from './components/ThemeToggle' // <-- Import

export function Layout() {
  return (
    <>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/assignees">Assignees</Link>
        <Link to="/tasks">Tasks</Link>
        <div style={{ marginLeft: 'auto' }}>
          <ThemeToggle /> {/* <-- Add */}
        </div>
      </nav>
      <hr />
      <main>
        <Outlet />
      </main>
    </>
  )
}
```
