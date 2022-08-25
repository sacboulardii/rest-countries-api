import { computed, Ref } from 'vue'
import { DetailFields } from '@/types/CountryFields'

/**
 * Composable Function
 * @desc Encapsulates reusable logic for accessing country objects properties
 **/
export default function useCountryData(props: { country: DetailFields }): {
  [key: string]: Ref<string>
} {
  const getName = computed(() => props.country.name.common)
  const getImage = computed(() => props.country.flags.svg)
  const getRegion = computed(() => props.country.region)
  const getSubRegion = computed(() => props.country.subregion)
  const getCapital = computed(
    () => props.country.capital && props.country.capital[0]
  )
  const getTopLevelDomain = computed(
    () => props.country.tld && props.country.tld.join(', ')
  )

  const getPopulation = computed(
    () =>
      (props.country.population &&
        props.country.population.toLocaleString('en-US')) ||
      '0'
  )

  const getLanguages = computed(
    () =>
      props.country.languages &&
      Object.values(props.country.languages).join(', ')
  )

  const getNativeName = computed(
    () =>
      props.country.name.nativeName &&
      [
        ...new Set(
          Object.values(props.country.name.nativeName).map(
            (nativeName: any) => nativeName.common
          )
        ),
      ].join(', ')
  )

  const getCurrencies = computed(
    () =>
      props.country.currencies &&
      Object.values(props.country.currencies)
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
