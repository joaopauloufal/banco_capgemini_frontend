import Vue from 'vue'

export default class ToastError {
  static showErrorMessage (message, timeout = 4000) {
    Vue.prototype.$toast(message, {
      color: 'red',
      dismissable: true,
      icon: 'error',
      y: 'top',
      showClose: true,
      timeout,
      queueable: true
    })
  }

  static showSuccessMessage (message, timeout = 4000) {
    Vue.prototype.$toast(message, {
      color: 'green',
      dismissable: true,
      icon: 'check',
      y: 'top',
      showClose: true,
      timeout,
      queueable: true
    })
  }

  static showWarningMessage (message, timeout = 4000) {
    Vue.prototype.$toast(message, {
      color: 'orange',
      dismissable: true,
      icon: 'warning',
      y: 'top',
      showClose: true,
      timeout,
      queueable: true
    })
  }
}
