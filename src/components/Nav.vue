<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container w-75 justify-content-between">
      <a class="navbar-brand fw-bold fs-3 ms-3" href="#"
        >School Schedule <font-awesome-icon class="mx-1" icon="calendar-week"
      /></a>
      <ul class="nav nav-pills">
        <li class="nav-item">
          <a
            class="nav-link fw-bold text-dark"
            href="#/schedule"
            id="schedule-link"
            >Schedule</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link fw-bold text-dark"
            href="#/courses"
            id="courses-link"
            >Courses</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link fw-bold text-dark" href="#/students" id="students-link"
            >Students</a
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
};
</script>

<style scoped>

.navbar {
  height: 7vh;
}
nav .active {
  background-color: #292b2c !important;
  color: #fff !important;
}

/* @input (max-width: ;) */
</style>
