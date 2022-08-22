import { defineStore } from 'pinia'
import { ref } from 'vue'

import ENUM from '@/enums'

export const useApiStore = defineStore('api', () => {
  /* -------------------- STATE -------------------- */
  const apiState = ref(ENUM.INIT)

  /* -------------------- ACTIONS -------------------- */
  function setApiState(payload) {
    apiState.value = payload
  }

  return { apiState, setApiState }
})
