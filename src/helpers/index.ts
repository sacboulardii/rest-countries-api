import { DesignTheme } from '@/types/DesignTheme'
import { CountryCardFields } from '@/types/CountryFields'

/**
 * It takes an array of countries, sorts them alphabetically by their common name, and returns the
 * sorted array.
 * @returns An array of countries sorted by name.
 */
function sortCountries(countries: CountryCardFields[]) {
  return countries.sort((a, b) => a.name.common.localeCompare(b.name.common))
}

/**
 * If the current theme is light, return dark, if the current theme is dark, return wolf, otherwise
 * return light
 * @param {DesignTheme} currentTheme - DesignTheme - this is the current theme that the user is using.
 * @returns The next theme in the sequence.
 */
function getNextTheme(currentTheme: DesignTheme): DesignTheme {
  return (
    (currentTheme === 'light' && 'dark') ||
    (currentTheme === 'dark' && 'wolf') ||
    'light'
  )
}

export { sortCountries, getNextTheme }
