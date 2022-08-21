<template>
  <a @click="searchByRegion" class="dropdown__item" href="#">
    <slot />
  </a>
</template>

<script setup>
// Vuex store
// import { useStore } from 'vuex'
// const store = useStore()

// Fetch countries by region
// const searchByRegion = (e) => {
//   store.dispatch('countries/getCountryByRegion', e.target.innerText)
// }
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
