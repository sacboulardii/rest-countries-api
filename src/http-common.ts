import axios, { AxiosInstance } from 'axios'

/* Creating an axios instance with the baseURL and headers. */
const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default apiClient
