## D1.6: React FC Basics (Time: 30 mins)

branch: day-1/05-react-fc

### React: Functional Components (FC) & JSX

React components are JavaScript functions that return UI.

- **Functional Component (FC):** A function that accepts `props` as its first argument and returns JSX.
- **JSX:** A syntax extension for JavaScript that _looks_ like HTML but is actually JavaScript. It allows you to write your UI and logic in the same file.
- **`.tsx`:** The file extension that tells TypeScript "this file contains JSX."

---

### How We Type Props

How do we tell our component what `props` it accepts?

<div class="d-flex" style="align-items: flex-start;">
<div class="col">
<h4>1. TypeScript (Modern)</h4>

Uses an `interface` or `type` to provide **compile-time** type safety. This is the standard for all modern React projects (and what we are using).

```tsx
interface ButtonProps {
  label: string
  onClick: () => void
}

// The component is *typed* to use these props
export function Button({ label, onClick }: ButtonProps) {
  // ...
}
```

</div>
<div class="col">
<h4>2. PropTypes (Legacy)</h4>
A library that provides runtime type checking. You'll see this in older, non-TypeScript React projects.

```js
import PropTypes from 'prop-types'

export function Button({ label, onClick }) {
  // ...
}

// Checks props *in the browser* and logs a console error
Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}
```

</div>
</div>

We will be using TypeScript interfaces for this workshop.

---

### Your Task

Implement `src/components/Button.tsx`.

1.  Define a `ButtonProps` interface that accepts `label` (string) and `onClick` (a function).
2.  Destructure the props in the function arguments.
3.  Use it in your main component (`App.tsx`).
