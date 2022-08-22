import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiClient } from '@/services/CountriesService'
import { useApiStore } from './api'

import sortCountriesList from '@/helpers'

import { LOADED, ERROR } from '@/enums'

export const useCountriesStore = defineStore('countries', () => {
  /* -------------------- STATE -------------------- */
  const countriesList = ref(null)
  const country = ref(null)
  const countryRegionFilter = ref('All')

  /* -------------------- ACTIONS -------------------- */
  function fetchAllCountries() {
    const apiStore = useApiStore()
    let filteredFields = 'name,flags,population,region,capital'

    apiClient
      .get(`/all?fields=${filteredFields}`)
      .then((response) => {
        countriesList.value = response.data
        apiStore.setApiState(LOADED)
      })
      .catch(() => {
        apiStore.setApiState(ERROR)
      })
  }

  /* -------------------- GETTERS -------------------- */
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
          apiStore.apiState === LOADED) ||
        (getCountriesList.value.length === 0 && apiStore.apiState === ERROR)
      )
    }
    return false
  })

  return {
    countriesList,
    country,
    countryRegionFilter,
    fetchAllCountries,
    getCountriesList,
    isCountriesListAvailable,
    getFilterText,
  }
})
