import axios, { AxiosInstance } from 'axios'

const axiosParams = {
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080/api/'
      : 'https://restcountries.com/v3.1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

const axiosInstance = axios.create(axiosParams)

const api = (
  axios: AxiosInstance
): {
  [key: string]: (url: string, body?: any, config?: any) => Promise<any>
} => {
  return {
    get: (url, config) => axios.get(url, config),
    post: (url, body, config) => axios.post(url, body, config),
    patch: (url, body, config) => axios.patch(url, body, config),
    delete: (url, config) => axios.delete(url, config),
  }
}

export default api(axiosInstance)
