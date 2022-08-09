<template>
  <main class="container">
    <router-link to="/"
      ><button class="btn btn--lg" style="padding: 1rem 2rem; margin: 1rem 0">
        back
      </button>
    </router-link>
    <CountryDetails v-if="dataIsAvailable" v-bind="country" />
  </main>
</template>

<script setup>
// Components
import CountryDetails from '@/components/CountryDetails.vue'

import { defineProps, onBeforeMount, computed } from 'vue'

import ENUM from '@/enums'

// Vuex store
import { useStore } from 'vuex'
const store = useStore()

// Received route param
const props = defineProps(['countryName'])

// Fetch country details
onBeforeMount(() => {
  store.dispatch('getCountryDetails', props.countryName)
  store.dispatch('getBorderCountries', props.countryName)
})

const country = computed(() => {
  return store.state.country
})

// Show details when data is ready
const dataIsAvailable = computed(() => store.state.apiState === ENUM.LOADED)
</script>

<style></style>
