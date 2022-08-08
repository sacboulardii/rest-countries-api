import { createStore } from 'vuex'
import CountriesService from '@/services/CountriesService'
import router from '@/router'
import ENUM from '@/enums'

export default createStore({
  state: {
    apiState: ENUM.INIT,
    mode: 'light',
    countries: null,
    country: null,
  },
  mutations: {
    SET_COUNTRIES(state, countries) {
      state.countries = countries
    },
    SET_BORDER_COUNTRIES_NAMES(state, borders) {
      let borderCountriesNames = []
      borders.forEach((country) =>
        borderCountriesNames.push(country.name.common)
      )
      state.country.borderCountriesNames = borderCountriesNames
    },
    SET_COUNTRY(state, country) {
      state.country = country
      state.apiState = ENUM.LOADED
    },
    SWITCH_MODE(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    CLEAR_STORED_COUNTRY(state) {
      state.country = {}
    },
    SET_API_STATE(state, apiState) {
      state.apiState = apiState
    },
  },
  actions: {
    getCountries({ commit }) {
      CountriesService.fetchCountries()
        .then((response) => {
          commit('SET_COUNTRIES', response.data)
        })
        .catch((e) => {
          throw e
        })
    },
    getCountryByName({ commit }, name) {
      CountriesService.fetchCountryByName(name)
        .then((response) => {
          commit('SET_COUNTRIES', response.data)
        })
        .catch((e) => {
          throw e
        })
    },
    getCountryByRegion({ commit }, region) {
      CountriesService.fetchCountryByRegion(region)
        .then((response) => {
          commit('SET_COUNTRIES', response.data)
        })
        .catch((e) => {
          throw e
        })
    },
    getCountryDetails({ commit }, name) {
      commit('CLEAR_STORED_COUNTRY')
      commit('SET_API_STATE', ENUM.LOADING)
      CountriesService.fetchCountryByName(name)
        .then((response) => {
          commit('SET_COUNTRY', response.data[0])
        })
        .catch(() => {
          router.push({
            name: '404Resource',
            params: { resource: name },
          })
        })
    },
    getBorderCountries({ commit, state }) {
      let timerID = setInterval(() => {
        if (state.country.borders) {
          CountriesService.fetchBorderCountries(state.country.borders).then(
            (response) => {
              commit('SET_BORDER_COUNTRIES_NAMES', response.data)
            }
          )
          clearInterval(timerID)
        }
      }, 100)
    },
    switchThemeMode({ commit }) {
      commit('SWITCH_MODE')
    },
  },
  modules: {},
})
