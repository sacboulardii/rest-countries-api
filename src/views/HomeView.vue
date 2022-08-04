<template>
  <main class="container">
    <section class="search-wrapper">
      <SearchBar @search-countries-by-query="searchByName" />
      <FilterSelect />
      <AppDropdown>
        <template v-slot:toggler>
          <button class="dropdown-button">
            Click me
            <svg
              class="dropdown-arrow"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
              ></path>
            </svg>
          </button>
        </template>
        <AppDropdownContent>
          <AppDropdownItem>Action 1</AppDropdownItem>
          <AppDropdownItem>Action 2</AppDropdownItem>
          <AppDropdownItem>Action 3</AppDropdownItem>
        </AppDropdownContent>
      </AppDropdown>
    </section>
    <section class="countries">
      <ul class="countries__list">
        <CountryCard
          v-for="(country, index) in countries"
          :country="country"
          :key="index"
        />
      </ul>
    </section>
  </main>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import FilterSelect from '@/components/FilterSelect.vue'
import CountryCard from '@/components/CountryCard.vue'
import CountriesService from '@/services/CountriesService'
import AppDropdown from '@/components/AppDropdown.vue'
import AppDropdownContent from '@/components/AppDropdownContent.vue'
import AppDropdownItem from '@/components/AppDropdownItem.vue'

export default {
  name: 'HomeView',
  components: {
    SearchBar,
    FilterSelect,
    CountryCard,
    AppDropdown,
    AppDropdownContent,
    AppDropdownItem,
  },
  data() {
    return {
      apiCountries: null,
    }
  },
  computed: {
    countries: {
      get() {
        return this.apiCountries
      },
      set(countries) {
        this.apiCountries = countries
      },
    },
  },
  created() {
    CountriesService.getCountries().then((res) => (this.countries = res.data))
  },
  methods: {
    searchByName(query) {
      CountriesService.getCountries().then(
        (res) =>
          (this.countries = res.data.filter((country) =>
            country.name.common
              .toLowerCase()
              .split(' ')
              .some((name) => name.startsWith(query.toLowerCase()))
          ))
      )
    },
  },
}
</script>

<style scoped lang="sass">
.dropdown-button
  background-color: #fff
  border: none
  border-radius: 0.25rem

  box-shadow:         0px 2px 8px 4px rgba(0,0,0,0.05)
  -webkit-box-shadow: 0px 2px 8px 4px rgba(0,0,0,0.05)
  -moz-box-shadow:    0px 2px 8px 4px rgba(0,0,0,0.05)

  width: 60%
  padding: 1rem
  position: relative
  text-align: left

.dropdown-arrow
  position: absolute
  top: 50%
  right: 0.5rem
  transform: translateY(-50%)
  width: 1.5rem

.search-wrapper
  > * + *
    margin-top: 2.5rem

.countries__list
  margin-top: 2rem
  padding: 0 2.5rem

main
  background-color: $very-light-gray-l
  padding-top: 1.5rem
  padding-bottom: 3rem
</style>
