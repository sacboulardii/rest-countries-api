<template>
  <div class="search-bar">
    <input
      type="text"
      class="search-bar__input"
      placeholder="Search for a country..."
      v-model="query"
      @keyup.enter="searchCountriesByQuery"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      query: '',
    }
  },
  methods: {
    searchCountriesByQuery() {
      this.$emit('search-countries-by-query', this.query)
    },
  },
}
</script>

<style lang="sass">
.search-bar__input
  border: none
  border-radius: 0.25rem

  box-shadow:         0px 2px 8px 4px rgba(0,0,0,0.05)
  -webkit-box-shadow: 0px 2px 8px 4px rgba(0,0,0,0.05)
  -moz-box-shadow:    0px 2px 8px 4px rgba(0,0,0,0.05)

  padding: 1rem
  width: 100%

::placeholder
  font-size: 12px
  opacity: 0.5
</style>
