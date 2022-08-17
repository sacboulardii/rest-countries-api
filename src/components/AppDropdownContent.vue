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
  background-color: var($--theme-foreground);

  border-radius: $border-radius;
  box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.05);

  @include flex($direction: column);

  font-size: 12px;

  width: 200px;

  @include padding-y(1rem);
  @include padding-x(0.5rem);

  position: absolute;
  transform: translateY(5px);

  overflow: hidden;
}
</style>
