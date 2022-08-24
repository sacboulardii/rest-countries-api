import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApiStore } from './api'
import CountriesService from '@/services/CountriesService'

import { sortCountriesAlphabetically } from '@/helpers'

import { ApiState } from '@/enums'

export const useCountriesStore = defineStore('countries', () => {
  /* ---------------------------------------------------------------- */
  //                              STATE
  /* ---------------------------------------------------------------- */

  const country: any = ref({})
  const countries: any = ref({})
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
    apiStore.setApiState(ApiState.LOADING)
    CountriesService.fetchAll()
      .then((response: any) => {
        setCountriesObservable(response.data)
        apiStore.setApiState(ApiState.LOADED)
      })
      .catch(() => {
        apiStore.setApiState(ApiState.ERROR)
      })
  }

  /**
   * It fetches countries by region and sets the countries observable to the response data
   * @param region - The region to filter by.
   */
  function fetchCountriesByRegion(region: string) {
    const apiStore = useApiStore()
    apiStore.setApiState(ApiState.LOADING)

    CountriesService.fetchByRegion(region)
      .then((response: any) => {
        setCountriesObservable(response.data)
        apiStore.setApiState(ApiState.LOADED)
      })
      .catch(() => {
        apiStore.setApiState(ApiState.ERROR)
      })
  }

  /**
   * It fetches countries by name and sets the countries observable to the response data
   * @param name - The name of the country you want to search for.
   */
  function fetchCountriesByName(name: string) {
    const apiStore = useApiStore()
    apiStore.setApiState(ApiState.LOADING)

    CountriesService.fetchByName(name)
      .then((response: any) => {
        setCountriesObservable(response.data)
        apiStore.setApiState(ApiState.LOADED)
      })
      .catch(() => {
        apiStore.setApiState(ApiState.ERROR)
      })
  }

  /**
   * It fetches the details of a country from the API and sets the state of the API to either LOADED or
   * ERROR
   * @param {string} name - The name of the country to fetch details for.
   */
  function fetchCountryDetails(name: string) {
    clearCountryObservable()
    const apiStore = useApiStore()
    apiStore.setApiState(ApiState.LOADING)

    CountriesService.fetchDetails(name)
      .then((response: any) => {
        setCountryObservable(response.data[0])
        apiStore.setApiState(ApiState.LOADED)
      })
      .catch(() => {
        apiStore.setApiState(ApiState.ERROR)
      })
  }

  /**
   * `clearCountryObservable()` is a function that sets the value of the `country` observable to `null`
   */
  function clearCountryObservable() {
    country.value = {}
  }

  function fetchBorderCountriesNames() {
    const apiStore = useApiStore()
    apiStore.setApiState(ApiState.LOADING)

    const timerID = setInterval(() => {
      if (country.value && country.value.borders) {
        CountriesService.fetchBorderCountries(country.value.borders)
          .then((response: any) => {
            setBorderCountriesNames(response.data)
            apiStore.setApiState(ApiState.LOADED)
          })
          .catch((error: any) => {
            apiStore.setApiState(ApiState.ERROR)
            throw error
          })
        clearInterval(timerID)
      }
    }, 0.15)
  }

  /**
   * It takes an array of countries objects as an argument, and returns an array of the names of those
   * countries
   * @param {Array} borderCountries - an array of objects containing the names of the countries that border the
   * country you're looking at.
   */
  function setBorderCountriesNames(borderCountries: any[]): void {
    country.value.borderCountriesNames = borderCountries.map(
      (country) => country.name.common
    )
  }

  /**
   * When the user clicks on a region, if the region is 'All', then fetch all countries, otherwise
   * fetch countries by region
   * @param event - the event object that is passed to the function when the event occurs.
   */
  function filterCountriesByRegion(event: any) {
    const selectedRegion = event.target.innerText
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
  function filterCountriesByQuery(event: any) {
    const searchInputQuery = event.target.value
    searchInputQuery.trim() && fetchCountriesByName(searchInputQuery)
  }

  /**
   * It takes a countries object and sets the value of the countries observable to that object
   * @param fetchedCountries - The countries object that were fetched from the API.
   */
  function setCountriesObservable(fetchedCountries: object) {
    countries.value = fetchedCountries
  }

  /**
   * It takes a country object as an argument, and sets the value of the country observable to that
   * country object
   * @param {Object} fetchedCountry - The country object that was fetched from the API.
   */
  function setCountryObservable(fetchedCountry: object) {
    country.value = fetchedCountry
  }

  /**
   * It sets the current selected region filter option.
   * @param {string} option
   */
  function setRegionFilterOption(option: string) {
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
    const selectedOption = regionFilterOption.value
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
    return apiStore.apiState === ApiState.LOADED && getCountriesLength.value
  })

  /* A computed property that returns true if the API state is LOADED, and the country object is non-empty. */
  const isCountryDetailsLoaded = computed(() => {
    const apiStore = useApiStore()
    return apiStore.apiState === ApiState.LOADED && country.value
  })

  /* A computed property that returns true if the border countries names were successfully loaded */
  const isBorderCountriesLoaded = computed(() => {
    const apiStore = useApiStore()
    return (
      apiStore.apiState === ApiState.LOADED &&
      country.value.borderCountriesNames
    )
  })

  /* A computed property that returns true if the API state is ERROR. */
  const isResourceUnavailable = computed(() => {
    const apiStore = useApiStore()
    return apiStore.apiState === ApiState.ERROR
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
