import { createStore } from 'vuex'
import CountriesService from '@/services/CountriesService'
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
      state.country.borderCountriesNames = borders.map(
        (country) => country.name.common
      )
    },
    SET_COUNTRY(state, country) {
      state.country = country
      console.log(country)
    },
    SWITCH_MODE(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    CLEAR_STORED_COUNTRY(state) {
      state.country = {}
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
          commit('SET_COUNTRIES', response.data)
        })
        .catch((e) => {
          throw e
        })
    },
    fetchCountryByRegion({ commit }, region) {
      return CountriesService.getCountryByRegion(region)
        .then((response) => {
          commit('SET_COUNTRIES', response.data)
        })
        .catch((e) => {
          throw e
        })
    },
    fetchCountryDetails({ commit }, name) {
      commit('CLEAR_STORED_COUNTRY')
      return CountriesService.getCountryByName(name)
        .then((response) => {
          if (response.data.length === 1)
            commit('SET_COUNTRY', response.data[0])
        })
        .catch((e) => {
          throw e
        })
    },
    fetchBorderCountries({ commit, state }) {
      let timerID = setInterval(() => {
        if (state.country.borders) {
          CountriesService.getBorderCountries(state.country.borders).then(
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
