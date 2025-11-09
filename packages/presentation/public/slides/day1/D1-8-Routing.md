## D1.8: Routing Basics (Time: 30 mins)

branch: day-1/07-routing-basics

### Core Routing Concepts

Both frameworks use a library to map a URL to a component.

| Concept           | Vue (`vue-router`)         | React (`react-router-dom`) |
| :---------------- | :------------------------- | :------------------------- |
| **App Wrapper**   | `app.use(router)`          | `<BrowserRouter>`          |
| **Link**          | `<RouterLink to="/about">` | `<Link to="/about">`       |
| **Render Outlet** | **`<RouterView />`**       | **`<Outlet />`**           |

`<RouterView />` and `<Outlet />` are the exact same concept: they are **placeholders** that render the component for the current URL.

---

### Example: How They Work

<div class="d-flex">
<div class="col">
<h4>🔵 Vue: `App.vue`</h4>

Your `App.vue` is the layout, and `<RouterView />` is the placeholder.

```vue
<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
```

</div>
<div class="col">
<h4>⚛️ React: App.tsx</h4>

Your App.tsx is the layout, and <Outlet /> is the placeholder.

```tsx
import { Link, Outlet } from 'react-router-dom'

export function App() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      {/* Pages render here */}
      <Outlet />
    </>
  )
}
```

</div>
</div>

---

## Your Task

<div class="d-flex">
<div class="col">
<h4>🔵 Vue: App.vue</h4>

1. Create `packages/vue-app/src/views/AboutView.vue` (just put `<h1>About Vue</h1>` in it).
2. Open packages/vue-app/src/router/index.ts.
3. Add the new route object (it's already scaffolded, just copy/paste the home route and modify).
4. Open `packages/vue-app/src/App.vue` and add `<RouterLink to="/about">About</RouterLink>` inside the `<nav>`.

</div>

<div class="col">
<h4>⚛️ React: App.tsx</h4>

1. Install: `pnpm -F react-app add react-router-dom`
2. Create: src/pages folder.
3. Create page files:
   - src/pages/Home.tsx
   - src/pages/About.tsx
   - (You can just put a simple `<h1>Home</h1>` or `<h1>About</h1>` in them for now).
4. Create a layout component: src/Layout.tsx file.

</div>
</div>
