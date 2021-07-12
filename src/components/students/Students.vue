<template>
  <div class="container-flow w-100" id="courses">
    <div class="card border-dark rounded-0 mb-3 mt-0" style="height: 93vh">
      <div class="card-header fw-bold border-dark fs-5 rounded-0 dark">
        Students
      </div>
      <div class="card-body text bg-light pt-0" style="overflow-y: scroll;">
        <div class="overflow-auto">
          <b-table
            id="my-table"
            ref="table"
            :items="items"
            :per-page="perPage"
            :current-page="currentPage"
          ></b-table>
        </div>
      </div>
      <div
        class="card-footer
        bg-transparent border-dark d-flex align-items-center justify-content-end"
        style="vertical-align: middle"
      >
        <b-pagination
          class="m-2 align-self-end"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
        ></b-pagination>
      </div>
    </div>
    <edit-student
      v-for="place in rowsOnPage ? rowsOnPage - 1 : 6"
      :key="place"
      :modal="(currentPage - 1) * perPage + place"
      :indexS="(currentPage - 1) * perPage + place - 1"
      :studentName="'Student Name'"
      @update="posts() ,getItems(), getStudentsNumber(), update()"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import EditStudent from '../utilities/EditStudent';

export default {
  components: { EditStudent },
  name: 'Students',
  data() {
    return {
      perPage: 14,
      currentPage: 1,
      items: [],
      post: {},
      sNumber: 0,
      table: [],
      modalHtml: '',
      rowsOnPage: 0,
      spaces: 0,
      empty: 0,
    };
  },
  mounted() {
    this.getStudentsNumber();
    this.getItems();
    this.getRows();
    const page = document.getElementById('students-link');
    page.classList.add('active');
    this.$nextTick(() => this.attachModal(this.currentPage));
  },
  destroyed() {
    const page = document.getElementById('students-link');
    page.classList.remove('active');
  },

  computed: {
    rows() {
      return this.items.length;
    },
  },
  watch: {
    ...mapGetters({
      post: 'get_data',
      items: 'get_items',
    }),
    items() {
      return this.items;
    },
    post() {
      return this.post;
    },
    currentPage() {
      this.attachModal(this.currentPage);
      this.$nextTick(() => {
        this.getRows();
      });
    },
    rowsOnPage() {
      return this.rowsOnPage;
    },
  },
  methods: {
    posts() {
      this.post = this.$store.getters.get_data;
    },
    update() {
      this.$http.get().then((res) => {
        this.post = res;
        this.getItems();
      });
      // this.getItems();
      this.$refs.table.refresh();
      this.$root.$emit('bv::refresh::table', 'my-table');
    },
    attachModal(currentPage) {
      this.getRows();
      for (let i = 1; i <= this.rowsOnPage - 1; i += 1) {
        const thisElementsRow = ((currentPage - 1) * this.perPage) + i;
        this.injectRows(i, thisElementsRow);
      }
    },
    getStudentsNumber() {
      this.post = this.$store.getters.get_data;
      this.sNumber = Number(this.post.body.students.length);
    },
    getRows() {
      this.table = document.getElementsByTagName('tr');
      this.rowsOnPage = this.table.length;
    },
    injectRows(position, row) {
      this.table[position].addEventListener('click', () => {
        this.$bvModal.show(`${row}-modal`);
      });
    },
    getItems() {
      this.items = [];
      for (let i = 0; i < this.sNumber; i += 1) {
        let coursesList = '';
        this.empty = 0;
        for (let k = 0; k < this.post.body.students[i].courses.length; k += 1) {
          if (this.post.body.students[i].courses[k] === '') {
            this.empty += 1;
          }
        }
        const coursesNumber =
          this.post.body.students[i].courses.length - this.empty;
        for (let j = 0; j < coursesNumber; j += 1) {
          if (this.post.body.students[i].courses[j] !== '') {
            if (j === 0) {
              coursesList = this.post.body.students[i].courses[j];
            } else if (coursesList !== '') {
              coursesList = `${coursesList}, ${this.post.body.students[i].courses[j]}`;
            } else {
              coursesList = `${this.post.body.students[i].courses[j]}`;
            }
          }
        }
        this.items.push({
          id: i + 1,
          student_name: this.post.body.students[i].student,
          courses_number: coursesNumber,
          assigned_courses: coursesList,
        });
      }
      this.$store.commit('getItems', this.items);
    },
  },
};
</script>

<style scoped>
</style>
