<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title><center><b>Menu Principal</b></center></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider />
      <v-list dense>
        <v-list-item
          v-for="item in itemsComputed"
          :key="item.title"
          :to="item.path"
          active-class="blue lighten-3"
          exact
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      dark
      color="deep-purple darken-4"
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main class="grey lighten-5">
      <v-container class="grey lighten-5" fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer padless app absolute>
      <v-row justify="center">
        <v-col class="text-center white--text col-footer-links" cols="12">
          <v-row>
            <v-col class="text-center my-5" cols="12">
              <span><b>BANCO CAPGEMINI</b></span>
            </v-col>
          </v-row>
        </v-col>
        <v-row>
          <v-col class="grey lighten-2" cols="2" />
          <v-col class="black--text grey lighten-2" cols="9">
            Copyright © {{ new Date().getFullYear() }}. Todos os direitos reservados.
          </v-col>
          <v-col cols="1">
            Versão 1.0.0
          </v-col>
        </v-row>
      </v-row>
    </v-footer>
  </v-app>
</template>

<style>
  .col-footer-links {
    background-color: #252a86;
    border-top: 5px solid #00934f;
  }

</style>

<script>

export default {

  data () {
    return {
      drawer: true,
      clipped: false
    }
  },

  computed: {
    itemsComputed () {
      const items = [
        { title: 'Início', icon: 'mdi-home-city', path: '/' }
      ]
      return items
    }
  }

}
</script>
