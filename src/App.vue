<template>
  <header class="container">
    <router-link to="/"><h1 class="title">Where in the world?</h1></router-link>
    <p class="switch">Dark Mode</p>
  </header>
  <router-view />
</template>

<style lang="sass">
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50


nav
  padding: 30px


nav a
  font-weight: bold
  color: #2c3e50


nav a.router-link-exact-active
  color: #42b983
</style>
