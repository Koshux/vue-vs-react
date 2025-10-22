D2.1: Routing

branch: day-2/00-routing

Vue Router: Mature, official router.

React Router: v6+ is the modern standard, data-focused.

Vue Router

history: createWebHistory() for clean URLs.

routes: [...] array defines paths and components.

Guards: beforeEach is a global "middleware" for checking auth, etc.

Dynamic: <RouterView> + nested routes.

--

React Router v6

Data Routers: createBrowserRouter is the new standard.

Actions/Loaders: Functions that run on navigation to fetch or submit data before the component renders.

Dynamic: <Outlet> + child routes.

Your Task

Vue: Add a beforeEach navigation guard to your router that logs the "to" and "from" paths to the console.

React: Refactor your routes to use createBrowserRouter. Add a loader to your /about route that returns a simple object { message: "Hello from the loader!" } and display it on the page.
