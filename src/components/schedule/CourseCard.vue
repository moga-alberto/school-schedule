<template>
  <div class="d-flex flex-column text-md-center">
    <div class="p-2">
      <b-button :id="'popover-button-sync' + name" variant="primary"
        >I have a popover</b-button
      >
    </div>

    <div class="p-2">
      <b-popover :target="'popover-button-sync' + name" title="Popover">
        Hello <strong>World!</strong>
      </b-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseCard',
  data() {
    return {
      name: 'Course Name',
    };
  },
};
</script>

<style scoped></style>
