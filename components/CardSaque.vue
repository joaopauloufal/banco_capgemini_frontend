<template>
  <div>
    <v-dialog v-model="show" max-width="600px" persistent>
      <v-card>
        <v-card-title class="deep-purple darken-4 white--text" primary-title>
          <v-layout justify-center>
            Realizar Saque
          </v-layout>
        </v-card-title>
        <v-skeleton-loader
          :loading="loading"
          type="card"
        >
          <v-card-text>
            <v-row v-if="saldo">
              <v-col cols="6">
                <span class="font-weight-bold">- Saldo Atual: {{ saldoFormatado }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5">
                <v-text-field
                  v-model="valor"
                  v-currency="currencyFormat"
                  :error-messages="formErrors ? formErrors.valor : []"
                  :error="formErrors && formErrors.valor ? true : false"
                  :error-count="formErrors && formErrors.valor ? formErrors.valor.length : 0"
                  type="text"
                  label="Valor a sacar (R$)"
                  name="valor"
                  hint="(*) Obrigatório."
                  persistent-hint
                  outlined
                  required
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-skeleton-loader>
      </v-card>
      <v-container class="white">
        <v-row>
          <v-col align="center" justify="center" cols="12">
            <v-btn
              color="white--text red darken-1"
              @click="close"
            >
              Cancelar
            </v-btn>
            <v-btn
              color="white--text green darken-1"
              @click="submit"
            >
              Sacar
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>

import Toast from '~/utils/toast.js'

export default {

  data: () => ({
    show: false,
    saldo: null,
    valor: 0.0,
    loading: false,
    contaId: null,
    currencyFormat: { currency: null, locale: 'pt-BR', autoDecimalMode: true }
  }),

  computed: {

    saldoFormatado () {
      const saldoFloat = parseFloat(this.saldo)
      return 'R$ ' + saldoFloat.toLocaleString('de-DE', { minimumFractionDigits: 2 })
    },

    formErrors () {
      return this.$store.state.minhasContas.errors
    }

  },

  methods: {
    close () {
      this.saldo = null
      this.valor = 0.0
      this.show = false
      this.contaId = null
    },

    open (contaId) {
      this.show = true
      this.getSaldoFromApi(contaId)
      this.$store.dispatch('minhasContas/clearErrors')
    },

    async getSaldoFromApi (contaId) {
      this.loading = true
      await this.$axios.get('api/v1/conta/saldo?id=' + contaId).then((response) => {
        this.saldo = response.data.saldo
        this.contaId = contaId
      })
      this.loading = false
    },

    async submit () {
      const data = {
        id: this.contaId,
        valor: this.valor
      }
      await this.$store.dispatch('minhasContas/storeSaque', data).then((response) => {
        this.$store.dispatch('minhasContas/clearErrors')
        this.close()
        Toast.showSuccessMessage(response.data.message)
        this.$parent.$parent.$parent.$parent.getDataFromApi()
      }).catch((error) => {
        if (error.response.status === 422) {
          this.valor = 0.0
          this.$store.commit('minhasContas/SET_ERRORS', error.response.data.errors)
          Toast.showWarningMessage(error.response.data.message)
        }
      })
    }
  }

}
</script>
