import { CountryCardFields } from '@/types/CountryFields'

/**
 * It takes an array of countries, sorts them alphabetically by their common name, and returns the
 * sorted array.
 * @returns An array of countries sorted by name.
 */
export default function sortCountries(countries: CountryCardFields[]) {
  return countries.sort((a, b) => a.name.common.localeCompare(b.name.common))
}
