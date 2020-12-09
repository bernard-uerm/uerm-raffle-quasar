const state = {
  apiUrl: process.env.API_URL,
  employees: []
}

const mutations = {
  saveEmployees (state, employees) {
    state.categories = employees
  }
}

const actions = {
  async saveEmployees (state, employeeInfo) {
    console.log(employeeInfo)
    for (var result of employeeInfo) {
      result.Category = result.Group
    }
    const employees = await fetch(
      `${this.state.employees.apiUrl}saveEmployees`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeInfo)
      }
    ).then((response) => response.json())
    return employees
  },
  async getFinalWinners (state, raffleID) {
    console.log(raffleID)
  }
}

const getters = {
  employees (state) {
    return state.categories
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
