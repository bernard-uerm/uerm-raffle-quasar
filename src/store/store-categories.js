const state = {
  apiUrl: process.env.API_URL,
  categories: []
}

const mutations = {
  setCategory (state, categories) {
    state.categories = categories
  }
}

const actions = {
  async getCategories (state) {
    const categories = await fetch(
      `${this.state.categories.apiUrl}raffle-categories`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    ).then((response) => response.json())
    if (categories.length > 0) {
      const categoryArr = []
      for (var result of categories) {
        const categoryName = result.category
        categoryArr.push(categoryName)
      }
      state.commit('setCategory', categoryArr)
      return categories
    }
  }
}

const getters = {
  categories (state) {
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
