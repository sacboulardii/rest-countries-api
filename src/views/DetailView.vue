<template>
  <main class="details container">
    <ButtonArrowLeft class="details__btn--back" @click="handleBack('/')">
      back
    </ButtonArrowLeft>
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
import CountryDetails from '@/components/CountryDetails.vue'
import ButtonArrowLeft from '@/components/ButtonArrowLeft.vue'

import { defineProps, onBeforeMount } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

import { useCountriesStore } from '@/store/countries'

const store = useCountriesStore()

const props = defineProps(['countryName'])

/**
 * Refresh to default home page
 * @desc Clear stored countries, reset region filter and load all countries before going to a route that has a clear param.
 * This is only true when going to home route though the header title ensuring its refresh to default home funcionality.
 **/
onBeforeRouteLeave((to, from) => {
  const store = useStore()
  if (to.params.clear) {
    store.fetchAllCountries
  }
})

onBeforeRouteUpdate((to) => {
  const store = useStore()
  store.fetchCountryDetails(to.params.countryName)
  store.fetchBorderCountriesNames()
})

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
}
</style>
