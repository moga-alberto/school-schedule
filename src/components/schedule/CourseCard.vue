<template>
  <td>
    <div class="repeat">
      <div class="d-flex flex-column text-md-center">
        <div>
          <b-button class="course-card" v-b-modal="'modal' + index + indx2"
            >Open modal{{ json }}</b-button
          >
          <b-modal
            v-bind:id="'modal' + index + indx2"
            ok-only
            centered
            hide-backdrop
            content-class="shadow"
            :title="index + indx2"
          >
            <p class="my-2">
              We've added the utility class <code>'shadow'</code>
              to the modal content for added effect.
            </p>
          </b-modal>
        </div>
      </div>
    </div>
  </td>
</template>

<script>
export default {
  props: ['index', 'indx2'],
  name: 'CourseCard',
  data() {
    return {
      name: 'Course Name',
      json: this.jData,
    };
  },
};
</script>

<style scoped>
.course-card {
  width: 100%;
  height: 100%;
  min-height: 80px;
}
</style>
