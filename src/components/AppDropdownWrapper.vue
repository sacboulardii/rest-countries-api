<template>
  <AppDropdown>
    <template v-slot:toggler>
      <AppDropdownButton />
    </template>
    <AppDropdownContent>
      <AppDropdownItem
        v-for="region in [
          'All',
          'Africa',
          'Americas',
          'Asia',
          'Europe',
          'Oceania',
          'Antarctic',
        ]"
        :key="region"
        :region="region"
      />
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
