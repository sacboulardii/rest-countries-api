<template>
  <main class="details container">
    <button class="btn btn--round details__btn--back" @click="handleBack('/')">
      <font-awesome-icon
        class="details__btn--back-icon"
        icon="fa-solid fa-arrow-left-long"
      />
      back
    </button>
    <CountryDetails
      v-if="store.isCountryDetailsLoaded"
      v-bind="{ country: store.getCountryDetails }"
    />
  </main>
</template>

<script lang="ts">
import { useCountriesStore as useStore } from '@/store/countries'

export default {
  data() {
    return {
      fromRoute: null,
    }
  },
  // Assign previous route for future handling
  beforeRouteEnter(to, from, next): void {
    next((vm: any): void => {
      vm.$data.fromRoute = from
    })
  },
  /**
   * Refresh to default home page
   * @desc Clear stored countries, reset region filter and load all countries before going to a route that has a clear param.
   * This is only true when going to home route though the header title ensuring its refresh to default home funcionality.
   **/
  beforeRouteLeave(to, from, next): void {
    const store = useStore()
    if (to.params.clear) {
      store.fetchAllCountries
    }
    next()
  },

  beforeRouteUpdate(to: any): void {
    const store = useStore()
    store.fetchCountryDetails(to.params.countryName)
    store.fetchBorderCountriesNames()
  },

  methods: {
    /**
     * Handle Back
     * @desc Extends default router back functionality
     * @param {string} fallback - The fallback path if there is no history to use with $router.back().
     * This is usually the case if the page was visited directly or from another site
     **/
    handleBack(fallback: string): void {
      const fromRoute: any = this.fromRoute
      if (fromRoute && !fromRoute.name) {
        this.$router.push(fallback)
      } else {
        this.$router.back()
      }
    },
  },
}
</script>

<script setup lang="ts">
// Components
import CountryDetails from '@/components/CountryDetails.vue'
import { defineProps, onBeforeMount } from 'vue'

import { useCountriesStore } from '@/store/countries'

const store = useCountriesStore()

// Received route param
const props = defineProps(['countryName'])

// Fetch country details
onBeforeMount(() => {
  store.fetchCountryDetails(props.countryName)
  store.fetchBorderCountriesNames()
})
</script>

<style lang="scss">
.details {
  padding-top: 2rem;

  @media (min-width: 768px) {
    padding-top: 4rem;
  }
  @media (max-width: 768px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  &__btn--back {
    cursor: pointer;
  }

  &__btn--back-icon {
    margin-right: 0.25rem;
  }
}
</style>
