<template>
  <div class="container-fluid" id="app">
    <Nav />
    <router-view v-if="fulfiled" key="key" @update="update" />
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
    update() {
      this.$mount();
    },
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
    const root = '/schedule';
    this.$router.push({ path: root }).catch(() => {});
  },
  beforeUpdate() {
    this.getData();
  },
  watch: {},
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

button[aria-checked='true'] {
  background-color: #292b2c !important;
  color: #fff !important;
  font-weight: bold;
}
button[aria-checked='false'] {
  color: #292b2c !important;
  background-color: #fff !important;
}
button[role='menuitem'] {
  color: #292b2c !important;
  background-color: #fff !important;
}
button[role='menuitem']:focus {
  box-shadow: none;
}
button[role='menuitem']:active:focus {
  box-shadow: none;
  border: inset;
}
button[aria-checked='true']:focus {
  box-shadow: none;
  border: none;
}
tr[role='row'] {
  vertical-align: middle;
  text-align: center;
}

tr[role='row']:hover {
  transform: scale(0.998);
  border-top: 2px inset black;
  border-bottom: 2px inset black;
  transition: transform 0.3s linear;
  cursor: pointer;
  pointer-events: all;
}
thead tr,
thead td[role='row']:hover {
  pointer-events: none !important;
}

.not-filled {
  border: 2px solid red;
  box-shadow: 0px 0px 1px 2px rgba(255, 0, 0, 0.3);
}

@media(max-width: 768px) {
  td:nth-child(4) ,th:nth-child(4) {
    display: none;
  }
}
</style>
