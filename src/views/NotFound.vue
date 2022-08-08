<template>
  <h2>Oops! The {{ resource }} you're looking for is not here!</h2>
  <router-link :to="{ name: 'home' }"></router-link>
</template>

<script>
export default {
  name: 'NotFound',
  props: {
    resource: {
      type: String,
      required: true,
      default: 'page',
    },
  },
}
</script>

<style></style>
