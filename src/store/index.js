import { createStore } from 'vuex'
import CountriesService from '@/services/CountriesService'

export default createStore({
  state: {
    mode: 'light',
    countries: null,
    countriesV2: null,
    country: {},
  },
  mutations: {
    SET_COUNTRIES(state, countries) {
      state.countries = countries
    },
    SET_COUNTRIESV2(state, countries) {
      console.log(countries)
      state.countriesV2 = countries
    },
    SET_COUNTRY(state, country) {
      console.log(country)
      state.country.name = country.name
      state.country.nativeName = country.nativeName
      state.country.population = country.population.toLocaleString('en-US')
      state.country.capital = country.capital
      state.country.region = country.region
      state.country.subRegion = country.subregion
      state.country.topLevelDomain = country.topLevelDomain.join(', ')
      state.country.currencies = country.currencies
        .map((curr) => curr.name)
        .join(', ')
      state.country.languages = country.languages
        .map((lang) => lang.name)
        .join(', ')
      state.country.borderCountries = country.borders
      state.country.image = country.flags.svg
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
    switchThemeMode({ commit, state }) {
      commit('SWITCH_MODE')
      console.log(state.mode)
    },
  },
  modules: {},
})
