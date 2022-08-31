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

<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import CountriesList from '@/components/CountriesList.vue'
import AppDropdownWrapper from '@/components/AppDropdownWrapper.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'

import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { onBeforeMount } from 'vue'
import { useCountriesStore } from '@/store/countries'

// Route
const route = useRoute()

// Countries Store
const store = useCountriesStore()

onBeforeRouteUpdate((to) => {
  const shouldRefreshToHome = to.params.clear

  if (shouldRefreshToHome) {
    store.setRegionFilterOption('All')
    store.fetchAllCountries()
  }
})

// Fetch countries
onBeforeMount(() => {
  const regionParam = route.params.region as string
  const searchParam = route.params.search as string

  regionParam && store.fetchCountriesByRegion(regionParam)
  searchParam && store.fetchCountriesByName(searchParam)

  !regionParam &&
    !searchParam &&
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
