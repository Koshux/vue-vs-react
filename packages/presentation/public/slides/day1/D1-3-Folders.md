### Scalable Architecture

A predictable folder structure is key for maintainability. This is a common, scalable pattern for both frameworks.

`src/`

- `assets/`: Images, fonts, and global styles.
- `components/`: **Reusable** UI pieces (Button, Modal).
- `views/` (or `pages/`): Routed components (HomePage, AboutPage).
- `router/`: Routing configuration.
- `store/` (or `features/`): Global state (Pinia/Redux).

---

### Your Task

In both `vue-app` and `react-app`, create an empty file:

- `src/components/Button.vue`
- `src/components/Button.tsx`
