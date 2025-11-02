D2.3: Advanced State

branch: day-2/02-advanced-state

The Problem: Context API is simple, but Pinia/Redux offer more power, structure, and debugging tools.

DevTools: Both integrate with browser extensions for time-travel debugging.

Pinia

The new official standard for Vue.

Plugins: Easy to add features like pinia-plugin-persistedstate to save state to localStorage.

SSR: Works seamlessly with Nuxt.

--

Redux Toolkit (RTK)

The modern standard for React.

createSlice: Replaces old "reducers", "actions", and "constants" with one function.

RTK Query: A powerful data fetching & caching tool built-in. Solves fetching, loading states, and caching automatically.

Alternatives: Zustand is a much simpler, lightweight store inspired by hooks. Very popular.

Your Task

Vue: Add the pinia-plugin-persistedstate to your Pinia counter store. Refresh the page and prove the count is saved.

React: Refactor your useContext counter to a full Redux Toolkit createSlice. Connect it to your component and prove it still works.
