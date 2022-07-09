export const state = () => ({
  images: [],
  data: {
    name: '',
    sys: {
      country: '',
    },
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
    weather: [{}],
  },
})

export const mutations = {
  setCity(state, data) {
    state.images = data
  },
  setData(state, data) {
    state.data = data
  },
}
