import axios, { AxiosResponse, AxiosInstance } from 'axios'

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

/**
 * It takes an array of field names and returns a filter query string
 * @param {string[]} fields - The fields you want to get from the API.
 * @return {string}
 */
const getFilterQuery = (fields: string[]): string =>
  '?fields=' + fields.join(',')

/* Creating a query string that will be used to get the fields that we want from the API. */
const cardsFilterQuery: string = getFilterQuery([
  'name',
  'flags',
  'population',
  'region',
  'capital',
])

const detailsFilterQuery: string = getFilterQuery([
  ...cardsFilterQuery,
  'subregion',
  'languages',
  'currencies',
  'tld',
  'borders',
])

/* Defining the shape of the data that we are getting from the API. */
interface CountryCardFields {
  flags: {
    png: string
    svg: string
  }
  name: {
    common: string
    nativeName: {
      [key: string]: {
        official?: string
        common: string
      }
    }
    official: string
  }
  population: number
  region: string
}

interface DetailFields extends CountryCardFields {
  borders: string[]
  capital: string[]
  currencies: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  languages: {
    [key: string]: string
  }
  subregion: string
  tld: string[]
}

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
    return apiClient.get(`/name/${name}` + detailsFilterQuery)
  },
  /* Fetching the border countries of the country. */
  fetchBorderCountries(borders: string): Promise<AxiosResponse<DetailFields>> {
    const bordersCodes = Object.values(borders)
    return apiClient.get('/alpha?codes=' + bordersCodes.join(','))
  },
}
