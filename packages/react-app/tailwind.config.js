/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Use CSS variables with alpha support */
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'on-surface': 'rgb(var(--color-on-surface) / <alpha-value>)',
      },
      borderRadius: {
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
      },
    },
  },
  plugins: [],
}
