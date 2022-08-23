import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApiStore } from './api'
import CountriesService from '@/services/CountriesService'

import { sortCountriesAlphabetically } from '@/helpers'

import ENUM from '@/enums'

export const useCountriesStore = defineStore('countries', () => {
  /* Declare API enumerated states */
  const { LOADING, ERROR, LOADED } = ENUM

  /* ---------------------------------------------------------------- */
  //                              STATE
  /* ---------------------------------------------------------------- */

  const country = ref(null)
  const countries = ref(null)
  /* Setting the initial value of the regionFilterOption variable to 'All'. */
  const regionFilterOption = ref('All')

  /* ---------------------------------------------------------------- */
  //                             ACTIONS
  /* ---------------------------------------------------------------- */

  /**
   * It fetches all countries from the API and sets the state of the API to either LOADED or ERROR
   */
  function fetchAllCountries() {
    const apiStore = useApiStore()
    apiStore.setApiState(LOADING)

    CountriesService.fetchAll()
      .then((response) => {
        setCountriesObservable(response.data)
        apiStore.setApiState(LOADED)
      })
      .catch(() => {
        apiStore.setApiState(ERROR)
      })
  }

  /**
   * It fetches countries by region and sets the countries observable to the response data
   * @param region - The region to filter by.
   */
  function fetchCountriesByRegion(region) {
    const apiStore = useApiStore()
    apiStore.setApiState(LOADING)

    CountriesService.fetchByRegion(region)
      .then((response) => {
        setCountriesObservable(response.data)
        apiStore.setApiState(LOADED)
      })
      .catch(() => {
        apiStore.setApiState(ERROR)
      })
  }

  /**
   * It fetches countries by name and sets the countries observable to the response data
   * @param name - The name of the country you want to search for.
   */
  function fetchCountriesByName(name) {
    const apiStore = useApiStore()
    apiStore.setApiState(LOADING)

    CountriesService.fetchByName(name)
      .then((response) => {
        setCountriesObservable(response.data)
        apiStore.setApiState(LOADED)
      })
      .catch(() => {
        apiStore.setApiState(ERROR)
      })
  }

  /**
   * It fetches the details of a country from the API and sets the state of the API to either LOADED or
   * ERROR
   * @param name - The name of the country to fetch details for.
   */
  function fetchCountryDetails(name) {
    clearCountryObservable()
    const apiStore = useApiStore()
    apiStore.setApiState(LOADING)

    CountriesService.fetchDetails(name)
      .then((response) => {
        setCountryObservable(response.data[0])
        apiStore.setApiState(LOADED)
      })
      .catch(() => {
        apiStore.setApiState(ERROR)
      })
  }

  function clearCountryObservable() {
    country.value = null
  }

  function fetchBorderCountriesNames() {
    const apiStore = useApiStore()
    apiStore.setApiState(LOADING)

    const timerID = setInterval(() => {
      if (country.value && country.value.borders) {
        CountriesService.fetchBorderCountries(country.value.borders)
          .then((response) => {
            setBorderCountriesNames(response.data)
            apiStore.setApiState(LOADED)
          })
          .catch((e) => {
            apiStore.setApiState(ERROR)
            throw e
          })
        clearInterval(timerID)
      }
    }, 0.15)
  }

  function setBorderCountriesNames(borderCountries) {
    country.value.borderCountriesNames = borderCountries.map(
      (country) => country.name.common
    )
  }

  /**
   * When the user clicks on a region, if the region is 'All', then fetch all countries, otherwise
   * fetch countries by region
   * @param event - the event object that is passed to the function when the event occurs.
   */
  function filterCountriesByRegion(event) {
    let selectedRegion = event.target.innerText
    setRegionFilterOption(selectedRegion)
    selectedRegion === 'All'
      ? fetchAllCountries()
      : fetchCountriesByRegion(selectedRegion)
  }

  /**
   * It takes the value of the input field, trims it, and if it's not empty, it calls the
   * fetchCountriesByName function with the value of the input field as an argument
   * @param event - the event object that is passed to the function when the event occurs.
   */
  function filterCountriesByQuery(event) {
    let searchInputQuery = event.target.value
    searchInputQuery.trim() && fetchCountriesByName(searchInputQuery)
  }

  /**
   * It takes a countries object and sets the value of the countries observable to that object
   * @param fetchedCountries - The countries object that were fetched from the API.
   */
  function setCountriesObservable(fetchedCountries) {
    countries.value = fetchedCountries
  }

  /**
   * It takes a country object as an argument and sets the value of the country observable to that
   * object.
   * @param fetchedCountryDetails - The country details fetched from the API.
   */
  function setCountryObservable(fetchedCountryDetails) {
    country.value = fetchedCountryDetails
  }

  /**
   * @desc It sets the current selected region filter option.
   * @param {string} option
   */
  function setRegionFilterOption(option) {
    regionFilterOption.value = option
  }

  /* ---------------------------------------------------------------- */
  //                            GETTERS
  /* ---------------------------------------------------------------- */

  /* A computed property that returns the sorted countries list. */
  const getSortedCountries = computed(() => {
    return sortCountriesAlphabetically(countries.value)
  })

  /* A computed property that returns the country details. */
  const getCountryDetails = computed(() => {
    return country.value
  })

  const getBorderCountriesNames = computed(() => {
    return country.value.borderCountriesNames
  })

  /* A computed property that returns the text that is displayed in the dropdown menu. */
  const getRegionFilterText = computed(() => {
    let selectedOption = regionFilterOption.value
    return selectedOption === 'All' ? 'Filter by Region' : selectedOption
  })

  /* A computed property that returns the length of the observable countries object keys. */
  const getCountriesLength = computed(() => {
    return (countries.value && Object.keys(countries.value).length) || 0
  })

  /* A computed property that returns true if the API state is LOADED, and the countries object 
  length is greater than 0. */
  const isCountriesObjectLoaded = computed(() => {
    const apiStore = useApiStore()
    return apiStore.apiState === LOADED && getCountriesLength.value
  })

  /* A computed property that returns true if the API state is LOADED, and the country object is non-empty. */
  const isCountryDetailsLoaded = computed(() => {
    const apiStore = useApiStore()
    return apiStore.apiState === LOADED && country.value
  })

  /* A computed property that returns true if the border countries names were successfully loaded */
  const isBorderCountriesLoaded = computed(() => {
    const apiStore = useApiStore()
    return apiStore.apiState === LOADED && country.value.borderCountriesNames
  })

  /* A computed property that returns true if the API state is ERROR. */
  const isResourceUnavailable = computed(() => {
    const apiStore = useApiStore()
    return apiStore.apiState === ERROR
  })
  return {
    countries,
    country,
    regionFilterOption,

    fetchAllCountries,
    fetchCountriesByRegion,
    fetchCountryDetails,
    fetchBorderCountriesNames,
    filterCountriesByQuery,
    filterCountriesByRegion,
    setRegionFilterOption,

    getSortedCountries,
    getCountryDetails,
    getBorderCountriesNames,
    getRegionFilterText,
    isCountriesObjectLoaded,
    isCountryDetailsLoaded,
    isBorderCountriesLoaded,
    isResourceUnavailable,
  }
})
