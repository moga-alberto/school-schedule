import Vue from 'vue';
import VueResource from 'vue-resource';
import Vuex from 'vuex';

Vue.use(require('vue-resource'));

Vue.use(Vuex);
Vue.use(VueResource);

export default new Vuex.Store({
  namespaced: true,
  state: {
    post: null,
  },
  mutations: {
    setPost: (state, data) => {
      state.post = data;
      console.log(state.post);
    },
  },
  actions: {
    getPost(store, data) {
      store.commit('setPost', data);
    },
  },
  getters: {
    get_data: state => state.post,
  },
});

