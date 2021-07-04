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
        <div class="container">
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
                  :value="null"
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
          <div class="row">
            <div
              class="student-options w-100 my-4"
              style="height: 300px; overflow-y: auto;"
            >
              <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0"
                >Remember my preference</b-form-checkbox
              >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat
              autem accusantium ratione necessitatibus ipsa tempora dolorum ex,
              molestias debitis impedit fugit, quod aperiam repudiandae? Ab ipsa
              accusantium possimus consequatur est? Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Quaerat autem accusantium ratione
              necessitatibus ipsa tempora dolorum ex, molestias debitis impedit
              fugit, quod aperiam repudiandae? Ab ipsa accusantium possimus
              consequatur est?
            </div>
          </div>
        </div>
      </template>

      <template #modal-footer="{ ok, cancel}">
        <!-- <b>Custom Footer</b> -->
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" variant="success" @click="ok()">
          {{ modalAction }}
        </b-button>
        <b-button size="sm" variant="danger" @click="cancel()">
          Cancel
        </b-button>
        <!-- Button with custom close trigger value -->
        <!-- <b-button size="sm" variant="outline-secondary" @click="hide('forget')">
        Forget it
      </b-button> -->
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'EditModal',
  data() {
    return {
      post: null,
      tNumber: null,
      teachers: null,
    };
  },
  props: ['reason', 'modalTitle', 'modalAction', 'modalButton', 'btnClass'],
  components: {},
  methods: {
    teachersNumber() {
      // this.tNumber = Number(this.post.body.teachers.length);
      this.$http.get().then((res) => {
        this.post = res;
        this.tNumber = Number(this.post.body.teachers.length);
        this.teachers = this.post.body.teachers;
      });
    },
  },
  created() {
    this.teachersNumber();
  },
};
</script>

<style scoped>
.edit {
  background-color: transparent;
}
</style>
