/* Set up using Vue 3 */
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import './assets/reset.css'

import { createPinia } from 'pinia'

import VueClickAway from 'vue3-click-away'
import VueScrollTo from 'vue-scrollto'

import { makeServer } from '@/mirage/mirage'

if (process.env.NODE_ENV === 'development') {
  makeServer()
}

// Create pinia store
const pinia = createPinia()

// Create App
createApp(App)
  .use(VueScrollTo)
  .use(pinia)
  .use(router)
  .use(VueClickAway)
  .mount('#app')
