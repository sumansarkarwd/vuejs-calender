import Vue from "vue"
import vuex from "vuex"

Vue.use(vuex)

export default new vuex.Store({
  state: {
    currentYear: 2019,
    currentMonth: 7
  },
  mutations: {
    setCurrentMonth(state, payload) {
      state.currentMonth = payload;
    },
    setCurrentYear(state, payload) {
      state.currentYear = payload;
    },
  }
})
