<template>
  <main class="container">
    <section class="search-wrapper">
      <SearchBar />
      <FilterSelect />
    </section>
    <section class="countries">
      <ul class="countries__list">
        <CountryCard
          v-for="country in countries"
          :image="country.flags.png"
          :name="country.name.common"
          :population="country.population"
          :region="country.region"
          :capital="country.capital"
          :key="country.name.common"
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

    // CountriesService.getCountries()
    //   .then((res) => res.data)
    //   .then(console.log)
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
