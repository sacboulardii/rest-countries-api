import { AxiosResponse } from 'axios'
import { CountryCardFields, DetailFields } from '@/types/CountryFields'
import http from '@/http-common'

const responseBody = (response: AxiosResponse) => response.data

/* Creating a query string that will be used to get the fields that we want from the API. */
const cardsFilterQuery: string =
  '?fields=' + 'name,flags,population,region,capital'

// const detailsFilterQuery: string =
//   '?fields=' +
//   'name,flags,population,region,capital,subregion,languages,currencies,tld,borders'

export default {
  /* Fetching all the countries from the API. */
  fetchAll(): Promise<AxiosResponse<CountryCardFields>> {
    return http.get('/all')
  },
  /* Fetching the country by name. */
  fetchByName(name: string): Promise<AxiosResponse<CountryCardFields>> {
    return http.get(`/name/${name}`)
  },
  /* Fetching the countries by region. */
  fetchByRegion(region: string): Promise<AxiosResponse<CountryCardFields>> {
    if (region === 'All') return http.get('/all')

    return http.get(`/region/${region}` + cardsFilterQuery)
  },
  /* Fetching the details of the country by name. */
  fetchDetails(name: string): Promise<AxiosResponse<DetailFields>> {
    return http.get(`/name/${name}`)
  },
  /* Fetching the border countries of the country. */
  fetchBorderCountries(borders: string): Promise<AxiosResponse<DetailFields>> {
    const bordersCodes = Object.values(borders)
    return http.get('/alpha?codes=' + bordersCodes.join(','))
  },
}
