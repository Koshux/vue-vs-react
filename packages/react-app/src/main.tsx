// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

import { Layout } from './Layout'
import { Test } from './pages/Test.tsx'
import { About } from './pages/About'
import { CounterProvider } from './context/CounterContext.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'test', element: <Test /> },
      { path: 'about', element: <About /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CounterProvider>
      {' '}
      <RouterProvider router={router} />
    </CounterProvider>
  </React.StrictMode>
)
