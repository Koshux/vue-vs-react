import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#4f46e5',
        },
      },
      dark: {
        colors: {
          primary: '#818cf8',
        },
      },
    },
  }
})
