<template>
  <v-container
    fill-height
    fluid
    ma-0
    pa-0
    :class="bgloading ? 'bg-gradient bgloading' : 'bg-gradient'"
    :style="bg_image"
  >
    <v-main fill-height :class="bg_image !== null ? 'bg-opacity' : ''">
      <v-row justify="center" align="center" class="mt-5">
        <v-col cols="12" sm="6">
          <v-img
            :src="require('~/assets/images/logo.svg')"
            max-width="250"
            class="mx-auto"
          ></v-img>
          <h1 class="text-white text-center mb-7">Clima e Tempo</h1>
          <v-form ref="form">
            <v-autocomplete
              ref="el"
              v-model="search"
              :items="entries"
              outlined
              clearable
              deletable-chips
              multiple
              background-color="white"
              rounded
              label="Cidade"
              placeholder="Digite o nome da cidade"
              @change="reset"
            ></v-autocomplete>

            <v-row justify-md="end">
              <v-btn color="primary" class="mr-3 mt-2" @click="searchCity">
                Pesquisar
              </v-btn>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="6">
          <v-card
            v-for="city in $store.state.city.data"
            :key="city.id"
            class="elevation-0 mt-7"
          >
            <v-card-text>
              <h4 class="text-h4">
                <b>{{ city.name }}</b>
                <small>- {{ city.weather[0].description }}</small>
              </h4>
              <div class="flex">
                <h5 class="text-h5">{{ city.main.temp }}</h5>
                <p>
                  temperatura de
                  {{
                    //converter temperatura para celsius
                    (city.main.temp - 273.15).toFixed(2)
                  }}
                  to {{ city.main.temp_max }} °С, ventos
                  {{ city.wind.speed }} m/s.
                </p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <CityDetails
        v-if="$store.state.city.images.length > 0"
        :loading="loading"
      />
    </v-main>
  </v-container>
</template>

<script>
import CityDetails from '@/components/CityDetails.vue'
export default {
  name: 'IndexPage',
  components: {
    CityDetails,
  },
  data() {
    return {
      entries: [],
      search: [],
      value: null,
      isLoading: false,
      selectedImages: [],
      loading: false,
      bgloading: false,
    }
  },
  computed: {
    bg_image() {
      if (this.$store.state.city.images.length > 0) {
        return `background-image: url(${this.$store.state.city.images[0].regular});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;`
      } else {
        return null
      }
    },
  },
  mounted() {
    this.getEntries()
  },
  methods: {
    reset() {
      this.$refs.el.lazySearch = ''
    },
    getEntries() {
      this.$axios
        .get('city.list.json')
        .then((res) => {
          this.entries = res.data.map((entry) => {
            return entry.name
          })
        })
        .catch(() => {})
        .finally(() => (this.isLoading = false))
    },
    toggleLoading(timeout) {
      setTimeout(() => (this.loading = !this.loading), timeout)
    },
    searchCity() {
      // await this.$axios
      //   .get(
      //     `https://api.unsplash.com/photos/random?query=${this.search[0].toLowerCase()}&client_id=${
      //       this.$config.unsplashApi
      //     }&count=2`
      //   )
      //   .then((response) => {
      //     this.selectedImages = response.data.map((image) => image.urls)
      //     this.$store.commit('city/setCity', this.selectedImages)
      //   })
      //   .catch(() => {})

      setTimeout(() => (this.bgloading = false), 10000)
      Promise.all(
        this.search.map((item) => {
          return this.$axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?q=${item}&appid=${this.$config.weatherApi}`
            )
            .then((res) => {
              this.$store.commit('city/setData', res.data)
              this.toggleLoading(1000)
            })
            .catch(() => {})
        })
      )
    },
  },
}
</script>
