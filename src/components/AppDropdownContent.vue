<template>
  <transition name="dropdown-content dropdown-container ">
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
  @include dropdown;
  @include flex($direction: column);

  @include padding-x(0);
  @include padding-y(calc(1.125rem / 2));

  position: absolute;
  transform: translateY(5px);

  overflow: hidden;
}
</style>
