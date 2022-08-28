<template>
  <BaseButton :class="$style['btn-arrow-left']">
    <img
      v-if="store.getCurrentTheme === 'light'"
      src="@/assets/arrow_left_light.svg"
      :class="$style['icon']"
      alt="Back"
    />
    <img
      v-else
      src="@/assets/arrow_left_dark.svg"
      :class="$style['icon']"
      alt="Back"
    />
    <slot />
  </BaseButton>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { useThemeStore } from '@/store/theme'

const store = useThemeStore()
</script>

<style lang="scss" module>
.btn-arrow-left {
  display: flex;
  align-items: center;
  column-gap: 0.25rem;
}
.icon {
  width: 1.375rem;
  color: red;
  margin-right: 0.25rem;
}
</style>
