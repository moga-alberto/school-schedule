<template>
  <div>
    <b-button
      v-if="add"
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
                  :id="forminputid"
                  class="mb-2 mr-sm-2 mb-sm-0 border-secondary"
                  :placeholder="'Course Name'"
                  :value="add ? '' : course[rowIndex - 1].courseName"
                  @input="getelements(), removeNotFilled(forminput)"
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
                  @input="getelements(), removeNotFilled(formselect)"
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
                :inputvalue="inputvalue"
                :selectvalue="selectvalue"
                class="p-1"
                v-for="indexS in sNumber - 1"
                :key="indexS"
                :indexS="indexS"
                :rowIndex="rowIndex"
                :add="add"
                @checked="addstudent"
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
import EventBus from '../event-bus';
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
      inputvalue: '',
      selectvalue: null,
      isModalVisible: 'false',
      studentsList: [],
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
        this.forminput.classList.contains('not-filled') === false &&
        this.formselect.classList.contains('not-filled') === false
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
        this.selectvalue !== ''
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
      if (this.add) {
        const course = {
          courseName: this.inputvalue,
          teacher: [this.selectvalue],
          studentsList: this.studentsList,
        };
        this.post.body.courses.push(course);
        EventBus.$emit('addcourse', course);
      } else {
        this.post.body.courses[this.rowIndex - 1].courseName = this.inputvalue;
        this.post.body.courses[this.rowIndex - 1].teacher = [this.selectvalue];
      }
    },
    send() {
      this.getelements();
      this.commitChanges();
      this.sendPost();
      this.$bvModal.hide(this.reason + '-modal');
      if (!this.add) {
        this.$emit('updatelist');
      }
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
    addstudent(value, index) {
      this.studentsList[index - 1] = value;
    },
  },
  created() {
    if (this.add) {
      this.studentsList.length = this.post.body.students.length;
    }
    this.getNumbers();
  },
};
</script>

<style scoped>
.edit {
  background-color: transparent;
}
</style>
