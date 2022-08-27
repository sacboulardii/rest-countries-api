<template>
  <button class="input dropdown dropdown__button">
    {{ store.getRegionFilterText }}
    <img
      v-if="themeStore.getCurrentTheme === 'light'"
      src="@/assets/expand_more_black_24dp.svg"
      class="dropdown__toggle"
      alt="Select Region"
    />
    <img
      v-else
      src="@/assets/expand_more_white_24dp.svg"
      class="dropdown__toggle"
      alt="Select Region"
    />
  </button>
</template>

<script setup>
import { useCountriesStore } from '@/store/countries'
import { useThemeStore } from '@/store/theme'

const store = useCountriesStore()
const themeStore = useThemeStore()
</script>

<style lang="scss">
.dropdown__button {
  position: relative;
  transition: color 0.2s ease, background-color 0.2s ease;
}

.dropdown__toggle {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  color: var($--theme-angle-icon-color);

  width: 1.125rem;
  right: 1.25rem;
}
</style>
