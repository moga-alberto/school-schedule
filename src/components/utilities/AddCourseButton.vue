<template>
  <div class="d-flex flex-column text-md-center">
    <div>
      <edit-modal
        name="add"
        v-bind:reason="'add-course'"
        v-bind:modalTitle="'Add New Course'"
        v-bind:modalAction="'Add'"
        v-bind:modalButton="'Add Course'"
        v-bind:btnClass="'btn course-card btn-success fs-5 fw-bold border-0'"
        :add="true"
        :post.sync="post"
        :rowIndex="1"
        :keyUp.sync="keyUp"
      />
    </div>
  </div>
</template>

<script>
import EditModal from './EditModal';

export default {
  props: [],
  components: { EditModal },
  name: 'AddCourseButton',
  data() {
    return {
      keyUp: 0,
      post: this.$store.state.post,
    };
  },
};
</script>

<style scoped></style>
