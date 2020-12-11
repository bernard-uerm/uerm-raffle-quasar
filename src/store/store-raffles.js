const state = {
  apiUrl: process.env.API_URL,
  raffles: [],
  winners: {},
  raffleDetails: {},
  finalWinners: {},
  winnersStatus: false,
  duration: '30s',
  allWinners: null
}

const mutations = {
  setRaffles (state, raffles) {
    state.raffles = raffles
  },
  setCurrentWinners (state, winners) {
    state.winners = winners
  },
  setRaffleDetails (state, raffleDetails) {
    state.raffleDetails = raffleDetails
  },
  setFinalWinners (state, finalWinners) {
    state.finalWinners = finalWinners
  },
  setWinnersStatus (state, winnersStatus) {
    state.winnersStatus = winnersStatus
  },
  setDuration (state, duration) {
    state.duration = duration
  },
  setAllWinners (state, winners) {
    console.log(winners)
    state.allWinners = winners
  }
}

const actions = {
  async setRaffleDetails (state, raffleDetails) {
    state.commit('setRaffleDetails', raffleDetails)
  },
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
      state.commit('setDuration', `${currentRaffleWinner.currentWinners}s`)
      var incremental = 1
      for (var result of currentRaffleWinner.currentDetailedWinners) {
        result.incrementalID = incremental++
      }
      if (currentRaffleWinner.currentWinners > 0) {
        state.commit('setWinnersStatus', true)
      } else {
        state.commit('setWinnersStatus', false)
      }
      return currentRaffleWinner
    }
  },
  async getFinalWinners (state, raffleWinnersInfo) {
    const finalWinners = await fetch(
      `${this.state.raffles.apiUrl}getFinalWinners?raffleID=${raffleWinnersInfo.raffleID}&category=${raffleWinnersInfo.categoryID}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())

    if (finalWinners.length > 0) {
      var incremental = 1
      for (var result of finalWinners) {
        result.incrementalID = incremental++
      }
      state.commit('setFinalWinners', finalWinners)
    }
  },
  async getAllWinners (state) {
    const allWinners = await fetch(
      `${this.state.raffles.apiUrl}getAllWinners`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())

    if (allWinners.length > 0) {
      var incremental = 1
      for (var result of allWinners) {
        result.incrementalID = incremental++
      }

      state.commit('setAllWinners', allWinners)
    }
  }
}

const getters = {
  raffles (state) {
    return state.raffles
  },
  currentWinners (state) {
    return state.winners
  },
  raffleDetails (state) {
    return state.raffleDetails
  },
  finalWinners (state) {
    return state.finalWinners
  },
  winnersStatus (state) {
    return state.winnersStatus
  },
  duration (state) {
    return state.duration
  },
  setAllWinners (state) {
    return state.allWinners
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
