export const state = () => ({
  images: [],
  data: [],
})

export const actions = {
  async addData({ commit }, data) {
    await commit('setData', data)
  },
}

export const mutations = {
  setCity(state, data) {
    state.images = data
  },
  setData(state, data) {
    state.data.push(data)
  },
}
