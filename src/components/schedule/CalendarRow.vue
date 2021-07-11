<template>
  <tr>
    <th scope="row">{{ 6 + 2 * index + ' - ' + (8 + 2 * index) }}</th>
    <CourseCard
      v-for="column in 5"
      :key="column"
      v-bind:column="column"
      v-bind:index="index"
      v-bind:jData="jData"
      :modalTitle="6 + 2 * index + ' - ' + (8 + 2 * index)"
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
