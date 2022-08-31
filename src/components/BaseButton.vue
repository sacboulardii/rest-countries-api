<template>
  <button
    :class="[
      $style.baseButton,
      ...variant.split(' ').map((variant) => $style[variant]),
    ]"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: '--none',
      validators: (value) => ['--sm', '--round'].includes(value),
    },
  },
}
</script>

<style lang="scss" module>
.baseButton {
  background-color: var($--theme-foreground);

  border: none;
  border-radius: 0.15rem;

  box-shadow: 0px 0px 6px 0px hsl(0deg, 0%, 0%, 0.25);

  color: var($--theme-font-color);
  cursor: pointer;

  font-size: 0.875rem;

  padding: 0.375rem 1.5rem;

  text-transform: capitalize;

  transition: color 0.2s ease, background-color 0.2s ease;

  @media (min-width: 1024px) {
    padding: 0.5rem 2rem;
  }
}

.--round {
  border-radius: $border-radius-lg;
}

.--sm {
  box-shadow: 0px 0px 5px 0px rgba(0, 0%, 0%, 0.2);
  font-size: 12px;

  padding: 0.375rem 0.5rem;
}
</style>
