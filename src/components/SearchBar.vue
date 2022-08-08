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

<style lang="scss" scoped>
.search-bar {
  position: relative;
}

.icon {
  color: var($--theme-font-color);
  position: absolute;
  top: 50%;
  left: 1.5rem;
  opacity: var($--theme-placeholder-opacity);
  transform: translateY(-50%);
}

.input {
  background-color: var($--theme-foreground);
  color: var($--theme-font-color);
  border: none;
  border-radius: 0.25rem;

  box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);

  padding: 1.125rem;
  padding-left: 4rem;
  width: 100%;
}

::placeholder {
  color: var($--theme-font-color);
  font-size: 12px;
  opacity: var($--theme-placeholder-opacity);
}
</style>
