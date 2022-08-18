<template>
  <main class="details container">
    <button class="btn btn--lg details__btn--back" @click="handleBack('/')">
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
   * Refresh to default home page
   * @desc Clear stored countries, reset region filter and load all countries before going to a route that has a clear param.
   * This is only true when going to home route though the header title ensuring its refresh to default home funcionality.
   **/
  beforeRouteLeave(to, from, next) {
    if (to.params.clear) {
      this.$root.$store.dispatch('countries/getCountries')
    }
    next()
  },

  beforeRouteUpdate(to) {
    to.params.countryName &&
      this.$root.$store.dispatch(
        'countries/getCountryDetails',
        to.params.countryName
      ) &&
      this.$root.$store.dispatch('countries/getBorderCountries')
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
  store.dispatch('countries/getCountryDetails', props.countryName)
  store.dispatch('countries/getBorderCountries', props.countryName)
})

const country = computed(() => {
  return store.state.countries.country
})
// Show details when data is ready
const dataIsAvailable = computed(() => store.state.api.apiState === ENUM.LOADED)
</script>

<style lang="scss">
.btn {
  background-color: var($--theme-foreground);
  border: none;
  padding: 0.5rem 1rem;
  box-shadow: 0px 0px 9px 1px hsl(0, 0, 0, 0.2);
  text-transform: capitalize;
}

.details {
  padding-top: 2rem;

  @include second-to-last-child {
    margin-top: 4rem;
  }

  @media (max-width: 768px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>
