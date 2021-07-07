<template>
  <div>
    <b-button
      :class="btnClass"
      v-b-modal="reason + '-modal'"
      v-html="modalButton"
    ></b-button>
    <b-modal
      size="xl"
      :id="reason + '-modal'"
      centered
      content-class="shadow"
      :title="modalTitle"
    >
      <template #modal-header="{ close }">
        <!-- Emulate built in modal header close button action -->
        <h5 class="fw-bold">{{ modalTitle }}</h5>
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
            <div class="w-50 col">
              <b-form inline>
                <label class="form-label fw-bold" for="inline-form-input-name"
                  >Course:</label
                >
                <b-form-input
                  :required="false"
                  :id="forminputid"
                  class="mb-2 mr-sm-2 mb-sm-0 border-secondary"
                  :placeholder="'Course Name'"
                  :value="add ? '' : course[rowIndex - 1].courseName"
                  @input="removeNotFilled(forminput)"
                ></b-form-input>
              </b-form>
            </div>
            <div class="col">
              <b-form>
                <label
                  class="mr-sm-2 mt-0 mb-2 fw-bold d-block"
                  for="form-custom-select-pref"
                  >Teacher:</label
                >
                <b-form-select
                  :id="formselectid"
                  class="mb-2 mr-sm-2 mb-sm-0 fs-6 p-2 w-100 border-secondary rounded"
                  :value="add ? null : course[rowIndex - 1].teacher[0]"
                  @input="removeNotFilled(formselect)"
                >
                  <option :value="null" disabled>Choose teacher...</option>
                  <option
                    v-for="index in tNumber"
                    :key="index"
                    :value="teachers[index - 1].teacher"
                    >{{ teachers[index - 1].teacher }}</option
                  >
                </b-form-select>
              </b-form>
            </div>
          </div>
          <div class="row justify-content-center mx-1" v-if="warning">
            <b-alert show variant="danger" class="mt-3"
              >Required information is incomplete!</b-alert
            >
          </div>
          <div class="row w-100">
            <div
              class="student-options
              w-100
              my-4
              mx-2 d-flex flex-column flex-wrap ps-3 align-content-between "
              style="height: 250px; overflow-y: auto; overflow-x: auto"
            >
              <student-check
                class="p-1"
                v-for="indexS in sNumber - 1"
                :key="indexS"
                :indexS="indexS"
                :rowIndex="rowIndex"
                :add="add"
              />
            </div>
          </div>
        </div>
      </template>

      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="success" @click="closeif()">
          {{ modalAction }}
        </b-button>
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancel
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import StudentCheck from '../courses/StudentCheck';
/* eslint-disable prefer-template */

export default {
  name: 'EditModal',
  data() {
    return {
      tNumber: null,
      teachers: null,
      course: null,
      status: 'accepted',
      post: this.$store.getters.get_data,
      forminputid: 'inline-form-input-name' + toString(this.rowIndex),
      formselectid: 'form-custom-select-pref' + toString(this.rowIndex),
      spaces: 0,
      warning: false,
      forminput: {},
      formselect: {},
      inputvalue: 'null',
      selectvalue: 'null',
      isModalVisible: 'false',
    };
  },
  props: [
    'reason',
    'modalTitle',
    'modalAction',
    'modalButton',
    'btnClass',
    'rowIndex',
    'add',
    'keyUp',
  ],
  components: { StudentCheck },
  methods: {
    removeNotFilled(item) {
      this.spaces = 0;
      item.classList.remove('not-filled');
      if (
        (this.forminput.classList.contains('not-filled') === false) &&
        (this.formselect.classList.contains('not-filled') === false)
      ) {
        this.removeWarning();
      }
    },
    removeWarning() {
      this.warning = false;
    },
    /* eslint-disable object-shorthand */
    closeif() {
      this.getelements();
      this.spaces = 0;
      const nameLength = this.inputvalue.length;
      for (let i = 0; i < nameLength; i += 1) {
        if (this.inputvalue[i] === ' ') {
          this.spaces += 1;
        }
      }
      if (
        this.spaces < nameLength &&
        nameLength !== 0 &&
        this.selectvalue !== null
      ) {
        this.send();
      } else {
        if (this.spaces === nameLength || nameLength === 0) {
          this.forminput.classList.add('not-filled');
        }
        if (this.selectvalue === '') {
          this.formselect.classList.add('not-filled');
        }
        this.warning = true;
      }
    },
    commitChanges() {
      // if(add) {

      // } else {

      // }
    },
    send() {
      this.getelements();
      this.ok();
      this.$bvModal.hide(this.reason + '-modal');
    },
    getelements() {
      this.forminput = document.getElementById(this.forminputid);
      this.formselect = document.getElementById(this.formselectid);
      this.inputvalue = this.forminput.value;
      this.selectvalue = this.formselect.value;
    },
    getNumbers() {
      this.tNumber = Number(this.post.body.teachers.length);
      this.teachers = this.post.body.teachers;
      this.course = this.post.body.courses;
      this.sNumber = Number(this.post.body.students.length);
    },
    sendPost() {
      const postData = this.post.body;
      this.$http.put('', postData);
      this.$store.commit('setPost', this.post);
      this.$emit('update');
    },
    ok() {
      this.sendPost();
    },
  },
  created() {
    this.getNumbers();
  },
  mounted() {
    // this.getelements();
    // this.$watch('inputvalue', () => {
    //   this.removeNotFilled(this.forminput);
    // });
    // this.$watch('selectvalue', () => {
    //   this.removeNotFilled(this.formselect);
    // });
  },
};
</script>

<style scoped>
.edit {
  background-color: transparent;
}
.not-filled {
  border: 2px solid red;
  box-shadow: 0px 0px 1px 2px rgba(255, 0, 0, 0.3);
}
</style>
