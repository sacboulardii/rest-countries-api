<template>
  <main class="container">
    <section class="search-wrapper">
      <SearchBar @search-countries-by-query="searchByName" />
      <FilterSelect />
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

export default {
  name: 'HomeView',
  components: {
    SearchBar,
    FilterSelect,
    CountryCard,
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
.search-wrapper
  > * + *
    margin-top: 2.5rem

.countries__list
  margin-top: 2rem
  padding: 0 2.5rem

main
  background-color: var(--very-light-gray-l)
  padding-top: 1.5rem
  padding-bottom: 3rem
</style>
