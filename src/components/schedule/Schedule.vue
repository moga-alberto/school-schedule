<template>
  <div class="container w-75" id="courses">
    <div class="card border-dark mb-3 mt-5">
      <div class="card-header fw-bold fs-3 border-dark dark">
        This week's schedule
      </div>
      <div class="card-body text bg-light">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">
                <font-awesome-icon class="fs-4" icon="clock" />
              </th>
              <th scope="col">Monday</th>
              <th scope="col">Tuesday</th>
              <th scope="col">Wednesday</th>
              <th scope="col">Thursday</th>
              <th scope="col">Friday</th>
              <th scope="col">Saturday</th>
              <th scope="col">Sunday</th>
            </tr>
          </thead>
          <tbody>
            <CalendarRow />
            <CalendarRow />
            <CalendarRow />
            <CalendarRow />
            <CalendarRow />
            <CalendarRow />
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
};
</script>

<style scoped></style>
