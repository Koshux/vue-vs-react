## 🚀 Facilitator's Dry Run Plan: Day 3 (Simplified)

### 0\. 🧹 Initial Setup (Simulating Your "Tomorrow")

1.  **Get Day 2 Solution:** Check out the branch that represents the _end state_ of your Day 2 workshop (with local fetch and `useReducer`).
    ```bash
    git checkout <your-end-of-day-2-branch>
    git checkout -b facilitator/day-3-dry-run
    ```
2.  **Verify Setup:**
    ```bash
    pnpm install
    pnpm dev
    ```
3.  **Open Your Tools:** Have your presentation, `D2-Facilitator.md` / `D3-Facilitator.md`, and this guide open.

---

### Module 1: Recap & The "Why" (30 Mins)

- **Slide:** A recap slide, then `D2-3-AdvancedState.md` (for the diagram).
- **"I Do" (Recap):**
  1.  Open the `react-app` code. Show them `pages/Home.tsx` (or wherever your `useReducer` counter is).
  2.  Show them `pages/About.tsx` (or wherever your `useEffect`/`fetch` logic is).
- **The Pivot (Your Script):**
  - "Yesterday, we did an amazing job. We built this counter using `useReducer`... but this state is **trapped** inside the `Home` component."
  - "We also fetched this list of Pokémon... but this data is **trapped** inside the `About` component."
  - "**This is the core problem:** What if our `Navbar` needs to show the count? What if the `Home` page needs the Pokémon list? We can't do it. The state is _local_."
  - "Today, we are going to solve this by moving our state into a **global store**. A single source of truth for the entire application."
- **The Analogies:**
  - "For Vue, we'll use **Pinia**. Pinia is like a **public whiteboard**. Any component can walk up, read the board, or grab a marker and write on it. It's simple, direct, and easy."
  - "For React, we'll use **Redux Toolkit**. Redux is like a **high-security bank**. You are _not_ allowed to just walk in and change the money. You must fill out a specific **form** (an `action`) and give it to the **teller** (the `reducer`), who is the only one with the key to the vault (`state`). It's more work, but it's _extremely_ safe and leaves a perfect paper trail."

---

### Module 2: The Core Lesson - Global State (90 Mins)

- **Goal:** Compare Pinia's `async/sync` model to RTK's `createAsyncThunk/reducer` model.
- **Task:** "We will build _one_ store per app: a `tasksStore`. This store will do two jobs: 1. **Fetch** a list of tasks from a public API. 2. **Toggle** a task's status. This will teach us _both_ async and sync state in one go."

#### 🔵 Vue (Pinia) "We Do" (30 mins)

1.  **Install:**

    ```bash
    pnpm -F vue-app add pinia axios
    ```

2.  **Create the Store:**
    - **Action:** Create `packages/vue-app/src/stores/tasks.ts`.
    - **Analogy:** "This is our 'Whiteboard'. We'll have our `items` list. We'll write an `async function` (`fetchTasks`) to go 'order the pizza' and a simple `function` (`toggle`) to edit the list directly."
    - **Paste Snippet 2.1 (Vue Store)**

3.  **Wire up the App:**
    - **Action:** Open `packages/vue-app/src/main.ts`.
    - **Paste Snippet 2.2 (Vue `main.ts`)**

4.  **Create the View:**
    - **Action:** Create `packages/vue-app/src/views/TasksView.vue`.
    - **Paste Snippet 2.3 (Vue View)**
    - **Action:** Add the route to `packages/vue-app/src/router/index.ts` and the `<RouterLink>` to `App.vue`.

5.  **Test:** Go to `/tasks` in the Vue app. The list should load. Clicking the checkbox should toggle the line-through.

#### ⚛️ React (RTK) "We Do" (45 mins)

1.  **Install:**
    ```bash
    pnpm -F react-app add @reduxjs/toolkit react-redux axios
    ```
2.  **Create the Store:**
    - **Action:** Create `packages/react-app/src/features/tasks/tasksSlice.ts`.
    - **Analogy:** "This is our 'Bank'. It's more code, but it's very organized. `createAsyncThunk` is our 'Personal Assistant' for fetching. `toggle` is our simple 'Bank Form'. And `extraReducers` is the 'Instruction Manual' we give our assistant."
    - **Paste Snippet 2.4 (React Slice)**
3.  **Wire up the App:**
    - **Action:** Create `packages/react-app/src/store/index.ts`.
    - **Paste Snippet 2.5 (React Store)**
    - **Action:** Create `packages/react-app/src/store/hooks.ts`.
    - **Paste Snippet 2.6 (React Hooks)**
    - **Action:** Open `packages/react-app/src/main.tsx` and wrap the app in the `<Provider>`.
    - **Paste Snippet 2.7 (React `main.tsx`)**
4.  **Create the View:**
    - **Action:** Create `packages/react-app/src/views/TasksView.tsx`.
    - **Paste Snippet 2.8 (React View)**
    - **Action:** Add the route to `router.tsx` (or `main.tsx`) and the `<Link>` to `Layout.tsx`.
5.  **Test:** Go to `/tasks` in the React app. The list should load and toggle.

<!-- end list -->

- **Hiccup Check:** This is 90 minutes of focused "paste and explain." The key is your analogies. Don't let them type. Make them _read_ the code you pasted and _compare_ the two files side-by-side.

---

### Module 3: UI Library Integration (90 Mins)

- **Goal:** Show how to add a UI library and create a wrapper component.
- **Task:** "Our app works, but it's ugly. Let's add Vuetify and MUI and create our own custom, reusable button that uses the library _inside_."

#### 🔵 Vue (Vuetify) "We Do" (40 mins)

1.  **Install:**
    ```bash
    pnpm -F vue-app add vuetify
    ```
2.  **Set up Theme:**
    - **Action:** Create `packages/vue-app/src/plugins/vuetify.ts`.
    - **Paste Snippet 3.1 (Vuetify Plugin)**
3.  **Wire up the App:**
    - **Action:** Open `packages/vue-app/src/main.ts` and add `app.use(vuetify)`.
    - **Paste Snippet 3.2 (Vue `main.ts` updated)**
4.  **Create Wrapper Component:**
    - **Analogy:** "We _could_ use `<VBtn>` everywhere. But what if we want all our app's buttons to be `rounded-xl`? We create a _wrapper_. Our `MyButton` component will render a `<VBtn>` _inside_ it."
    - **Action:** Create `packages/vue-app/src/components/MyButton.vue`.
    - **Paste Snippet 3.3 (Vue Wrapper)**
5.  **"You Do" (The Payoff):**
    - **Task:** "Open `TasksView.vue`. Import our new `MyButton` and replace the plain `<button>` with `<MyButton label="..." />`."
    - **Paste Snippet 3.4 (Vue View Updated)**

#### ⚛️ React (MUI) "We Do" (45 mins)

1.  **Install:**
    ```bash
    pnpm -F react-app add @mui/material @emotion/react @emotion/styled
    ```
2.  **Set up Theme:**
    - **Action:** Create `packages/react-app/src/theme.tsx`.
    - **Paste Snippet 3.5 (React Theme)** (This is the bug-fixed version)
3.  **Wire up the App:**
    - **Action:** Open `packages/react-app/src/main.tsx` and wrap the app in `<AppThemeProvider>`.
    - **Paste Snippet 3.6 (React `main.tsx` updated)**
4.  **Create Wrapper Component:**
    - **Analogy:** "Same idea. We create a `MyButton` component. It renders the MUI `<Button>` _inside_. This is called **composition**."
    - **Action:** Create `packages/react-app/src/components/MyButton.tsx`.
    - **Paste Snippet 3.7 (React Wrapper)**
    - **Explain This:** "This `...rest` part is important. It lets us pass _any other_ MUI prop, like `disabled`, from our wrapper right down to the real button."
5.  **"You Do" (The Payoff):**
    - **Task:** "Open `TasksView.tsx`. Import `MyButton` and replace the plain `<button>` with `<MyButton label="..." />`."
    - **Paste Snippet 3.8 (React View Updated)**

---

### Module 4: Wrap-up & Deployment Demo (15 Mins)

- **Slide:** `D3-4-Deployment.md`
- **"I Do" (Demo Only):**
  1.  Run `pnpm -F vue-app build`. This creates the `packages/vue-app/dist` folder.
  2.  Open the Netlify "Deploys" page for a new site.
  3.  **Drag the `dist` folder** from your file explorer onto the drop-zone.
  4.  **Your Script:** "And... we're live. That's it. That's modern web deployment. We just gave Netlify our final `dist` folder. We skipped the 'pro' steps like testing and Husky, which you can find in the `main` branch, but we've successfully compared Vue and React from a blank folder to a live, global app."

---

## 💻 Day 3 Code Snippets (Simplified)

### Module 2: Global State

**Snippet 2.1 (Vue Store):** `packages/vue-app/src/stores/tasks.ts`

```ts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export type Task = {
  id: number
  title: string
  completed: boolean
}

export const useTasks = defineStore('tasks', () => {
  const items = ref<Task[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchTasks() {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/todos?_limit=10'
      )
      items.value = res.data
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  function toggle(id: number) {
    const task = items.value.find((item) => item.id === id)
    if (task) {
      task.completed = !task.completed
    }
  }

  return { items, loading, error, fetchTasks, toggle }
})
```

**Snippet 2.2 (Vue `main.ts`):** `packages/vue-app/src/main.ts`

```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia' // <-- Import
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia()) // <-- Use Pinia
app.use(router)
app.mount('#app')
```

**Snippet 2.3 (Vue View):** `packages/vue-app/src/views/TasksView.vue`

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTasks } from '../stores/tasks'

const tasks = useTasks()
const { items, loading, error } = storeToRefs(tasks)

onMounted(() => {
  tasks.fetchTasks()
})
</script>
<template>
  <section class="max-w-xl mx-auto space-y-4">
    <h1 class="text-2xl font-semibold">Task List (Vue)</h1>
    <button @click="tasks.fetchTasks()">
      {{ loading ? 'Loading...' : 'Re-Fetch Tasks' }}
    </button>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" style="color: red;">{{ error }}</div>
    <ul v-else class="space-y-2">
      <li v-for="task in items" :key="task.id" class="border p-2 rounded-xl">
        <label class="flex items-center gap-2">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="tasks.toggle(task.id)"
          />
          <span :class="{ 'line-through': task.completed }">
            {{ task.title }}
          </span>
        </label>
      </li>
    </ul>
  </section>
</template>
```

**Snippet 2.4 (React Slice):** `packages/react-app/src/features/tasks/tasksSlice.ts`

```ts
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import axios from 'axios'

export type Task = { id: number; title: string; completed: boolean }
type TasksState = { items: Task[]; loading: boolean; error: string | null }
const initialState: TasksState = { items: [], loading: false, error: null }

export const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
  const res = await axios.get(
    'https://jsonplaceholder.typicode.com/todos?_limit=10'
  )
  return res.data as Task[]
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggle(state, action: PayloadAction<number>) {
      const task = state.items.find((item) => item.id === action.payload)
      if (task) {
        task.completed = !task.completed
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.error = action.error.message || 'Failed'
        state.loading = false
      })
  },
})

export const { toggle } = tasksSlice.actions
export default tasksSlice.reducer
export const selectTasks = (s: RootState) => s.tasks.items
export const selectLoading = (s: RootState) => s.tasks.loading
export const selectError = (s: RootState) => s.tasks.error
```

**Snippet 2.5 (React Store):** `packages/react-app/src/store/index.ts`

```ts
import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../features/tasks/tasksSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

**Snippet 2.6 (React Hooks):** `packages/react-app/src/store/hooks.ts`

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

**Snippet 2.7 (React `main.tsx`):** `packages/react-app/src/main.tsx`

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux' // <-- Import
import { store } from './store' // <-- Import
import { router } from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {' '}
      {/* <-- Wrap app */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
```

**Snippet 2.8 (React View):** `packages/react-app/src/views/TasksView.tsx`

```tsx
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  fetchTasks,
  toggle,
  selectTasks,
  selectLoading,
  selectError,
} from '../features/tasks/tasksSlice'

export default function TasksView() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectTasks)
  const loading = useAppSelector(selectLoading)
  const error = useAppSelector(selectError)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const renderContent = () => {
    if (loading) return <div>Loading...</div>
    if (error) return <div style={{ color: 'red' }}>{error}</div>
    return (
      <ul className="space-y-2">
        {items.map((task) => (
          <li key={task.id} className="border p-2 rounded-xl">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggle(task.id))}
              />
              <span className={task.completed ? 'line-through' : ''}>
                {task.title}
              </span>
            </label>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <section className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Task List (React)</h1>
      <button onClick={() => dispatch(fetchTasks())} disabled={loading}>
        {loading ? 'Loading...' : 'Re-Fetch Tasks'}
      </button>
      {renderContent()}
    </section>
  )
}
```

### Module 3: UI Library

**Snippet 3.1 (Vuetify Plugin):** `packages/vue-app/src/plugins/vuetify.ts`

```ts
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light', // You can add a dark theme later
  },
})
```

**Snippet 3.2 (Vue `main.ts` updated):** `packages/vue-app/src/main.ts`

```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { vuetify } from './plugins/vuetify' // <-- Import

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify) // <-- Use Vuetify
app.mount('#app')
```

**Snippet 3.3 (Vue Wrapper):** `packages/vue-app/src/components/MyButton.vue`

```vue
<script setup lang="ts">
import { VBtn } from 'vuetify/components'

defineProps<{
  label: string
}>()
const emit = defineEmits(['click'])
</script>

<template>
  <VBtn @click="emit('click')" color="primary" class="rounded-xl" flat>
    {{ label }}
  </VBtn>
</template>
```

**Snippet 3.4 (Vue View Updated):** `packages/vue-app/src/views/TasksView.vue`

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTasks } from '../stores/tasks'
import MyButton from '@/components/MyButton.vue' // <-- Import

const tasks = useTasks()
const { items, loading, error } = storeToRefs(tasks)

onMounted(() => {
  tasks.fetchTasks()
})
</script>
<template>
  <section class="max-w-xl mx-auto space-y-4">
    <h1 class="text-2xl font-semibold">Task List (Vue)</h1>
    <MyButton
      :label="loading ? 'Loading...' : 'Re-Fetch Tasks'"
      @click="tasks.fetchTasks()"
    />
  </section>
</template>
```

**Snippet 3.5 (React Theme):** `packages/react-app/src/theme.tsx`

```tsx
import React, { useMemo } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

// This is a minimal theme provider
export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: 'light', // You can add a toggle later
      },
      components: {
        // You can set global overrides here
        MuiButton: {
          defaultProps: {
            variant: 'contained',
          },
          styleOverrides: {
            root: {
              textTransform: 'none', // No more ALL CAPS buttons
            },
          },
        },
      },
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalizes styles */}
      {children}
    </ThemeProvider>
  )
}
```

**Snippet 3.6 (React `main.tsx` updated):** `packages/react-app/src/main.tsx`

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { router } from './router'
import { AppThemeProvider } from './theme' // <-- Import

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

**Snippet 3.7 (React Wrapper):** `packages/react-app/src/components/MyButton.tsx`

```tsx
import React from 'react'
import { Button, type ButtonProps } from '@mui/material'

// 1. Define our own props
type MyButtonProps = {
  label: string
  onClick: () => void
  // 2. Allow any other MUI Button prop to be passed through
} & Omit<ButtonProps, 'onClick' | 'children'>

export function MyButton({ label, onClick, ...rest }: MyButtonProps) {
  return (
    <Button
      onClick={onClick}
      // 3. We can add our own Tailwind classes!
      className="rounded-xl"
      {...rest} // 4. Pass down other props like 'disabled'
    >
      {label}
    </Button>
  )
}
```

**Snippet 3.8 (React View Updated):** `packages/react-app/src/views/TasksView.tsx`

```tsx
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {} from /* ... */ '../features/tasks/tasksSlice'
import { MyButton } from '../components/MyButton' // <-- Import

export default function TasksView() {
  // ... all the hooks ...

  return (
    <section className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Task List (React)</h1>
      <MyButton
        label={loading ? 'Loading...' : 'Re-Fetch Tasks'}
        onClick={() => dispatch(fetchTasks())}
        disabled={loading}
      />
      {/* ... rest of component ... */}
    </section>
  )
}
```
