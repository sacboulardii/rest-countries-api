<template>
  <router-link
    :to="{ name: 'detail', params: { countryName: name } }"
    class="card-link"
  >
    <div class="card">
      <img :src="image" class="image" :alt="name + ' Flag'" />
      <div class="description">
        <h3 class="name">
          {{ name }}
        </h3>
        <p class="subject">
          Population:
          <span class="data">
            {{ population }}
          </span>
        </p>
        <p class="subject">
          Region:
          <span class="data">
            {{ region }}
          </span>
        </p>
        <p class="subject">
          Capital:
          <span class="data">
            {{ capital }}
          </span>
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'CountryCard',
  props: {
    country: {
      type: Object,
      required: true,
    },
  },
  computed: {
    population() {
      let popCount = this.country.population
      return popCount.toLocaleString('en-US')
    },
    capital() {
      let capitalArray = this.country.capital
      return capitalArray ? capitalArray[0] : 'None'
    },
    image() {
      return this.country.flags.png
    },
    name() {
      return this.country.name.common
    },
    region() {
      return this.country.region
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
