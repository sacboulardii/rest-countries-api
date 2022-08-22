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

  const fetchedCountries = ref(null)
  const countriesList = ref(null)
  const country = ref(null)
  /* Setting the initial value of the regionFilter variable to 'All'. */
  const regionFilter = ref('All')

  /* ---------------------------------------------------------------- */
  //                             ACTIONS
  /* ---------------------------------------------------------------- */

  /**
   * It fetches all countries from the API, sets the fetched countries to the fetchedCountries
   * observable, sets the countriesList observable to the fetchedCountries observable, and sets the
   * apiState to loaded
   */
  function fetchAllCountries() {
    const apiStore = useApiStore()
    let filteredFields = 'name,flags,population,region,capital'

    apiClient
      .get(`/all?fields=${filteredFields}`)
      .then((response) => {
        fetchedCountries.value = response.data
        setCountriesList(getFetchedCountries.value)
        apiStore.setApiState(ENUM.LOADED)
      })
      .catch(() => {
        apiStore.setApiState(ENUM.ERROR)
      })
  }

  /**
   * It takes a list of countries as an argument and sets the value of the countriesList variable to
   * that list
   * @param fetchedCountries - The countries fetched from the API.
   */
  function setCountriesList(fetchedCountries) {
    countriesList.value = fetchedCountries
  }

  /**
   * It takes a region as an argument, gets the countries from the fetchedCountries object, filters
   * them by the region, and sets the countriesList to the filtered countries
   * @param region - The region that the user has selected from the dropdown menu.
   */
  function filterCountriesByRegion(region) {
    let countriesArray = Object.values(getFetchedCountries.value)
    let filteredCountries = countriesArray.filter(
      (country) => country.region === region
    )
    setCountriesList(filteredCountries)
  }

  /**
   * If the region is 'All', then set the countries list to the fetched countries. Otherwise, filter
   * the countries by region
   * @param event - the event object that is passed to the function
   */
  function fetchCountriesByRegion(event) {
    let region = event.target.innerText
    region === 'All'
      ? setCountriesList(getFetchedCountries.value)
      : filterCountriesByRegion(region)
  }

  /* ---------------------------------------------------------------- */
  //                            GETTERS
  /* ---------------------------------------------------------------- */

  /* A computed property that returns the fetched countries from the API. */
  const getFetchedCountries = computed(() => {
    return fetchedCountries.value
  })

  /* A computed property that sorts the countries list alphabetically. */
  const getCountriesList = computed(() => {
    return sortCountriesList(countriesList.value)
  })

  /* A computed property that returns the text that is displayed in the dropdown menu. */
  const getRegionFilterText = computed(() => {
    let selectedOption = regionFilter.value
    return selectedOption === 'All' ? 'Filter by Region' : selectedOption
  })

  /* Checking if the countriesList is available. */
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
    regionFilter,
    fetchAllCountries,
    fetchCountriesByRegion,
    getCountriesList,
    getRegionFilterText,
    isCountriesListAvailable,
  }
})
