## D2.4: Theming & UI Libraries

branch: day-2/03-theming

### Why Use a UI Library?

- **Speed**: Don't reinvent the wheel for every button, modal, and form.
- **Consistency**: Ensures a consistent, professional look across your app.
- **Accessibility (a11y)**: Good libraries have accessibility (keyboard navigation, screen reader support) built-in.

---

### Two Main Approaches

1.  **Component Libraries**: Pre-built, pre-styled components (e.g., Material Design).
    - **Pros**: Extremely fast, batteries-included.
    - **Cons**: Can all look the same, harder to customize.
2.  **Utility-First / Headless**: You build your own components using low-level tools.
    - **Pros**: Full custom control, unique designs.
    - **Cons**: More work to build each component.

---

### Comparison

| Category           | Vue                              | React                            |
| :----------------- | :------------------------------- | :------------------------------- |
| **Component Libs** | **Vuetify** (Material), PrimeVue | **Material-UI (MUI)**, Chakra UI |
| **Utility-First**  | **Tailwind CSS**                 | **Tailwind CSS**                 |
| **Headless UI**    | **Headless UI**                  | **Headless UI** (same library!)  |

Our stack (`Tailwind + Headless UI`) is a popular, modern choice that works for both.

---

### Your Task

1.  **Vue**: Add **Vuetify** to your project. Replace your plain `<button>` with a `<v-btn>`.
2.  **React**: Add **MUI** (`@mui/material`) to your project. Replace your plain `<button>` with a `<Button>`.
