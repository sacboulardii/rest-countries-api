<template>
  <section class="country-details">
    <img class="flag-image" :src="getImage" alt="'Teste' + ' Flag'" />
    <div class="description">
      <h2 class="name">
        {{ getName }}
      </h2>
      <div class="subjects">
        <div class="main-subjects">
          <p class="subject">
            Native Name:
            <span class="data">{{ getNativeName }}</span>
          </p>
          <p class="subject">
            Population:
            <span class="data">{{ getPopulation }}</span>
          </p>
          <p class="subject">
            Region:
            <span class="data">{{ getRegion }}</span>
          </p>
          <p class="subject">
            Sub Region:
            <span class="data">{{ getSubRegion }}</span>
          </p>
          <p class="subject">
            Capital:
            <span class="data">{{ getCapital }}</span>
          </p>
        </div>
        <div class="other-subjects">
          <p class="subject">
            Top Level Domain:
            <span class="data">{{ getTopLevelDomain }}</span>
          </p>
          <p class="subject">
            Currencies:
            <span class="data">{{ getCurrencies }} </span>
          </p>
          <p class="subject">
            Languages:
            <span class="data">{{ getLanguages }}</span>
          </p>
        </div>
      </div>
      <div class="border-countries">
        <h3 class="subject">Border Countries:</h3>
        <BorderCountriesList />
      </div>
    </div>
  </section>
</template>

<script>
import BorderCountriesList from './BorderCountriesList.vue'

export default {
  name: 'CountryDetails',
  components: {
    BorderCountriesList,
  },
  // Declare received country object prop types
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
    // Property Accessing and Formatting
    getName() {
      return this.name.common
    },
    getNativeName() {
      return Object.values(this.name.nativeName)
        .map((nativeName) => nativeName.common)
        .join(', ')
    },
    getImage() {
      return this.flags.svg
    },
    getPopulation() {
      return this.population.toLocaleString('en-US')
    },
    getRegion() {
      return this.region
    },
    getSubRegion() {
      return this.subregion ? this.subregion : 'None'
    },
    getCapital() {
      return this.capital ? this.capital[0] : 'None'
    },
    getTopLevelDomain() {
      return this.tld.join(', ')
    },
    getCurrencies() {
      if (this.currencies) {
        return Object.values(this.currencies)
          .map((currency) => currency.name)
          .join(', ')
      } else {
        return 'None'
      }
    },
    getLanguages() {
      return Object.values(this.languages).join(', ')
    },
  },
}
</script>

<style></style>
