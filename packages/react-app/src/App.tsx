import { Link, Outlet } from 'react-router-dom'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  return (
    <div className="min-h-screen text-[rgb(var(--v-theme-on-surface))] bg-surface dark:bg-gray-900">
      <header className="max-w-5xl mx-auto p-4">
        <div className="flex items-center justify-between gap-4">
          <img src="/vite.svg" alt="React logo" width="42" height="42" />
          <nav className="flex gap-4 text-sm">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/about" className="hover:underline">
              About
            </Link>
            <Link to="/assignees" className="hover:underline">
              Assignees
            </Link>
            <Link to="/tasks" className="hover:underline">
              Tasks
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="app-main max-w-5xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}
