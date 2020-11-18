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
                      MINHAS CONTAS
                    </v-toolbar-title>
                  </v-layout>
                </v-toolbar>
                <v-card-text>
                  <div v-if="contas.length > 0">
                    <v-row>
                      <template v-for="(item, indice) in contas">
                        <v-col :key="indice" cols="4">
                          <card-minhas-contas
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
                      Você ainda não possui contas cadastradas.
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

import CardMinhasContas from '~/components/CardMinhasContas.vue'
import CardConsultaSaldo from '~/components/CardConsultaSaldo.vue'
import CardSaque from '~/components/CardSaque.vue'
import CardDeposito from '~/components/CardDeposito.vue'

export default {

  components: {
    CardMinhasContas, CardConsultaSaldo, CardSaque, CardDeposito
  },

  computed: {
    contas () {
      return this.$store.state.minhasContas.dataList
    },

    loading () {
      return this.$store.state.minhasContas.loading
    }
  },

  mounted () {
    this.getDataFromApi()
  },

  methods: {
    async getDataFromApi () {
      await this.$store.dispatch('minhasContas/getData')
    }
  }
}

</script>
