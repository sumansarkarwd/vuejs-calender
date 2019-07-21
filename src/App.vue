<template>
  <div id="app" class="calender">
    <div class="header clearfix">
      <div>
        <calender-month></calender-month>
      </div>
    </div>
    <div class="calender-bar clearfix">
      <div>MON</div>
      <div>TUE</div>
      <div>WED</div>
      <div>THU</div>
      <div>FRI</div>
      <div>SAT</div>
      <div>SUN</div>
    </div>
    <div v-for="(week, wIndex) in weeks" v-bind:key="wIndex" class="calender-week">
      <calender-day v-for="(day, dIndex) in week" v-bind:key="dIndex" :day="day">
      </calender-day>
    </div>

    <job-form></job-form>
  </div>
</template>

<script>
  import CalenderDay from "./components/CalenderDay"
  import CalenderMonth from "./components/CalenderMonth"
  import JobForm from "./components/JobForm"

  export default {
    name: 'app',
    data() {
      return {}
    },
    components: {
      CalenderDay,
      CalenderMonth,
      JobForm,
    },
    computed: {
      year() {
        return this.$store.state.currentYear;
      },
      month() {
        return this.$store.state.currentMonth;
      },
      days() {
        const SUNDAY = 0;
        const MONDAY = 1;

        // add current month days
        let days = [];
        let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D');
        while ((currentDay.month() + 1) === this.month) {
          days.push(currentDay);
          currentDay = this.$moment(currentDay).add(1, 'days');
        }

        // add previous months days
        currentDay = this.$moment(days[0]);
        while (currentDay.day() !== MONDAY) {
          currentDay = this.$moment(currentDay).subtract(1, 'days');
          days.unshift(currentDay);
        }

        // add next months days
        currentDay = this.$moment(days[(days.length - 1)]);
        while (currentDay.day() !== SUNDAY) {
          currentDay = this.$moment(currentDay).add(1, 'days');
          days.push(currentDay);
        }

        return days;
      },
      weeks() {
        let weeks = [];
        let week = [];
        let totalWeeks = 0;

        for (let day of this.days) {
          week.push(day);
          if (week.length == 7) {
            weeks.push(week);
            week = [];
            totalWeeks++;
          }
        }
        
        this.$store.commit('totalWeeksInMonth', totalWeeks);

        return weeks;
      },
    },
    created() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize();
    },
    methods: {
      handleResize() {
        this.$store.commit('updateViewPortSize', {
          height: window.innerHeight,
          width: window.innerWidth,
        });
      }
    }
  }

</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');

  * {
    margin: 0 auto;
  }

  body {
    padding: 15px;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }

  #app {
    width: 100%;
    max-width: 1200px;
  }

  .calender-bar {
    margin: 5px 0;
  }

  .calender-bar div {
    width: calc((100%) / 7);
    padding: 10px 0;
    float: left;
    color: #00695c;
    font-weight: 600;
    letter-spacing: 4px;
  }

  .calender-title {
    font-size: 30px;
    float: left;
  }

  .cf::after {
    content: '';
    display: block;
    clear: both;
  }

  button {
    cursor: pointer;
  }

  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }

</style>
