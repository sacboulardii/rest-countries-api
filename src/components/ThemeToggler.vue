<template>
  <div class="theme-toggle" @click="store.switchTheme">
    <img
      :src="require(`../assets/${store.getNextTheme}_theme_icon.svg`)"
      class="theme-toggle__icon"
      :alt="`${store.getNextTheme} Theme`"
    />
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
