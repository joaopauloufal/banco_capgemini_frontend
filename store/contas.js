export const state = () => ({
  dataList: [],
  totalItems: 0,
  loading: false,
  errors: null
})

export const mutations = {
  UPDATE_DATA_LIST (state, data) {
    state.totalItems = data.length
    state.dataList = data
  },

  SET_LOADING (state, loading) {
    state.loading = loading
  },

  SET_ERRORS (state, errors) {
    state.errors = errors
  },

  CLEAR_STORE_DATA (state) {
    state.dataList = []
    state.totalItems = 0
    state.loading = false
    state.errors = null
  }

}

export const actions = {
  getData (context, { search }) {
    context.commit('SET_LOADING', true)
    let searchValue = ''
    if (search !== '') {
      searchValue = '&search=' + search
    }
    this.$axios.get('api/v1/contas?with=agencia&orderBy=id&sortedBy=desc' + searchValue).then(
      (response) => {
        context.commit('UPDATE_DATA_LIST', response.data)
        context.commit('SET_LOADING', false)
      }
    ).catch(() => {
      context.commit('SET_LOADING', false)
    })
  },

  storeSaque (context, data) {
    return this.$axios.put('api/v1/conta/sacar/' + data.id, data)
  },

  storeDeposito (context, data) {
    return this.$axios.put('api/v1/conta/depositar/' + data.id, data)
  },

  clearErrors (context) {
    context.commit('SET_ERRORS', null)
  }
}
