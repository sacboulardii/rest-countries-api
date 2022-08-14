import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

/**
 * Data fields
 * @desc Passed to API to filter request output and prevent unnecessary data
 */
const cardsFields = 'name,flags,population,region,capital'

export default {
  fetchCountries() {
    return apiClient.get(`/all?fields=${cardsFields}`)
  },
  fetchCountryByName(name) {
    if (name) return apiClient.get(`/name/${name}`)
  },
  fetchCountryByRegion(region) {
    // Return all countries if region filter option is All
    if (region === 'All') return apiClient.get(`/all?fields=${cardsFields}`)
    return apiClient.get(`/region/${region}?fields=${cardsFields}`)
  },
  fetchBorderCountries(borders) {
    let bordersCodes = Object.values(borders)
    return apiClient.get(`/alpha?codes=${bordersCodes.join(',')}`)
  },
}
