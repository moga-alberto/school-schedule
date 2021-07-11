import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import Courses from '../components/courses/Courses';
import Schedule from '../components/schedule/Schedule';
import Teachers from '../components/teachers/Teachers';
import Students from '../components/students/Students';

Vue.use(Vuex);
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/courses',
      name: 'Courses',
      component: Courses,
    },

    {
      path: '/schedule',
      name: 'Schedule',
      component: Schedule,
    },
    {
      path: '/teachers',
      name: 'Teachers',
      component: Teachers,
    },
    {
      path: '/students',
      name: 'Students',
      component: Students,
    },
  ],
});
