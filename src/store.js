import Vue from "vue"
import vuex from "vuex"
import moment from "moment"

Vue.use(vuex)
Vue.use(moment)

export default new vuex.Store({
  state: {
    currentYear: parseInt((moment()).format('YYYY')),
    currentMonth: parseInt((moment()).format('M')),
    months: [
      { name: 'JAN', number: 1 },
      { name: 'FEB', number: 2 },
      { name: 'MAR', number: 3 },
      { name: 'APR', number: 4 },
      { name: 'MAY', number: 5 },
      { name: 'JUN', number: 6 },
      { name: 'JUL', number: 7 },
      { name: 'AUG', number: 8 },
      { name: 'SEP', number: 9 },
      { name: 'OCT', number: 10 },
      { name: 'NOV', number: 11 },
      { name: 'DEC', number: 12 },
    ],
    dayHeight: 0,
    viewPortHeight: 0,
    viewPortWidth: 0,
    jobFormPosX: 0,
    jobFormPosY: 0,
    jobFormShow: false,
    jobs: [{
        description: 'Do this',
        date: moment('2019-07-12', 'YYYY-MM-DD')
      },
      {
        description: 'Do that',
        date: moment('2019-07-23', 'YYYY-MM-DD')
      },
    ],
    jobFormDate: moment(),
  },
  mutations: {
    setCurrentMonth(state, payload) {
      state.currentMonth = payload;
    },
    setCurrentYear(state, payload) {
      state.currentYear = payload;
    },
    updateViewPortSize(state, payload) {
      state.viewPortHeight = payload.height;
      state.viewPortWidth = payload.width;
    },
    jobFormPos(state, payload) {
      let calcFormRightEnd = parseInt(payload.posX) + parseInt(350);
      let calcFormBottomEnd = parseInt(payload.posY) + parseInt(218);
      console.log(calcFormBottomEnd + '-'+ payload.posY);
      

      // if jobForm get out of window horizontally
      if (calcFormRightEnd > state.viewPortWidth) {
        let howMuchBigger = calcFormRightEnd - state.viewPortWidth;
        let posXShouldBe = payload.posX - (howMuchBigger + 100);
        state.jobFormPosX = posXShouldBe;
      } else {
        state.jobFormPosX = payload.posX;
      }
      // if jobForm get out of window horizontally
      if (calcFormBottomEnd > state.viewPortHeight) {
        let howMuchBigger = calcFormBottomEnd - state.viewPortHeight;
        let posYShouldBe = payload.posY - (howMuchBigger + 50);
        state.jobFormPosY = posYShouldBe;
      } else {
        state.jobFormPosY = payload.posY;
      }
    },
    jobFormActive(state, payload) {
      state.jobFormShow = payload;
    },
    addJob(state, payload) {
      state.jobs.push({
        description: payload,
        date: state.jobFormDate
      });
    },
    setSelectedDate(state, payload) {
      state.jobFormDate = payload;
    },
    totalWeeksInMonth(state, payload) {
      let ignoreHeight = 90 + 35;
      state.dayHeight = Math.floor(((state.viewPortHeight - ignoreHeight) / parseInt(payload)));      
    }
  }
})
