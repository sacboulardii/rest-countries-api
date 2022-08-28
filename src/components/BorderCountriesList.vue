<template>
  <ul class="border-countries-list">
    <BorderCountriesListItem
      v-for="country in store.getBorderCountriesNames"
      :country="country"
      :key="country"
    />
  </ul>
</template>

<script setup>
import BorderCountriesListItem from '@/components/BorderCountriesListItem.vue'
import { useCountriesStore } from '@/store/countries'
const store = useCountriesStore()
</script>

<style lang="scss" scoped>
.border-countries-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;

  row-gap: 0.875rem;
  column-gap: 0.625rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
}
</style>
