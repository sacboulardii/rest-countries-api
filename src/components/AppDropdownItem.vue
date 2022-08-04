<template>
  <a class="dropdown-item" href="#">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'AppDropdownItem',
}
</script>

<style lang="sass">
.dropdown-item

  padding: 1rem 0
  padding-left: 1rem

  &:hover
    background-color: #eee
</style>
