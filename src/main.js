/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarWeek, faTimes, faClock, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueResource from 'vue-resource';
import http from 'http';
import App from './App';
import router from './router';

library.add(faCalendarWeek);
library.add(faTimes);
library.add(faClock);
library.add(faEdit);

Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.http.options.root = 'https://school-schedule-project-default-rtdb.europe-west1.firebasedatabase.app/.json';


// const tooltipTriggerList = [].slice.call(document.querySelectorAll('
// [data-bs-toggle="tooltip"]'));
// const tooltipList =
//   tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
// // const popover = new bootstrap.Popover(document.querySelector('.example-popover'), {
// //   container: 'body',
// // });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

// const collapseElementList = [].slice.call(document.querySelectorAll('.collapse'));
// const collapseList = collapseElementList.map(collapseEl => new bootstrap.Collapse(collapseEl));
