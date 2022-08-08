<template>
  <main class="container">
    <section class="search-section">
      <SearchBar @search-countries-by-query="searchByName" />
      <AppDropdownWrapper />
    </section>
    <section class="countries-results">
      <ul class="list">
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
import CountryCard from '@/components/CountryCard.vue'
import AppDropdownWrapper from '@/components/AppDropdownWrapper.vue'

export default {
  name: 'HomeView',
  components: {
    SearchBar,
    CountryCard,
    AppDropdownWrapper,
  },
  computed: {
    countries() {
      return this.$store.state.countries
    },
  },
  created() {
    this.$store.dispatch('fetchCountries')
  },
  methods: {
    searchByName(query) {
      this.$store.dispatch('fetchCountryByName', query)
    },
  },
}
</script>

<style scoped lang="scss">
.search-section {
  > * + * {
    margin-top: 2.5rem;
  }
}

.list {
  margin-top: 2rem;
  padding: 0 2.5rem;
  > * + * {
    margin-top: 3rem;
  }
}

main {
  background-color: var($--theme-background);
  padding-top: 1.5rem;
  padding-bottom: 3rem;
}
</style>
