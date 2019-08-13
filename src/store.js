import Vue from "vue"
import vuex from "vuex"
import moment from "moment"
import axios from "axios"
import Notifications from 'vue-notification'

Vue.use(vuex)
Vue.use(moment)
Vue.use(Notifications)

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
    jobFormPosStyle: {},
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
      
      let outOfWidth = false;
      let outOfHeight = false;
      let pos = {};

      // if jobForm get out of window horizontally
      if (calcFormRightEnd > state.viewPortWidth) {
        outOfWidth = true;
      }
      // if jobForm get out of window vertically
      if (calcFormBottomEnd > state.viewPortHeight) {
        outOfHeight = true;
      }

      if(outOfWidth && outOfHeight) {
        // if jobForm get out of window horizontally and vertically
        pos = {
          right: (state.viewPortWidth - payload.posX)+'px',
          bottom: (state.viewPortHeight - payload.posY)+'px',
          'transform-origin': 'bottom right',
        }
      } else if (outOfWidth && !outOfHeight) {
        // if jobForm get out of window horizontally
        pos = {
          right: (state.viewPortWidth - payload.posX)+'px',
          top: payload.posY+'px',
          'transform-origin': 'top right',
        }
      } else if (!outOfWidth && outOfHeight) {
        // if jobForm get out of window vertically
        pos = {
          left: payload.posX+'px',
          bottom: (state.viewPortHeight - payload.posY)+'px',
          'transform-origin': 'bottom left',
        }
      } else {
        // if jobForm get within the window
        pos = {
          left: payload.posX+'px',
          top: payload.posY+'px',
          'transform-origin': 'top left',
        };
      }      
      state.jobFormPosStyle = pos;
    },
    jobFormActive(state, payload) {
      state.jobFormShow = payload;
    },
    addJob(state, payload) {
      state.jobs.push({
        description: payload,
        date: state.jobFormDate
      });
      let insertedJobIndex = state.jobs.length - 1;
      axios.post("http://127.0.0.1:8000/api/jobs", {
        job: payload,
        date: state.jobFormDate.format("YYYY-MM-DD")
      }).then(res => {
        if(res.data.code == 201) {
          Vue.notify({
            group: 'notification',
            title: 'Success',
            type: 'success',
            text: 'Task Added Successfully!'
          });
        } else {
          Vue.notify({
            group: 'notification',
            title: 'Error',
            type: 'error',
            text: 'Something Went Wrong!'
          });
          state.jobs.splice(insertedJobIndex, 1);
        }
      }).catch(err => {
        Vue.notify({
          group: 'notification',
          title: 'Error',
          type: 'error',
          text: 'Something Went Wrong!'
        });
        state.jobs.splice(insertedJobIndex, 1);
      });
    },
    setSelectedDate(state, payload) {
      state.jobFormDate = payload;
    },
    totalWeeksInMonth(state, payload) {
      let ignoreHeight = 90 + 35;
      state.dayHeight = Math.floor(((state.viewPortHeight - ignoreHeight) / parseInt(payload)));      
    },
    getJobs(state, payload) {
      state.jobs = payload;
    }
  },
  actions: {
    getJobs({commit}) {
      axios.get("http://127.0.0.1:8000/api/jobs")
      .then(res => {
        const jobs = res.data.data;
        let myJobs = [];
        jobs.forEach((job) => {
          let datetime = job.date;
          let momentDt = moment(datetime);
          let j = {
            id: job.id,
            date: momentDt,
            description: job.job
          }
          myJobs.push(j);
        })
        commit('getJobs', myJobs);    
      })
      .catch(err => console.log(err));
    }
  }
})
