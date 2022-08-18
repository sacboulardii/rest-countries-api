<template>
  <ul v-if="borderCountriesNames" class="border-countries-list">
    <li
      v-for="country in borderCountriesNames"
      :key="country"
      class="border-countries-list__item"
    >
      <router-link
        class="btn btn--sm border-countries-list__link"
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
  justify-content: start;

  row-gap: 1rem;
  column-gap: 0.625rem;

  margin-top: 1.5rem;

  &__item {
    text-align: center;
    min-width: calc(33.333% - 1.25rem);
  }

  &__link {
    box-shadow: 0px 0px 5px 0px hsl(0, 0, 0, 0.2);
    display: block;
    font-size: $font-xs;
  }
}
</style>
