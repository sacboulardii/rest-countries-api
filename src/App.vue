<template>
  <header class="container">
    <router-link to="/">
      <h1 class="title">Where in the world?</h1>
    </router-link>
    <div class="switch" @click="switchMode">
      <font-awesome-icon icon="fa-moon" class="icon" />
      <span class="mode">Dark Mode</span>
    </div>
  </header>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  methods: {
    switchMode() {
      // Remove body theme class
      document.body.classList.remove(this.$store.state.mode)
      // Switch theme and add theme class to body
      this.$store.dispatch('switchThemeMode')
      document.body.classList.add(this.$store.state.mode)
    },
  },
  created() {
    // Add light theme to body on created Lifecycle
    document.body.classList.add(this.$store.state.mode)
  },
}
</script>

<style lang="scss">
// Apply light (default) theme variables to light class
.light {
  @include spread-map($theme-map-light);
}
// Apply dark theme variables to dark class
.dark {
  @include spread-map($theme-map-dark);
}

header {
  background-color: var($--theme-foreground);

  display: flex;
  align-items: center;
  justify-content: space-between;

  -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.075);
  -moz-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.075);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.075);

  padding-top: 2rem;
  padding-bottom: 2rem;

  position: relative;
  z-index: 10;
}

body {
  background-color: var($--theme-background);
  color: var($--theme-font-color);
  font-family: $font-family;
}

.container {
  padding-left: 5%;
  padding-right: 5%;
}

.title {
  color: var($--theme-font-color);
  font-size: $home-fs;
}

.fa-moon {
  margin-right: 0.5rem;
}

.switch {
  cursor: pointer;
  font-size: $home-fs;
}
</style>
