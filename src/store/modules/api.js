import ENUM from '@/enums'

// STATE

const state = {
  apiState: ENUM.INIT,
}

// MUTATIONS

const mutations = {
  SET_API_STATE(state, apiState) {
    state.apiState = apiState
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
