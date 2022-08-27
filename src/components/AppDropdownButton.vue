<template>
  <button class="input dropdown dropdown__button">
    {{ store.getRegionFilterText }}
    <font-awesome-icon
      icon="fa-solid fa-chevron-down"
      class="dropdown__toggle"
    />
  </button>
</template>

<script setup>
import { useCountriesStore } from '@/store/countries'

const store = useCountriesStore()
</script>

<style lang="scss">
.dropdown__button {
  position: relative;
  transition: color 0.4s ease, background-color 0.4s ease;
}

.dropdown__toggle {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  color: var($--theme-angle-icon-color);

  width: 0.5rem;
  right: 1.25rem;
}
</style>
