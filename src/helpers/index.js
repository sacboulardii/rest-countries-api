function sortCountriesList(countriesList) {
  return countriesList.sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  )
}

export default sortCountriesList
