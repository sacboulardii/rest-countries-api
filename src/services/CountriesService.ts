import http from '@/api/api'

import {
  COUNTRY_CARD_FIELDS_QUERY,
  COUNTRY_DETAILS_FIELDS_QUERY,
} from '@/constants/appConstants'

const URLS: { [key: string]: string } = {
  fetchAllUrl: '/all',
  fetchByNameUrl: '/name/',
  fetchByCodeList: '/alpha?codes=',
  fetchByRegionUrl: '/region/',
}

export const fetchAll = () => {
  return http.get(URLS.fetchAllUrl + COUNTRY_CARD_FIELDS_QUERY)
}

export const fetchByName = (name: string) => {
  return http.get(URLS.fetchByNameUrl + name + COUNTRY_CARD_FIELDS_QUERY)
}

export const fetchByRegion = (region: string) => {
  if (region === 'All') return fetchAll()

  return http.get(URLS.fetchByRegionUrl + region + COUNTRY_CARD_FIELDS_QUERY)
}

export const fetchDetails = (name: string) => {
  return http.get(URLS.fetchByNameUrl + name + COUNTRY_DETAILS_FIELDS_QUERY)
}

export const fetchBorderCountries = (codes: string) => {
  return http.get(URLS.fetchByCodeList + codes)
}
