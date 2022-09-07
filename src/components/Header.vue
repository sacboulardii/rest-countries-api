<template>
  <header class="header" v-once>
    <div class="header__inner container">
      <router-link :to="{ name: 'home', params: { clear: true } }">
        <h1 class="header__title title">Where in the world?</h1>
      </router-link>
      <ThemeToggler />
    </div>
  </header>
</template>

<script setup>
import ThemeToggler from '@/components/ThemeToggler.vue'
</script>

<style lang="scss" scoped>
.header {
  background-color: var($--theme-foreground);

  box-shadow: 0px 2px 4px 0px rgba(0, 0%, 0%, 0.075);

  padding-top: 2rem;
  padding-bottom: 2rem;

  position: relative;
  z-index: 10;

  transition: color 0.2s ease, background-color 0.2s ease;

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
</style>
