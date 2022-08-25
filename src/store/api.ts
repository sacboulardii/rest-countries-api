import { defineStore } from 'pinia'
import { ref } from 'vue'

import { ApiState } from '@/enums'

export const useApiStore = defineStore('api', () => {
  const { INIT } = ApiState

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

  function setApiState(payload: ApiState): void {
    apiState.value = payload
  }

  return { apiState, setApiState }
})
