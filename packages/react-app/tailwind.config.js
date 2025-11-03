/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        surface: '#ffffff',
        'on-surface': '#0b1220',
      },
    },
  },
  plugins: [],
}
