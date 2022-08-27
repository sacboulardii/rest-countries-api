<template>
  <div class="theme-toggle" @click="store.switchTheme">
    <!-- Render the right theme toggle icon conditionally based on current theme -->
    {{ store.getNextTheme }} Mode
    <img
      v-if="store.getCurrentTheme === 'experimental'"
      class="theme-toggle__icon"
      src="@/assets/sun.svg"
      alt="Light Theme"
    />
    <img
      v-else-if="store.getCurrentTheme === 'light'"
      class="theme-toggle__icon"
      src="@/assets/moon.svg"
      alt="Moon Theme"
    />
    <img
      v-else
      class="theme-toggle__icon"
      src="@/assets/brush.svg"
      alt="Experimental Theme"
    />
    <!-- endloop -->
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store/theme'
const store = useThemeStore()
</script>

<style lang="scss" scoped>
.theme-toggle {
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: 0.375rem;
  font-size: $font-sm;
  text-transform: capitalize;

  &__icon {
    height: 1.2rem;
  }
}
</style>
