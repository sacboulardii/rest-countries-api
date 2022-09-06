<template>
  <p class="not-found" v-if="store.fetchCountriesStatusError">
    No results for “{{ store.getLastSearchedText }}”
    <span class="not-found__tip">Check your search for typos.</span>
  </p>
</template>

<script setup>
import { useCountriesStore } from '@/store/countries'
const store = useCountriesStore()
</script>

<style lang="scss">
.not-found {
  font-weight: bold;
  margin-top: 3rem;
  text-align: center;

  @media (min-width: 768px) {
    margin-top: 4rem;
  }

  @media (min-width: 1024px) {
    margin-top: 5rem;
  }

  &__tip {
    font-weight: initial;
    font-size: 12px;
    margin-top: 1rem;
    display: block;
  }
}
</style>
