import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#4f46e5',   // = Tailwind primary light
          surface: '#ffffff',
          'on-surface': '#0b1220',
        },
      },
      dark: {
        colors: {
          primary: '#818cf8',   // = Tailwind primary dark
          surface: '#0f172a',
          'on-surface': '#e5e7eb',
        },
      },
    },
  }
})
