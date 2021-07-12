<template>
  <td>
    <div class="repeat">
      <div class="d-flex flex-column text-md-center">
        <div class="h-100">
          <b-button
            class="course-card"
            v-b-modal="'modal' + index + '.' + column"
          >
            <div
              class="container-fluid d-flex flex-column box-content
              justify-content-center align-items-center box-card"
            >
              <p class="position align-middle p-5">{{modalTitle}}</p>
              <p
                class="mt-0 mb-0 fw-bold course box-content"
                v-if="courseName"
                :key="courseName"
              >
                {{ courseName }}
              </p>
              <p
                class="mb-0 fw-bold to-hide"
                v-if="teacherName"
                :key="teacherName"
              >
                T: {{ teacherName }}
              </p>
              <p
                class="mb-0 fw-bold to-hide"
                v-if="getStudentsList()"
                :key="studentsNumber"
              >
                S: {{ studentsNumber }}
              </p>
            </div>
          </b-button>
          <b-modal
            v-bind:id="'modal' + index + '.' + column"
            ok-only
            centered
            hide-backdrop
            content-class="shadow"
            :title="'modal' + index + '.' + column"
          >
            <template #modal-header="{ close }">
              <h5 class="fw-bold">
                {{ days[column - 1] + ', ' + modalTitle }}
              </h5>
              <b-button
                variant="outline-dark"
                class="btn btn-outline-dark"
                @click="close()"
                ><font-awesome-icon class=" fs-6 danger" icon="times"
              /></b-button>
            </template>
            <b-form>
              <label
                class="mr-sm-2 mt-0 mb-2 fw-bold d-block"
                for="form-custom-select-pref"
                >Course:</label
              >
              <b-form-select
                @input="getContent($event)"
                :id="formselectid"
                class="mb-2 mr-sm-2 mb-sm-0 fs-6 p-2 w-100 border-secondary rounded"
                :value="courseName ? courseName : null"
              >
                <option :value="null">Choose course...</option>
                <option
                  v-for="course in coursesLength"
                  :key="course"
                  :value="courses[course - 1].courseName"
                  >{{ courses[course - 1].courseName }}</option
                >
              </b-form-select>
              <div class="container">
                <div class="container fs-5 mt-3">
                  <p v-if="teacherName">Teacher: {{ teacherName }}</p>
                </div>
                <div v-if="getStudentsList()" class="container">
                  <h1 class="fs-4">Assigned Students:</h1>
                  <p>{{ getStudentsList() }}</p>
                </div>
              </div>
            </b-form>
            <template #modal-footer="{ cancel }">
              <b-button size="sm" @click="ok()">
                ok
              </b-button>
              <b-button size="sm" variant="danger" @click="cancel()">
                Cancel
              </b-button>
            </template>
          </b-modal>
        </div>
      </div>
    </div>
  </td>
</template>

<script>
export default {
  props: ['index', 'column', 'modalTitle'],
  name: 'CourseCard',
  data() {
    return {
      name: 'Course Name',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      post: {},
      val: null,
      formselectid: `formselect-${this.index}${this.column}`,
      courses: {},
      coursesLength: null,
      courseName: null,
      studentsList: null,
      teacherName: '',
      courseIndex: 0,
      studentsNumber: 0,
    };
  },
  methods: {
    ok() {
      this.post.body.position[this.index - 1].day[
        this.column - 1
      ].course = this.courseName;
      this.post.body.position[this.index - 1].day[
        this.column - 1
      ].studentsList = this.studentsList;
      this.post.body.position[this.index - 1].day[
        this.column - 1
      ].teacher = this.teacherName;
      const postData = this.post.body;
      this.$http.put('', postData).then(() => {
        // this.$emit('update');
      });
      this.$store.commit('setPost', this.post);
      // this.$emit('update');
      this.$bvModal.hide(`modal${this.index}.${this.column}`);
    },
    getKey(value) {
      this.courseIndex = 0;
      let i = 0;
      while (this.post.body.courses[i].courseName !== value) {
        this.courseIndex += 1;
        i += 1;
      }
    },
    getContent(value) {
      if (value !== null) {
        this.getKey(value);
        const index = this.courseIndex;
        this.courseName = this.post.body.courses[index].courseName;
        this.studentsList = this.post.body.courses[index].studentsList;
        this.teacherName = this.post.body.courses[index].teacher[0];
        this.studentsNumber = this.studentsList.length;
      }
    },
    getStudentsList() {
      let List = null;
      for (let i = 0; i < this.studentsList.length; i += 1) {
        // eslint-disable-next-line quotes
        if (this.studentsList[i] !== '') {
          if (i === 0) {
            List = `${this.studentsList[i]}`;
          } else {
            List = `${List}, ${this.studentsList[i]}`;
          }
        }
      }
      return List;
    },
  },
  created() {
    this.post = this.$store.getters.get_data;
    this.courses = this.post.body.courses;
    this.coursesLength = this.courses.length;
    this.courseName = this.post.body.position[this.index - 1].day[
      this.column - 1
    ].course;
    this.teacherName = this.post.body.position[this.index - 1].day[
      this.column - 1
    ].teacher;
    this.studentsList = this.post.body.position[this.index - 1].day[
      this.column - 1
    ].studentsList;
    this.studentsNumber = this.studentsList.length;
  },
  updated() {
    this.post = this.$store.getters.get_data;
  },
};
</script>

<style scoped>
.position {
  display: none;
}

.course-card {
  width: 100%;
  height: 100%;
  min-height: 80px;
}

.box-card {
  width: 7rem;
  height: 6rem;
  vertical-align: middle;
}

.course {
  font-size: 0.8rem;
  word-wrap: normal;
}

.to-hide {
  font-size: 0.7rem;
}

@media (max-width: 872px) {
  .to-hide {
    display: none;
  }

  .course {
    font-size: clamp(0.5rem, 70%, 0.8rem);
  }

  .box-card {
  width: 4rem;
  height: 6rem;
  }
}

@media(max-width: 768px) {
  .box-content {
    display: none;
  }

  .position {
    display: initial;
    font-size: .8rem;
  }

  .box-card {
  width: 4.8rem;
  height: 4.8rem;
  }
}
</style>
