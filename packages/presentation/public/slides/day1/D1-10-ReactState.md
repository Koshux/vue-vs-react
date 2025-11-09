## D1.10: React Local State (Time: 25 mins)

branch: day-1/09-react-local-state

### React's Local State Hooks

React's reactivity is based on re-rendering. When state changes, the component function runs again.

- `useState()`: The primary Hook for local state. Returns an array `[value, setValue]`. Calling `setValue` triggers a re-render.
- `useReducer()`: An alternative to `useState` for managing more complex state logic. It's similar to Redux but for a single component.

---

### What about Computed/Watch?

- **Computed:** Just calculate the value directly in the render. React's re-render handles the update. (For expensive calculations, we use `useMemo`).
- **Watch:** We use the `useEffect` Hook to run side effects _after_ a render, based on a dependency array.

---

### Your Task

Build the same counter.

1.  Create a `count` state using `useState()`.
2.  Add `increment`, `decrement`, and `reset` functions.
3.  Refactor it to use `useReducer` with actions for 'INCREMENT', 'DECREMENT', and 'RESET'.
