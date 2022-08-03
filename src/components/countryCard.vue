<template>
  <div class="card">
    <figure>
      <img :src="image" class="card__image" :alt="name + ' Flag'" />
    </figure>
    <div class="card__description">
      <h3 class="card__country">{{ name }}</h3>
      <p class="card__population">
        Population: <span>{{ population.toLocaleString('en-US') }}</span>
      </p>
      <p class="card__region">
        Region: <span>{{ region }}</span>
      </p>
      <p class="card__capital">
        Capital: <span>{{ capital[0] }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'countryCard',
  props: {
    region: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    population: {
      type: Number,
    },
    capital: {
      type: Array,
      required: true,
      default: () => ['None'],
    },
    image: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="sass">
.card
    border-radius: 0.25rem

    box-shadow:         0px 2px 8px 4px rgba(0,0,0,0.05)
    -webkit-box-shadow: 0px 2px 8px 4px rgba(0,0,0,0.05)
    -moz-box-shadow:    0px 2px 8px 4px rgba(0,0,0,0.05)

    font-weight: var(--fw-300)
    overflow: hidden

    max-width: 320px

    + .card
        margin-top: 3rem

.card__country
    margin-bottom: 1.5rem

.card__description
    font-size: var(--home-fs)
    padding: 2rem 1.5rem 3rem 1.5rem
    > p + p
        margin-top: 0.5rem
    span
        font-weight: var(--fw-300)
</style>
