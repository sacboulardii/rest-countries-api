<template>
  <main class="details container">
    <button class="btn btn--round details__btn--back" @click="handleBack('/')">
      <img
        v-if="themeStore.getCurrentTheme === 'light'"
        class="details__btn--back-icon"
        src="@/assets/arrow_left.svg"
        alt="Back"
      />
      <img
        v-else
        class="details__btn--back-icon"
        src="@/assets/arrow_left_black.svg"
        alt="Back"
      />
      back
    </button>
    <transition name="fade">
      <CountryDetails
        v-if="store.isCountryDetailsLoaded"
        v-bind="{ country: store.getCountryDetails }"
      />
    </transition>
  </main>
</template>

<script>
import { useCountriesStore as useStore } from '@/store/countries'

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
    const store = useStore()
    if (to.params.clear) {
      store.fetchAllCountries
    }
    next()
  },

  beforeRouteUpdate(to) {
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
    handleBack(fallback) {
      if (this.fromRoute && !this.fromRoute.name) {
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
import { defineProps, onBeforeMount } from 'vue'

import { useCountriesStore } from '@/store/countries'
import { useThemeStore } from '@/store/theme'

const store = useCountriesStore()
const themeStore = useThemeStore()

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
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1.75rem;
    padding-right: 2.25rem;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    column-gap: 0.25rem;
    cursor: pointer;
  }

  &__btn--back-icon {
    width: 1.375rem;
    color: red;
    margin-right: 0.25rem;
  }
}
</style>
