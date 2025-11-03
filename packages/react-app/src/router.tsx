import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Tasks = lazy(() => import('./pages/Tasks'))
const Assignees = lazy(() => import('./pages/Assignees'))

export const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/about', element: <About /> },
  { path: '/tasks', element: <Tasks /> },
  { path: '/assignees', element: <Assignees /> },
]
