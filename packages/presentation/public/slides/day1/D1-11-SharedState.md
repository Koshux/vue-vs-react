## D1.11: Shared State Teaser

branch: day-1/10-shared-state-intro

### The Problem

Local state is great, but how do we share it between components that aren't parent/child? (This is called "prop drilling").

---

<div class="d-flex">
<div class="col">
<h4>Vue's Solution: Pinia</h4>
- A centralized, global store.
- Any component can `useStore()` to read or write state.
- Simple, modular, and has great devtools.
</div>
<div class="col">
<h4>React's Solution: Context</h4>
- A way to "provide" state to a tree of components.
- Any child component can "consume" the state.
- Lighter than a full state library, but less powerful.
</div>
</div>

---

### Your Task

1.  Create a new `DisplayCount` component in both projects.
2.  **Vue:** Create a simple `useCounterStore` with Pinia and use it in both components.
3.  **React:** Create a `CounterContext` and use it in both components.
4.  Prove that clicking the button in one component updates the display in the other.
