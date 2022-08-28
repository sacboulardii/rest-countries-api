<template>
  <ul class="border-countries-list">
    <li
      v-for="country in store.getBorderCountriesNames"
      :key="country"
      class="border-countries-list__item"
    >
      <router-link :to="{ name: 'detail', params: { countryName: country } }">
        <BaseButton class="border-countries-list__link" variant="--sm">
          {{ country }}
        </BaseButton>
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue'
import { useCountriesStore } from '@/store/countries'
const store = useCountriesStore()
</script>

<style lang="scss" scoped>
.border-countries-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;

  row-gap: 0.875rem;
  column-gap: 0.625rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }

  &__item {
    text-align: center;
    min-width: 100px;
  }

  &__link {
    display: block;
    width: 100%;

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
