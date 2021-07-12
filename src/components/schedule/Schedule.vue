<template>
  <div class="container-flow mx-0 w-100 h-100" id="courses">
    <div class="card border-dark rounded-0 mb-3 mt-0"  style="width: 100%; height: 93vh;" >
      <div class="card-header fw-bold fs-5 border-dark rounded-0 dark">
        This week's schedule
      </div>
      <div class="card-body text bg-light" style="overflow-x: scroll">
        <table class="table">
          <thead>
            <tr>
              <th scope="col" class="position">
                <font-awesome-icon class="fs-4" icon="clock" />
              </th>
              <th scope="col">Monday</th>
              <th scope="col">Tuesday</th>
              <th scope="col">Wednesday</th>
              <th scope="col">Thursday</th>
              <th scope="col">Friday</th>
            </tr>
          </thead>
          <tbody class="">
            <CalendarRow
              v-for="index in 6"
              :key="index"
              v-bind:indx="index.toString()"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarRow from '../schedule/CalendarRow';

export default {
  name: 'Schedule',
  components: { CalendarRow },
  mounted() {
    const page = document.getElementById('schedule-link');
    page.classList.add('active');
  },
  destroyed() {
    const page = document.getElementById('schedule-link');
    page.classList.remove('active');
  },
};
</script>

<style scoped>
@media(max-width: 768px) {
  .position {
    display: none;
  }
}
</style>
