<template>
  <div>
    <v-dialog v-model="show" max-width="600px" persistent>
      <v-card>
        <v-card-title class="deep-purple darken-4 white--text" primary-title>
          <v-layout justify-center>
            Consulta de Saldo
          </v-layout>
        </v-card-title>
        <v-skeleton-loader
          :loading="loading"
          type="card"
        >
          <v-card-text class="headline font-weight-bold">
            <v-layout v-if="saldo" justify-center>
              <span>Saldo Atual: {{ saldoFormatado }}</span>
            </v-layout>
          </v-card-text>
        </v-skeleton-loader>
      </v-card>
      <v-container class="white">
        <v-row>
          <v-col align="center" justify="center" cols="12">
            <v-btn
              color="white--text green darken-1"
              @click="close"
            >
              OK
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
export default {

  data: () => ({
    show: false,
    saldo: null,
    loading: false
  }),

  computed: {

    saldoFormatado () {
      const saldoFloat = parseFloat(this.saldo)
      return 'R$ ' + saldoFloat.toLocaleString('de-DE', { minimumFractionDigits: 2 })
    }

  },

  methods: {
    close () {
      this.saldo = null
      this.show = false
    },

    open (contaId) {
      this.show = true
      this.getSaldoFromApi(contaId)
    },

    async getSaldoFromApi (contaId) {
      this.loading = true
      await this.$axios.get('api/v1/conta/saldo?id=' + contaId).then((response) => {
        this.loading = false
        this.saldo = response.data.saldo
      })
      this.loading = false
    }
  }

}
</script>
