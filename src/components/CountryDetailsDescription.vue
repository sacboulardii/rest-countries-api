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
          <span class="country-details__data">{{ getCapital || 'None' }}</span>
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
</template>

<script setup>
import { defineProps, Ref } from 'vue'
import useCountryData from '@/composables/countryData'
import { DetailFields } from '@/types/CountryFields'

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
}: { [key: string]: Ref<string> } = useCountryData(props)
</script>

<style></style>
