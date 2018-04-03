// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import socketio from 'socket.io-client'
import VueSocketio from 'vue-socket.io'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSession from 'vue-session'

Vue.config.productionTip = false

axios.defaults.withCredentials = true

let IO = socketio('http://localhost:3000')
Vue.use(VueAxios, axios)
Vue.use(VueSocketio, IO)
Vue.use(VueSession)

/* eslint-disable no-new */
var app = new Vue({
  beforeCreate: () => {
  },
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  sockets: {
    connect: () => {
      console.log('Connected from component!')
    }
  }
})
