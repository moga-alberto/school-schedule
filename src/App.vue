<template>
  <div class="container-fluid" id="app">
    <Nav />
    <router-view/>
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
  methods: {
    // onload() {
    //   this.$http
    //     .get(
    //       'https://school-schedule-project-default-rtdb.europe-west1.firebasedatabase.app/',
    //     )
    //     .then((res) => {
    //       console.log(res);
    //     });
    // },
  },
  // created() {
  //   this.$http
  //     .get()
  //     .then(
  //       (res) => {
  //         this.post = res;
  //         // eslint-disable-next-line no-console
  //         console.log(this.post.body.courses);
  //       },
  //     );
  // },
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
