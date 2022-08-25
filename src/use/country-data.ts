import { computed, Ref } from 'vue'
import { DetailFields } from '@/types/CountryFields'

/**
 * Composable Function
 * @desc Encapsulates reusable logic for accessing country objects properties and extracting required data.
 **/
export default function useCountryData(props: DetailFields): {
  [key: string]: Ref<string>
} {
  const getName = computed(() => props.name.common)
  const getImage = computed(() => props.flags.svg)
  const getRegion = computed(() => props.region)
  const getSubRegion = computed(() => props.subregion)
  const getCapital = computed(() => props.capital && props.capital[0])
  const getTopLevelDomain = computed(() => props.tld && props.tld.join(', '))

  const getPopulation = computed(
    () => (props.population && props.population.toLocaleString('en-US')) || '0'
  )

  const getLanguages = computed(
    () => props.languages && Object.values(props.languages).join(', ')
  )

  const getNativeName = computed(
    () =>
      props.name.nativeName &&
      [
        ...new Set(
          Object.values(props.name.nativeName).map(
            (nativeName: any) => nativeName.common
          )
        ),
      ].join(', ')
  )

  const getCurrencies = computed(
    () =>
      props.currencies &&
      Object.values(props.currencies)
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
