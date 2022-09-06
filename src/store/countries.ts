import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ApiState } from '@/enums'
import { AxiosResponse, AxiosError } from 'axios'

import * as CountriesService from '@/services/CountriesService'

import { CountryCardFields, DetailFields } from '@/types/CountryFields'

import { sortCountries } from '@/helpers'

export const useCountriesStore = defineStore('countries', () => {
  /* -------------------------------------------------------------------------- */
  /*                                 API states                                 */
  /* -------------------------------------------------------------------------- */
  const { INIT, PENDING, ERROR, SUCCESS } = ApiState

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */

  const country: any = ref({})
  const countries: any = ref({})

  const regionFilterOption = ref('All')

  const lastSearched = ref('')

  const fetchCountriesStatus = ref(INIT)
  const fetchBorderCountriesStatus = ref(INIT)
  const fetchCountryDetailsStatus = ref(INIT)

  /* -------------------------------------------------------------------------- */
  /*                                   ACTIONS                                  */
  /* -------------------------------------------------------------------------- */

  function setRegionFilterOption(option: string): void {
    regionFilterOption.value = option
  }

  function setFetchCountriesStatus(status: ApiState) {
    fetchCountriesStatus.value = status
  }

  function setFetchBorderCountriesStatus(status: ApiState) {
    fetchBorderCountriesStatus.value = status
  }

  function setFetchCountryDetailsStatus(status: ApiState) {
    fetchCountryDetailsStatus.value = status
  }

  /**
   * It takes a resource name and a list of arguments, and then it calls the appropriate service
   * function, sets the appropriate status, and sets the appropriate data
   * @param {string} resource - string - the resource to fetch
   * @param {any} args - any - the arguments that will be passed to the service function
   */
  async function fetchCountriesResource(
    resource: string,
    ...args: any
  ): Promise<any> {
    let service: (...args: any) => Promise<AxiosResponse>
    let setStatus: (status: ApiState) => void
    let setData: (data: any, ...args: any) => void

    switch (resource) {
      case 'all':
        service = CountriesService.fetchAll
        setStatus = setFetchCountriesStatus
        setData = setCountriesObservable
        break

      case 'region':
        service = CountriesService.fetchByRegion
        setStatus = setFetchCountriesStatus
        setData = setCountriesObservable
        break

      case 'name':
        service = CountriesService.fetchByName
        setStatus = setFetchCountriesStatus
        setData = setCountriesByFilteredName
        break

      case 'details':
        clearCountryObservable()
        service = CountriesService.fetchDetails
        setStatus = setFetchCountryDetailsStatus
        setData = setCountryObservable
        break

      case 'border-countries-names':
        service = CountriesService.fetchBorderCountries
        setStatus = setFetchBorderCountriesStatus
        setData = setBorderCountriesNames
        break

      default:
        return
    }

    setStatus(PENDING)

    try {
      const response: AxiosResponse = await service(...args)
      setData(response.data, ...args)
      setStatus(SUCCESS)
    } catch (err) {
      const error = err as AxiosError
      setStatus(ERROR)
      throw error
    }
  }

  function fetchAllCountries(): void {
    fetchCountriesResource('all')
  }

  function fetchCountriesByRegion(region: string): void {
    fetchCountriesResource('region', region)
  }

  function fetchCountriesByName(name: string): void {
    lastSearched.value = name
    fetchCountriesResource('name', name)
  }

  function fetchCountryDetails(name: string): void {
    fetchCountriesResource('details', name)
  }

  function fetchBorderCountriesNames(): void {
    const timerID = setInterval(() => {
      if (getBorderCountriesCodes.value) {
        const csvCodes = getBorderCountriesCodes.value.join(',')
        fetchCountriesResource('border-countries-names', csvCodes)
        clearInterval(timerID)
      }
    }, 0.15)
  }

  function setBorderCountriesNames(borderCountries: any[]): void {
    const names = borderCountries.map((country) => country.name.common)
    country.value.borderCountriesNames = names
  }

  function setCountriesByFilteredName(
    fetchedCountries: CountryCardFields[],
    name: string
  ): void {
    const countriesFilteredByName = fetchedCountries.filter((country: any) =>
      country.name.common.toLowerCase().startsWith(name.toLowerCase())
    )

    setCountriesObservable(countriesFilteredByName)
  }

  function setCountriesObservable(fetchedCountries: CountryCardFields[]): void {
    countries.value = fetchedCountries
  }

  function setCountryObservable(fetchedCountries: any, name: string): void {
    country.value = fetchedCountries.find((country: any) =>
      country.name.common.startsWith(name)
    )
  }

  function clearCountryObservable(): void {
    country.value = {}
  }

  /* -------------------------------------------------------------------------- */
  /*                                   GETTERS                                  */
  /* -------------------------------------------------------------------------- */

  const getSortedCountries = computed(() => {
    return sortCountries(countries.value)
  })

  const getCountryDetails = computed(() => {
    return country.value
  })

  const getBorderCountriesCodes = computed(() => {
    return country.value.borders && Object.values(country.value.borders)
  })

  const getBorderCountriesNames = computed(() => {
    return country.value.borderCountriesNames
  })

  const getRegionFilterText = computed(() => {
    const selectedOption = regionFilterOption.value
    return selectedOption === 'All' ? 'Filter by Region' : selectedOption
  })

  const getCountriesLength = computed(() => {
    return (countries.value && Object.keys(countries.value).length) || 0
  })

  const fetchCountriesStatusSuccess = computed(() => {
    return fetchCountriesStatus.value === SUCCESS
  })

  const fetchCountriesStatusError = computed(() => {
    return fetchCountriesStatus.value === ERROR
  })

  const fetchDetailsStatusSuccess = computed(() => {
    return fetchCountryDetailsStatus.value === SUCCESS
  })

  const fetchDetailsStatusError = computed(() => {
    return fetchCountryDetailsStatus.value === ERROR
  })

  const fetchBorderCountriesSuccess = computed(() => {
    return fetchBorderCountriesStatus.value === SUCCESS
  })

  const fetchBorderCountriesError = computed(() => {
    return fetchBorderCountriesStatus.value === ERROR
  })

  const getLastSearchedText = computed(() => lastSearched.value)

  return {
    /* --------------------------------- Actions -------------------------------- */
    fetchAllCountries,
    fetchCountriesByName,
    fetchCountriesByRegion,
    fetchCountryDetails,
    fetchBorderCountriesNames,
    setRegionFilterOption,

    /* --------------------------------- Getters -------------------------------- */
    getSortedCountries,
    getCountryDetails,
    getBorderCountriesNames,
    getRegionFilterText,
    getCountriesLength,
    getLastSearchedText,

    fetchCountriesStatusSuccess,
    fetchCountriesStatusError,
    fetchDetailsStatusSuccess,
    fetchDetailsStatusError,
    fetchBorderCountriesSuccess,
    fetchBorderCountriesError,
  }
})
