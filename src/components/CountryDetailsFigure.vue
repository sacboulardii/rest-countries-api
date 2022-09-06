<template>
  <figure class="country-details__figure">
    <img
      class="country-details__image"
      :src="getImage"
      :alt="getName + ' Flag'"
    />
  </figure>
</template>

<script setup lang="ts">
import { defineProps, Ref } from 'vue'
import useCountryData from '@/composables/countryData'

import { DetailFields } from '@/types/CountryFields'

interface Props {
  country: DetailFields
}

const props = defineProps<Props>()

const { getName, getImage }: { [key: string]: Ref<string> } = useCountryData(
  props.country
)
</script>

<style lang="scss">
.country-details {
  &__figure {
    grid-area: figure;
    align-self: flex-start;
  }

  &__image {
    border-radius: $border-radius;
    display: block;
    object-fit: contain;
    height: 100%;
    max-height: 450px;
  }
}
</style>
