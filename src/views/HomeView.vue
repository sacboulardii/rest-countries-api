<template>
  <main class="container">
    <section class="search-wrapper">
      <searchBar />
      <filterSelect />
    </section>
    <section class="countries">
      <ul class="countries__list">
        <!-- <li v-for="country in countries">
          <countryCard></countryCard>
        </li> -->
      </ul>
    </section>
  </main>
</template>

<script>
import searchBar from '@/components/searchBar.vue'
import filterSelect from '@/components/filterSelect.vue'
// import countryCard from '@/components/countryCard.vue'

export default {
  name: 'HomeView',
  components: {
    searchBar,
    filterSelect,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
main
  background-color: var(--very-light-gray-l)
  padding-top: 3rem
  height: 100vh
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
