import { defineStore } from 'pinia'
import { ref } from 'vue'

import { ApiState } from '@/enums'

export const useApiStore = defineStore('api', () => {
  /* ---------------------------------------------------------------- */
  //                              STATE
  /* ---------------------------------------------------------------- */

  /**
   * It initializes api state to INIT (0)
   */
  const apiState = ref(ApiState.INIT)

  /* ---------------------------------------------------------------- */
  //                              ACTIONS
  /* ---------------------------------------------------------------- */

  function setApiState(payload: ApiState): void {
    apiState.value = payload
  }

  return { apiState, setApiState }
})
