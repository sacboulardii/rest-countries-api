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
}

.icon {
  color: var($--theme-font-color);

  @include position($top: 50%, $left: 2rem);
  transform: translateY(-50%);

  opacity: var($--theme-placeholder-opacity);
}

.input {
  background-color: var($--theme-foreground);

  border: none;
  border-radius: $border-radius;

  box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.05);

  color: var($--theme-font-color);

  @include padding(
    $top: 1.125rem,
    $right: 1.125rem,
    $bottom: 1.125rem,
    $left: 4.5rem
  );

  width: 100%;
}

::placeholder {
  color: var($--theme-font-color);

  font-size: 0.75rem;
  letter-spacing: 0.01rem;

  opacity: var($--theme-placeholder-opacity);
}
</style>
