<template>
  <tr class="fs-5 hover">
    <th scope="row">{{ courseTitle }}</th>
    <td>Mark</td>
    <td>Otto</td>
    <td style="width: 0;">
      <edit-modal
      class="edit-button"
      :name="'edit' + index"
        v-bind:reason="index + 'edit-course'"
        v-bind:modalTitle="'Edit Course'"
        v-bind:modalAction="'Save'"
        v-bind:modalButton="html"
        v-bind:btnClass="'edit btn-light border-0 fs-6 fw-bold border-0'"
        :post="post"
      />
    </td>
    <td style="width: 0;"><remove-button class="me-2" /></td>
  </tr>
</template>

<script>
import EditModal from '../utilities/EditModal';
import RemoveButton from '../utilities/RemoveButton';

export default {
  name: 'CoursesRow',
  props: ['index', 'courseTitle', 'post'],
  components: {
    RemoveButton,
    EditModal,
  },
  data() {
    return {
      // eslint-disable-next-line quotes
      html: '<span>Edit<span/>',
    };
  },
};
</script>

<style scoped>
.hover:hover {
  transform: scale(0.998);
  border: 2px inset black;
  transition: transform 0.3s linear;
  cursor: pointer;
}

.edit-button {
  visibility: hidden;
}

.hover:hover .edit-button{
  visibility: visible;
  /* background-color: none !important; */
}
</style>
