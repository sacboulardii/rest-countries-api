<template>
  <ul v-if="borderCountriesNames" class="border-countries-list">
    <li v-for="country in borderCountriesNames" :key="country">
      <router-link
        class="btn border-countries-list__item"
        :to="{ name: 'detail', params: { countryName: country } }"
        >{{ country }}</router-link
      >
    </li>
  </ul>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const borderCountriesNames = computed(() => {
  let countries = store.state.countries.country.borderCountriesNames
  return countries ? countries : null
})
</script>

<style lang="scss" scoped>
.border-countries-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 1rem;
  margin-top: 1.5rem;

  &__item {
    display: inline-block;
    font-size: $font-xs;
  }
}
</style>
