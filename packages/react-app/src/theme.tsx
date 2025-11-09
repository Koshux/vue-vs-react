import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

// 1. Create the light/dark theme objects (matching vuetify.ts)
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4f46e5' },
    background: { default: '#ffffff', paper: '#ffffff' },
    text: { primary: '#0b1220' },
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#818cf8' },
    background: { default: '#0f172a', paper: '#0f172a' },
    text: { primary: '#e5e7eb' },
  },
})

// 2. Create a context to pass down the theme toggler
const ThemeToggleContext = createContext({
  toggleTheme: () => {},
})

// 3. Create a custom hook for components to use
export const useThemeToggle = () => {
  return useContext(ThemeToggleContext)
}

// 4. Create the main provider component
export function AppThemeProvider({ children }: { children: ReactNode }) {
  // Check localStorage and system preference
  const getInitialMode = () => {
    try {
      const saved = localStorage.getItem('theme:dark')
      if (saved) {
        return saved === '1' ? 'dark' : 'light'
      }
      const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return preferDark ? 'dark' : 'light'
    } catch (e) {
      return 'light'
    }
  }

  const [mode, setMode] = useState<'light' | 'dark'>(getInitialMode)

  // 5. Memoize the toggle function
  const themeToggle = useMemo(
    () => ({
      toggleTheme: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light'
          // This part controls Tailwind
          document.documentElement.classList.toggle('dark', newMode === 'dark')
          localStorage.setItem('theme:dark', newMode === 'dark' ? '1' : '0')
          return newMode
        })
      },
    }),
    [],
  )

  // 6. Select the correct MUI theme
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode])

  return (
    <ThemeToggleContext.Provider value={themeToggle}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Normalizes browser styles */}
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  )
}
