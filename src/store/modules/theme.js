// STATE

const state = {
  mode: 'light',
}

// MUTATIONS

const mutations = {
  SWITCH_MODE(state) {
    switch (state.mode) {
      case 'light':
        state.mode = 'dark'
        break
      case 'dark':
        state.mode = 'retro'
        break
      default:
        state.mode = 'light'
    }
  },
}

// ACTIONS

const actions = {
  switchThemeMode({ commit }) {
    commit('SWITCH_MODE')
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
