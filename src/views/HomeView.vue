<template>
  <main class="container">
    <section class="search-wrapper">
      <SearchBar @search-countries-by-query="searchByName" />
      <AppDropdown>
        <template v-slot:toggler>
          <button class="dropdown-button">
            Filter by Region
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
import CountryCard from '@/components/CountryCard.vue'
import AppDropdown from '@/components/AppDropdown.vue'
import AppDropdownContent from '@/components/AppDropdownContent.vue'
import AppDropdownItem from '@/components/AppDropdownItem.vue'

export default {
  name: 'HomeView',
  components: {
    SearchBar,
    CountryCard,
    AppDropdown,
    AppDropdownContent,
    AppDropdownItem,
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
.dropdown-button {
  background-color: var($--theme-foreground);
  border: none;
  border-radius: 0.25rem;

  box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);

  color: var($--theme-font-color);

  width: 60%;
  padding: 1rem;
  position: relative;
  text-align: left;
}

.dropdown-arrow {
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
  width: 1.5rem;
}

.search-wrapper {
  > * + * {
    margin-top: 2.5rem;
  }
}

.countries__list {
  margin-top: 2rem;
  padding: 0 2.5rem;
}

main {
  background-color: var($--theme-background);
  padding-top: 1.5rem;
  padding-bottom: 3rem;
}
</style>
