/* Set up using Vue 3 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/reset.css'
import VueClickAway from 'vue3-click-away'
import VueScrollTo from 'vue-scrollto'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
  faMoon,
  faGlasses,
  faMagnifyingGlass,
  faChevronDown,
  faLightbulb,
  faArrowLeftLong,
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
  faMoon,
  faGlasses,
  faMagnifyingGlass,
  faChevronDown,
  faLightbulb,
  faArrowLeftLong
)

createApp(App)
  .use(VueScrollTo)
  .use(store)
  .use(router)
  .use(VueClickAway)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
