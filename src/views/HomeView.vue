<template>
  <main class="container">
    <section class="search-wrapper">
      <SearchBar />
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
      countries: null,
    }
  },
  created() {
    CountriesService.getCountries().then((res) => (this.countries = res.data))
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

h3
  margin: 40px 0 0

ul
  list-style-type: none
  padding: 0

li
  display: inline-block
  margin: 0 10px

a
  color: #42b983
</style>
