import axios from 'axios'

/* Creating an axios instance with the baseURL and headers. */
export const apiClient = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

/* A variable that is used to specify the fields that we want to get from the API to fill the cards. */
const cardsFields = 'name,flags,population,region,capital'
/* A variable that is used to specify the fields that we want to get from the API to fill the details
page. */
const detailsFields =
  cardsFields + ',' + 'subregion,languages,currencies,tld,borders'

export default {
  fetchAll() {
    return apiClient.get(`/all?fields=${cardsFields}`)
  },
  fetchByName(name) {
    if (name) return apiClient.get(`/name/${name}?fields=${cardsFields}`)
  },
  fetchByRegion(region) {
    if (region === 'All') return apiClient.get(`/all?fields=${cardsFields}`)
    return apiClient.get(`/region/${region}?fields=${cardsFields}`)
  },
  fetchDetails(name) {
    if (name) return apiClient.get(`/name/${name}?fields=${detailsFields}`)
  },
  fetchBorderCountries(borders) {
    let bordersCodes = Object.values(borders)
    return apiClient.get(`/alpha?codes=${bordersCodes.join(',')}`)
  },
}
