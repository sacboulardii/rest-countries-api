import axios, { AxiosResponse, AxiosInstance } from 'axios'
import { CountryCardFields, DetailFields } from '@/types/CountryFields'

/* Creating an axios instance with the baseURL and headers. */
export const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const responseBody = (response: AxiosResponse) => response.data

/* Creating a query string that will be used to get the fields that we want from the API. */
const cardsFilterQuery: string =
  '?fields=' + 'name,flags,population,region,capital'

const detailsFilterQuery: string =
  '?fields=' +
  'name,flags,population,region,capital,subregion,languages,currencies,tld,borders'

export default {
  /* Fetching all the countries from the API. */
  fetchAll(): Promise<AxiosResponse<CountryCardFields>> {
    return apiClient.get('/all' + cardsFilterQuery)
  },
  /* Fetching the country by name. */
  fetchByName(name: string): Promise<AxiosResponse<CountryCardFields>> {
    return apiClient.get(`/name/${name}` + cardsFilterQuery)
  },
  /* Fetching the countries by region. */
  fetchByRegion(region: string): Promise<AxiosResponse<CountryCardFields>> {
    if (region === 'All') return apiClient.get('/all' + cardsFilterQuery)

    return apiClient.get(`/region/${region}` + cardsFilterQuery)
  },
  /* Fetching the details of the country by name. */
  fetchDetails(name: string): Promise<AxiosResponse<DetailFields>> {
    return apiClient.get(`/name/${name}`)
  },
  /* Fetching the border countries of the country. */
  fetchBorderCountries(borders: string): Promise<AxiosResponse<DetailFields>> {
    const bordersCodes = Object.values(borders)
    return apiClient.get('/alpha?codes=' + bordersCodes.join(','))
  },
}
