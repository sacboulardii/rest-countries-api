import { createStore } from 'vuex'
import theme from './modules/theme'
import api from './modules/api'
import countries from './modules/countries'

export default createStore({
  modules: {
    api: api,
    theme: theme,
    countries: countries,
  },
})
