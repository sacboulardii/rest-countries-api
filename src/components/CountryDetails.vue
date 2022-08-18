<template>
  <section class="country-details">
    <img
      class="country-details__image"
      :src="getImage"
      alt="'Teste' + ' Flag'"
    />
    <div class="country-details__description">
      <h2 class="country-details__name subtitle">
        {{ getName }}
      </h2>
      <div class="country-details__fields">
        <div class="country-details__main-fields">
          <p class="country-details__field">
            Native Name:
            <span class="country-details__data">{{ getNativeName }}</span>
          </p>
          <p class="country-details__field">
            Population:
            <span class="country-details__data">{{ getPopulation }}</span>
          </p>
          <p class="country-details__field">
            Region:
            <span class="country-details__data">{{ getRegion }}</span>
          </p>
          <p class="country-details__field">
            Sub Region:
            <span class="country-details__data">{{ getSubRegion }}</span>
          </p>
          <p class="country-details__field">
            Capital:
            <span class="country-details__data">{{ getCapital }}</span>
          </p>
        </div>
        <div class="country-details__other-fields">
          <p class="country-details__field">
            Top Level Domain:
            <span class="country-details__data">{{ getTopLevelDomain }}</span>
          </p>
          <p class="country-details__field">
            Currencies:
            <span class="country-details__data">{{ getCurrencies }} </span>
          </p>
          <p class="country-details__field">
            Languages:
            <span class="country-details__data">{{ getLanguages }}</span>
          </p>
        </div>
      </div>
      <div class="country-details__border-countries">
        <h3 class="country-details__field subtitle">Border Countries:</h3>
        <BorderCountriesList />
      </div>
    </div>
  </section>
</template>

<script>
import useCountryData from '@/use/country-data'
import BorderCountriesList from './BorderCountriesList.vue'

export default {
  components: { BorderCountriesList },
  props: {
    name: Object,
    flags: Object,
    population: Number,
    region: String,
    subregion: String,
    capital: Array,
    tld: Array,
    currencies: Object,
    languages: Object,
  },
  setup(props) {
    return { ...useCountryData(props) }
  },
}
</script>

<style lang="scss" scoped>
.country-details {
  padding-bottom: 3rem;

  &__name {
    margin-top: 3rem;
  }

  &__field {
    font-weight: $fw-600;
  }

  &__field + &__field {
    margin-top: 1rem;
  }

  &__data {
    font-weight: $fw-300;
  }

  &__fields {
    margin-top: 2rem;
  }

  &__other-fields {
    margin-top: 3rem;
  }

  &__border-countries {
    margin-top: 3rem;
  }
}
</style>
