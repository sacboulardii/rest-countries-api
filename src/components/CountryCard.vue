<template>
  <router-link
    :to="{ name: 'detail', params: { countryName: getName } }"
    class="card-link"
  >
    <div class="card">
      <img :src="getImage" class="image" :alt="getName + ' Flag'" />
      <div class="description">
        <h3 class="name">
          {{ getName }}
        </h3>
        <p class="subject">
          Population:
          <span class="data">
            {{ getPopulation }}
          </span>
        </p>
        <p class="subject">
          Region:
          <span class="data">
            {{ getRegion }}
          </span>
        </p>
        <p class="subject">
          Capital:
          <span class="data">
            {{ getCapital }}
          </span>
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'CountryCard',
  // Declare received country object props
  props: {
    name: Object,
    population: Number,
    capital: Array,
    region: String,
    flags: Object,
  },
  computed: {
    // Property Accessing and Formatting
    getPopulation() {
      return this.population.toLocaleString('en-US')
    },
    getCapital() {
      return this.capital ? this.capital[0] : 'None'
    },
    getImage() {
      return this.flags.svg
    },
    getName() {
      return this.name.common
    },
    getRegion() {
      return this.region
    },
  },
}
</script>

<style lang="scss" scoped>
.card-link {
  display: block;
}

.card {
  background-color: var($--theme-foreground);
  border-radius: 0.25rem;

  box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);

  font-weight: $fw-300;
  overflow: hidden;

  max-width: 320px; // API Country Flag Image Max Width
}
.description {
  color: var($--theme-font-color);
  font-size: $home-fs;
  padding: 2rem 1.5rem 3rem 1.5rem;
  > .subject + .subject {
    margin-top: 0.5rem;
  }

  .data {
    font-weight: $fw-300;
  }

  .name {
    margin-bottom: 1.5rem;
  }
}
</style>
