<template>
  <div class="card">
    <figure>
      <img src="{{ image }}" alt="{{ name }} flag" class="card__image" />
    </figure>
    <div class="card__description">
      <h3 class="card__country">{{ name }}</h3>
      <p class="card__population">{{ population }}</p>
      <p class="card__region">{{ region }}</p>
      <p class="card__capital">{{ capital }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'countryCard',
}
</script>

<style></style>
