<template>
  <v-row justify="center">
    <v-col cols="12" sm="4">
      <v-card
        :loading="loading"
        class="mx-auto my-3 text-center"
        max-width="800"
      >
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img
          height="250"
          aspect-ratio="16/9"
          :src="$store.state.city.images[1].regular"
        ></v-img>

        <h5 class="text-h5 text-center mt-3">
          {{ data.name }} -
          {{ data.sys.country }}
        </h5>

        <v-card-text>
          <h2 class="text-h2 font-weight-medium">
            {{ data.main.temp }}
          </h2>
          <p>{{ data.weather.description }}</p>
        </v-card-text>

        <v-row justify="center">
          <v-col md="6">
            <v-row justify="space-between">
              <div>
                {{ data.main.temp_min }}
                <div>Mínima</div>
              </div>
              <div>
                {{ data.main.temp_max }}
                <div>Máxima</div>
              </div>
            </v-row>
          </v-col>
        </v-row>

        <v-divider class="mx-4 mt-8"></v-divider>

        <v-row justify="center" class="py-7">
          <v-col md="6">
            <v-row justify="space-between">
              <div>
                <div>
                  {{ data.main.feels_like }}
                </div>
                <div>Sensação</div>
              </div>
              <div>
                <div>{{ data.main.humidity }}</div>
                <div>Umidade</div>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CityDetails',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    data() {
      return this.$store.state.city.data
    },
  },
}
</script>
