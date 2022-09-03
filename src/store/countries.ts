import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useApiStore } from './api'
import { ApiState } from '@/enums'
import { Region } from '@/enums'
import { AxiosResponse } from 'axios'

import CountriesService from '@/services/CountriesService'

import { CountryCardFields } from '@/types/CountryFields'

import { sortCountries } from '@/helpers'

export const useCountriesStore = defineStore('countries', () => {
  /* -------------------------------------------------------------------------- */
  /*                                 API states                                 */
  /* -------------------------------------------------------------------------- */
  const { LOADING, ERROR, LOADED } = ApiState

  /* ---------------------------------------------------------------- */
  //                              STATE
  /* ---------------------------------------------------------------- */

  const country: any = ref({})
  const countries: any = ref({})
  const regionFilterOption = ref('All')
  const lastSearched = ref('')

  /* ---------------------------------------------------------------- */
  //                             ACTIONS
  /* ---------------------------------------------------------------- */

  /**
   * @desc It takes in a service, a setter, and a query, sets the api state to LOADING,
   * calls the service with or without the query, calls the setter with the response
   * data or catches any errors and throws the error and sets the api state to LOADED
   * or ERROR depending on the response.
   *
   * @param {any} service - The service function that will be called to fetch the data.
   * @param {any} setter - The setter function for the state variable that will hold the data.
   * @param {string} [query] - string = ''
   */
  function fetchCountriesResource(
    service: any,
    setter: any,
    query: string = ''
  ): void {
    const apiStore = useApiStore()
    apiStore.setApiState(LOADING)
    service(query)
      .then((response: AxiosResponse) => {
        setter(response.data, query)
        console.log('✅ REQUEST SUCCEEDED')
        apiStore.setApiState(LOADED)
      })
      .catch(() => {
        apiStore.setApiState(ERROR)
      })
  }

  /**
   * It fetches all countries from the API and sets the state of the API to either LOADED or ERROR
   */
  function fetchAllCountries(): void {
    fetchCountriesResource(CountriesService.fetchAll, setCountriesObservable)
  }

  /**
   * It fetches countries by region and sets the countries observable to the response data
   * @param region - The region to filter by.
   */
  function fetchCountriesByRegion(region: string): void {
    fetchCountriesResource(
      CountriesService.fetchByRegion,
      setCountriesObservable,
      region
    )
  }

  /**
   * It fetches countries by name and sets the countries observable to the response data
   * @param name - The name of the country you want to search for.
   */
  function fetchCountriesByName(name: string): void {
    fetchCountriesResource(
      CountriesService.fetchByName,
      setCountriesObservable,
      name
    )
  }

  /**
   * It fetches the details of a country the user has selected
   */
  function fetchCountryDetails(name: string): void {
    clearCountryObservable()
    fetchCountriesResource(
      CountriesService.fetchDetails,
      setCountryObservable,
      name
    )
  }

  /**
   * It fetches the names of the countries that border the
   * country that the user has selected
   */
  function fetchBorderCountriesNames(): void {
    const timerID = setInterval(() => {
      if (country.value && country.value.borders) {
        fetchCountriesResource(
          CountriesService.fetchBorderCountries,
          setBorderCountriesNames,
          country.value.borders
        )
        clearInterval(timerID)
      }
    }, 0.15)
  }

  /**
   * It takes an array of border countries objects, extract their names
   * and sets the border countries names to an array of names
   */
  function setBorderCountriesNames(borderCountries: any[]): void {
    const names = borderCountries.map((country) => country.name.common)
    country.value.borderCountriesNames = names
  }

  /**
   * When the user clicks on a region, if the region is 'All', then fetch all countries, otherwise
   * fetch countries by region
   */
  function filterCountriesByRegion(event: any): void {
    const selectedRegion = event.target.innerText
    setRegionFilterOption(selectedRegion)

    selectedRegion === 'All'
      ? fetchAllCountries()
      : fetchCountriesByRegion(selectedRegion)
  }

  /**
   * It takes the value of the input field, trims it, and if it's not empty, it calls the
   * fetchCountriesByName function with the value as an argument
   */
  function filterCountriesByQuery(event: any): void {
    const searchInputQuery = event.target.value
    lastSearched.value = searchInputQuery
    searchInputQuery.trim() && fetchCountriesByName(searchInputQuery)
  }

  function setCountriesObservable(
    fetchedCountries: CountryCardFields[],
    name: string
  ): void {
    countries.value = fetchedCountries

    if (!Object.values(Region).includes(name as Region)) {
      countries.value = fetchedCountries.filter((country: any) =>
        country.name.common.toLowerCase().startsWith(name.toLowerCase())
      )
    }
  }

  function setCountryObservable(fetchedCountries: any, name: string): void {
    country.value = fetchedCountries.find((country: any) =>
      country.name.common.startsWith(name)
    )
  }

  function clearCountryObservable(): void {
    country.value = {}
  }

  function setRegionFilterOption(option: string): void {
    regionFilterOption.value = option
  }

  /* ---------------------------------------------------------------- */
  //                            GETTERS
  /* ---------------------------------------------------------------- */

  const getSortedCountries = computed(() => {
    return sortCountries(countries.value)
  })

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

  const isCountriesObjectLoaded = computed(() => {
    const apiStore = useApiStore()
    return apiStore.apiState === LOADED && getCountriesLength.value
  })

  const isCountryDetailsLoaded = computed(() => {
    const apiStore = useApiStore()
    return apiStore.apiState === LOADED && country.value
  })

  const isBorderCountriesLoaded = computed(() => {
    const apiStore = useApiStore()
    return apiStore.apiState === LOADED && country.value.borderCountriesNames
  })

  const isResourceUnavailable = computed(() => {
    const apiStore = useApiStore()
    return apiStore.apiState === ERROR
  })

  const getLastSearchedText = computed(() => lastSearched.value)

  return {
    countries,
    country,
    regionFilterOption,

    fetchAllCountries,
    fetchCountriesByName,
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
    getCountriesLength,
    getLastSearchedText,
    isCountriesObjectLoaded,
    isCountryDetailsLoaded,
    isBorderCountriesLoaded,
    isResourceUnavailable,
  }
})
