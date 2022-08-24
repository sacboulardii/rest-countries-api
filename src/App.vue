<template>
  <header class="header">
    <div class="header__inner container">
      <router-link :to="{ name: 'home', params: { clear: true } }">
        <h1 class="header__title title">Where in the world?</h1>
      </router-link>
      <div class="theme-toggle" @click="store.switchTheme">
        <!-- Render the right theme toggle icon conditionally based on current theme -->
        <font-awesome-icon
          v-if="store.getCurrentTheme === 'light'"
          icon="fa-moon"
          class="getCurrentTheme-toggle__icon"
        />
        <font-awesome-icon
          v-else-if="store.getCurrentTheme === 'wolf'"
          icon="fa-solid fa-lightbulb"
          class="theme-toggle__icon"
        />
        <img
          v-else
          src="./assets/wolf-svgrepo-com.svg"
          alt="wolf"
          class="theme-toggle__icon"
        />
        <!-- endloop -->
      </div>
    </div>
  </header>
  <router-view />
</template>

<script setup>
import { onBeforeMount } from '@vue/runtime-core'
import { useThemeStore } from './store/theme'

const store = useThemeStore()

onBeforeMount(() => {
  document.documentElement.classList.add(store.getCurrentTheme)
})
</script>

<style lang="scss">
.light {
  @include spread-map($theme-map-light);
}
.dark {
  @include spread-map($theme-map-dark);
}
.wolf {
  @include spread-map($theme-map-wolf);
}

body {
  background-color: var($--theme-background);
  color: var($--theme-font-color);
  font-family: $font-family;
  transition: color 0.4s ease, background-color 0.4s ease, opacity 0.4s ease;
}

.container {
  max-width: $desktop;
  margin: auto;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 768px) {
    padding-left: 4.5rem;
    padding-right: 4.5rem;
  }
}

.header {
  background-color: var($--theme-foreground);

  box-shadow: 0px 2px 4px 0px rgba(0, 0%, 0%, 0.075);

  padding-top: 2rem;
  padding-bottom: 2rem;

  position: relative;
  z-index: 10;

  transition: color 0.4s ease, background-color 0.4s ease, opacity 0.4s ease;

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

.subtitle {
  font-size: $font-md;

  &--lg {
    @include fluid-type(22, 28, 375, 1440);
  }
}

.btn {
  background-color: var($--theme-foreground);
  border: none;
  border-radius: 0.15rem;
  color: var($--theme-font-color);
  padding: 0.625rem 1.875rem;
  box-shadow: 0px 0px 6px 0px hsl(0deg, 0%, 0%, 0.25);
  text-transform: capitalize;

  &--sm {
    padding: 0.375rem 0.5rem;
  }

  &--round {
    border-radius: 0.375rem;
  }
}

.input {
  background-color: var($--theme-foreground);

  border: none;
  border-radius: $border-radius;

  box-shadow: 0px 2px 8px 1px rgba(0, 0%, 0%, 0.05);

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
  transition: transform 0.2s ease, opacity 0.2s ease, color 0.2s ease;

  &__icon {
    height: 1rem;
  }
}

#scroll-to-top {
  cursor: pointer;
  position: fixed;
  right: 5%;
  bottom: 5%;
  color: var($--theme-circle-chevron-color);
  font-size: 2.5rem;
  z-index: 9999;

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  @media (min-width: 1024px) {
    font-size: 3.5rem;
  }

  @media (min-width: 1440px) {
    font-size: 3.875rem;
  }
}
</style>
