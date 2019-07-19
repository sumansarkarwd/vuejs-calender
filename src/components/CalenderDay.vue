<template>
    <div>
        <div :class="classObject">{{ day.format('D') }}</div class="day">
    </div>
</template>

<script>
export default {
    props: ['day'],
    computed: {
        classObject() {
            let today = this.day.isSame(this.$moment(), 'day');
            return {
                day: true,
                today,
                past: this.day.isSameOrBefore(this.$moment(), 'day') && !today,
            }
        }
    }
}
</script>

<style>
    .day{
        height: 70px;
        width: calc((100% - 154px) / 7);
        border: 1px solid #dddcdc;
        padding: 10px;
        float: left;
    }
    .today{
        background-color: antiquewhite;
    }
    .past {
        color: #aeaeae;
    }
</style>
