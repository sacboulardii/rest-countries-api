<template>
  <button class="input dropdown dropdown__button">
    {{ store.getFilterText }}
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
