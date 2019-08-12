<template>
  <transition name="scale">
    <div class="card job-form" :style="{left, top }" v-show="showForm">
      <div class="clearfix">
        <div class="float-left title text-secondary">Add Job</div>
        <div class="float-right pb-2">
          <b-button variant="link text-secondary" @click="close">
            <font-awesome-icon icon="times" />
          </b-button>
        </div>
      </div>
      <div class="form-group">
        <p class="font-weight-bold">{{ date.format('dddd, MMM Do') }}</p>
      </div>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Do something" v-model="jobDescription"
          @keyup.esc.prevent="close" @keyup.enter.prevent="addJob" v-focus>
      </div>
      <button type="button" class="btn btn-primary mt-4 float-right" @click="addJob">Add Job</button>
    </div>
    </transition>
</template>

<script>
  export default {
    data() {
      return {
        jobDescription: ''
      }
    },
    computed: {
      left() {
        return `${this.$store.state.jobFormPosX}px`;
      },
      top() {
        return `${this.$store.state.jobFormPosY}px`;
      },
      showForm() {
        return this.$store.state.jobFormShow;
      },
      date() {
        return this.$store.state.jobFormDate;
      }
    },
    methods: {
      close() {
        this.$store.commit('jobFormActive', false);
      },
      addJob() {
        if (this.jobDescription.length != 0) {
          this.$store.commit('addJob', this.jobDescription);
          this.$store.commit('jobFormActive', false);
          this.jobDescription = '';
        }
      }
    },
    directives: {
      focus: {
        update(el) {
          el.focus();
        }
      }
    }
  }

</script>

<style>
  .job-form {
    width: 350px;
    position: fixed;
    /* transition: .3s ease-in-out; */
    padding: 15px;
    transform-origin: top left;
  }

  .job-form div {
    margin: 0;
  }

  .job-form div.title {
    font-size: 26px;
  }

  .show {
    display: block;
  }

  /* animation */

  .scale-enter {
    transform: scale(0);
  }
  .scale-enter-active {
    transition: .2s;
  }
  .scale-leave {
    /* opacity: 1; */
  }
  .scale-leave-active {
    transition: .2s;
    transform: scale(0);;
  }
</style>
