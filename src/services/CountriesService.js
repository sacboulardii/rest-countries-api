import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  fetchCountries() {
    return apiClient.get('/all')
  },
  fetchCountryByName(name) {
    // Return all countries if search query is empty
    if (name === '') return apiClient.get('/all')
    //console.log('RECEIVED COUNTRY NAME', name)
    return apiClient.get(`/name/${name}`)
  },
  fetchCountryByRegion(region) {
    return apiClient.get(`/region/${region}`)
  },
  fetchBorderCountries(borders) {
    let bordersCodes = Object.values(borders)
    return apiClient.get(`/alpha?codes=${bordersCodes.join(',')}`)
  },
}
