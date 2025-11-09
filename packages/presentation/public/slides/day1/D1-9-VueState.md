## D1.9: Vue Local State (Time: 25 mins)

branch: day-1/08-vue-local-state

### What is Reactivity?

The "magic" that automatically updates the UI (DOM) when your data (state) changes.

---

### Vue's Local State APIs

- `ref()`: For primitive values (String, Number, Boolean). It wraps the value in an object, so we access it with `.value` in script.
- `reactive()`: For objects. It makes the entire object deeply reactive.
- `computed()`: For **derived state**. A cached value that automatically re-calculates when its dependencies change.
- `watch()`: For running **side effects** in response to a state change (like logging or fetching data).

---

### Your Task

Build a simple counter in your main view.

1.  Create a `count` state using `ref()`.
2.  Add `increment`, `decrement`, and `reset` functions.
3.  Add a `computed` property that doubles the count.
4.  Display the count and the doubled count.
