<template>
  <section class="country-details">
    <figure class="country-details__figure">
      <img
        class="country-details__image"
        :src="getImage"
        alt="'Teste' + ' Flag'"
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
    </div>
    <div v-if="foundBorderCountries" class="country-details__border-countries">
      <h3 class="country-details__border-countries-title">Border Countries:</h3>
      <BorderCountriesList />
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
  computed: {
    foundBorderCountries() {
      return this.$store.state.countries.country.borderCountriesNames
    },
  },
  setup(props) {
    return { ...useCountryData(props) }
  },
}
</script>

<style lang="scss" scoped>
/**
 * CountryDetails.vue
 *
 * These are the styles for the Country Details section.
 *
 * Index
 * - Country Details Section
 * - Country Details Figure
 * - Country Details Image
 * - Country Details Description
 * - Country Details Name
 * - Country Details Fields
 * - Country Details Main Fields
 * - Country Details Other Fields
 * - Country Details Border Countries
 */

/* ------------------------------------------------------ */

/* Country Details Section */

.country-details {
  margin-top: 3.5rem;
  padding-bottom: 3rem;

  display: grid;

  grid-template-areas:
    'figure'
    'description'
    'border-countries';
  grid-template-rows: auto 1fr;

  grid-row-gap: 3rem;

  @media (min-width: 768px) {
    padding-bottom: 0;
    grid-template-areas:
      'figure           description'
      'border-countries border-countries';
    grid-template-rows: auto auto;
    grid-template-columns: 2fr 1fr;
    grid-row-gap: 2rem;
    grid-column-gap: 50px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 100px;
  }

  @media (min-width: 1440px) {
    grid-template-areas:
      'figure description'
      'figure border-countries';

    grid-template-rows: auto auto;
  }

  /* Country Details Figure */

  &__figure {
    grid-area: figure;
    align-self: flex-start;
  }

  /* Country Details Image */

  &__image {
    display: block;
    object-fit: contain;
    height: 100%;
    max-height: 450px;
  }

  /* Country Details Description */

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

  /* Country Details Name */

  &__name {
    align-self: flex-end;
    // margin-top: 3rem;

    // @media (min-width: 1024px) {
    //   margin-top: 0;
    // }
  }

  /* Country Details Fields */

  &__fields {
    background-image: purple;
    @media (min-width: 1440px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 2rem;
    }
    // margin-top: 2rem;
  }

  /* Country Details Main Fields */

  &__main-fields {
    @media (min-width: 768px) {
    }
  }

  /* Country Details Other Fields */

  &__other-fields {
    @media (min-width: 768px) {
      margin-top: 1rem;
    }

    @media (min-width: 1440px) {
      margin-top: 0;
    }
  }

  /* Country Details Field */

  &__field {
    font-weight: $fw-600;
  }

  &__field + &__field {
    margin-top: 1rem;
  }

  /* Country Details Data */

  &__data {
    font-weight: $fw-300;
  }

  /* Country Details Border Countries */

  &__border-countries {
    grid-area: border-countries;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    row-gap: 0;

    /* Country Details Border Countries Title */

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
