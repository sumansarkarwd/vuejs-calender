import Vue from 'vue'
import App from './App.vue'
import moment from "vue-moment";
import vuex from "vuex"
import store from "./store"
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {
  library
} from '@fortawesome/fontawesome-svg-core';
import { faAngleRight, faAngleLeft, faTimes, faSortDown, faCaretDown }
from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
import Notifications from 'vue-notification'

library.add( faAngleRight, faAngleLeft, faTimes, faSortDown, faCaretDown);

Vue.component('font-awesome-icon', FontAwesomeIcon)


moment.t
Vue.use(moment)
Vue.use(vuex)
Vue.use(BootstrapVue)
Vue.use(Notifications)

new Vue({
  el: '#app',
  render: h => h(App),
  store
})
