<template>
  <a @click="searchCountriesByRegion" class="dropdown-item" href="#">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'AppDropdownItem',
  methods: {
    searchCountriesByRegion(e) {
      this.$emit('search-countries-by-region', e.target.innerText)
    },
  },
}
</script>

<style lang="scss">
.dropdown-item {
  padding: 1rem 0;
  padding-left: 1rem;

  &:hover {
    background-color: #eee;
  }
}
</style>
