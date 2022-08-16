<template>
  <a @click="searchByRegion" class="dropdown-item" href="#">
    <slot />
  </a>
</template>

<script setup>
// Vuex store
import { useStore } from 'vuex'
const store = useStore()

// Fetch countries by region
const searchByRegion = (e) => {
  store.dispatch('countries/getCountryByRegion', e.target.innerText)
}
</script>

<style lang="scss">
.dropdown-item {
  color: var($--theme-font-color);
  @include padding-y(0.25rem);
  padding-left: 1rem;

  &:hover {
    background-color: #eee;
  }
}
</style>
