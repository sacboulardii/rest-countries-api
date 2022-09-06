import { computed, ComputedRef } from 'vue'
import { DetailFields } from '@/types/CountryFields'

/**
 * @desc Encapsulates reusable logic for accessing country objects properties
 * @returns A bunch of computed properties that are derived from the country data
 */
export default function useCountryData(country: DetailFields): {
  [key: string]: ComputedRef<any>
} {
  const getName = computed(() => country.name.common)
  const getImage = computed(() => country.flags.svg)
  const getRegion = computed(() => country.region)
  const getSubRegion = computed(() => country.subregion)
  const getCapital = computed(() => country.capital && country.capital[0])
  const getTopLevelDomain = computed(() => country.tld)
  const getPopulation = computed(() => country.population)
  const getLanguages = computed(() => country.languages)
  const getNativeName = computed(() => country.name.nativeName)
  const getCurrencies = computed(() => country.currencies)

  return {
    getName,
    getImage,
    getRegion,
    getSubRegion,
    getCapital,
    getTopLevelDomain,
    getPopulation,
    getLanguages,
    getNativeName,
    getCurrencies,
  }
}
