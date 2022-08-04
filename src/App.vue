<template>
  <header class="container">
    <router-link to="/">
      <h1 class="title">Where in the world?</h1>
    </router-link>
    <div class="switch">
      <font-awesome-icon icon="fa-moon" />
      <span>Dark Mode</span>
    </div>
  </header>
  <router-view />
</template>

<style lang="sass">
:root
    --dark-blue-d : hsl(209, 23%, 22%)
    --very-dark-blue-d: hsl(207, 26%, 17%)

    --very-dark-blue-l: hsl(200, 15%, 8%)
    --dark-gray-l: hsl(0, 0%, 52%)
    --very-light-gray-l: hsl(0, 0%, 98%)

    --white: hsl(0, 0%, 100%)

    --home-fs: 14px
    --details-fs: 16px

    --font-family: 'Nunito Sans', sans-serif

    --fw-300: 300
    --fw-600: 600
    --fw-800: 800

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

a
  color: initial
  text-decoration: none

input:focus,
textarea:focus,
select:focus
  outline: n

header
  display: flex
  align-items: center
  justify-content: space-between

  -webkit-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.075)
  -moz-box-shadow:    0px 2px 4px 0px rgba(0,0,0,0.075)
  box-shadow:         0px 2px 4px 0px rgba(0,0,0,0.075)

  padding-top: 2rem
  padding-bottom: 2rem

  position: relative
  z-index: 10

body
  font-family: var(--font-family)

.container
  padding-left: 5%
  padding-right: 5%

.title
  font-size: var(--home-fs)

.fa-moon
  margin-right: 0.5rem

.switch
  font-size: var(--home-fs)
</style>
