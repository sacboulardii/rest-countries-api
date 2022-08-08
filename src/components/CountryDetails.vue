<template>
  <section class="country-details">
    <img class="flag-image" :src="Image" alt="'Teste' + ' Flag'" />
    <div class="description">
      <h2 class="name">
        {{ Name }}
      </h2>
      <div class="subjects">
        <div class="main-subjects">
          <p class="subject">
            Native Name:
            <span class="data">{{ NativeName }}</span>
          </p>
          <p class="subject">
            Population:
            <span class="data">{{ Population }}</span>
          </p>
          <p class="subject">
            Region:
            <span class="data">{{ Region }}</span>
          </p>
          <p class="subject">
            Sub Region:
            <span class="data">{{ SubRegion }}</span>
          </p>
          <p class="subject">
            Capital:
            <span class="data">{{ Capital }}</span>
          </p>
        </div>
        <div class="other-subjects">
          <p class="subject">
            Top Level Domain:
            <span class="data">{{ TopLevelDomain }}</span>
          </p>
          <p class="subject">
            Currencies:
            <span class="data">{{ Currencies }} </span>
          </p>
          <p class="subject">
            Languages:
            <span class="data">{{ Languages }}</span>
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
    // Use capitalized names to avoid conflict with props and stay simple
    Name() {
      return this.name.common
    },
    NativeName() {
      return Object.values(this.name.nativeName)
        .map((nativeName) => nativeName.common)
        .join(', ')
    },
    Image() {
      return this.flags.svg
    },
    nativeName() {
      return 0
    },
    Population() {
      return this.population.toLocaleString('en-US')
    },
    Region() {
      return this.region
    },
    SubRegion() {
      return this.subregion
    },
    Capital() {
      return this.capital[0]
    },
    TopLevelDomain() {
      return this.tld.join(', ')
    },
    Currencies() {
      return Object.values(this.currencies)
        .map((currency) => currency.name)
        .join(', ')
    },
    Languages() {
      return Object.values(this.languages).join(', ')
    },
  },
}
</script>

<style></style>
