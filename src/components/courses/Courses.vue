<template>
  <div class="container-flow" id="courses" :key="componentKey">
    <div class="card border-dark rounded-0 mb-3 mt-0" style="height: 93vh">
      <div class="card-header fw-bold fs-5 border-dark rounded-0 dark">
        Courses
      </div>
      <div
        class="card-body text bg-light pt-0"
        style="height: 65vh; overflow-y: scroll;"
      >
        <table
          id="my-table"
          class="table table-striped position-relative border border-dark"
        >
          <thead
            class="bg-light w-100"
            style="position: sticky; top: -1px; z-index: 100;"
          >
            <tr class="" style="vertical-align: middle;">
              <th scope="col">Course</th>
              <th scope="col">Teacher</th>
              <th scope="col">Students</th>
              <th scope="col" style="width: fit-content;"></th>
              <th scope="col" style="width: fit-content;"></th>
            </tr>
          </thead>
          <tbody class="border border-dark">
            <courses-row
              :id="'row-' + index + 1"
              v-for="(courseitem, index) in courses"
              :key="index"
              v-bind:index="index + 1"
              :reason="reason"
              :courseTitle="post.body.courses[index - 1 + 1].courseName"
              @update="updateKey"
              :rowsNumber="rowsNumber"
              :toggle="edit"
              @removecourse="remove($event)"
            />
          </tbody>
        </table>
      </div>
      <div
        class="card-footer
        bg-transparent border-dark d-flex align-items-center justify-content-between"
      >
        <add-course-button
          v-visible="edit"
          class="my-auto justify-self-start"
        />
        <div class="w-auto d-flex  justify-self-start justify-self-sm-end fw-bold">
          Toggle edit:
        </div>
        <div class="form-check form-switch justify-self-end">
          <label
            style="width: 3rem;"
            class="form-check-label me-4"
            for="flexSwitchCheckDefault"
          >
            <font-awesome-icon
              v-if="!edit"
              class="text-secondary fs-5"
              icon="lock"
            />
            <font-awesome-icon
              v-if="edit"
              class="text-danger fs-5"
              icon="lock-open"
            />
          </label>
          <input
            @input="switchFunction(edit)"
            class="form-check-input me-4"
            type="checkbox"
            id="flexSwitchCheckDefault"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import AddCourseButton from '../utilities/AddCourseButton';
import CoursesRow from './CoursesRow';
import EditModal from '../utilities/EditModal';
import EventBus from '../event-bus';

export default {
  name: 'Courses',
  components: {
    CoursesRow,
    AddCourseButton,
    EditModal,
  },
  data() {
    return {
      reason: 'edit-course',
      coursesNumber: null,
      post: this.$store.getters.get_data,
      rowsNumber: 0,
      switch: false,
      edit: false,
      toggle: [],
      componentKey: 0,
      courses: {},
      course: {},
    };
  },
  methods: {
    add() {
      this.rowsNumber += 1;
    },
    addcourse(course) {
      // this.set(this.courses, this.courses.length, course);
      this.courses.push(course);
    },
    remove(index) {
      this.post.body.courses.splice(index - 1, 1);
      this.courses.splice(index - 1, 1);
      this.sendPost();
      this.post = this.$store.getters.get_data;
      // this.rowsNumber -= 1;
      this.componentKey += 1;
    },
    sendPost() {
      const postData = this.post.body;
      this.$http.put('', postData);
      this.$store.commit('setPost', this.post);
      this.post = this.$store.getters.get_data;
      this.$emit('update');
      this.componentKey += 1;
    },
    switchFunction(edit) {
      const input = document.getElementById('flexSwitchCheckDefault');
      if (edit) {
        input.classList.remove('bg-secondary');
      } else {
        input.classList.add('bg-secondary');
      }
      this.edit = !edit;
    },
    updateKey() {
      this.$emit('update', 1);
      this.getCoursesNumber();
      this.componentKey += 1;
    },
    getCoursesNumber() {
      this.post = this.$store.getters.get_data;
      this.coursesNumber = Number(this.post.body.courses.length);
    },
  },
  created() {
    this.getCoursesNumber();
    this.rowsNumber = this.post.body.courses.length;
  },
  mounted() {
    const page = document.getElementById('courses-link');
    page.classList.add('active');
    this.courses = this.post.body.courses;
    EventBus.$on('addcourse', this.addcourse);
  },
  destroyed() {
    const page = document.getElementById('courses-link');
    page.classList.remove('active');
  },
  watch: {
    ...mapGetters({
      post: 'get_data',
    }),
    post() {
      this.post = this.$store.getters.get_data;
    },
    edit() {
      return this.edit;
    },
  },
};
</script>

<style scoped>
.hide {
  visibility: hidden;
}
.bg-secondary {
  transition: background-color 0.5s ease;
}
#flexSwitchCheckDefault {
  transition: background-color 0.5s ease;
}

@media(max-width: 800px) {
  .form-check-label {
    display: none !important;
  }
}
</style>
