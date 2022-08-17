<template>
  <button class="button dropdown-container">
    {{ currentFilter }}
    <font-awesome-icon icon="fa-solid fa-chevron-down" class="arrow" />
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const currentFilter = computed(() => {
  let filter = store.state.countries.countryRegionFilter
  return filter === 'All' ? 'Filter by Region' : filter
})
</script>

<style lang="scss">
.button {
  @include dropdown;
  position: relative;
}

.arrow {
  @include position($top: 50%);
  transform: translateY(-50%);
  color: var($--theme-angle-icon-color);

  width: 0.5rem;
  right: 1.25rem;
}
</style>
