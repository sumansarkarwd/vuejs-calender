<template>
  <div class="float-left">
    <b-button variant="primary" @click="gotToThisMonthAndYear">Today</b-button>
    <b-button variant="link" @click="dec">
      <font-awesome-icon icon="angle-left"/>
    </b-button>
    <b-button variant="link" @click="inc">
      <font-awesome-icon icon="angle-right"/>
    </b-button>
    <span class="month-year">{{formatedDate}}</span>
    <div class="d-inline-block position-relative">
      <b-button variant="link" @click="chooseMonthDate">
        <font-awesome-icon icon="caret-down"/>
      </b-button>
      <div class="selector card" v-if="showSelectMonthAndYear">
        <div class="months clearfix">
          <ul class="clearfix">
            <li 
            v-for="m in months" 
            v-bind:key="m.number"
            :class="{active: m.number == month}"
            @click="changeMonth(m.number)">
              <span>{{ m.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showSelectMonthAndYear: false,
      }
    },
    computed: {
      months() {
        return this.$store.state.months;
      },
      formatedDate() {
          return this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D').format('MMMM YYYY');
      },
      year() {
        return this.$store.state.currentYear;
      },
      month() {
        return this.$store.state.currentMonth;
      },
    },
    methods: {
        dec() {
            this.$store.commit('jobFormActive', false);
            if(this.month == 1) {
                this.$store.commit('setCurrentMonth', 12);
                this.$store.commit('setCurrentYear', this.year - 1);
            } else {
                this.$store.commit('setCurrentMonth', this.month - 1);
            }
        },
        inc() {
            this.$store.commit('jobFormActive', false);
            if(this.month == 12) {
                this.$store.commit('setCurrentMonth', 1);
                this.$store.commit('setCurrentYear', this.year + 1);
            } else {
                this.$store.commit('setCurrentMonth', this.month + 1);
            }
        },
        gotToThisMonthAndYear() {
          this.$store.commit('setCurrentMonth', parseInt((this.$moment()).format('M')));
          this.$store.commit('setCurrentYear', parseInt((this.$moment()).format('YYYY')));
        },
        chooseMonthDate() {
          this.showSelectMonthAndYear = true;
        },
        changeMonth(month) {
          this.$store.commit('setCurrentMonth', month);
          this.showSelectMonthAndYear = false;
        }
    }
  }

</script>

<style>
  .month-year{
    font-size: 24px;
  }
  .selector{
    width: 180px;
    position: absolute;
    left: 0;
  }
  .selector .months {
    width: 180px;
    padding: 5px;
  }
  .selector .months ul li{
    width: calc(100% / 4);
    float: left;
    text-align: center;
    cursor: pointer;
  }
  .selector .months ul li span {
    display: inline-block;
    height: 35px;
    width: 35px;
    margin: 2px;
    padding: 10px 0;
    border-radius: 50%;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .selector .months ul li.active span {
    background-color: #007bff;
    color: #fff;
    font-weight: normal;
    font-size: 11px;
    padding: 9px 0;
  }
</style>
