<template>
  <div class="container-fluid" id="app">
    <Nav />
    <router-view :post.sync="post" />
  </div>
</template>

<script>
import Vue from 'vue';
import Nav from './components/Nav';

Vue.use(require('vue-resource'));

export default {
  name: 'App',
  components: {
    Nav,
  },
  data() {
    return {
      post: this.$store.getters.get_data,
    };
  },
  methods: {
    getList() {
      this.$http.get().then((res) => {
        this.$store.commit('setPost', res);
      });
      // this.coursesNumber = Number(this.$store.getters.get_data.body.courses.length);
      console.log(this.$store.getters.get_data);
    },
  },
  created() {
    this.getList();
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
