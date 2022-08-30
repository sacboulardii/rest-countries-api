<template>
  <main class="container">
    <section class="search-section">
      <SearchBar />
      <AppDropdownWrapper />
    </section>

    <section class="countries-results">
      <CountriesList />
    </section>

    <ScrollToTop />
  </main>
</template>

<script setup>
import SearchBar from '@/components/SearchBar.vue'
import CountriesList from '@/components/CountriesList.vue'
import AppDropdownWrapper from '@/components/AppDropdownWrapper.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'

import { useRoute, onBeforeRouteLeave } from 'vue-router'
import { onBeforeMount } from 'vue'
import { useCountriesStore } from '@/store/countries'

// Route
const route = useRoute()

// Countries Store
const store = useCountriesStore()

onBeforeRouteLeave((to) => {
  const shouldRefreshToHome = to.params.clear
  shouldRefreshToHome && store.fetchAllCountries()
})

// Fetch countries
onBeforeMount(() => {
  store.fetchAllCountries()
  route.params.region && store.filterCountriesByRegion(route.params.region)
  route.params.search && store.getCountryByName(route.params.search)
  !Object.keys(route.params).length &&
    !store.getCountriesLength &&
    store.fetchAllCountries()
})
</script>

<style scoped lang="scss">
.search-section {
  padding-top: 1.875rem;
  @include flex($direction: column, $align: center);

  @include second-to-last-child {
    margin-top: 2.5rem;

    @media (min-width: 768px) {
      margin-top: 0;
    }
  }

  @media (min-width: 768px) {
    @include flex(space-between);
  }
}
</style>
