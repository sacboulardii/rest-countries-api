<template>
  <button class="button">
    {{ currentFilter }}
    <svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
      ></path>
    </svg>
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
  background-color: var($--theme-foreground);

  border: none;
  border-radius: 0.375rem;

  box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.05);

  color: var($--theme-font-color);

  font-size: 0.75rem;

  width: 100%;

  max-width: 200px;

  @include padding($top: 1.125rem, $bottom: 1.125rem, $left: 1.5rem);

  position: relative;

  text-align: left;
}

.arrow {
  @include position($top: 50%);
  transform: translateY(-50%);

  width: 1.25rem;
  right: 1rem;
}
</style>
