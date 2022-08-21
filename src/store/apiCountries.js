import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiClient } from '@/services/CountriesService'
// import ENUM from '@/enums'

export const useCountriesStore = defineStore('countries', () => {
  /* -------------------- STATE -------------------- */
  const countriesList = ref(null)
  const country = ref(null)
  const countryRegionFilter = ref('All')

  /* -------------------- ACTIONS -------------------- */
  function fetchAllCountries() {
    let requiredFields = 'name,flags,population,region,capital'

    apiClient
      .get(`/all?fields=${requiredFields}`)
      .then((response) => {
        countriesList.value = response.data
      })
      .catch((e) => {
        throw e
      })
  }

  /* -------------------- GETTERS -------------------- */
  const getCountriesList = computed(() => countriesList.value)

  return {
    countriesList,
    country,
    countryRegionFilter,
    fetchAllCountries,
    getCountriesList,
  }
})
