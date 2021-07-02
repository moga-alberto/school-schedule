<template>
  <tr class="fs-5">
    <th scope="row">1</th>
    <td>Mark</td>
    <td>Otto</td>
    <td style="width: 0;"><RemoveButton class="me-2"/></td>
  </tr>
</template>

<script>
import RemoveButton from '../utilities/RemoveButton';

export default {
  name: 'CoursesRow',
  components: {
    RemoveButton,
  },
};
</script>

<style scoped></style>
