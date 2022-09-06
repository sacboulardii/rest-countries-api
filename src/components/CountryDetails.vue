<template>
  <section class="country-details">
    <CountryDetailsFigure v-bind="props.country" />
    <CountryDetailsDescription v-bind="props.country" />
    <CountryDetailsBorders />
  </section>
</template>

<script setup lang="ts">
import CountryDetailsFigure from './CountryDetailsFigure.vue'
import CountryDetailsDescription from './CountryDetailsDescription.vue'
import CountryDetailsBorders from './CountryDetailsBorders.vue'

import { defineProps } from 'vue'
import { DetailFields } from '@/types/CountryFields'

interface Props {
  country: DetailFields
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped>
.country-details {
  margin-top: 3.5rem;
  padding-bottom: 3rem;

  display: grid;

  grid-template:
    'figure          ' auto
    'description     ' auto
    'border-countries' 1fr;

  grid-row-gap: 3rem;

  @media (min-width: 1200px) {
    padding-bottom: 0;
    grid-template:
      'figure description     ' auto
      'figure border-countries' auto
      / 1fr 1fr;

    grid-gap: 50px 100px;
  }
}
</style>
