<template>
  <div class="container-fluid" id="app">
    <Nav />
    <router-view v-if="fulfiled" :key="key" />
    <div
      v-if="!fulfiled"
      class="text-center d-flex vw-100 vh-100 justify-content-center align-items-center"
    >
      <b-spinner label="Spinning"></b-spinner>
    </div>
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
      fulfiled: false,
      key: 0,
    };
  },
  methods: {
    getData() {
      this.$http.get().then((res) => {
        const response = res;
        this.$store.commit('setPost', response);
      });
    },
    updateFields() {
      this.$store.commit('increment');
    },
  },
  beforeCreate() {
    this.$http.get().then((res) => {
      const response = res;
      this.$store.commit('setPost', response);
      this.fulfiled = true;
    });
  },
  created() {
    this.getData();
  },
  mounted() {
    this.updateFields();
  },
  beforeUpdate() {
    this.getData();
  },
  watch: {
    post: (this.key += 1),
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
