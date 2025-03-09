
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { aliases, mdi } from 'vuetify/iconsets/mdi'

export const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
        mdi,
    },
},
theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: "#6FF24B",
          secondary: "#482E8F",
          accent: "#FFFFFF",
          error: "#4839DB",
          info: "#2196F3",
          success: "#6FF24B",
          warning: "#F2F2F2",
          anchor: '#482E8F'
        }
      },
      dark: {
        colors: {
          primary: "#010326",
          secondary: "#FFFFFF",
          accent: "#000000",
          error: "#2B3A8C",
          info: "#6FF24B",
          success: "#010326",
          warning: "#FFFFFF"
        }
      }
    }
  }
})



