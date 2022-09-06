import { computed, Ref } from 'vue'
import { DetailFields } from '@/types/CountryFields'

/**
 * @desc Encapsulates reusable logic for accessing country objects properties
 * @returns A bunch of computed properties that are derived from the country data
 */
export default function useCountryData(country: any): {
  [key: string]: Ref<string>
} {
  console.log(country.name)
  const getName = computed(() => country.name.common)
  const getImage = computed(() => country.flags.svg)
  const getRegion = computed(() => country.region)
  const getSubRegion = computed(() => country.subregion)
  const getCapital = computed(() => country.capital && country.capital[0])
  const getTopLevelDomain = computed(
    () => country.tld && country.tld.join(', ')
  )

  const getPopulation = computed(
    () =>
      (country.population && country.population.toLocaleString('en-US')) || '0'
  )

  const getLanguages = computed(
    () => country.languages && Object.values(country.languages).join(', ')
  )

  const getNativeName = computed(
    () =>
      country.name.nativeName &&
      [
        ...new Set(
          Object.values(country.name.nativeName).map(
            (nativeName: any) => nativeName.common
          )
        ),
      ].join(', ')
  )

  const getCurrencies = computed(
    () =>
      country.currencies &&
      Object.values(country.currencies)
        .map((currency: any) => currency.name)
        .join(', ')
  )

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
