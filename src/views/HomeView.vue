<template>
  <main class="container">
    <section class="search-section">
      <SearchBar />
      <AppDropdownWrapper />
    </section>
    <!-- Lista de países -->
    <section class="countries-results">
      <ul v-if="store.isCountriesObjectLoaded" class="countries-results__list">
        <CountryCard
          v-for="(country, index) in store.getSortedCountries"
          v-bind="{ country: country }"
          :key="index"
        />
      </ul>
      <!-- Mensagem de resultado não encontrado -->
      <p class="not-found" v-if="store.isResourceUnavailable">
        Nenhum resultado foi encotrado.
      </p>
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
// Components
import SearchBar from '@/components/SearchBar.vue'
import CountryCard from '@/components/CountryCard.vue'
import AppDropdownWrapper from '@/components/AppDropdownWrapper.vue'

import { useRoute } from 'vue-router'
import { onBeforeMount } from 'vue'
import { useCountriesStore } from '@/store/countries'

// Route
const route = useRoute()

// Countries Store
const store = useCountriesStore()

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

.countries-results__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, $card-x);
  row-gap: 2.5rem;
  column-gap: 2.5rem;
  justify-content: center;

  margin-top: 3rem;

  @media (min-width: 768px) {
    justify-content: space-between;
    column-gap: 4rem;
    row-gap: 4rem;
  }

  @media (min-width: 1440px) {
    column-gap: 5.3333rem;
    row-gap: 5.3333rem;
  }
}
</style>
