<template>
  <main class="details container">
    <ButtonArrowLeft class="details__btn--back" @click="handleBack('/')">
      back
    </ButtonArrowLeft>
    <transition name="fade">
      <CountryDetails
        v-if="store.fetchDetailsStatusSuccess"
        :country="{ country: store.getCountryDetails }"
      />
    </transition>
  </main>
</template>

<script setup lang="ts">
import CountryDetails from '@/components/CountryDetails.vue'
import ButtonArrowLeft from '@/components/ButtonArrowLeft.vue'

import { defineProps, onBeforeMount } from 'vue'
import { useRouter, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import { useCountriesStore } from '@/store/countries'

// Pinia Stores
const store = useCountriesStore()

// Router
const router = useRouter()

// Props
const props = defineProps({
  countryName: {
    type: String,
    required: true,
  },
})

/**
 * Refresh to default home page
 * @desc Clear stored countries, reset region filter and load all countries before going to a route that has a clear param.
 * This is only true when going to home route though the header title ensuring its refresh to default home funcionality.
 **/
onBeforeRouteLeave((to) => {
  const shouldRefreshToHome = to.params.clear

  if (shouldRefreshToHome) {
    store.setRegionFilterOption('All')
    store.fetchAllCountries()
  }
})

/**
 * @desc Fetch details from selected border country in the border countries list
 * This is executed when the DetailView component is reused to display another country details
 */
onBeforeRouteUpdate((to) => {
  const store = useCountriesStore()
  const selectedCountry = to.params.countryName as string
  store.fetchCountryDetails(selectedCountry)
  store.fetchBorderCountriesNames()
})

/**
 * @desc Fetch details from country given as countryName param to detail route
 * This is executed when the DetailView is being mounted and not reused
 */
onBeforeMount(() => {
  store.fetchCountryDetails(props.countryName)
  store.fetchBorderCountriesNames()
})

/**
 * Handle Back
 * @desc Extends default router back functionality
 * @param {string} fallback - The fallback path if there is no history to use with $router.back().
 * This is usually the case if the page was visited directly or from another site
 **/
function handleBack(fallback: string) {
  const lastRouteName = localStorage.getItem('LAST_ROUTE_NAME')

  if (!lastRouteName) {
    router.push(fallback)
  } else {
    router.back()
  }
}
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
}
</style>
