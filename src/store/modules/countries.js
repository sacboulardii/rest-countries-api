import CountriesService from '@/services/CountriesService'
import router from '@/router'

import ENUM from '@/enums'

// STATE

const state = {
  countriesList: null,
  country: null,
  countryRegionFilter: 'All',
}

// MUTATIONS

const mutations = {
  SET_COUNTRIES(state, countries) {
    state.countriesList = countries
  },
  SET_BORDER_COUNTRIES_NAMES(state, borders) {
    let borderCountriesNames = []
    borders.forEach((country) => borderCountriesNames.push(country.name.common))
    state.country.borderCountriesNames = borderCountriesNames
  },
  SET_COUNTRY(state, country) {
    state.country = country
    this.state.api.apiState = ENUM.LOADED
  },

  CLEAR_STORED_COUNTRY(state) {
    state.country = {}
  },
  CLEAR_STORED_COUNTRIES(state) {
    state.countriesList = []
  },
  SET_REGION_FILTER(state, region) {
    state.countryRegionFilter = region
  },
  RESET_REGION_FILTER(state) {
    state.countryRegionFilter = 'All'
  },
}

// ACTIONS

const actions = {
  getCountries({ commit }) {
    commit('RESET_REGION_FILTER')
    commit('CLEAR_STORED_COUNTRIES')
    CountriesService.fetchCountries()
      .then((response) => {
        commit('SET_COUNTRIES', response.data)
      })
      .catch((e) => {
        throw e
      })
  },
  getCountryByName({ commit, state }, name) {
    commit('api/SET_API_STATE', ENUM.LOADING, { root: true })
    CountriesService.fetchCountryByName(name)
      .then((response) => {
        commit('CLEAR_STORED_COUNTRIES')
        commit('SET_COUNTRIES', response.data)
        router.push({ name: 'search', params: { search: name } })
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          state.api.apiState = ENUM.ERROR
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
    commit('api/SET_API_STATE', ENUM.LOADING, { root: true })
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
