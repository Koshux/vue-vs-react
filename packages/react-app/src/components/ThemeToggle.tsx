import { useThemeToggle } from '../theme'

export default function ThemeToggle() {
  const { toggleTheme } = useThemeToggle()

  // We read the mode from the documentElement, which our theme.tsx controls.
  // This avoids a flash of incorrect content on load.
  const isDark = document.documentElement.classList.contains('dark')

  return (
    <button
      onClick={toggleTheme}
      className="rounded-xl border px-3 py-1.5 bg-white text-[rgb(var(--color-on-surface))] border-gray-300 hover:bg-gray-50 dark:bg-gray-900 dark:text-[rgb(var(--color-on-surface))] dark:border-gray-700 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      aria-pressed={isDark}
      title={isDark ? 'Switch to Light' : 'Switch to Dark'}
    >
      {isDark ? '☾ Dark' : '☀︎ Light'}
    </button>
  )
}
