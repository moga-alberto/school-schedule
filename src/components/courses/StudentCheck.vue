<template>
  <b-form-checkbox
    @input="check($event)"
    class="mb-2 mr-sm-2 mb-sm-0"
    :id="'checkbox-' + indexS"
    v-model="status"
    :name="'checkbox-1' + indexS"
    value="accepted"
    unchecked-value="not_accepted"
    :key="status"
    ><span class="ms-2">{{ student }}</span></b-form-checkbox
  >
</template>

<script>
export default {
  name: 'StudentCheck',
  props: ['indexS', 'rowIndex', 'add'],
  methods: {
    checkIfAdd() {
      if (this.rowIndex) {
        if (
          this.post.body.courses[this.rowIndex - 1].studentsList[
            this.indexS - 1
          ]
        ) {
          this.status = 'accepted';
        } else {
          this.status = 'not_accepted';
        }
      } else {
        this.status = 'not_accepted';
      }
    },
    check($event) {
      // console.log($event);
      if (this.rowIndex) {
        if ($event === 'accepted') {
          this.post.body.courses[this.rowIndex - 1].studentsList[
            this.indexS - 1
          ] = this.post.body.students[this.indexS - 1].student;
        } else {
          this.post.body.courses[this.rowIndex - 1].studentsList[
            this.indexS - 1
          ] = '';
        }
      }
      // this.$emit('get-post', this.post);
    },
  },
  data() {
    return {
      status: null,
      student: null,
      post: this.$store.getters.get_data,
    };
  },
  created() {
    this.checkIfAdd();
    this.student = this.post.body.students[this.indexS - 1].student;
  },
};
</script>

<style scoped></style>
