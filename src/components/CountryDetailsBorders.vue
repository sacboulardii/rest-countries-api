<template>
  <div
    v-if="store.fetchBorderCountriesSuccess"
    class="country-details__border-countries"
  >
    <h3 class="country-details__border-countries-title">Border Countries:</h3>
    <BorderCountriesList />
  </div>
</template>

<script setup lang="ts">
import BorderCountriesList from './BorderCountriesList.vue'
import { useCountriesStore } from '@/store/countries'

const store = useCountriesStore()
</script>

<style lang="scss">
.country-details {
  &__border-countries {
    grid-area: border-countries;

    display: flex;
    align-items: center;
    flex-wrap: wrap;

    row-gap: 1rem;

    &-title {
      font-size: $font-md;
      margin-right: 1rem;

      @media (min-width: 768px) {
        font-size: $font-sm;
      }
    }
  }
}
</style>
