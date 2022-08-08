<template>
  <main class="container">
    <section class="search-section">
      <SearchBar />
      <AppDropdownWrapper />
    </section>
    <!-- Lista de países -->
    <section class="countries-results">
      <ul v-if="!notFound" class="list">
        <CountryCard
          v-for="(country, index) in countries"
          :country="country"
          :key="index"
        />
      </ul>
      <!-- Mensagem de resultado não encontrado -->
      <p v-else>Nenhum resultado foi encotrado.</p>
    </section>
  </main>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue'
import CountryCard from '@/components/CountryCard.vue'
import AppDropdownWrapper from '@/components/AppDropdownWrapper.vue'
import ENUM from '@/enums'

export default {
  name: 'HomeView',
  components: {
    SearchBar,
    CountryCard,
    AppDropdownWrapper,
  },
  computed: {
    countries() {
      return this.$store.state.countries
    },
    notFound() {
      return (
        this.$store.state.apiState === ENUM.ERROR &&
        this.$store.state.countries.length === 0
      )
    },
  },
  created() {
    this.$store.dispatch('getCountries')
  },
}
</script>

<style scoped lang="scss">
.search-section {
  > * + * {
    margin-top: 2.5rem;
  }
}

.list {
  margin-top: 2rem;
  padding: 0 2.5rem;
  > * + * {
    margin-top: 3rem;
  }
}

main {
  background-color: var($--theme-background);
  padding-top: 1.5rem;
  padding-bottom: 3rem;
}
</style>
