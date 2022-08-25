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
    return props.name.common ? props.name.common : 'None'
  })

  const getImage = computed(() => {
    return props.flags.svg
  })

  const getRegion = computed(() => {
    return props.region ? props.region : 'None'
  })

  const getSubRegion = computed(() => {
    return props.subregion ? props.subregion : 'None'
  })

  const getPopulation = computed(() => {
    return props.population ? props.population.toLocaleString('en-US') : 'None'
  })

  const getCapital = computed(() => {
    return props.capital ? props.capital[0] : 'None'
  })

  const getTopLevelDomain = computed(() => {
    return props.tld ? props.tld.join(', ') : 'None'
  })

  const getLanguages = computed(() => {
    return props.languages ? Object.values(props.languages).join(', ') : 'None'
  })

  const getNativeName = computed(
    () =>
      [
        ...new Set(
          props.name.nativeName &&
            Object.values(props.name.nativeName).map(
              (nativeName: any) => nativeName.common
            )
        ),
      ].join(', ') || 'None'
  )

  const getCurrencies = computed(() => {
    if (props.currencies) {
      return Object.values(props.currencies)
        .map((currency: any) => currency.name)
        .join(', ')
    } else {
      return 'None'
    }
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
