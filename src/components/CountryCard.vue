<template>
  <router-link
    :to="{ name: 'detail', params: { countryName: getName } }"
    class="card-link"
  >
    <div class="card">
      <div class="card__image">
        <img :src="getImage" class="image" :alt="getName + ' Flag'" />
      </div>

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
import useCountryData from '@/use/country-data'

export default {
  // Declare received country object props
  props: {
    name: Object,
    population: Number,
    capital: Array,
    region: String,
    flags: Object,
  },
  setup(props) {
    return { ...useCountryData(props) }
  },
}
</script>

<style lang="scss">
.card-link {
  display: block;
}

.card {
  background-color: var($--theme-foreground);

  border-radius: $border-radius;

  display: grid;
  grid-template-rows: 160px auto;
  grid-template-columns: 1fr;

  box-shadow: 0px 1px 8px 1px rgba(0, 0, 0, 0.05);

  font-weight: $fw-300;
  overflow: hidden;

  max-width: 260px;

  @media (min-width: 768px) {
    border-radius: $border-radius-sm;
  }
}

.description {
  color: var($--theme-font-color);
  font-size: $home-fs;

  @include padding($top: 2rem, $bottom: 3rem);
  @include padding-x(1.5rem);

  @include second-to-last-child {
    margin-top: 0.5rem;
  }
}

.subject {
  font-weight: $fw-600;
}

.data {
  font-weight: $fw-300;
}

.name {
  font-size: 18px;
  margin-bottom: 1.5rem;
}

.image {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
</style>
