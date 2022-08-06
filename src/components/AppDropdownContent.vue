<template>
  <transition name="dropdown-content">
    <div class="dropdown-list" v-if="active">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AppDropdownContent',
  inject: ['sharedState'],
  computed: {
    active() {
      return this.sharedState.active
    },
  },
}
</script>

<style lang="scss">
.dropdown-content-enter-active,
.dropdown-content-leave-active {
  transition: all 0.1s;
}

.dropdown-content-enter,
.dropdown-content-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.dropdown-list {
  background-color: $white;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  width: calc(60% - 6%);

  position: absolute;
  transform: translateY(5px);
  overflow: hidden;
}
</style>
