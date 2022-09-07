<template>
  <div class="country-details__description">
    <h2 class="country-details__name subtitle--lg">
      {{ getName }}
    </h2>
    <div class="country-details__fields">
      <div class="country-details__main-fields">
        <p class="country-details__field">
          Native Name:
          <span class="country-details__data">{{
            nativeNameFormatter(getNativeName) || 'None'
          }}</span>
        </p>
        <p class="country-details__field">
          Population:
          <span class="country-details__data">{{
            populationFormatter(getPopulation)
          }}</span>
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
          <span class="country-details__data">{{ getCapital || 'None' }}</span>
        </p>
      </div>
      <div class="country-details__other-fields">
        <p class="country-details__field">
          Top Level Domain:
          <span class="country-details__data">{{
            tldFormatter(getTopLevelDomain) || 'None'
          }}</span>
        </p>
        <p class="country-details__field">
          Currencies:
          <span class="country-details__data"
            >{{ currenciesFormatter(getCurrencies) || 'None' }}
          </span>
        </p>
        <p class="country-details__field">
          Languages:
          <span class="country-details__data">{{
            languagesFormatter(getLanguages) || 'None'
          }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, Ref } from 'vue'
import useCountryData from '@/composables/countryData'
import { DetailFields } from '@/types/CountryFields'
import tldFormatter from '@/components/helpers/tldFormatter'
import populationFormatter from '@/components/helpers/populationFormatter'
import languagesFormatter from '@/components/helpers/languagesFormatter'
import nativeNameFormatter from '@/components/helpers/nativeNameFormatter'
import currenciesFormatter from '@/components/helpers/currenciesFormatter'

interface Props {
  country: DetailFields
}

const props = defineProps<Props>()

const {
  getName,
  getNativeName,
  getPopulation,
  getRegion,
  getSubRegion,
  getCapital,
  getTopLevelDomain,
  getCurrencies,
  getLanguages,
}: { [key: string]: Ref<string> } = useCountryData(props.country)
</script>

<style lang="scss">
.country-details {
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

    @media (min-width: 1024px) {
      margin-top: 0;
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
}
</style>
