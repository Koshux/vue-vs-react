# 📚 Quick Reference: Global State (Pinia vs. RTK)

This guide is a side-by-side comparison of the key concepts you learned for global state management. It compares **Pinia** (the official standard for Vue) and **Redux Toolkit (RTK)** (the official standard for React).

| Concept                 | 🔵 Vue (Pinia)                                                                                        | ⚛️ React (Redux Toolkit)                                                                                                          |
| :---------------------- | :---------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| **Philosophy**          | **Simple & Direct.** Feels like a shared, reactive object. You call its methods directly.             | **Structured & Explicit.** A one-way data flow. You "dispatch actions" which are handled by "reducers" to create a new state.     |
| **Main File**           | `src/stores/tasks.ts`                                                                                 | `src/features/tasks/tasksSlice.ts`                                                                                                |
| **Setup**               | `createPinia()` and `app.use(pinia)` in `main.ts`.                                                    | `configureStore()` in `store/index.ts` and `<Provider store={store}>` in `main.tsx`.                                              |
| **Defining State**      | `defineStore('tasks', () => { ... })`                                                                 | `createSlice({ name: 'tasks', ... })`                                                                                             |
| **State Value**         | `const items = ref<Task[]>([]);`                                                                      | `initialState: { items: [] }`                                                                                                     |
| **Computed Value**      | `const filtered = computed(() => { ... })`                                                            | `createSelector(...)` (or just derive it in the component with `useMemo`)                                                         |
| **Actions / Mutations** | Functions inside `defineStore`:<br>`function add(title: string) { ... }`                              | Functions inside the `reducers` object:<br>`reducers: { add(state, action) { ... } }`                                             |
| **Reading State**       | `const tasks = useTasksStore()`<br/>`<span>{{ tasks.filteredItems }}</span>`                          | `const tasks = useAppSelector(selectFiltered)`<br/>`<span>{tasks.map(...)}</span>`                                                |
| **Writing State**       | `const tasks = useTasksStore()`<br/>`tasks.add('New Task')`                                           | `const dispatch = useAppDispatch()`<br/>`dispatch(add('New Task'))`                                                               |
| **Async Logic**         | An `async function` in your store:<br/>`async function fetchUsers() { ... }`                          | `createAsyncThunk('users/fetch', ...)` and managed in `extraReducers`.                                                            |
| **Persistence**         | **Plugin-based.** We added `pinia-plugin-persistedstate` (via our `plugins/persist.ts`) to `main.ts`. | **Manual (in our case).** We wrote a `createPersistor` helper and called `persistor.save()` in our `store/index.ts` subscription. |

---

### Key Takeaways

#### Pinia

- **Pros:** Extremely simple to learn, less boilerplate, feels "magical" and fits perfectly with Vue's reactivity. The plugin ecosystem (like persistence) is very powerful.
- **Cons:** Less structured, which _can_ lead to messier logic in very large-scale apps if not disciplined.

#### Redux Toolkit

- **Pros:** Enforces a strict, predictable one-way data flow, which is excellent for large teams and complex state. The Redux DevTools are fantastic for "time-travel" debugging. `RTK Query` is a complete data-fetching solution.
- **Cons:** More boilerplate and a steeper learning curve (Actions, Reducers, Dispatchers, Slices, Thunks). Can feel "heavy" for simple apps.
