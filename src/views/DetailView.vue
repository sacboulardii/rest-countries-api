<template>
  <main class="container">
    <router-link to="/"
      ><button style="padding: 1rem 2rem; margin: 1rem 0">back</button>
    </router-link>
    <CountryDetails v-bind="country" />
  </main>
</template>

<script>
import CountryDetails from '@/components/CountryDetails.vue'

export default {
  name: 'DetailView',
  props: ['countryName'],
  components: {
    CountryDetails,
  },
  created() {
    this.$store.dispatch('fetchCountryDetails', this.countryName)
    this.$store.dispatch('fetchBorderCountries', this.countryName)
  },
  computed: {
    country() {
      return this.$store.state.country
    },
    borderCountries() {
      return this.$store.state.country.borderCountries
    },
  },
}
</script>

<style></style>
