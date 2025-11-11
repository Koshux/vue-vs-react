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
import TasksView from './pages/Tasks.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'test', element: <Test /> },
      { path: 'tasks', element: <TasksView /> },
      {
        path: 'about',
        element: <About />,
        loader: async () => {
          console.log('React Router Loader: Fetching data...')
          return { message: 'Hello from the loader!' }
        },
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      {' '}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
