import {
  useRouteError,
  isRouteErrorResponse,
  createBrowserRouter,
  type RouteObject,
} from 'react-router-dom'
import { lazy, Suspense } from 'react'
import App from './App'

// Lazy-load your page components
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Tasks = lazy(() => import('./pages/Tasks'))
const Assignees = lazy(() => import('./pages/Assignees'))

// Helper component for Suspense fallback
const Suspended = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="p-4">Loading...</div>}>{children}</Suspense>
)

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />, // The main layout component with the <Outlet />
    ErrorBoundary: RootErrorBoundary,
    children: [
      // Child routes will render inside the <Outlet />
      {
        path: '/',
        element: (
          <Suspended>
            <Home />
          </Suspended>
        ),
      },
      {
        path: '/about',
        element: (
          <Suspended>
            <About />
          </Suspended>
        ),
      },
      {
        path: '/tasks',
        element: (
          <Suspended>
            <Tasks />
          </Suspended>
        ),
      },
      {
        path: '/assignees',
        element: (
          <Suspended>
            <Assignees />
          </Suspended>
        ),
      },
    ],
  },
]

export const router = createBrowserRouter(routes)

function RootErrorBoundary() {
  let error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    )
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    )
  } else {
    return <h1>Unknown Error</h1>
  }
}
