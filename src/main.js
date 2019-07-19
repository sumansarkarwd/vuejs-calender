import Vue from 'vue'
import App from './App.vue'
import moment from "vue-moment";
import vuex from "vuex"
import store from "./store"

moment.t
Vue.use(moment)
Vue.use(vuex)

new Vue({
  el: '#app',
  render: h => h(App),
  store
})
