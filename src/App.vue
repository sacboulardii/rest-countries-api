<template>
  <header class="container">
    <router-link to="/">
      <h1 class="title">Where in the world?</h1>
    </router-link>
    <div class="switch" @click="switchMode">
      <font-awesome-icon icon="fa-moon" />
      <span>Dark Mode</span>
    </div>
  </header>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  methods: {
    switchMode() {
      this.$store.dispatch('switchThemeMode')
    },
  },
}
</script>

<style lang="scss">
header {
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
  font-family: $font-family;
}

.container {
  padding-left: 5%;
  padding-right: 5%;
}

.title {
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
