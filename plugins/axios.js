import Toast from '~/utils/toast.js'

export default function ({ $axios }) {
  $axios.onError((error) => {
    if (!error.response) {
      Toast.showErrorMessage('Não foi possível acessar a API! Verifique se a mesma está ativa.')
    }
  })
}
