<template>
  <main class="container">
    <section class="search-section">
      <SearchBar @search-countries-by-query="searchByName" />
      <AppDropdown class="filter-dropdown">
        <template v-slot:toggler>
          <AppDropdownButton />
        </template>
        <AppDropdownContent>
          <AppDropdownItem
            v-for="region in ['Africa', 'America', 'Asia', 'Europe', 'Oceania']"
            :key="region"
            @search-countries-by-region="searchByRegion"
          >
            {{ region }}
          </AppDropdownItem>
        </AppDropdownContent>
      </AppDropdown>
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
import AppDropdown from '@/components/AppDropdown.vue'
import AppDropdownContent from '@/components/AppDropdownContent.vue'
import AppDropdownItem from '@/components/AppDropdownItem.vue'
import AppDropdownButton from '@/components/AppDropdownButton.vue'

export default {
  name: 'HomeView',
  components: {
    SearchBar,
    CountryCard,
    AppDropdown,
    AppDropdownContent,
    AppDropdownItem,
    AppDropdownButton,
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
    searchByRegion(region) {
      this.$store.dispatch('fetchCountryByRegion', region)
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
