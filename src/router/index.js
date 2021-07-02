import Vue from 'vue';
import Router from 'vue-router';
import Courses from '../components/courses/Courses';
import Schedule from '../components/schedule/Schedule';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/courses',
      name: 'Courses',
      component: Courses,
    },

    {
      path: '/',
      name: 'Schedule',
      component: Schedule,
    },
  ],
});
