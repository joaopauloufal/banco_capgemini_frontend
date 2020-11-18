<template>
  <div>
    <v-overlay v-if="loading" :value="overlay">
      <v-progress-circular
        size="80"
        width="7"
        color="#FFD54F"
        indeterminate
      />
    </v-overlay>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    overlay: false
  }),
  methods: {
    start () {
      this.loading = true
      this.overlay = true
    },
    finish () {
      this.loading = false
      this.overlay = false
    },
    fail (error) {
      window.console.log(error)
      this.loading = false
      this.overlay = false
    }
  }
}
</script>
