import Vue from 'vue'
import router from './router'
// eslint-disable-next-line
import element from './lib/ele'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
