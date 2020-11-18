<template>
  <div>
    <v-main>
      <v-container
        class="fill-height"
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="4">
            <v-text-field
              v-model="search"
              label="Buscar por Nº da Conta..."
              append-icon="search"
              single-line
              hide-details
              clearable
            />
          </v-col>
        </v-row>
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
          >
            <v-skeleton-loader
              :loading="loading"
              type="card"
            >
              <v-card :loading="loading" class="elevation-12">
                <v-toolbar
                  color="deep-purple darken-4"
                  dark
                  flat
                >
                  <v-layout justify-center>
                    <v-toolbar-title>
                      CONTAS
                    </v-toolbar-title>
                  </v-layout>
                </v-toolbar>
                <v-card-text>
                  <div v-if="contas.length > 0">
                    <v-row>
                      <template v-for="(item, indice) in contas">
                        <v-col :key="indice" cols="4">
                          <card-contas
                            :id="item.id"
                            :numero-conta="item.numero"
                            :numero-agencia="item.agencia.numero"
                            :tipo="item.tipo"
                            :saldo="item.saldo"
                          />
                        </v-col>
                      </template>
                    </v-row>
                    <card-consulta-saldo ref="cardConsultaSaldo" />
                    <card-saque ref="cardSaque" />
                    <card-deposito ref="cardDeposito" />
                  </div>
                  <div v-else>
                    <v-alert type="info">
                      Não existem contas cadastradas.
                    </v-alert>
                  </div>
                </v-card-text>
              </v-card>
            </v-skeleton-loader>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>

import CardContas from '~/components/CardContas.vue'
import CardConsultaSaldo from '~/components/CardConsultaSaldo.vue'
import CardSaque from '~/components/CardSaque.vue'
import CardDeposito from '~/components/CardDeposito.vue'

export default {

  components: {
    CardContas, CardConsultaSaldo, CardSaque, CardDeposito
  },

  data: () => ({
    search: ''
  }),

  computed: {
    contas () {
      return this.$store.state.contas.dataList
    },

    loading () {
      return this.$store.state.contas.loading
    }
  },

  watch: {
    search: {
      handler () {
        this.getDataFromApi()
      }
    }
  },

  mounted () {
    this.getDataFromApi()
  },

  methods: {
    async getDataFromApi () {
      const data = {
        search: this.search
      }
      await this.$store.dispatch('contas/getData', data)
    }
  }
}

</script>
