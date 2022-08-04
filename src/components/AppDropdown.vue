<template>
  <div @click="toggle" v-click-away="onClickAway" class="relative">
    <slot name="toggler">
      <button>Toggle</button>
    </slot>
    <slot />
  </div>
</template>

<script>
import { mixin as VueClickAway } from 'vue3-click-away'

export default {
  name: 'AppDropdown',
  mixins: [VueClickAway],
  provide() {
    return {
      sharedState: this.sharedState,
    }
  },
  data() {
    return {
      sharedState: {
        active: false,
      },
    }
  },
  methods: {
    toggle() {
      this.sharedState.active = !this.sharedState.active
    },
    onClickAway() {
      this.sharedState.active = false
    },
  },
}
</script>
