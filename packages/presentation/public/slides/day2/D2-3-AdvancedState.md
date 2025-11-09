## D2.3: Global State Management (Time: 75 mins)

branch: day-2/02-advanced-state

### The Problem

`useState` is local. `Context` is tree-based. But what if two _totally separate_ components need to share state?

This is where a **global state manager** comes in. It's a single "source of truth" outside your component tree.

![Image of global state management diagram](../../global%20state%20diagram-1.gif 'redux flow')

---

### Vue: Pinia

Pinia is the new official, simple state manager for Vue.

- **Store**: A "slice" of state defined with `defineStore`.
- **Plugins**: Easy to add features like `pinia-plugin-persistedstate` to automatically save state to `localStorage`.
- **DevTools**: Integrates perfectly with Vue DevTools for time-travel debugging.

---

### React: Redux Toolkit (RTK)

RTK is the modern standard for "heavy" state in React.

- **`createSlice`**: Replaces old "reducers" and "actions" with one simple function.
- **`RTK Query`**: A _complete_ data-fetching and caching solution. It automatically handles fetching, loading states, and caching, often replacing `useEffect` entirely.
- **Alternatives**: For simpler needs, **Zustand** is extremely popular. It feels like a simple hook (`useStore()`) but is global.

---

### Your Task

- **Vue**:
  1.  Install `pinia-plugin-persistedstate`.
  2.  Add it to your Pinia instance in `main.ts`.
  3.  In your `useCounterStore`, add `persist: true` to the store options.
  4.  Refresh the page and prove the count is saved.
- **React**:
  1.  Refactor your `CounterContext` to a full Redux Toolkit `createSlice` named `counterSlice`.
  2.  Connect it to your components using `useSelector` and `useDispatch`.
