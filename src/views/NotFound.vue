<template>
  <h2>Oops! The {{ resource }} you're looking for is not here!</h2>
  <router-link :to="{ name: 'home' }">Back to the Home Page</router-link>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFound',
  props: {
    resource: {
      type: String,
      default: 'page',
    },
  },
})
</script>

<style></style>
