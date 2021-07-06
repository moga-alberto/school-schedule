<template>
  <tr class="fs-5 hover">
    <th scope="row" :key="keyUp">{{ courseTitle }}</th>
    <td :key="keyUp + teacherKey">{{ teacher }}</td>
    <td :key="keyUp + studentsKey">{{ sNumber }}</td>
    <td style="width: 0;">
      <edit-modal
        class="edit-button"
        :name="'edit' + index"
        v-bind:reason="index + 'edit-course'"
        v-bind:modalTitle="'Edit Course'"
        v-bind:modalAction="'Save'"
        v-bind:modalButton="html"
        v-bind:btnClass="'edit btn-light border-0 fs-6 fw-bold border-0 mx-3'"
        :post.sync="post"
        :keyUp.sync="keyUp"
        :rowIndex="index"
        :add="false"
        @update2="forceRerender"
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
  props: ['index', 'courseTitle'],
  components: {
    RemoveButton,
    EditModal,
  },
  data() {
    return {
      // eslint-disable-next-line quotes
      html: '<span>Edit<span/>',
      teacher: this.post.body.courses[this.index - 1].teacher[0],
      sNumber: 0,
      studentsKey: 100,
      teacherKey: 1000,
      keyUp: 0,
      post: this.$store.state.post,
    };
  },
  watch: {
    post: 'getStudentsNumber',
  },
  methods: {
    forceRerender() {
      this.studentsKey += 1;
      this.teacherKey += 1;
    },
    /* eslint-disable func-names */
    /* eslint-disable object-shorthand */
    getStudentsNumber: function () {
      this.sNumber = 0;
      const listLength = this.post.body.courses[this.index - 1].studentsList
        .length;
      const studentsList = this.post.body.courses[this.index - 1].studentsList;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < listLength; i++) {
        if (studentsList[i]) {
          this.sNumber = this.sNumber + 1;
        }
      }
    },
  },
  created() {
    this.getStudentsNumber();
  },
  update() {
    this.getStudentsNumber();
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

.hover:hover .edit-button {
  visibility: visible;
  /* background-color: none !important; */
}
</style>
