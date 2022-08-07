<template>
  <ul class="border-countries__list" v-if="borderCountries">
    <li
      v-for="country in borderCountries"
      class="border-countries__item"
      :key="country"
    >
      {{ country }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'BorderCountriesList',
  computed: {
    borderCountries() {
      let fetchedBorderCountries =
        this.$store.state.country.borderCountriesNames
      return fetchedBorderCountries ? fetchedBorderCountries : null
    },
  },
}
</script>

<style></style>
