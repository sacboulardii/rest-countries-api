import { createStore } from 'vuex'
import CountriesService from '@/services/CountriesService'

export default createStore({
  state: {
    countries: null,
  },
  mutations: {
    SET_COUNTRIES(state, countries) {
      state.countries = countries
    },
    SET_FILTERED_COUNTRIES(state, countries) {
      state.countries = countries
    },
  },
  actions: {
    fetchCountries({ commit }) {
      return CountriesService.getCountries()
        .then((response) => {
          commit('SET_COUNTRIES', response.data)
        })
        .catch((e) => {
          throw e
        })
    },
    fetchCountryByName({ commit }, name) {
      return CountriesService.getCountryByName(name)
        .then((response) => {
          commit('SET_FILTERED_COUNTRIES', response.data)
        })
        .catch((e) => {
          throw e
        })
    },
  },
  modules: {},
})
