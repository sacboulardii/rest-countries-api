function sortCountriesAlphabetically(countriesObject) {
  return countriesObject.sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  )
}

function getNextTheme(currentTheme) {
  return (
    (currentTheme === 'light' && 'dark') ||
    (currentTheme === 'dark' && 'wolf') ||
    'light'
  )
}

export { sortCountriesAlphabetically, getNextTheme }
