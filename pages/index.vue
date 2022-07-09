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
          <h1 class="text-white text-center mb-7">Clima e Tempo</h1>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="search"
              :rules="searchRules"
              filled
              rounded
              dense
              label="Digite o nome da cidade"
              background-color="white"
              required
              autofocus
              append-icon="mdi-magnify"
            ></v-text-field>
            <v-row justify-md="end">
              <v-btn
                :disabled="!valid || !search"
                color="primary"
                class="mr-3 mt-2"
                @click="searchCity"
              >
                Pesquisar
              </v-btn>
            </v-row>
          </v-form>
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
      search: '',
      api_key: 'BkFVxI3D21KfjesgevaorlUFHZsiZ6XiS44m6Os2jJc',
      api_key_weather: '77f561d31496c1f946dc19f0bd339ad1',
      selectedImages: [],
      searchRules: [
        (v) => !!v || 'Este campo é obrigatório',
        (v) => (v && v.length <= 30) || 'Não pode ser menor que 3',
      ],
      valid: true,
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
  methods: {
    toggleLoading(timeout) {
      setTimeout(() => (this.loading = !this.loading), timeout)
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    async searchCity() {
      this.$refs.form.validate()
      this.toggleLoading(0)
      this.bgloading = true
      if (this.valid) {
        await this.$axios
          .get(
            `https://api.unsplash.com/photos/random?query=${this.search.toLowerCase()}&client_id=${
              this.api_key
            }&count=2`
          )
          .then((response) => {
            this.selectedImages = response.data.map((image) => image.urls)
            this.$store.commit('city/setCity', this.selectedImages)
          })
          .catch(() => {})

        setTimeout(() => (this.bgloading = false), 10000)

        await this.$axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.search.toLowerCase()}&appid=${
              this.api_key_weather
            }`
          )
          .then((response) => {
            this.$store.commit('city/setData', response.data)
          })
          .catch(() => {})

        this.toggleLoading(0)
      }
    },
  },
}
</script>
