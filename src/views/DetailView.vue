<template>
  <main class="container">
    <button
      class="btn btn--lg"
      @click="handleBack('/')"
      style="padding: 1rem 2rem; margin: 1rem 0"
    >
      back
    </button>
    <CountryDetails v-if="dataIsAvailable" v-bind="country" />
  </main>
</template>

<script>
export default {
  data() {
    return {
      fromRoute: null,
    }
  },
  // Assign previous route for future handling
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$data.fromRoute = from
    })
  },
  /**
   * Clear countries list
   * @desc Clear previous countries list before going to a route that has a clear param.
   * This is true when clicking the header title and ensures no previous list are seen before loading the next list.
   **/
  beforeRouteLeave(to, from, next) {
    if (to.params.clear) {
      this.$root.$store.dispatch('clearStoredCountries')
    }
    next()
  },

  methods: {
    /**
     * Handle Back
     * @desc Extends default router back functionality
     * @param {string} fallback - The fallback path if there is no history to use with $router.back().
     * This is usually the case if the page was visited directly or from another site
     **/
    handleBack(fallback) {
      if (!this.fromRoute.name) {
        this.$router.push(fallback)
      } else {
        this.$router.back()
      }
    },
  },
}
</script>

<script setup>
// Components
import CountryDetails from '@/components/CountryDetails.vue'

import { defineProps, onBeforeMount, computed } from 'vue'

import ENUM from '@/enums'
// import { useRouter } from 'vue-router'

// Vuex store
import { useStore } from 'vuex'
const store = useStore()

// const router = useRouter()

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
