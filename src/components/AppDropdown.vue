<template>
  <div @click="toggle" v-click-away="onClickAway" class="relative">
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
