<template>
  <div class="container-fluid" id="app">
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Nav from './components/Nav';

export default {
  name: 'App',
  components: {
    Nav,
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
