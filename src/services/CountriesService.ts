import { AxiosResponse } from 'axios'
import { CountryCardFields, DetailFields } from '@/types/CountryFields'
import http from '@/api/api'
import {
  COUNTRY_CARD_FIELDS_QUERY,
  COUNTRY_DETAILS_FIELDS_QUERY,
} from '@/constants/appConstants'

const URLS: { [key: string]: string } = {
  fetchAllUrl: '/all',
  fetchByNameUrl: '/name/',
  fetchByCodeList: '/alpha?codes=',
  fetchByRegionUrl: '/region/',
}

export default {
  /* Fetching all the countries from the API. */
  fetchAll(): Promise<AxiosResponse<CountryCardFields>> {
    return http.get('/all' + COUNTRY_CARD_FIELDS_QUERY)
  },
  /* Fetching the country by name. */
  fetchByName(name: string): Promise<AxiosResponse<CountryCardFields>> {
    return http.get(`/name/${name}` + COUNTRY_CARD_FIELDS_QUERY)
  },
  /* Fetching the countries by region. */
  fetchByRegion(region: string): Promise<AxiosResponse<CountryCardFields>> {
    if (region === 'All') return http.get('/all')

    return http.get(`/region/${region}` + COUNTRY_CARD_FIELDS_QUERY)
  },
  /* Fetching the details of the country by name. */
  fetchDetails(name: string): Promise<AxiosResponse<DetailFields>> {
    return http.get(`/name/${name}` + COUNTRY_DETAILS_FIELDS_QUERY)
  },
  /* Fetching the border countries of the country. */
  fetchBorderCountries(borders: string): Promise<AxiosResponse<DetailFields>> {
    const bordersCodes = Object.values(borders)
    return http.get('/alpha?codes=' + bordersCodes.join(','))
  },
}
