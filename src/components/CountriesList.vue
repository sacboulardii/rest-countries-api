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
    No results for “{{ store.getLastSearchedText }}”
    <span class="not-found__tip">Check your search for typos.</span>
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

.not-found {
  font-weight: bold;
  margin-top: 3rem;
  text-align: center;

  @media (min-width: 768px) {
    margin-top: 4rem;
  }

  @media (min-width: 1024px) {
    margin-top: 5rem;
  }

  &__tip {
    font-weight: initial;
    font-size: 12px;
    margin-top: 1rem;
    display: block;
  }
}
</style>
