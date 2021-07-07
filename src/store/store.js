import Vue from 'vue';
import VueResource from 'vue-resource';
import Vuex from 'vuex';

Vue.use(require('vue-resource'));

Vue.use(Vuex);
Vue.use(VueResource);

export default new Vuex.Store({
  namespaced: true,
  state: {
    updateKey: 0,
    post: {},
  },
  mutations: {
    setPost: (state, data) => {
      Object.assign(state.post, data);
    },
    increment: (state) => {
      let i = 0;
      function refresh() {
        if (i < 5) {
          setTimeout(() => {
            state.updateKey += 1;
            i += 1;
            refresh();
          }, 1000);
        }
      }
      refresh();
    },
  },
  actions: {
    getPost(store, data) {
      store.commit('setPost', data);
    },
  },
  getters: {
    get_data: state => state.post,
    get_updateKey: state => state.updateKey,
  },
});

