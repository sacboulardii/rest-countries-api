<template>
  <Header />
  <router-view />
</template>

<script setup>
import { onBeforeMount } from '@vue/runtime-core'
import { useThemeStore } from './store/theme'
import Header from '@/components/Header.vue'

const store = useThemeStore()

onBeforeMount(() => {
  const storedTheme = localStorage.getItem('theme')

  storedTheme
    ? document.documentElement.classList.add(storedTheme)
    : document.documentElement.classList.add(store.getCurrentTheme)
})
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/**
 * App.vue
 *
 * These are the styles for the Country App Component.
 *
 * Index
 * - Body
 * - Container
 * - Subtitle
 * - Button
 * - Input
 * - Dropdown
 * - Scroll To Top
 */

/* ------------------------- Include Theme Variables ------------------------ */

.light {
  @include spread-map($theme-map-light);
}
.dark {
  @include spread-map($theme-map-dark);
}
.experimental {
  @include spread-map($theme-map-experimental);
}

/* -------------------------------------------------------------------------- */

body {
  background-color: var($--theme-background);
  color: var($--theme-font-color);
  font-family: $font-family;
  transition: color 0.2s ease, background-color 0.2s ease, opacity 0.2s ease;
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

.subtitle {
  font-size: $font-md;

  &--lg {
    @include fluid-type(22, 28, 375, 1440);
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
</style>
