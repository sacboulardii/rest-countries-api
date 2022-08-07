<template>
  <section class="country-details">
    <div class="country-details__image">
      <figcaption>
        <img :src="image" alt="'Teste' + ' Flag'" />
      </figcaption>
    </div>
    <div class="country-details__description">
      <h2 class="country-details__title">
        {{ commonName }}
      </h2>
      <div class="details">
        <div class="details__main">
          <p class="details__subject">
            Native Name:
            <span class="subject-data"></span>
          </p>
          <p class="details__subject">
            Population:
            <span class="subject-data">{{ populationCount }}</span>
          </p>
          <p class="details__subject">
            Region:
            <span class="subject-data">{{ region }}</span>
          </p>
          <p class="details__subject">
            Sub Region:
            <span class="subject-data">{{ subRegion }}</span>
          </p>
          <p class="details__subject">
            Capital:
            <span class="subject-data">{{ capital }}</span>
          </p>
        </div>
        <div class="details__other">
          <p class="details__subject">
            Top Level Domain:
            <span class="subject-data">{{ topLevelDomain }}</span>
          </p>
          <p class="details__subject">
            Currencies:
            <span class="subject-data">{{ currencies }} </span>
          </p>
          <p class="details__subject">
            Languages:
            <span class="subject-data">{{ languages }}</span>
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
  props: {
    name: Object,
    flags: Object,
    population: Number,
    region: String,
    subRegion: String,
    capital: Array,
    topLevelDomain: Array,
    currencies: Object,
    languages: Object,
    borderCountries: Array,
  },
  computed: {
    commonName() {
      console.log('STORE.STATE.COUNTRY IS TRUE?')
      console.log(Boolean(this.$store.state.country))
      console.log('LOGGING STORE.STATE.COUNTRY...')
      console.log(this.$store.state.country)
      console.log('COUNTRY NAME IS TRUE?')
      console.log(Boolean(this.$store.state.country.name))
      console.log(Boolean(this.name))
      console.log('RETURNING THIS.NAME.COMMON')
      //   return this.name ? this.name.common : ''
      //   let test
      //   if (this.name) test = this.name.common
      //   return test
      return this.name.common
    },
    image() {
      let image
      if (this.flags) image = this.flags.svg
      return image
    },
    nativeName() {
      return 0
    },
    populationCount() {
      return this.population
    },
    regionss() {
      return 0
    },
  },
  created() {
    console.log('Creating CountryDetails')
  },
}
</script>

<style></style>
