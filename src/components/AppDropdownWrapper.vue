<template>
  <AppDropdown>
    <template v-slot:toggler>
      <AppDropdownButton />
    </template>
    <AppDropdownContent>
      <AppDropdownItem
        v-for="region in RegionFilterOption"
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

import { RegionFilterOption } from '@/constants/appConstants'
</script>
