<template>
  <header class="container">
    <router-link to="/"><h1 class="title">Where in the world?</h1></router-link>
    <p class="switch">Dark Mode</p>
  </header>
  <router-view />
</template>

<style lang="sass">
:root
    /* Dark Mode */
    --dark-blue-d : hsl(209, 23%, 22%)
    --very-dark-blue-d: hsl(207, 26%, 17%)

    /* Light Mode */
    --very-dark-blue-l: hsl(200, 15%, 8%)
    --dark-gray-l: hsl(0, 0%, 52%)
    --very-light-gray-l: hsl(0, 0%, 98%)

    /* Dark and Light Modes */
    --white: hsl(0, 0%, 100%)

    /* Typography */
    --home-fs: 14px
    --details-fs: 16px

    --font-family: 'Nunito Sans', sans-serif

    --fw-300: 300
    --fw-600: 600
    --fw-800: 800

    /* Breakpoints */
    --mobile: 375px
    --desktop: 1440px


*,
*::before,
*::after
    box-sizing: border-box
    margin: 0


ul
    padding-left: 0
    list-style: none


img
    max-width: 100%
</style>
