<template>
  <main class="container">
    <router-link to="/"
      ><button style="padding: 1rem 2rem; margin: 1rem 0">
        back
      </button></router-link
    >
    <section class="country-details">
      <div class="country-details__image">
        <figcaption>
          <img :src="country.image" alt="'Teste' + ' Flag'" />
        </figcaption>
      </div>
      <div class="country-details__description">
        <h2 class="country-details__title">
          {{ country.name }}
        </h2>
        <div class="details">
          <div class="details__main">
            <p class="details__subject">
              Native Name:
              <span class="subject-data"></span>
            </p>
            <p class="details__subject">
              Population:
              <span class="subject-data">{{ country.population }}</span>
            </p>
            <p class="details__subject">
              Region:
              <span class="subject-data">{{ country.region }}</span>
            </p>
            <p class="details__subject">
              Sub Region:
              <span class="subject-data">{{ country.subRegion }}</span>
            </p>
            <p class="details__subject">
              Capital:
              <span class="subject-data">{{ country.capital }}</span>
            </p>
          </div>
          <div class="details__other">
            <p class="details__subject">
              Top Level Domain:
              <span class="subject-data">{{ country.topLevelDomain }}</span>
            </p>
            <p class="details__subject">
              Currencies:
              <span class="subject-data">{{ country.currencies }} </span>
            </p>
            <p class="details__subject">
              Languages:
              <span class="subject-data">{{ country.languages }}</span>
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
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'DetailView',
  props: ['countryName'],
  created() {
    this.$store.dispatch('fetchCountryDetails', this.countryName)
  },
  computed: {
    country() {
      return this.$store.state.country
    },
  },
}
</script>

<style></style>
