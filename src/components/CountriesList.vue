<template>
  <transition-group
    tag="ul"
    v-if="store.isCountriesObjectLoaded"
    class="countries-results__list"
    name="fade"
    appear
  >
    <CountryCard
      v-for="(country, index) in store.getSortedCountries"
      v-bind="{ country: country }"
      :key="index"
    />
  </transition-group>
  <!-- Mensagem de resultado não encontrado -->
  <p class="not-found" v-if="store.isResourceUnavailable">
    Nenhum resultado foi encotrado.
  </p>
</template>

<script setup>
import CountryCard from '@/components/CountryCard.vue'
import { useCountriesStore } from '@/store/countries'

const store = useCountriesStore()
</script>

<style lang="scss" scoped>
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
