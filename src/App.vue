<template>
  <header>
    <div class="inner">
      <router-link :to="{ name: 'home', params: { clear: true } }">
        <h1 class="title">Where in the world?</h1>
      </router-link>
      <div class="switch" @click="switchMode">
        <font-awesome-icon
          v-if="theme === 'light'"
          icon="fa-moon"
          class="icon"
        />
        <font-awesome-icon
          v-else-if="theme === 'retro'"
          icon="fa-solid fa-sun"
          class="icon"
        />
        <font-awesome-icon v-else icon="fa-solid fa-glasses" class="icon" />
      </div>
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
      document.body.classList.remove(this.$store.state.theme.mode)
      // Switch theme and add theme class to body
      this.$store.dispatch('theme/switchThemeMode')
      document.body.classList.add(this.$store.state.theme.mode)
    },
  },
  computed: {
    theme() {
      return this.$store.state.theme.mode
    },
  },
  created() {
    // Add light theme to body on created Lifecycle
    document.body.classList.add(this.$store.state.theme.mode)
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

.retro {
  @include spread-map($theme-map-retro);
}

header {
  background-color: var($--theme-foreground);

  -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.075);
  -moz-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.075);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.075);

  padding-top: 2rem;
  padding-bottom: 2rem;

  position: relative;
  z-index: 10;

  & .inner {
    max-width: 1440px;
    margin-left: auto;
    margin-right: auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

body {
  background-color: var($--theme-background);
  color: var($--theme-font-color);
  font-family: $font-family;
}

.container {
  max-width: $desktop;
  margin-left: auto;
  margin-right: auto;
}

.title {
  color: var($--theme-font-color);
  font-size: $home-fs;
}

.icon {
  margin-right: 0.5rem;
  height: 1rem;
}

.switch {
  cursor: pointer;
  font-size: $home-fs;
}
</style>
