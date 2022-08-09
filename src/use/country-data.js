import { computed } from 'vue'

export default function useCountryData(props) {
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
    return props.subregion ? props.subregion : 'None'
  })

  const getPopulation = computed(() => {
    return props.population.toLocaleString('en-US')
  })

  const getCapital = computed(() => {
    return props.capital ? props.capital[0] : 'None'
  })

  const getTopLevelDomain = computed(() => {
    return props.tld.join(', ')
  })

  const getLanguages = computed(() => {
    return Object.values(props.languages).join(', ')
  })

  const getNativeName = computed(() => {
    return Object.values(props.name.nativeName)
      .map((nativeName) => nativeName.common)
      .join(', ')
  })

  const getCurrencies = computed(() => {
    if (props.currencies) {
      return Object.values(props.currencies)
        .map((currency) => currency.name)
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
