<template>
  <a @click="store.fetchCountriesByRegion" class="dropdown__item" href="#">
    <slot />
  </a>
</template>

<script setup>
import { useCountriesStore } from '@/store/countries'

const store = useCountriesStore()
</script>

<style lang="scss">
.dropdown__item {
  color: var($--theme-font-color);
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  &:hover {
    background-color: var($--theme-hover-color);
  }
}
</style>
