const state = {
  apiUrl: process.env.API_URL,
  employees: [],
  raffleEntries: [],
  finalRaffleEntryWinners: [],
  raffleWinnersByCategory: [],
  durationPerCategory: 0
}

const mutations = {
  saveEmployees (state, employees) {
    state.categories = employees
  },
  setRaffleEntries (state, raffleEntries) {
    state.raffleEntries = raffleEntries
  },
  shuffleRaffleEntries (state, numberOfWinners) {
    console.log(state.raffleEntries)
    const shuffledEntries = state.raffleEntries.sort(() => Math.random() - 0.5)
    const final = shuffledEntries.slice(0, numberOfWinners)
    state.finalRaffleEntryWinners = final
  },
  setRaffleWinnersByCategory (state, raffleWinnersByCategory) {
    state.raffleWinnersByCategory = raffleWinnersByCategory
  },
  setDurationPerCategory (state, durationPerCategory) {
    state.durationPerCategory = durationPerCategory
  }
}

const actions = {
  async saveEmployees (state, employeeInfo) {
    for (var result of employeeInfo) {
      result.code = result.Code
      result.firstName = result.FirstName
      result.lastName = result.LastName
      result.middleName = result.MiddleName
      result.position = result.Position
      result.department = result.Department
      result.category = result.Group
      var employees = await fetch(
        `${this.state.employees.apiUrl}raffle-save-entries`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result)
        }
      ).then((response) => response.json())
      console.log(result.code)
    }
    return employees
  },
  async getFinalWinners (state, raffleID) {
    console.log(raffleID)
  },
  async getRaffleEntries (state, category) {
    console.log(category)
    const raffleEntryCategory = await fetch(
      `${this.state.raffles.apiUrl}raffle-entries?category=${category}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())
    console.log(raffleEntryCategory)
    if (raffleEntryCategory.length > 0) {
      state.commit('setRaffleEntries', raffleEntryCategory)
    }
  },
  async shuffleRaffleEntries (state, numberOfWinners) {
    state.commit('shuffleRaffleEntries', numberOfWinners)
  },
  async saveRaffleWinners (state, raffleWinners) {
    console.log(raffleWinners, 'sfdsfdsaffsafsf')
    for (var raffleWinner of raffleWinners) {
      var saveWinner = await fetch(
        `${this.state.employees.apiUrl}raffle-save-winners`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(raffleWinner)
        }
      ).then((response) => response.json())
    }
    console.log(saveWinner)
    if (saveWinner.success !== undefined) {
      var incremental = 1
      for (var result of raffleWinners) {
        result.fullname = `${result.last_name}, ${result.first_name} ${result.middle_name}`
        result.prize = `${this.state.raffles.raffleDetails.rafflePrize}`
        result.incrementalID = incremental++
      }
      state.commit('setDurationPerCategory', raffleWinners.length)
      state.commit('setRaffleWinnersByCategory', raffleWinners)
    }
    return saveWinner
  }
}

const getters = {
  employees (state) {
    return state.categories
  },
  raffleEntries (state) {
    return state.raffleEntries
  },
  finalRaffleEntryWinners (state) {
    return state.finalRaffleEntryWinners
  },
  raffleWinnersByCategory (state) {
    return state.raffleWinnersByCategory
  },
  durationPerCategory (state) {
    return state.durationPerCategory
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
