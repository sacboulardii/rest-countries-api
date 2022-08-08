<template>
  <h2>Oops! The page you're looking for is not here!</h2>
  <router-link :to="{ name: 'home' }">Back to the Home Page</router-link>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>

<style></style>
