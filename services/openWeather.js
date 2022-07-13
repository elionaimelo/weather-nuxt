export default {
  getWeather(search) {
    search.forEarch((item) => {
      this.$axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${item}&appid=${this.$config.weatherApi}`
        )
        .then((res) => {
          console.log(res.data)
        })
    })
  },
}
