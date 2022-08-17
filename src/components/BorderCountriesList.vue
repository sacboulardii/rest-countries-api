<template>
  <ul v-if="borderCountriesNames">
    <li v-for="country in borderCountriesNames" :key="country">
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

<style></style>
