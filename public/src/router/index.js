import Vue from 'vue'
import Router from 'vue-router'
import Proposals from '@/components/Proposals'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/proposals',
      name: 'Proposals',
      component: Proposals
    }
  ]
})
