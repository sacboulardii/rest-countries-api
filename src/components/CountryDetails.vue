<template>
  <section class="country-details">
    <div class="country-details__image">
      <figcaption>
        <img :src="Image" alt="'Teste' + ' Flag'" />
      </figcaption>
    </div>
    <div class="country-details__description">
      <h2 class="country-details__title">
        {{ Name }}
      </h2>
      <div class="details">
        <div class="details__main">
          <p class="details__subject">
            Native Name:
            <span class="subject-data">{{ NativeName }}</span>
          </p>
          <p class="details__subject">
            Population:
            <span class="subject-data">{{ Population }}</span>
          </p>
          <p class="details__subject">
            Region:
            <span class="subject-data">{{ Region }}</span>
          </p>
          <p class="details__subject">
            Sub Region:
            <span class="subject-data">{{ SubRegion }}</span>
          </p>
          <p class="details__subject">
            Capital:
            <span class="subject-data">{{ Capital }}</span>
          </p>
        </div>
        <div class="details__other">
          <p class="details__subject">
            Top Level Domain:
            <span class="subject-data">{{ TopLevelDomain }}</span>
          </p>
          <p class="details__subject">
            Currencies:
            <span class="subject-data">{{ Currencies }} </span>
          </p>
          <p class="details__subject">
            Languages:
            <span class="subject-data">{{ Languages }}</span>
          </p>
        </div>
      </div>
      <div class="border-countries">
        <h3 class="border-countries__title">Border Countries:</h3>
        <ul class="border-countries__list">
          <li class="border-countries__item"><a href=""></a></li>
          <li class="border-countries__item"><a href=""></a></li>
          <li class="border-countries__item"><a href=""></a></li>
        </ul>
        <div>{{ borderCountries }}</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CountryDetails',
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
    borderCountries: Array,
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
