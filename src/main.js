import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import AOS from 'aos'
import 'aos/dist/aos.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import VModal from 'vue-js-modal'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import VuePageTransition from 'vue-page-transition'
import DynamicMarquee from 'vue-dynamic-marquee'
import VueApexCharts from 'vue-apexcharts'
import VueGtag from 'vue-gtag'

import './static/mycss.css'

axios.defaults.withCredentials = true

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.use(VModal, { dialog: true })
Vue.use(VueSweetalert2)
Vue.use(VuePageTransition)
Vue.component('dynamic-marquee', DynamicMarquee)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
Vue.use(VueGtag, {
  config: {
    id: process.env.VUE_APP_GA
  }
})

new Vue({
  router,
  store,
  vuetify,
  created () {
    AOS.init()
  },
  render: h => h(App)
}).$mount('#app')
