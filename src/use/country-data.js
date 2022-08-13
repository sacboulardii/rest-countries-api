import { computed } from 'vue'

export default function useCountryData(props) {
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

  const getNativeName = computed(() => {
    if (props.name.nativeName) {
      return Object.values(props.name.nativeName)
        .map((nativeName) => nativeName.common)
        .join(', ')
    } else {
      return props.name.common ? props.name.common : 'None'
    }
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
