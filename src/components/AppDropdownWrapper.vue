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

<style lang="scss">
.filter-dropdown {
  width: 100%;
  max-width: 400px;

  @media (min-width: 768px) {
    max-width: 200px;
  }
}
</style>
