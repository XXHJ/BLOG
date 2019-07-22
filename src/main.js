import Vue from 'vue'
import router from './router'
import Element from './lib/ele.js'
import App from './App.vue'


new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
