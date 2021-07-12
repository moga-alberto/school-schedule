<template>
  <tr class="">
    <th
      scope="row"
      class="align-middle d-fllex align-items-center justify-items-center px-3 position"
    >
      <span>{{ 6 + 2 * index }}</span
      ><span> - </span><span>{{ 8 + 2 * index }}</span>
    </th>
    <CourseCard
      v-for="column in 5"
      :key="column"
      v-bind:column="column"
      v-bind:index="index"
      :modalTitle="6 + 2 * index + ' - ' + (8 + 2 * index)"
    />
  </tr>
</template>

<script>
import CourseCard from './CourseCard';

export default {
  props: ['indx'],
  name: 'CalendarRow',
  components: {
    CourseCard,
  },
  data() {
    return {
      index: this.indx,
    };
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .position {
    display: none;
  }
}
</style>
