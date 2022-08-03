<template>
  <main class="container">
    <section class="search-wrapper">
      <searchBar />
      <filterSelect />
    </section>
    <section class="countries"></section>
  </main>
</template>

<script>
import searchBar from '@/components/searchBar.vue'
import filterSelect from '@/components/filterSelect.vue'
// import countryCard from '@/components/countryCard.vue'
import CountriesService from '@/services/CountriesService'

export default {
  name: 'HomeView',
  components: {
    searchBar,
    filterSelect,
    // countryCard,
  },
  data() {
    return {
      countries: null,
    }
  },
  created() {
    CountriesService.getCountries()
      .then((res) => res.data)
      .then(console.log)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
