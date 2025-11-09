import './styles/theme.css'
import './assets/tailwind.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppThemeProvider } from './theme'
import { RouterProvider } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'
import { router } from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </AppThemeProvider>
  </React.StrictMode>,
)
