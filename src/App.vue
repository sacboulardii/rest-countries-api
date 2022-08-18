<template>
  <header class="header">
    <div class="header__inner container">
      <router-link :to="{ name: 'home', params: { clear: true } }">
        <h1 class="header__title title">Where in the world?</h1>
      </router-link>
      <div class="theme-toggle" @click="switchMode">
        <!-- Render the right theme toggle icon conditionally based on current theme -->
        <font-awesome-icon
          v-if="theme === 'light'"
          icon="fa-moon"
          class="theme-toggle__icon"
        />
        <font-awesome-icon
          v-else-if="theme === 'retro'"
          icon="fa-solid fa-lightbulb"
          class="theme-toggle__icon"
        />
        <font-awesome-icon
          v-else
          icon="fa-solid fa-glasses"
          class="theme-toggle__icon"
        />
        <!-- endloop -->
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
/** Include theme related styles */
.light {
  @include spread-map($theme-map-light);
}
.dark {
  @include spread-map($theme-map-dark);
}
.retro {
  @include spread-map($theme-map-retro);
}

body {
  background-color: var($--theme-background);
  color: var($--theme-font-color);
  font-family: $font-family;
}

.container {
  max-width: $desktop;
  margin: auto;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 768px) {
    padding-left: 5rem;
    padding-right: 5rem;
  }
}

.header {
  background-color: var($--theme-foreground);

  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.075);

  padding-top: 2rem;
  padding-bottom: 2rem;

  position: relative;
  z-index: 10;

  &__inner {
    @include flex($justify: space-between, $align: center);
  }
}

.title {
  color: var($--theme-font-color);
  @include fluid-type(14, 24, 375, 1440);

  @media (min-width: 768px) {
    font-weight: $fw-800;
  }
}

.input {
  background-color: var($--theme-foreground);

  border: none;
  border-radius: $border-radius;

  box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.05);

  color: var($--theme-font-color);

  padding-top: 1.125rem;
  padding-bottom: 1.125rem;

  text-align: left;
}

.dropdown {
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  max-width: 200px;
  width: 60%;

  @media (min-width: 768px) {
    width: 100%;
  }
}

.theme-toggle {
  cursor: pointer;
  font-size: $font-sm;

  &__icon {
    height: 1rem;
  }
}
</style>
