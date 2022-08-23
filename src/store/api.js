import { defineStore } from 'pinia'
import { ref } from 'vue'

import ENUM from '@/enums'

export const useApiStore = defineStore('api', () => {
  /* Declare API enumerated state */
  const { INIT } = ENUM

  /* ---------------------------------------------------------------- */
  //                              STATE
  /* ---------------------------------------------------------------- */

  /**
   * It initializes api state to INIT (0)
   */
  const apiState = ref(INIT)

  /* ---------------------------------------------------------------- */
  //                              ACTIONS
  /* ---------------------------------------------------------------- */

  /**
   * It sets the api state to the payload
   */
  function setApiState(payload) {
    apiState.value = payload
  }

  return { apiState, setApiState }
})
