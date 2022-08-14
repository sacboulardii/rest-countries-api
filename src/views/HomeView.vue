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
const countries = computed(() => store.state.countries.countriesList)

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
  !Object.keys(route.params).length && store.dispatch('countries/getCountries')
})
</script>

<style scoped lang="scss">
.search-section {
  > * + * {
    margin-top: 2.5rem;
  }
}

.list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(auto-fit, 320px);
  grid-column-gap: 2%;
  grid-row-gap: 2rem;

  margin-top: 2rem;
  padding: 0 2.5rem;

  > * + * {
    margin-top: 3rem;

    @media (min-width: 500px) {
      margin-top: 0;
    }
  }
}

main {
  background-color: var($--theme-background);
  padding-top: 1.5rem;
  padding-bottom: 3rem;
}
</style>
