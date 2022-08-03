<template>
  <div class="card">
    <figure>
      <img
        :src="require(`@/assets/${image}`)"
        class="card__image"
        :alt="name + ' Flag'"
      />
    </figure>
    <div class="card__description">
      <h3 class="card__country">{{ name }}</h3>
      <p class="card__population">
        Population: <span>{{ population }}</span>
      </p>
      <p class="card__region">
        Region: <span>{{ region }}</span>
      </p>
      <p class="card__capital">
        Capital: <span>{{ capital }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'countryCard',
  data() {
    return {
      image: 'Flag_of_Germany.svg.png',
      name: 'Germany',
      population: '12,345,678',
      region: 'Europe',
      capital: 'Berlin',
    }
  },
}
</script>

<style lang="sass">
.card
    border-radius: 0.25rem

    box-shadow:         0px 2px 8px 4px rgba(0,0,0,0.05)
    -webkit-box-shadow: 0px 2px 8px 4px rgba(0,0,0,0.05)
    -moz-box-shadow:    0px 2px 8px 4px rgba(0,0,0,0.05)

    font-weight: var(--fw-600)
    overflow: hidden

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
