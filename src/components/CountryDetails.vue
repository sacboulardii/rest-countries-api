<template>
  <section class="country-details">
    <figure class="country-details__figure">
      <img
        class="country-details__image"
        :src="getImage"
        :alt="getName + ' Flag'"
      />
    </figure>
    <div class="country-details__description">
      <h2 class="country-details__name subtitle--lg">
        {{ getName }}
      </h2>
      <div class="country-details__fields">
        <div class="country-details__main-fields">
          <p class="country-details__field">
            Native Name:
            <span class="country-details__data">{{
              getNativeName || 'None'
            }}</span>
          </p>
          <p class="country-details__field">
            Population:
            <span class="country-details__data">{{ getPopulation }}</span>
          </p>
          <p class="country-details__field">
            Region:
            <span class="country-details__data">{{ getRegion || 'None' }}</span>
          </p>
          <p class="country-details__field">
            Sub Region:
            <span class="country-details__data">{{
              getSubRegion || 'None'
            }}</span>
          </p>
          <p class="country-details__field">
            Capital:
            <span class="country-details__data">{{
              getCapital || 'None'
            }}</span>
          </p>
        </div>
        <div class="country-details__other-fields">
          <p class="country-details__field">
            Top Level Domain:
            <span class="country-details__data">{{
              getTopLevelDomain || 'None'
            }}</span>
          </p>
          <p class="country-details__field">
            Currencies:
            <span class="country-details__data"
              >{{ getCurrencies || 'None' }}
            </span>
          </p>
          <p class="country-details__field">
            Languages:
            <span class="country-details__data">{{
              getLanguages || 'None'
            }}</span>
          </p>
        </div>
      </div>
    </div>
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
import useCountryData from '@/composables/countryData'
import BorderCountriesList from './BorderCountriesList.vue'

import { defineProps, Ref } from 'vue'
import { DetailFields } from '@/types/CountryFields'
import { useCountriesStore } from '@/store/countries'

const store = useCountriesStore()

interface Props {
  country: DetailFields
}

const props = defineProps<Props>()

const {
  getName,
  getNativeName,
  getImage,
  getPopulation,
  getRegion,
  getSubRegion,
  getCapital,
  getTopLevelDomain,
  getCurrencies,
  getLanguages,
}: { [key: string]: Ref<string> } = useCountryData(props)
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
