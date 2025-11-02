/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,ts,js,tsx,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--v-theme-primary))',
        surface: 'rgb(var(--v-theme-surface))',
        'on-surface': 'rgb(var(--v-theme-on-surface))',
      },
      borderRadius: {
        xl: '0.75rem',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
