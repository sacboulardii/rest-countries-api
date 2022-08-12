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
    regionFilter: 'All',
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
      switch (state.mode) {
        case 'light':
          state.mode = 'dark'
          break
        case 'dark':
          state.mode = 'retro'
          break
        default:
          state.mode = 'light'
      }
    },
    CLEAR_STORED_COUNTRY(state) {
      state.country = {}
    },
    CLEAR_STORED_COUNTRIES(state) {
      state.countries = []
    },
    SET_API_STATE(state, apiState) {
      state.apiState = apiState
    },
    SET_REGION_FILTER(state, region) {
      state.regionFilter = region
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
    getCountryByName({ commit, state }, name) {
      commit('SET_API_STATE', ENUM.LOADING)
      CountriesService.fetchCountryByName(name)
        .then((response) => {
          commit('CLEAR_STORED_COUNTRIES')
          commit('SET_COUNTRIES', response.data)
          router.push({ name: 'search', params: { search: name } })
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            state.apiState = ENUM.ERROR
          }
        })
    },
    getCountryByRegion({ commit }, region) {
      CountriesService.fetchCountryByRegion(region)
        .then((response) => {
          commit('SET_REGION_FILTER', region)
          commit('SET_COUNTRIES', response.data)
          region === 'All'
            ? router.push('/')
            : router.push({
                name: 'region',
                params: { region: region },
              })
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
      }, 0.1)
    },
    switchThemeMode({ commit }) {
      commit('SWITCH_MODE')
    },
  },
  modules: {},
})
