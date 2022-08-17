<template>
  <div class="search-bar">
    <font-awesome-icon
      class="icon"
      icon="fa-solid fa-magnifying-glass"
      opacity="0.2"
    />
    <input
      type="text"
      class="input"
      placeholder="Search for a country..."
      v-model="query"
      @keyup.enter="searchCountriesByName"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const query = ref('')

const searchCountriesByName = () => {
  store.dispatch('countries/getCountryByName', query.value)
}
</script>

<style lang="scss" scoped>
.search-bar {
  position: relative;
  width: 100%;
  max-width: 400px;

  @include respond-above(sm) {
    max-width: 350px;
  }

  @include respond-above(md) {
    max-width: 480px;
  }
}

.icon {
  color: var($--theme-font-color);

  @include position($top: 50%, $left: 2rem);
  transform: translateY(-50%);

  opacity: var($--theme-placeholder-opacity);
}

.input {
  @include input;
  @include padding($left: 4.5rem, $right: 1.125rem);
  width: 100%;
}

::placeholder {
  color: var($--theme-font-color);

  opacity: var($--theme-placeholder-opacity);
  letter-spacing: 0.01rem;
}
</style>
