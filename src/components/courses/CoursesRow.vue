<template>
  <tr class="fs-5 hover">
    <th scope="row" :key="keyUp">{{ courseTitle }}</th>
    <td :key="teacherKey">{{ teacher }}</td>
    <td :key="sNumber + studentsKey">{{ sNumber }}</td>
    <td style="width: 0;">
      <edit-modal
        class="edit-button"
        :name="'edit' + index"
        v-bind:reason="index + 'edit-course'"
        v-bind:modalTitle="'Edit Course'"
        v-bind:modalAction="'Save'"
        v-bind:modalButton="html"
        v-bind:btnClass="'edit btn-light border-0 fs-6 fw-bold border-0 mx-3'"
        :keyUp.sync="keyUp"
        :rowIndex="index"
        :add="false"
        v-on:update="forceRerender"
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
      teacher: this.$store.getters.get_data.body.courses[this.index - 1]
        .teacher[0],
      sNumber: 0,
      studentsKey: 100,
      teacherKey: 1000,
      keyUp: 1,
      post: this.$store.getters.get_data,
      updateFields: this.$store.getters.get_updateKey,
      i: 0,
    };
  },
  watch: {
    post: 'getStudentsNumber',
    updateFields: ['forceRerender', 'updateKey'],
  },
  methods: {
    updateKey() {
      this.$emit('update');
    },

    forceRerender() {
      this.studentsKey += 1;
      this.teacherKey += 1;
    },

    getStudentsNumber() {
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
  mounted() {
    // this.updateKey();
  },
  beforeUpdate() {
    this.getStudentsNumber();
    this.forceRerender();
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
