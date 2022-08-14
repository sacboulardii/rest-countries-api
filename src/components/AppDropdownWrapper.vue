<template>
  <AppDropdown class="filter-dropdown">
    <template v-slot:toggler>
      <AppDropdownButton />
    </template>
    <AppDropdownContent>
      <AppDropdownItem
        v-for="region in [
          'All',
          'Africa',
          'America',
          'Asia',
          'Europe',
          'Oceania',
        ]"
        :key="region"
      >
        {{ region }}
      </AppDropdownItem>
    </AppDropdownContent>
  </AppDropdown>
</template>

<script setup>
// Components
import AppDropdown from './AppDropdown.vue'
import AppDropdownContent from './AppDropdownContent.vue'
import AppDropdownItem from './AppDropdownItem.vue'
import AppDropdownButton from './AppDropdownButton.vue'
</script>

<style lang="scss" scoped>
.filter-dropdown {
  @media (min-width: 768px) {
    width: 30%;
  }
}
</style>
