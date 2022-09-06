<template>
  <section class="country-details">
    <CountryDetailsFigure :country="{ country: country }" />
    <CountryDetailsDescription :country="{ country: country }" />
    <div
      v-if="store.fetchBorderCountriesSuccess"
      class="country-details__border-countries"
    >
      <h3 class="country-details__border-countries-title">Border Countries:</h3>
      <BorderCountriesList />
    </div>
  </section>
</template>

<script setup lang="ts">
import BorderCountriesList from './BorderCountriesList.vue'
import CountryDetailsFigure from './CountryDetailsFigure.vue'

import { defineProps } from 'vue'
import DetailFields from '@/types/CountryFields'

import { useCountriesStore } from '@/store/countries'

const store = useCountriesStore()

interface Props {
  country: DetailFields
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
/**
 * CountryDetails.vue
 *
 * These are the styles for the Country Details Component.
 *
 * Index
 * - Country Details
 *   - Figure
 *   - Image
 *   - Description
 *   - Name
 *   - Fields
 *   - Main Fields
 *   - Other Fields
 *   - Field
 *   - Data
 *   - Border Countries
 *     - Title
 */

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
      'figure           description     ' auto
      'figure border-countries' auto
      / 1fr 1fr;

    grid-gap: 50px 100px;
  }

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

  &__description {
    display: grid;
    grid-area: description;

    @media (min-width: 768px) {
      padding-top: 1rem;
      row-gap: 1.5rem;
      grid-template-columns: 1fr;
      grid-template-rows: auto 3fr;
    }

    @media (min-width: 1024px) {
      padding-top: 2rem;
    }

    font-size: $font-sm;
  }

  &__name {
    align-self: flex-end;
  }

  &__fields {
    margin-top: 2rem;

    @media (min-width: 520px) {
      display: grid;
      grid-gap: 0 3rem;
      grid-template:
        'main-fields other-fields'
        / 1fr 1fr;
    }

    @media (min-width: 1440px) {
      grid-column-gap: 2rem;
    }
  }

  &__main-fields {
    grid-area: main-fields;
  }

  &__other-fields {
    grid-area: other-fields;

    margin-top: 3rem;

    @media (min-width: 520px) {
      margin-top: 0;
    }
  }

  &__field {
    font-weight: $fw-600;

    & + & {
      margin-top: 1rem;
    }
  }

  &__data {
    font-weight: $fw-300;
  }

  &__border-countries {
    grid-area: border-countries;

    display: flex;
    align-items: center;
    flex-wrap: wrap;

    row-gap: 1rem;

    &-title {
      font-size: $font-md;
      margin-right: 1rem;

      @media (min-width: 768px) {
        font-size: $font-sm;
      }
    }
  }
}
</style>
