import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiClient } from '@/services/CountriesService'
import { useApiStore } from './api'

import sortCountriesList from '@/helpers'

import ENUM from '@/enums'

export const useCountriesStore = defineStore('countries', () => {
  /* ---------------------------------------------------------------- */
  //                              STATE
  /* ---------------------------------------------------------------- */

  const apiFetchedCountries = ref(null)
  const countriesList = ref(null)
  const country = ref(null)
  /* Setting the initial value of the regionFilter variable to 'All'. */
  const regionFilter = ref('All')

  /* ---------------------------------------------------------------- */
  //                             ACTIONS
  /* ---------------------------------------------------------------- */

  /**
   * It fetches all countries from the API, sets the apiFetchedCountries and countriesList values to
   * the fetched countries, and sets the apiState to either LOADED or ERROR depending on the response
   */
  function fetchAllCountries() {
    const apiStore = useApiStore()
    let filteredFields = 'name,flags,population,region,capital'

    apiClient
      .get(`/all?fields=${filteredFields}`)
      .then((response) => {
        apiFetchedCountries.value = response.data
        setCountriesList(getApiFetchedCountries.value)
        apiStore.setApiState(ENUM.LOADED)
      })
      .catch(() => {
        apiStore.setApiState(ENUM.ERROR)
      })
  }

  /**
   * It takes a list of countries and sets the value of the countriesList to that list
   * @param countries - An array of countries.
   */
  function setCountriesList(countries) {
    countriesList.value = countries
  }

  /**
   * It takes a region as an argument, gets the API fetched countries, filters them by the region, and
   * sets the countries list to the filtered countries
   * @param region - The region that the user has selected from the dropdown menu.
   */
  function filterCountriesListByRegion(region) {
    let countriesArray = Object.values(getApiFetchedCountries.value)
    let filteredCountries = countriesArray.filter(
      (country) => country.region === region
    )
    setCountriesList(filteredCountries)
  }

  /**
   * If the selected region is 'All', then set the countries list to the list of countries fetched from
   * the API. Otherwise, filter the countries list by the selected region
   * @param event - The event object that is passed to the function.
   */
  function fetchCountriesByRegion(event) {
    let selectedRegion = event.target.innerText
    selectedRegion === 'All'
      ? setCountriesList(getApiFetchedCountries.value)
      : filterCountriesListByRegion(selectedRegion)
  }

  /* ---------------------------------------------------------------- */
  //                            GETTERS
  /* ---------------------------------------------------------------- */

  /* A computed property that returns the fetched countries from the API. */
  const getApiFetchedCountries = computed(() => {
    return apiFetchedCountries.value
  })

  /* A computed property that returns the sorted countries list. */
  const getSortedCountriesList = computed(() => {
    return sortCountriesList(countriesList.value)
  })

  /* A computed property that returns the text that is displayed in the dropdown menu. */
  const getRegionFilterText = computed(() => {
    let selectedOption = regionFilter.value
    return selectedOption === 'All' ? 'Filter by Region' : selectedOption
  })

  /* A computed property that returns true if the countries list is available and the API state is
  loaded. */
  const isCountriesListAvailable = computed(() => {
    const apiStore = useApiStore()

    return (
      getSortedCountriesList.value &&
      getSortedCountriesList.value.length &&
      apiStore.apiState === ENUM.LOADED
    )
  })

  /* A computed property that returns true if the countries list is not available and the API state is
    error. */
  const isResourceUnavailable = computed(() => {
    const apiStore = useApiStore()
    return !isCountriesListAvailable.value && apiStore.apiState === ENUM.ERROR
  })

  return {
    countriesList,
    country,
    regionFilter,
    fetchAllCountries,
    fetchCountriesByRegion,
    getSortedCountriesList,
    getRegionFilterText,
    isCountriesListAvailable,
    isResourceUnavailable,
  }
})
