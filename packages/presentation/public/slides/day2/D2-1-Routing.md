## D2.1: Advanced Routing (Time: 60 mins)

branch: day-2/00-routing

### Vue Router: Guards

Vue Router's "navigation guards" are its "middleware." They are perfect for checking auth or permissions before a user can see a page.

- `router.beforeEach`: A global guard that runs before _every single_ route change.
- `beforeEnter`: An in-route guard for specific routes.
- `beforeRouteLeave`: A component-level guard to prevent a user from leaving a page (e.g., "Are you sure you want to discard changes?").

---

### React Router v6: Data Routers

The modern standard is using `createBrowserRouter`. This enables powerful "data-loading" features.

- **`loader`**: A function you attach to a route that fetches data _before_ the component renders. No more loading spinners inside `useEffect`!
- **`action`**: A function that handles data mutations (like form submissions) for a route.
- **`useLoaderData`**: A hook to access the data from your loader in your component.

---

### Your Task

- **Vue**: Add a global `beforeEach` navigation guard to `src/router/index.ts` that simply `console.log`s the `to` and `from` paths.
- **React**:
  1.  Refactor your routes in `main.tsx` to use `createBrowserRouter`.
  2.  Add a `loader` to your `/about` route that returns a simple object: `{ message: "Hello from the loader!" }`.
  3.  Use the `useLoaderData` hook in your `About` component to display the message.
