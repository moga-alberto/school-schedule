<template>
  <div class="container-fluid" id="app">
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue';
import Nav from './components/Nav';

Vue.use(require('vue-resource'));

export default {
  name: 'App',
  props: [],
  components: {
    Nav,
  },
  data() {
    return {
      post: this.$store.getters.get_data,
    };
  },
  methods: {
    getCoursesNumber() {
      this.coursesNumber = Number(this.$store.getters.get_data.body.courses.length);
    },
    getData() {
      this.$http.get().then((res) => {
        const response = res;
        this.$store.commit('setPost', response);
      });
    },
  },
  mounted() {
    this.getCoursesNumber();
  },
  beforeCreate() {
    this.$http.get().then((res) => {
      const response = res;
      this.$store.commit('setPost', response);
    });
  },
  created() {
    this.getData();
  },
  beforeUpdate() {
    this.getData();
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}
.bg-dark {
  background-color: #2c3e50 !important;
}
.dark {
  background-color: #292b2c !important;
  color: #fff !important;
}
</style>
