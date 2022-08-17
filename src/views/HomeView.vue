<template>
  <main class="container">
    <section class="search-section">
      <SearchBar />
      <AppDropdownWrapper />
    </section>
    <!-- Lista de países -->
    <section class="countries-results">
      <ul v-if="!notFound" class="list">
        <CountryCard
          v-for="(country, index) in countries"
          v-bind="country"
          :key="index"
        />
      </ul>
      <!-- Mensagem de resultado não encontrado -->
      <p v-else>Nenhum resultado foi encotrado.</p>
    </section>
  </main>
</template>

<script>
export default {
  beforeRouteLeave(to, from, next) {
    if (to.params.clear) {
      this.$root.$store.dispatch('countries/getCountries')
    }
    next()
  },
}
</script>

<script setup>
import ENUM from '@/enums'

// Components
import SearchBar from '@/components/SearchBar.vue'
import CountryCard from '@/components/CountryCard.vue'
import AppDropdownWrapper from '@/components/AppDropdownWrapper.vue'

import { useStore } from 'vuex'
import { onBeforeMount, computed } from 'vue'
import { useRoute } from 'vue-router'

// Vuex store
const store = useStore()

// Route
const route = useRoute()

// Computed properties
const countries = computed(() => {
  if (store.state.api.apiState === ENUM.LOADED) {
    // Sort in alphabetical order
    let countries = store.state.countries.countriesList
    let sortedCountries = countries
      .slice()
      .sort((a, b) => a.name.common.localeCompare(b.name.common))
    return sortedCountries
  } else {
    return null
  }
})

const notFound = computed(() => {
  return (
    store.state.api.apiState === ENUM.ERROR &&
    store.state.countries.countriesList.length === 0
  )
})

// Fetch countries
onBeforeMount(() => {
  // Check if region param is true
  route.params.region &&
    store.dispatch('countries/getCountryByRegion', route.params.region)
  // Check if search param is true
  route.params.search &&
    store.dispatch('countries/getCountryByName', route.params.search)
  // Check if params object is empty
  !Object.keys(route.params).length &&
    !store.state.countries.countriesList &&
    store.dispatch('countries/getCountries')
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

.list {
  display: grid;
  grid-row-gap: 3rem;
  justify-items: center;

  margin-top: 3rem;
  @include padding-x(2.5rem);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5rem;
    padding: 0;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
