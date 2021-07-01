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
            </tr>
          </thead>
          <tbody class="border">
            <CoursesRow />
            <CoursesRow />
            <CoursesRow />
            <CoursesRow />
            <CoursesRow />
          </tbody>
        </table>
      </div>
      <div class="card-footer bg-transparent border-dark">Footer</div>
    </div>
  </div>
</template>

<script>
import CoursesRow from './CoursesRow';

export default {
  name: 'Courses',
  components: {
    CoursesRow,
  },
};
</script>

<style scoped>
.dark {
  background-color: #292b2c !important;
  color: #fff !important;
}
</style>
