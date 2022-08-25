<template>
  <div class="theme-toggle" @click="store.switchTheme">
    <!-- Render the right theme toggle icon conditionally based on current theme -->
    <font-awesome-icon
      v-if="store.getCurrentTheme === 'light'"
      icon="fa-moon"
      class="theme-toggle__icon"
    />
    <font-awesome-icon
      v-else-if="store.getCurrentTheme === 'wolf'"
      icon="fa-solid fa-lightbulb"
      class="theme-toggle__icon"
    />
    <img
      v-else
      src="@/assets/wolf-svgrepo-com.svg"
      alt="wolf"
      class="theme-toggle__icon"
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
  font-size: $font-sm;
  transition: transform 0.2s ease, opacity 0.2s ease, color 0.2s ease;

  &__icon {
    height: 1rem;
  }
}
</style>
