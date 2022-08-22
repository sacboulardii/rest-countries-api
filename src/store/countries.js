import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiClient } from '@/services/CountriesService'
import { useApiStore } from './api'

import sortCountriesList from '@/helpers'

import ENUM from '@/enums'

export const useCountriesStore = defineStore('countries', () => {
  /* -------------------- STATE -------------------- */
  const fetchedCountries = ref(null)
  const countriesList = ref(null)
  const country = ref(null)
  const countryRegionFilter = ref('All')
  // const region = ref('America')

  /* -------------------- ACTIONS -------------------- */
  function fetchAllCountries() {
    const apiStore = useApiStore()
    let filteredFields = 'name,flags,population,region,capital'

    apiClient
      .get(`/all?fields=${filteredFields}`)
      .then((response) => {
        fetchedCountries.value = response.data
        setCountries(getFetchedCountries.value)
        apiStore.setApiState(ENUM.LOADED)
      })
      .catch(() => {
        apiStore.setApiState(ENUM.ERROR)
      })
  }

  function setCountries(fetchedCountries) {
    countriesList.value = fetchedCountries
  }

  function filterCountriesByRegion(region) {
    let countriesArray = Object.values(getFetchedCountries.value)
    let filteredByRegion = countriesArray.filter(
      (country) => country.region === region
    )
    setCountries(filteredByRegion)
  }

  function fetchCountriesByRegion(event) {
    let region = event.target.innerText
    region === 'All'
      ? setCountries(getFetchedCountries.value)
      : filterCountriesByRegion(region)
  }

  /* -------------------- GETTERS -------------------- */
  const getFetchedCountries = computed(() => {
    return fetchedCountries.value
  })

  const getCountriesList = computed(() => {
    return sortCountriesList(countriesList.value)
  })

  const getFilterText = computed(() => {
    let currentFilter = countryRegionFilter.value
    return currentFilter === 'All' ? 'Filter by Region' : currentFilter
  })

  const isCountriesListAvailable = computed(() => {
    const apiStore = useApiStore()

    if (countriesList.value) {
      return (
        (getCountriesList.value &&
          getCountriesList.value.length &&
          apiStore.apiState === ENUM.LOADED) ||
        (getCountriesList.value.length === 0 &&
          apiStore.apiState === ENUM.ERROR)
      )
    }
    return false
  })

  return {
    countriesList,
    country,
    countryRegionFilter,
    fetchAllCountries,
    fetchCountriesByRegion,
    getCountriesList,
    getFilterText,
    isCountriesListAvailable,
  }
})
