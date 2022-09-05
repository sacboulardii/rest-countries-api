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
  <Footer />
</template>

<script setup lang="ts">
import SearchBar from '@/components/SearchBar.vue'
import CountriesList from '@/components/CountriesList.vue'
import AppDropdownWrapper from '@/components/AppDropdownWrapper.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'
import Footer from '@/components/Footer.vue'

import {
  useRoute,
  onBeforeRouteUpdate,
  onBeforeRouteLeave,
  RouteLocationNormalized,
} from 'vue-router'

import { onBeforeMount } from 'vue'
import { useCountriesStore } from '@/store/countries'

// Route
const route = useRoute()

// Countries Store
const store = useCountriesStore()

onBeforeRouteLeave((to) => {
  handleRouteParams(to)
})

onBeforeRouteUpdate((to) => {
  handleRouteParams(to)
})

onBeforeMount(() => {
  handleRouteParams(route)
})

/**
 * It fetches countries based on the route params, and if there are no route params, it fetches all
 * countries
 */
function handleRouteParams(toRoute: RouteLocationNormalized) {
  const regionParam = toRoute.params.region as string
  const searchParam = toRoute.params.search as string
  const emptyParams = !regionParam && !searchParam
  const shouldRefreshToHome = toRoute.params.clear

  regionParam && store.fetchCountriesByRegion(regionParam)
  searchParam && store.fetchCountriesByName(searchParam)
  emptyParams && !store.getCountriesLength && store.fetchAllCountries()

  if (shouldRefreshToHome) {
    store.setRegionFilterOption('All')
    store.fetchAllCountries()
  }
}
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
