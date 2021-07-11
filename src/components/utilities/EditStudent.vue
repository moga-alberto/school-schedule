<template>
  <div>
    <b-modal
      :id="modal + '-modal'"
      size="md"
      centered
      content-class="shadow"
      :title="'Edit Student - ' + modal"
    >
      <template #modal-header="{ close }">
        <h5 class="fw-bold">Edit Student</h5>
        <b-button
          variant="outline-dark"
          class="btn btn-outline-dark"
          @click="close()"
          ><font-awesome-icon class=" fs-6 danger" icon="times"
        /></b-button>
      </template>

      <template #default="{ }">
        <div class="container" style="width: 90%;">
          <div class="row">
            <div class="w-100 col">
              <b-form inline>
                <label class="form-label fw-bold" for="inline-form-input-name"
                  >Student:</label
                >
                <b-form-input
                  :id="modal + '-form'"
                  class="mb-2 mr-sm-2 mb-sm-0 border-secondary"
                  :placeholder="'Student Name'"
                  :value="$store.getters.get_data.body.students[indexS].student"
                  @input="getinput(), removeNotFilled()"
                ></b-form-input>
              </b-form>
            </div>
            <!-- <div class="col"></div> -->
          </div>
          <div class="row justify-content-center mx-1" v-if="warning">
            <b-alert show variant="danger" class="mt-3"
              >Required information is incomplete!</b-alert
            >
          </div>
          <div class="row w-100">
            <div
              class="course-options
              w-100
              my-4
              mx-2 d-flex flex-column flex-wrap ps-3 align-content-between "
              style="height: 250px; overflow-y: auto; overflow-x: auto"
            >
              <div v-for="course in coursesNumber" :key="course">
                <b-form-checkbox
                  @input="check($event, course)"
                  class="mb-2 mr-sm-2 mb-sm-0"
                  :id="'checkbox-' + course"
                  v-model="status[course - 1]"
                  :name="'checkbox-1' + course"
                  value="accepted"
                  unchecked-value="not_accepted"
                  :key="status[course - 1]"
                >
                  <span class="ms-2">{{
                    post.body.courses[course - 1].courseName
                  }}</span>
                </b-form-checkbox>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="success" @click="closeif()">
          Save
        </b-button>
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancel
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      // post: {},
      warning: false,
      coursesNumber: 0,
      status: [],
      inputvalue: '',
      forminput: {},
    };
  },
  props: ['courseName', 'modal', 'studentName', 'indexS'],
  name: 'EditStudent',
  methods: {
    getData() {
      this.post = this.$store.getters.get_data;
      this.coursesNumber = this.post.body.courses.length;
      for (let i = 0; i < this.coursesNumber; i += 1) {
        if (this.post.body.students[this.modal - 1].courses[i]) {
          this.status[i] = 'accepted';
        } else {
          this.status[i] = 'not_accepted';
        }
      }
    },
    check($event, course) {
      if ($event === 'accepted') {
        this.post.body.students[this.modal - 1].courses[
          course - 1
        ] = this.post.body.courses[course - 1].courseName;
      } else {
        this.post.body.students[this.modal - 1].courses[course - 1] = '';
      }
    },
    getinput() {
      this.forminput = document.getElementById(`${this.modal}-form`);
    },
    closeif() {
      this.spaces = 0;
      const input = document.getElementById(`${this.modal}-form`);
      this.inputvalue = input.value;
      const nameLength = this.inputvalue.length;
      for (let i = 0; i < nameLength; i += 1) {
        if (this.inputvalue[i] === ' ') {
          this.spaces += 1;
        }
      }
      if (this.spaces < nameLength && nameLength !== 0) {
        this.send();
      } else {
        if (this.spaces === nameLength || nameLength === 0) {
          this.forminput.classList.add('not-filled');
        }
        this.warning = true;
      }
    },
    send() {
      this.getinput();
      this.post.body.students[this.modal - 1].student = this.inputvalue;
      const postData = this.post.body;
      this.$http.put('', postData).then(() => {
        this.$emit('update');
      });
      this.$store.commit('setPost', this.post);
      // this.$emit('update');
      this.$bvModal.hide(`${this.modal}-modal`);
    },
    removeNotFilled() {
      const input = document.getElementById(`${this.modal}-form`);
      this.spaces = 0;
      input.classList.remove('not-filled');
      if (this.forminput.classList.contains('not-filled') === false) {
        this.removeWarning();
      }
    },
    removeWarning() {
      this.warning = false;
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    this.$nextTick(() => {
      this.forminput = document.getElementById(`${this.modal}-form`);
    });
  },
  watch: {
    ...mapGetters({
      post: 'get_data',
    }),
  },
};
</script>

<style scoped></style>
