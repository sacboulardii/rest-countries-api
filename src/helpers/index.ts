import { DesignTheme } from '@/types/DesignTheme'

function sortCountries(countriesObject: any[]) {
  return countriesObject.sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  )
}

function getNextTheme(currentTheme: DesignTheme): DesignTheme {
  return (
    (currentTheme === 'light' && 'dark') ||
    (currentTheme === 'dark' && 'wolf') ||
    'light'
  )
}

export { sortCountries, getNextTheme }
