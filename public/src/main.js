// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import socketio from 'socket.io-client'
import VueSocketio from 'vue-socket.io'
import router from './router'

Vue.config.productionTip = false

let IO = socketio('http://localhost:3000')
Vue.use(VueResource);
Vue.use(VueSocketio, IO)

/* eslint-disable no-new */
var app = new Vue({
  beforeCreate: () => {
    this.$socket = IO // Workaround because it doesn't work normally.
  },
  el: '#app',
  router,
  components: { App },
  template: '<div><App/><button v-on:click="pingServer">Ping server!</button></div>',
  sockets: {
    connect: () => {
      console.log('Connected from component!')
    }
  },
  methods: {
    pingServer: () => {
      this.$socket.emit('pingServer', 'Hello from client! :D')
    }
  }
})
