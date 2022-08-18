<template>
  <li class="countries-results__item">
    <router-link :to="{ name: 'detail', params: { countryName: getName } }">
      <div class="card">
        <figure class="card__figure">
          <img :src="getImage" class="card__image" :alt="getName + ' Flag'" />
        </figure>

        <div class="card__description">
          <h3 class="card__name">
            {{ getName }}
          </h3>
          <p class="card__field">
            Population:
            <span class="card__data">
              {{ getPopulation }}
            </span>
          </p>
          <p class="card__field">
            Region:
            <span class="card__data">
              {{ getRegion }}
            </span>
          </p>
          <p class="card__field">
            Capital:
            <span class="card__data">
              {{ getCapital }}
            </span>
          </p>
        </div>
      </div>
    </router-link>
  </li>
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

<style lang="scss" scoped>
.card {
  background-color: var($--theme-foreground);
  border-radius: $border-radius;

  display: grid;
  grid-template-rows: $card-image-y $card-description-y; /** Total height - 350px */
  grid-template-columns: 1fr;

  box-shadow: 0px 1px 8px 1px rgba(0, 0%, 0%, 0.05);

  font-weight: $fw-300;
  overflow: hidden;

  @media (min-width: 768px) {
    border-radius: $border-radius-sm;
  }

  &__image {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  &__description {
    color: var($--theme-font-color);
    font-size: $font-sm;
    padding-top: 2rem;
    padding-right: 1.5rem;
    padding-bottom: 3rem;
    padding-left: 1.5rem;

    > * + * {
      margin-top: 0.5rem;
    }
  }

  &__name {
    font-size: $font-lg;
    margin-bottom: 1.5rem;
  }

  &__field {
    font-weight: $fw-600;
  }

  &__data {
    font-weight: $fw-300;
  }
}
</style>
