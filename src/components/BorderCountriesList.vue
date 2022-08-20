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
  align-items: center;
  justify-content: flex-start;

  row-gap: 0.875rem;
  column-gap: 0.625rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }

  &__item {
    text-align: center;
    min-width: 100px;
  }

  &__link {
    box-shadow: 0px 0px 5px 0px rgba(0, 0%, 0%, 0.2);
    display: block;
    font-size: 12px;

    &:hover,
    &:focus {
      transform: translateY(-0.2em);
      box-shadow: 0 0 0 1em rgba(#fff, 0);
      animation: pulse 0.4s;
    }
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 5px 0 rgba(0, 0%, 0%, 0.05);
  }
}
</style>
