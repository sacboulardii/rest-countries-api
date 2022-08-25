import { computed, Ref } from 'vue'
import { DetailFields } from '@/types/CountryFields'

/**
 * Composable Function
 * @desc Encapsulates reusable logic for accessing country objects properties and extracting required data.
 **/
export default function useCountryData(props: DetailFields): {
  [key: string]: Ref<string>
} {
  const getName = computed(() => {
    return props.name.common
  })

  const getImage = computed(() => {
    return props.flags.svg
  })

  const getRegion = computed(() => {
    return props.region
  })

  const getSubRegion = computed(() => {
    return props.subregion
  })

  const getPopulation = computed(() => {
    return (props.population && props.population.toLocaleString('en-US')) || '0'
  })

  const getCapital = computed(() => {
    return props.capital && props.capital[0]
  })

  const getTopLevelDomain = computed(() => {
    return props.tld && props.tld.join(', ')
  })

  const getLanguages = computed(() => {
    return props.languages && Object.values(props.languages).join(', ')
  })

  const getNativeName = computed(() =>
    [
      ...new Set(
        props.name.nativeName &&
          Object.values(props.name.nativeName).map(
            (nativeName: any) => nativeName.common
          )
      ),
    ].join(', ')
  )

  const getCurrencies = computed(() => {
    return (
      props.currencies &&
      Object.values(props.currencies)
        .map((currency: any) => currency.name)
        .join(', ')
    )
  })

  return {
    getName,
    getImage,
    getRegion,
    getSubRegion,
    getPopulation,
    getCapital,
    getTopLevelDomain,
    getLanguages,
    getNativeName,
    getCurrencies,
  }
}
