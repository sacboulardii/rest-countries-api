<template>
  <ul v-if="borderCountriesNames">
    <li
      class="btn border"
      v-for="country in borderCountriesNames"
      :key="country"
    >
      <router-link :to="{ name: 'detail', params: { countryName: country } }">{{
        country
      }}</router-link>
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
ul {
  // display: grid;
  // grid-column-gap: 1rem;
  // grid-template-columns: repeat(auto-fit, auto);
  // grid-template-rows: repeat(auto-fit, minmax(auto, 2rem));
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 1rem;
}

.border {
  font-size: 12px;
  display: inline-block;
}
</style>
