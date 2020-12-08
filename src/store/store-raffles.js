const state = {
  apiUrl: process.env.API_URL,
  raffles: [],
  winners: {}
}

const mutations = {
  setRaffles (state, raffles) {
    state.raffles = raffles
  },
  setCurrentWinners (state, winners) {
    state.winners = winners
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
  },
  async getRandomWinners (state, raffleInfo) {
    const winners = await fetch(
      `${this.state.raffles.apiUrl}getRandomWinners?category=${raffleInfo.category}&winnersCount=${raffleInfo.drawNumbers}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())

    if (winners.length > 0) {
      return winners
    }
  },
  async setWinners (state, winnersInfo) {
    const winners = await fetch(
      `${this.state.raffles.apiUrl}setWinners`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(winnersInfo)
      }
    ).then((response) => response.json())
    return winners
  },

  async getCurrentWinners (state, raffleID) {
    const currentRaffleWinner = await fetch(
      `${this.state.raffles.apiUrl}getCurrentWinners?raffleID=${raffleID}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())
    if (Object.keys(currentRaffleWinner).length > 0) {
      state.commit('setCurrentWinners', currentRaffleWinner)
      return currentRaffleWinner
    }
  }
}

const getters = {
  raffles (state) {
    return state.raffles
  },
  currentWinners (state) {
    return state.winners
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
