<template>
  <router-link
    :to="{ name: 'region', params: { region: region } }"
    class="dropdown__item"
  >
    {{ region }}
    <slot />
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  region: {
    type: String,
    required: true,
  },
})
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
