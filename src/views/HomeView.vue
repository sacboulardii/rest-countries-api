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
.button {
  background-color: var($--theme-foreground);
  border: none;
  border-radius: 0.25rem;

  box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);

  color: var($--theme-font-color);

  width: 60%;
  padding: 1.125rem;
  position: relative;
  text-align: left;
}

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
