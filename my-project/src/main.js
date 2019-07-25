/* eslint-disable no-new */
import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import Routes from './router/index'
import VueMask from 'v-mask'
import store from './store'

Vue.use(VueMask)
Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(store)

const router = new VueRouter({
  routes:Routes,
  mode:'history'
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
