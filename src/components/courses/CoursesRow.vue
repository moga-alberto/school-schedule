<template>
  <tr class="fs-5 hover">
    <th
      style="vertical-align: middle"
      scope="row"
      :key="keyUp"
      v-b-modal="index + reason + '-modal'"
    >
      {{ courseTitle }}
    </th>
    <td
      style="vertical-align: middle"
      :key="teacherKey"
      v-b-modal="index + reason + '-modal'"
    >
      {{ teacher }}
    </td>
    <td
      style="vertical-align: middle"
      :key="sNumber + studentsKey"
      v-b-modal="index + reason + '-modal'"
    >
      {{ sNumber }}
    </td>
    <td
      style="width: 0; vertical-align: middle;"
      v-b-modal="index + reason + '-modal'"
    >
      <edit-modal
        v-if="toggle"
        class="edit-button"
        :name="'edit' + index"
        v-bind:reason="index + 'edit-course'"
        v-bind:modalTitle="'Edit Course'"
        v-bind:modalAction="'Save'"
        v-bind:btnClass="'edit btn-light border-0 fs-6 fw-bold border-0 p-0'"
        :keyUp.sync="keyUp"
        :rowIndex="index"
        :add="false"
        @update="getStudentsNumber()"
      />
    </td>
    <td style="width: 0; vertical-align: middle">
      <remove-button
        v-if="toggle"
        class="me-2"
        :disabled="!toggle"
        @remove="remove"
      />
    </td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex';
import EditModal from '../utilities/EditModal';
import RemoveButton from '../utilities/RemoveButton';

export default {
  name: 'CoursesRow',
  props: ['index', 'courseTitle', 'reason', 'toggle'],
  components: {
    RemoveButton,
    EditModal,
  },
  data() {
    return {
      teacher: this.$store.getters.get_data.body.courses[this.index - 1]
        .teacher[0],
      sNumber: 0,
      studentsKey: 100,
      teacherKey: 1000,
      keyUp: 1,
      post: this.$store.getters.get_data,
      i: 0,
      show: [],
      row: null,
      course: {},
    };
  },
  watch: {
    ...mapGetters({
      post: 'get_data',
    }),
    post() {
      // this.getStudentsNumber();
    },
    updateFields: [
      'forceRerender',
      'updateKey',
      'currentpage',
      'rowsNumber',
      'perpage',
    ],
    toggle: () => this.toggle,
  },
  methods: {
    addcourse(course) {
      this.$emit('addcourse', course);
    },
    remove() {
      this.$emit('removecourse', this.index);
    },
    // updatekey() {
    //   // this.$emit('update');
    // },

    // forceRerender() {
    //   // this.studentsKey += 1;
    //   // this.teacherKey += 1;
    //   // this.keyUp += 1;
    // },

    getStudentsNumber() {
      this.post = this.$store.getters.get_data;
      this.sNumber = 0;
      const listLength = this.post.body.students.length;
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
    // this.pagination();
    this.getStudentsNumber();
  },
  beforeUpdate() {
    // this.getStudentsNumber();
    // this.forceRerender();
  },
};
</script>

<style scoped>
.hover:hover {
  transform: scale(0.998);
  border-top: 2px inset black;
  border-bottom: 2px inset black;
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

.hide {
  visibility: hidden;
}
</style>
