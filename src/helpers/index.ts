import { DesignTheme } from '@/types/DesignTheme'
import { CountryCardFields } from '@/types/CountryFields'

function sortCountries(countries: CountryCardFields[]) {
  return countries.sort((a, b) => a.name.common.localeCompare(b.name.common))
}

function getNextTheme(currentTheme: DesignTheme): DesignTheme {
  return (
    (currentTheme === 'light' && 'dark') ||
    (currentTheme === 'dark' && 'wolf') ||
    'light'
  )
}

export { sortCountries, getNextTheme }
