import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://restcountries.com/v2',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// const apiClient = axios.create({
//   baseURL: 'https://restcountries.com/v3.1',
//   withCredentials: false,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// })

export default {
  // API V2
  getCountries() {
    return apiClient.get('/all')
  },
  // API V3
  // getCountries() {
  //   return apiClient.get('/all')
  // },
  getCountryByName(name) {
    return apiClient.get(`/name/${name}`)
  },
  getCountryByRegion(region) {
    return apiClient.get(`/region/${region}`)
  },
}
