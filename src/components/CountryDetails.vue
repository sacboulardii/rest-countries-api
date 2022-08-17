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
  @include second-to-last-child {
    margin-top: 3rem;
  }

  padding-bottom: 3rem;
}

.description {
  @include second-to-last-child {
    margin-top: 3rem;
  }
}

.subjects {
  margin-top: 2rem;
}

[class*='-subjects'] {
  &:last-child {
    margin-top: 3rem;
  }

  @include second-to-last-child {
    margin-top: 1rem;
  }
}
</style>
