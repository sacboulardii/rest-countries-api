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
    return apiClient.get(`/name/${name}`)
  },
  getCountryByRegion(region) {
    return apiClient.get(`/region/${region}`)
  },
  getBorderCountries() {
    return 'Border Countries'
  },
}
