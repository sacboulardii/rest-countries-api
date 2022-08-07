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
  getCountries() {
    return apiClient.get('/all')
  },
  getCountryByName(name) {
    // console.log('RECEIVED COUNTRY NAME', name)
    return apiClient.get(`/name/${name}`)
  },
  getCountryByRegion(region) {
    return apiClient.get(`/region/${region}`)
  },
  getBorderCountries(borders) {
    let bordersCodes = Object.values(borders)
    return apiClient.get(`/alpha?codes=${bordersCodes.join(',')}`)
  },
}
