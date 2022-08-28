<template>
  <button :class="[$style.baseButton, $style[variant]]" v-bind="$attrs">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
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
  color: var($--theme-font-color);
  padding: 0.625rem 1.875rem;
  box-shadow: 0px 0px 6px 0px hsl(0deg, 0%, 0%, 0.25);
  text-transform: capitalize;
  transition: color 0.4s ease, background-color 0.4s ease;
}

.--round {
  border-radius: $border-radius-lg;
}
</style>
