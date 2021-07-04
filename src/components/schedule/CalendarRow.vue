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

// let jData;

// fetch(
//   'https://school-schedule-project-default-rtdb.europe-west1.firebasedatabase.app/.json',
// )
//   .then(resp => resp.json())
//   .then((json) => {
//     jData = json;
//     // eslint-disable-next-line no-console
//     console.log(json);
//   });

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
