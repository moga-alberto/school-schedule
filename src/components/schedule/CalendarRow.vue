<template>
  <tr>
    <th scope="row">{{ 6 + 2 * index + ' - ' + (8 + 2 * index) }}</th>
    <CourseCard
      v-for="index2 in 5"
      :key="index2"
      v-bind:indx2="index2.toString()"
      v-bind:index="index"
      v-bind:jData="jData"
    />
  </tr>
</template>

<script>
import CourseCard from './CourseCard';

export default {
  props: ['indx', 'jData'],
  name: 'CalendarRow',
  components: {
    CourseCard,
  },
  data() {
    return {
      index: this.indx,
      // json: jData,
    };
  },
};
</script>

<style scoped></style>
