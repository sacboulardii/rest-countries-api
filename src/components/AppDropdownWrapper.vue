<template>
  <AppDropdown class="filter-dropdown">
    <template v-slot:toggler>
      <AppDropdownButton />
    </template>
    <AppDropdownContent>
      <AppDropdownItem
        v-for="region in ['Africa', 'America', 'Asia', 'Europe', 'Oceania']"
        :key="region"
        @search-countries-by-region="searchByRegion"
      >
        {{ region }}
      </AppDropdownItem>
    </AppDropdownContent>
  </AppDropdown>
</template>

<script>
import AppDropdown from './AppDropdown.vue'
import AppDropdownContent from './AppDropdownContent.vue'
import AppDropdownItem from './AppDropdownItem.vue'
import AppDropdownButton from './AppDropdownButton.vue'

export default {
  name: 'AppDropdownWrapper',
  components: {
    AppDropdown,
    AppDropdownContent,
    AppDropdownItem,
    AppDropdownButton,
  },
  methods: {
    searchByRegion(region) {
      this.$store.dispatch('fetchCountryByRegion', region)
    },
  },
}
</script>

<style></style>
