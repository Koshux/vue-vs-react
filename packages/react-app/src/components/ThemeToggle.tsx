import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme:dark') === '1'
    setIsDark(saved)
    document.documentElement.classList.toggle('dark', saved)
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme:dark', next ? '1' : '0')
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={isDark}
      title={isDark ? 'Switch to Light' : 'Switch to Dark'}
      className="rounded-xl border px-3 py-1.5
                 bg-white text-[rgb(var(--v-theme-on-surface))] border-gray-300 hover:bg-gray-50
                 dark:bg-gray-900 dark:text-[rgb(var(--v-theme-on-surface))] dark:border-gray-700 dark:hover:bg-gray-800
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      {isDark ? '☾ Dark' : '☀︎ Light'}
    </button>
  )
}
