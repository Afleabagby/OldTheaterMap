import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import '@mdi/font/css/materialdesignicons.css'
import { preset } from 'vue-cli-plugin-vuetify-preset-basil/preset'

Vue.use(Vuetify)

export default new Vuetify({
  preset,
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  },
  theme: {
    themes: {
      light: {
        primary: '#E4E0C7',
        secondary: '#DDC470',
        accent: '#CC6E55',
        error: '#573B3A'
      }
    }
  }
})
