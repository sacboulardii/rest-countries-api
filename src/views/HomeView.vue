<template>
  <main class="container">
    <section class="search-section">
      <SearchBar />
      <AppDropdownWrapper />
    </section>
    <!-- Lista de países -->
    <section class="countries-results">
      <ul v-if="!notFound" class="countries-results__list">
        <CountryCard
          v-for="(country, index) in countries"
          v-bind="country"
          :key="index"
        />
      </ul>
      <!-- Mensagem de resultado não encontrado -->
      <p class="not-found" v-else>Nenhum resultado foi encotrado.</p>
    </section>
    <font-awesome-icon
      id="scroll-to-top"
      v-scroll-to="'.header'"
      icon="fa-solid fa-circle-chevron-up"
    />
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
// import ENUM from '@/enums'

// Components
import SearchBar from '@/components/SearchBar.vue'
import CountryCard from '@/components/CountryCard.vue'
import AppDropdownWrapper from '@/components/AppDropdownWrapper.vue'

import { onBeforeMount } from 'vue'
// import { useRoute } from 'vue-router'
import { useCountriesStore } from '@/store/apiCountries'

// Route
// const route = useRoute()

// Computed properties
// const countries = computed(() => {
// if (store.state.api.apiState === ENUM.LOADED) {
// Sort in alphabetical order
// let countries = store.state.countries.countriesList
// let sortedCountries = countries
// .slice()
// .sort((a, b) => a.name.common.localeCompare(b.name.common))
//     return sortedCountries
//   } else {
//     return null
//   }
// })

// const notFound = computed(() => {
//   return (
//     store.state.api.apiState === ENUM.ERROR &&
//     store.state.countries.countriesList.length === 0
//   )
// })

// Fetch countries
onBeforeMount(() => {
  const store = useCountriesStore()
  console.log(store)
  // Check if region param is true
  // route.params.region &&
  //   store.dispatch('countries/getCountryByRegion', route.params.region)
  // Check if search param is true
  // route.params.search &&
  //   store.dispatch('countries/getCountryByName', route.params.search)
  // Check if params object is empty
  // !Object.keys(route.params).length &&
  //   !store.state.countries.countriesList &&
  //   store.dispatch('countries/getCountries')
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

.countries-results__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, $card-x);
  grid-row-gap: 3rem;
  grid-column-gap: calc((1440px - 9rem - (260px * 4)) / 3);
  justify-content: center;

  margin-top: 3rem;

  @media (min-width: 768px) {
    grid-row-gap: 5rem;
  }
}
</style>
