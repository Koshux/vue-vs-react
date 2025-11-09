## D1.6: React FC Basics

branch: day-1/05-react-fc

### React: Functional Components (FC) & JSX

React components are JavaScript functions that return UI.

- **Functional Component (FC):** A function that accepts `props` as its first argument and returns JSX.
- **JSX:** A syntax extension for JavaScript that _looks_ like HTML but is actually JavaScript. It allows you to write your UI and logic in the same file.
- **Typing:** We use a TypeScript `interface` or `type` to define the component's `props`.

---

### Your Task

Implement `src/components/Button.tsx`.

1.  Define a `ButtonProps` interface that accepts `label` (string) and `onClick` (a function).
2.  Destructure the props in the function arguments.
3.  Use it in your main component (`App.tsx`).
