const state = {
  apiUrl: process.env.API_URL,
  raffles: [],
  winners: {},
  raffleDetails: {},
  finalWinners: [],
  winnersStatus: false,
  duration: 30,
  allWinners: [],
  winnersV2: [],
  raffleStatus: false
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
    state.allWinners = winners
  },
  setCurrentWinnersV2 (state, winners) {
    state.winnersV2 = winners
  },
  setRaffleStatus (state, raffleStatus) {
    state.raffleStatus = raffleStatus
  }
}

const actions = {
  setRaffleStatus (state, status) {
    state.commit('setRaffleStatus', status)
  },
  async setRaffleDetails (state, raffleDetails) {
    console.log(raffleDetails)
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
    console.log(raffles)
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
      `${this.state.raffles.apiUrl}raffle-get-winners?raffleID=${raffleID}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())
    console.log(currentRaffleWinner)
    if (Object.keys(currentRaffleWinner).length > 0) {
      state.commit('setCurrentWinners', currentRaffleWinner)
      state.commit('setDuration', currentRaffleWinner.length)
      var incremental = 1
      for (var result of currentRaffleWinner) {
        result.incrementalID = incremental++
      }
      if (currentRaffleWinner.length > 0) {
        state.commit('setWinnersStatus', true)
      } else {
        state.commit('setWinnersStatus', false)
      }
      return currentRaffleWinner
    } else {
      state.commit('setCurrentWinners', [])
      state.commit('setWinnersStatus', false)
    }
  },
  async getCurrentWinnersV2 (state, raffleID) {
    console.log(`${this.state.raffles.apiUrl}raffle-get-winners-v2?raffleID=${raffleID}`)
    const currentRaffleWinner = await fetch(
      `${this.state.raffles.apiUrl}raffle-get-winners-v2?raffleID=${raffleID}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())
    console.log(currentRaffleWinner)
    if (Object.keys(currentRaffleWinner).length > 0) {
      state.commit('setCurrentWinnersV2', currentRaffleWinner)
      var incremental = 1
      for (var result of currentRaffleWinner) {
        result.incrementalID = incremental++
      }
      return currentRaffleWinner
    } else {
      state.commit('setCurrentWinnersV2', [])
      state.commit('setWinnersStatus', false)
    }
  },
  async getWinnerPerCategory (state, raffleWinnersInfo) {
    const finalWinners = await fetch(
      `${this.state.raffles.apiUrl}raffle-get-winners?raffleID=${raffleWinnersInfo.raffleID}&category=${raffleWinnersInfo.categoryID}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())
    console.log(finalWinners)
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
      `${this.state.raffles.apiUrl}raffle-get-winners`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())
    console.log(allWinners)
    if (allWinners.length > 0) {
      var incremental = 1
      for (var result of allWinners) {
        result.incrementalID = incremental++
      }
      state.commit('setAllWinners', allWinners)
    } else {
      state.commit('setAllWinners', allWinners)
    }
  },
  async clearWinners (state) {
    const clearWinners = await fetch(
      `${this.state.raffles.apiUrl}raffle-clear-winners`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())

    return clearWinners
  },
  async resetRaffleWinners (state) {
    const resetRaffle = await fetch(
      `${this.state.raffles.apiUrl}raffle-reset-overall-winners`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())
    console.log(resetRaffle)
    return resetRaffle
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
  },
  winnersV2 (state) {
    return state.winnersV2
  },
  raffleStatus (state) {
    return state.raffleStatus
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
