<template>
  <div class="search-bar">
    <font-awesome-icon icon="fa-solid fa-magnifying-glass" opacity="0.2" />
    <input
      type="text"
      class="search-bar__input"
      placeholder="Search for a country..."
      v-model="query"
      @keyup.enter="searchCountriesByQuery"
    />
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      query: '',
    }
  },
  methods: {
    searchCountriesByQuery() {
      this.$emit('search-countries-by-query', this.query)
    },
  },
}
</script>

<style lang="scss">
.search-bar {
  position: relative;
}

.fa-magnifying-glass {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
}

.search-bar__input {
  border: none;
  border-radius: 0.25rem;

  box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);

  padding: 1rem;
  width: 100%;
}

::placeholder {
  position: relative;
  left: 2rem;
  font-size: 12px;
  opacity: 0.5;
}
</style>
