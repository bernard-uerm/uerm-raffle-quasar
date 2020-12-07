const state = {
  apiUrl: process.env.API_URL,
  raffles: []
}

const mutations = {
  setRaffles (state, raffles) {
    state.raffles = raffles
  }
}

const actions = {
  async getRaffles (state) {
    const raffles = await fetch(
      `${this.state.raffles.apiUrl}raffles`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())

    if (raffles.length > 0) {
      state.commit('setRaffles', raffles)
      return raffles
    }
  }
}

const getters = {
  raffles (state) {
    return state.raffles
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
