function sortCountriesAlphabetically(countriesObject: any[]) {
  return countriesObject.sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  )
}

function getNextTheme(currentTheme: string) {
  return (
    (currentTheme === 'light' && 'dark') ||
    (currentTheme === 'dark' && 'wolf') ||
    'light'
  )
}

export { sortCountriesAlphabetically, getNextTheme }
