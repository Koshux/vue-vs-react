D1.8: Routing Basics
branch: day-1/07-routing-basics

### Core Routing Concepts

Both frameworks use a "router" library to map a URL path to a specific component.

| Concept           | Vue (`vue-router`)         | React (`react-router-dom`) |
| :---------------- | :------------------------- | :------------------------- |
| **Link**          | `<RouterLink to="/about">` | `<Link to="/about">`       |
| **Render Outlet** | `<RouterView />`           | `<Outlet />`               |

---

### Your Task

1.  In both apps, add an `/about` route that renders a simple `About` component.
2.  Add a navigation link to it from your main home page.
