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
      <div
        v-if="foundBorderCountries"
        class="country-details__border-countries"
      >
        <h3 class="country-details__border-countries-title">
          Border Countries:
        </h3>
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

/**
 * Country Details Section
 *
 * Styles for the high level section block
 */

.country-details {
  background-color: white;
  margin-top: 3.5rem;
  padding-bottom: 3rem;

  @media (min-width: 1024px) {
    display: flex;
    align-items: flex-start;
    column-gap: 100px;
  }

  /**
  * Country Details Figure
  * 
  * Styles for the figure element image wrapper
  */

  &__figure {
    @media (min-width: 768px) {
      max-width: 100%;
    }

    @media (min-width: 1024px) {
      min-width: calc(50% - 100px);
      height: 400px;
    }
  }

  /**
  * Country Details Image
  * 
  * Styles for the country flag image
  */

  &__image {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  /**
  * Country Details Description
  * 
  * Styles for the nested description block
  */

  &__description {
    font-size: $font-sm;

    @media (min-width: 1024px) {
      padding-top: 3rem;
    }
  }

  /**
  * Country Details Name
  * 
  * Styles for the country name inside the description block
  */

  &__name {
    margin-top: 3rem;

    @media (min-width: 1024px) {
      margin-top: 0;
    }
  }

  /**
  * Country Details Fields
  * 
  * Styles for the country description fields wrapper
  */

  &__fields {
    margin-top: 2rem;

    @media (min-width: 480px) {
      display: flex;
      align-items: flex-start;
    }

    @media (min-width: 1024px) {
      justify-content: flex-start;
    }
  }

  /**
  * Country Details Main Fields
  * 
  * Styles for the main fields block inside fields
  */

  /* @@ PLACEHOLDER @@ */

  /**
  * Country Details Other Fields
  * 
  * Styles for the other fields block inside fields
  */

  &__other-fields {
    margin-top: 3rem;

    @media (min-width: 480px) {
      margin-left: 3rem;
      margin-top: 0;
    }
  }

  /**
 * Country Details Field
 * 
 * Styles for the country description field
 */

  &__field {
    font-weight: $fw-600;
  }

  &__field + &__field {
    margin-top: 1rem;
  }

  /**
 * Country Details Data
 * 
 * Styles for the country data inside a description field 
 */

  &__data {
    font-weight: $fw-300;
  }

  /**
 * Country Details Border Countries
 * 
 * Styles for the border countries field block inside description
 */

  &__border-countries {
    margin-top: 4rem;

    @media (min-width: 768px) {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      row-gap: 1rem;
      column-gap: 1rem;
    }

    /**
   * Country Details Border Countries Title
   * 
   * Styles for the border countries field title
   */

    &-title {
      font-size: $font-md;

      @media (min-width: 768px) {
        font-size: $font-sm;
      }
    }
  }
}
</style>
