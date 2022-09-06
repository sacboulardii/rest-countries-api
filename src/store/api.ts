import { defineStore } from 'pinia'
import { ref } from 'vue'

import { ApiStatus } from '@/constants/appConstants'

export const useApiStore = defineStore('api', () => {
  const { INIT } = ApiStatus

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

  function setApiState(payload: ApiStatus): void {
    apiState.value = payload
  }

  return { apiState, setApiState }
})
