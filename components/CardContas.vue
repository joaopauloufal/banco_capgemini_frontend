<template>
  <div>
    <v-card class="elevation-12">
      <v-toolbar
        color="green"
        dark
        flat
      >
        <v-layout justify-center>
          <v-toolbar-title>
            <b>{{ numeroConta }}</b>
          </v-toolbar-title>
        </v-layout>
      </v-toolbar>
      <v-card-text class="grey lighten-5">
        <v-row>
          <v-col cols="12">
            <p class="font-weight-bold">
              <ul>
                <li>Nº da Conta: {{ numeroConta }}</li>
                <li>Nº da Agência: {{ numeroAgencia }}</li>
                <li>Tipo: {{ computedTipo }}</li>
                <li>Saldo Atual: {{ saldoFormatado }}</li>
              </ul>
            </p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <v-layout justify-center>
          <v-tooltip open-delay="300" bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                class="mx-2"
                color="blue darken-1"
                fab
                dark
                small
                v-on="on"
                @click="showConsultaSaldoCard"
              >
                <v-icon dark>
                  mdi-eye
                </v-icon>
              </v-btn>
            </template>
            <span>Consultar Saldo...</span>
          </v-tooltip>
          <v-tooltip open-delay="300" bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                class="mx-2"
                color="blue darken-1"
                fab
                dark
                small
                v-on="on"
                @click="showSaqueCard"
              >
                <v-icon dark>
                  mdi-transfer-up
                </v-icon>
              </v-btn>
            </template>
            <span>Realizar Saque...</span>
          </v-tooltip>
          <v-tooltip open-delay="300" bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                class="mx-2"
                color="blue darken-1"
                fab
                dark
                small
                v-on="on"
                @click="showDepositoCard"
              >
                <v-icon dark>
                  mdi-transfer-down
                </v-icon>
              </v-btn>
            </template>
            <span>Realizar Depósito...</span>
          </v-tooltip>
        </v-layout>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {

  props: {
    numeroConta: {
      type: String,
      default: ''
    },

    numeroAgencia: {
      type: String,
      default: ''
    },

    tipo: {
      type: String,
      default: ''
    },

    id: {
      type: Number,
      default: -1
    },

    saldo: {
      type: String,
      default: ''
    }
  },

  computed: {

    computedTipo () {
      return this.tipo === 'poupanca' ? 'Conta Poupança' : 'Conta Corrente'
    },

    saldoFormatado () {
      const saldoFloat = parseFloat(this.saldo)
      return 'R$ ' + saldoFloat.toLocaleString('de-DE', { minimumFractionDigits: 2 })
    }

  },

  methods: {

    showConsultaSaldoCard () {
      this.$parent.$parent.$parent.$parent.$refs.cardConsultaSaldo.open(this.id)
    },

    showSaqueCard () {
      this.$parent.$parent.$parent.$parent.$refs.cardSaque.open(this.id)
    },

    showDepositoCard () {
      this.$parent.$parent.$parent.$parent.$refs.cardDeposito.open(this.id)
    }

  }
}
</script>
