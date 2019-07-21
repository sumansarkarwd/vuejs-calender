<template>
  <div @click="clickHandler">
    <div :class="classObject">
      <span class="today-date">
        {{ day.format('D') }}
      </span>

      <div class="jobs">
        <ul class="list">
          <transition-group name="scale">
            <li v-bind:key="jIndex" v-for="(job, jIndex) in jobs">{{job.description}}</li>
          </transition-group>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['day'],
    computed: {
      classObject() {
        let today = this.day.isSame(this.$moment(), 'day');
        let jobFormDate = this.$store.state.jobFormDate;
        let jobFormShow = this.$store.state.jobFormShow;
        let selectedDate = jobFormDate.isSame(this.day, 'day');
        return {
          day: true,
          today,
          past: this.day.isSameOrBefore(this.$moment(), 'day') && !today,
          jobFormDate: selectedDate && jobFormShow,
        }
      },
      jobs() {
        let jobs = this.$store.state.jobs;
        return jobs.filter(job => job.date.isSame(this.day, 'day'));
      }
    },
    methods: {
      clickHandler(event) {
        this.$store.commit('jobFormActive', true);
        this.$store.commit('jobFormPos', {
          posX: event.clientX,
          posY: event.clientY,
        });
        this.$store.commit('setSelectedDate', this.day);
      }
    }
  }

</script>

<style>
  .day {
    height: 100px;
    width: calc((100%) / 7);
    border: 1px solid #dddcdc;
    padding: 10px;
    float: left;
    overflow-y: scroll;
    scrollbar-width: none;
  }

  .day::-webkit-scrollbar {
    display: none;
  }

  .today span.today-date {
    background-color: #0d47a1;
    color: #fff;
    font-weight: 100;
  }

  .past span.today-date {
    color: #aeaeae;
  }

  .day .jobs .list li {
    background-color: #4527a0;
    color: #fff;
    margin: 2px 0;
    border-radius: 2px;
    padding: 1px 5px;
    font-size: 12px;
  }

  .day.past .jobs .list li {
    background-color: #b39ddb;
  }

  .today-date {
    display: inline-block;
    height: 26px;
    width: 26px;
    text-align: center;
    border-radius: 50%;
    padding-top: 2px;
    font-size: 14px;
    font-weight: 600;
    color: #000;
    letter-spacing: 1px;
    margin-bottom: 5px;
  }

  .day.jobFormDate {
    background-color: aliceblue;
  }

  /* animation */
  .scale-enter {
    /* opacity: 0; */
    transform: scale(0);
  }

  .scale-enter-active {
    transition: transform .3s ease-in-out;
    transform: scale(1);
  }

  .scale-leave {
    transform: scale(1);
  }

  .scale-leave-active {
    transition: transform .3s ease-in-out;
    transform: scale(0);
  }

</style>
