<template>
  <tr>
    <th scope="row">08-10</th>
    <td><CourseCard /></td>
    <td>Otto</td>
    <td>@mdo</td>
    <td>@mdo</td>
    <td>@mdo</td>
    <td>@mdo</td>
    <td>@mdo</td>
  </tr>
</template>

<script>
import CourseCard from './CourseCard';

export default {
  name: 'CalendarRow',
  components: {
    CourseCard,
  },
};
</script>

<style scoped></style>
