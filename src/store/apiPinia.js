import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import ENUM from '@/enums'

export const useApiStore = defineStore('api', () => {
  /* -------------------- STATE -------------------- */
  const apiState = ref(ENUM.INIT)

  /* -------------------- ACTIONS -------------------- */
  function setApiState(payload) {
    apiState.value = payload
  }

  /* -------------------- GETTERS -------------------- */
  const getApiState = computed(() => apiState.value)

  return { apiState, setApiState, getApiState }
})
