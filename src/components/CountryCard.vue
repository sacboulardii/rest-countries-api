<template>
  <li class="countries-results__item">
    <router-link :to="{ name: 'detail', params: { countryName: getName } }">
      <div class="card">
        <figure class="card__figure">
          <img :src="getImage" class="card__image" :alt="getName + ' Flag'" />
        </figure>

        <div class="card__description">
          <h3 class="card__name">
            {{ getName || 'None' }}
          </h3>
          <p class="card__field">
            Population:
            <span class="card__data">
              {{ getPopulation }}
            </span>
          </p>
          <p class="card__field">
            Region:
            <span class="card__data">
              {{ getRegion || 'None' }}
            </span>
          </p>
          <p class="card__field">
            Capital:
            <span class="card__data">
              {{ getCapital || 'None' }}
            </span>
          </p>
        </div>
      </div>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import useCountryData from '@/use/country-data'
import { defineProps, Ref } from 'vue'
import { DetailFields } from '@/types/CountryFields'

interface Props {
  country: DetailFields
}

const props = defineProps<Props>()

const {
  getName,
  getImage,
  getPopulation,
  getRegion,
  getCapital,
}: { [key: string]: Ref<string> } = useCountryData(props)
</script>

<style lang="scss" scoped>
.card {
  background-color: var($--theme-foreground);
  border-radius: $border-radius;

  display: grid;
  grid-template-rows: $card-image-y $card-description-y; /** Total height - 350px */
  grid-template-columns: 1fr;

  box-shadow: 0px 1px 8px 1px rgba(0, 0%, 0%, 0.05);

  font-weight: $fw-300;
  overflow: hidden;

  @media (min-width: 768px) {
    border-radius: $border-radius-sm;
  }

  &__figure {
    overflow: hidden;
  }

  &__image {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }

  &__description {
    color: var($--theme-font-color);
    font-size: $font-sm;
    padding-top: 2rem;
    padding-right: 1.5rem;
    padding-bottom: 3rem;
    padding-left: 1.5rem;

    > * + * {
      margin-top: 0.5rem;
    }
  }

  &__name {
    font-size: $font-lg;
    margin-bottom: 1.5rem;
  }

  &__field {
    font-weight: $fw-600;
  }

  &__data {
    font-weight: $fw-300;
  }
}

/* --------------------------- Card Hover Circle Effect -------------------------- */

.card figure {
  position: relative;
}
.card figure::before {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  content: '';
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 100%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  opacity: 0;
}
.card figure:hover::before {
  -webkit-animation: circle 0.75s;
  animation: circle 0.75s;
}
@-webkit-keyframes circle {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 1;
  }
  100% {
    width: 200%;
    height: 200%;
    opacity: 0;
  }
}
@keyframes circle {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 1;
  }
  100% {
    width: 200%;
    height: 200%;
    opacity: 0;
  }
}
</style>
