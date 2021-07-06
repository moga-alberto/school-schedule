<template>
  <div class="container w-75" id="courses">
    <div class="card border-dark mb-3 mt-5">
      <div class="card-header fw-bold fs-3 border-dark dark">
        Courses
      </div>
      <div class="card-body text bg-light">
        <table class="table table-striped">
          <thead>
            <tr class="fs-5">
              <th scope="col">Course</th>
              <th scope="col">Teacher</th>
              <th scope="col">Students</th>
              <th scope="col" style="width: fit-content;"></th>
              <th scope="col" style="width: fit-content;"></th>
            </tr>
          </thead>
          <tbody class="border">
            <courses-row
              v-for="index in coursesNumber"
              :key="index"
              v-bind:index="index"
              v-b-modal="index + reason + '-modal'"
              :courseTitle="post.body.courses[index - 1].courseName"
              :post.sync="post"
              @update="getList"
            />
          </tbody>
        </table>
      </div>
      <div class="card-footer bg-transparent border-dark d-flex">
        <add-course-button :post.sync="post" />
      </div>
    </div>
  </div>
</template>

<script>
import AddCourseButton from '../utilities/AddCourseButton';
import CoursesRow from './CoursesRow';
import EditModal from '../utilities/EditModal';

export default {
  name: 'Courses',
  components: {
    CoursesRow,
    AddCourseButton,
    EditModal,
  },
  props: [],
  data() {
    return {
      reason: 'edit-course',
      coursesNumber: null,
      post: this.$store.state.post,
    };
  },
  methods: {
    getList() {
      // this.$http.get().then((res) => {
      // this.post = res;
      this.coursesNumber = Number(this.post.body.courses.length);
      // });
    },
    /* eslint-disable func-names */
    /* eslint-disable object-shorthand */
    // update: function () {
    //   this.getList();
    // },
  },
  // watch: {
  //   post: 'update',
  // },
  // beforeMount() {
  //   this.getList();
  // },
};
</script>

<style scoped></style>
