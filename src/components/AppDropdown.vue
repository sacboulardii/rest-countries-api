<template>
  <div
    @click="toggle"
    v-click-away="onClickAway"
    class="dropdown-wrapper relative"
  >
    <slot name="toggler">
      <button>Toggle</button>
    </slot>
    <slot />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'

const sharedState = ref({ active: false })

provide('sharedState', sharedState.value)

const toggle = () => {
  sharedState.value.active = !sharedState.value.active
}

const onClickAway = () => {
  sharedState.value.active = false
}
</script>

<style lang="scss">
.dropdown-wrapper {
  font-size: $font-sm;
  width: 100%;
  max-width: 400px;

  @media (min-width: 768px) {
    max-width: 200px;
  }
}
</style>
