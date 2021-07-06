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
      @ok="ok()"
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
                  id="inline-form-input-name"
                  class="mb-2 mr-sm-2 mb-sm-0 border-secondary"
                  :placeholder="'Course Name'"
                  :value="add ? '' : course[rowIndex - 1].courseName"
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
                  id="form-custom-select-pref"
                  class="mb-2 mr-sm-2 mb-sm-0 fs-6 p-2 w-100 border-secondary rounded"
                  :options="[{ text: 'Choose teacher...', value: null }]"
                  :value="add ? null : course[rowIndex - 1].teacher[0]"
                >
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

      <template #modal-footer="{ ok, cancel}">
        <b-button size="sm" variant="success" @click="ok()">
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

export default {
  name: 'EditModal',
  data() {
    return {
      // post: null,
      tNumber: null,
      teachers: null,
      course: null,
      status: 'accepted',
      post: this.$store.getters.get_data,
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
};
</script>

<style scoped>
.edit {
  background-color: transparent;
}
</style>
