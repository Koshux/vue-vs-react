Hour 1: Advanced State Management

Global State: Scaling Up

Local State (ref, useState): Perfect for a single component.

Prop Drilling: Becomes messy when passing state through many layers.

Global State: A single "source of truth" accessible anywhere in the app.

Vue: Pinia Deep Dive

Pinia Plugins: Easily extend Pinia's functionality. A common use case is persisting state to localStorage.

pinia-plugin-persistedstate is the go-to.

SSR Support: Pinia is designed with Server-Side Rendering (Nuxt) in mind, handling state hydration seamlessly.

Vuex 4 (Legacy): More boilerplate (mutations, actions, getters). Good to recognize, but Pinia is the future.

--

React: Redux Toolkit (RTK) Deep Dive

createSlice: The core of RTK. It auto-generates action creators and reducers from a simple object. Reduces boilerplate dramatically.

Middleware: Functions that intercept actions before they reach the reducer. Used for logging, async actions (thunks), etc.

RTK Query: A powerful data fetching and caching solution built into RTK. Handles loading states, caching, and invalidation automatically.

State Management Alternatives

<div class="d-flex">
<div class="col">
<h4>Vue</h4>
- Vuex (Legacy)
- Composable functions (for simpler sharing)
</div>
<div class="col">
<h4>React</h4>
- Zustand: A very popular, simple, and unopinionated state manager. Feels like a lightweight Redux.
- Jotai / Recoil (Atomic State)
</div>
</div>
