<template>
  <li class="border-countries-list__item">
    <router-link :to="{ name: 'detail', params: { countryName: country } }">
      <BaseButton class="border-countries-list__link" variant="--sm">
        {{ country }}
      </BaseButton>
    </router-link>
  </li>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { defineProps } from 'vue'

defineProps({
  country: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.border-countries-list {
  &__item {
    text-align: center;
    width: 100px;
  }

  &__link {
    display: block;
    width: 100%;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover,
    &:focus {
      transform: translateY(-0.2em);
      box-shadow: 0 0 0 1em rgba(#fff, 0);
      animation: pulse 0.4s;
    }
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 5px 0 rgba(0, 0%, 0%, 0.05);
  }
}
</style>
